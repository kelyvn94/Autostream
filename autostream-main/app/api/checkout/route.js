import { db } from "@/lib/db/db";
import { currentUser } from "@clerk/nextjs";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const secretId = process.env.PAYPAL_SECRET_ID;

const environment = new paypal.core.SandboxEnvironment(clientId, secretId);

const client = new paypal.core.PayPalHttpClient(environment);

export const POST = async (req) => {
  try {
    const { id } = await currentUser();
    const { reserveId, price } = await req.json();

    const totalprice = parseInt(price).toFixed(2);

    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalprice,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalprice,
              },
            },
          },
          items: [
            {
              name: "car",
              description: "car booking",
              quantity: "1",
              unit_amount: {
                currency_code: "USD",
                value: totalprice,
              },
            },
          ],
        },
      ],
    });

    const response = await client.execute(request);

    if (response.result.id) {
      await db.booking.create({
        data: {
          orderId: response.result.id,
          reserveId: reserveId,
          userId: id,
        },
      });
    }

    return NextResponse.json(
      {
        id: response.result.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req) => {
  try {
    const { id, status } = await req.json();

    const updated_booking = await db.booking.update({
      data: {
        status: status,
      },
      where: {
        id,
      },
    });

    return NextResponse.json("updated", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
