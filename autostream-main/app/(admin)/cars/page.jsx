import React from "react";
import { AdminHeader } from "../_comonents/header-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarsTable } from "./_components/cars-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CarsPage() {
  return (
    <div>
      <div>
        <AdminHeader
          title="Cars Page"
          description="Displays all available vehicles"
        />
      </div>

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div>Total cars uploaded</div>

            <Button size="sm" asChild>
              <Link href="/cars/create">upload car</Link>
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CarsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CarsPage;
