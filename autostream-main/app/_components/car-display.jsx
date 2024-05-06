import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarCards } from "./car-cards";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

export const CarDisplay = () => {
  return (
    <Card className="border-none shadow-none">
      <div className="mx-3 mt-5">
        <Button variant='ghost' size='sm' asChild>
          <Link href='/' className="flex items-center space-x-2">
            <ArrowLeftCircle/>
            <span>Back</span>
          </Link>
        </Button>
      </div>
      <CardHeader>
        <CardTitle>Car Rental Services</CardTitle>
        <CardDescription>
          Start reserving and booking your car of choice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CarCards />
      </CardContent>

      <CardFooter>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Acme Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </CardFooter>
    </Card>
  );
};
