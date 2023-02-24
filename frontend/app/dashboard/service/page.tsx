import RouterButton from "@/components/Button/RouterButton";
import ServiceList from "@/components/services/ServiceList";

import React from "react";

const Service = () => {
  return (
    <div className="w-full px-4 space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Service</h1>
          <p>Welcome to digital service</p>
        </div>
        <RouterButton name="create" link="dashboard/service/create" />
      </div>
      <ServiceList />
    </div>
  );
};

export default Service;
