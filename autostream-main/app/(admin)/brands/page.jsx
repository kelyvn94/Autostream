import React from "react";
import { AdminHeader } from "../_comonents/header-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandsTable } from "./_components/brands-table";
import { BrandsDialog } from "./_components/brand-dialog";

function BrandsPage() {
  return (
    <div>
      <div>
        <AdminHeader
          title="Brands Page"
          description="Displays available brands"
        />
      </div>

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>Total Brands</div>

            <div>
              <BrandsDialog />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <BrandsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsPage;
