import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { PayPalProvider } from "@/providers/paypal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AutoStream",
  description: "Car Hire Management System",
  icons: [
    {
      url: "/crsm.svg",
      href: "/crsm.svg",
    },
  ],
};

export default function RootLayout({ children }) {



  return (
    <ClerkProvider>
      <PayPalProvider>
        <html lang="en">
          <body className={inter.className}>
            <Toaster position="top-right" />
            {children}
          </body>
        </html>
      </PayPalProvider>
    </ClerkProvider>
  );
}
