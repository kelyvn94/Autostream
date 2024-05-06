import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const DashboardCards = ({ title, number ,href}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <div className="text-xl font-bold ">{number}</div>
      </CardContent>
      <CardFooter>
        <Link className="hover:underline text-sky-400" href={href}>
            View more...
        </Link>
      </CardFooter>
    </Card>
  );
};
