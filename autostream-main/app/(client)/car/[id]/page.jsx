import { Header } from "@/app/_components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { CarDetails } from "../../_components/car-details";

function CarPageId({ params }) {
  const id = params.id;
  return (
    <div>
      <div>
        <Header />
      </div>

      <div>
        <CarDetails id={id}/>
      </div>
    </div>
  );
}

export default CarPageId;
