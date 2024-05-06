"use client";


import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "sonner";
import {useRouter} from "next/navigation"

export const BookForm = ({ price, id }) => {
const {back}=useRouter()

  return (
    <div>
      <PayPalButtons
        style={{
          label: "checkout",
        }}
        onApprove={(data, actions) => {
          console.log("approved", data);
          actions.order.capture();

          toast.success(`Payment with orderId ${data.orderID} was successful`);
          back()
        }}
        onCancel={(data) => {
          toast.error(`Transaction with orderId ${data.orderID} was cancelled`)
        }}
        createOrder={async () => {
          const resp = await axios.post("/api/checkout", {
            reserveId: id,
            price,
          });

          const order = resp?.data;

          return order.id;
        }}
      />
    </div>
  );
};
