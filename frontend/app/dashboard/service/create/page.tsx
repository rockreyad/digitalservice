import CreateServiceForm from "@/components/services/CreateServiceForm";
import React from "react";

export default function CreateService() {
  return (
    <div>
      <div className="w-full px-4 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Create</h1>
            <p>Please add a new digital service</p>
          </div>
        </div>
        <CreateServiceForm />
      </div>
    </div>
  );
}
