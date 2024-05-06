import React from "react";
import { AdminHeader } from "../../_comonents/header-admin";
import { CreateCarForm } from "../_components/create-car-form";

function CreateCar() {
  return (
    <div>
      <div>
        <AdminHeader
          description="Start creating your renting cars on this page , the clients will be able to view and rent it when uploaded"
          title="Car Creation Page"
        />
      </div>

      <div>
        <CreateCarForm />
      </div>
    </div>
  );
}

export default CreateCar;
