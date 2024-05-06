import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const consumerkey = "NZ4oQ3PhxprBzQuqfDZv9q8KFP6b2EB9LammBdpufrNFcOXi";
    const secretkey =
      "5tqXOJtD0RgVuArqnhlLID6krUwESYLo88uZAeFAeYTLG8rIE8QOOo69MWbhunMV";
    const auth = new Buffer.from(`${consumerkey}:${secretkey}`).toString(
      "base64"
    );

    axios
      .get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          headers: {
            authorization: `Basic ${auth}`,
          },
        }
      )
      .then(async (result) => {
        const token = result.data.access_token;
        const { phone, amount, id } = await req.json();
        const newPhone = phone.substring(1);

        const date = new Date();
        const timestamp =
          date.getFullYear() +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          ("0" + date.getDate()).slice(-2) +
          ("0" + date.getHours()).slice(-2) +
          ("0" + date.getMinutes()).slice(-2) +
          ("0" + date.getSeconds()).slice(-2);

        const passkey =
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
        const shortcode = "174379";

        const password = new Buffer.from(
          `${shortcode}${passkey}${timestamp}`
        ).toString("base64");

        axios
          .post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
              BusinessShortCode: `${shortcode}`,
              Password: `${password}`,
              Timestamp: `${timestamp}`,
              TransactionType: "CustomerPayBillOnline",
              Amount: `${amount}`,
              PartyA: `254${newPhone}`,
              PartyB: `${shortcode}`,
              PhoneNumber: `254${newPhone}`,
              CallBackURL:
                "https://95ed-102-215-32-230.ngrok-free.app/api/callback",
              AccountReference: "CAR HIRE MANAGEMENT SYSTEM",
              TransactionDesc: "Test",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((res)=>console.log(res.data))
          .then(async(data) => {
            console.log(data.data);
            return NextResponse.json(data.data, { status: 200 });
          })
          .catch((err) => NextResponse.json(err, { status: 400 }));

        return NextResponse.json(token, { status: 200 });
      })
      .catch((err) => console.log(err));

    NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
  const api=await axios.post('/api/callback',{data})
  console.log(api)

  return NextResponse.json('Success',{status:200})
};
