"use client";

import { addService } from "@/utils/api/services";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
export default function CreateServiceForm() {
  const [services, setServices] = useState({
    title: "",
    description: "",
  });

  //mutate the inputfiled data
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setServices({ ...services, [e.target.name]: e.target.value });
  }

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, isSuccess, data } = useMutation(
    addService,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("services");
      },
    }
  );

  //validation and send data to backend

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Service Data sending to backend :", services);
    mutate(services);
  };

  //   const router = useRouter();
  //   React.useEffect(() => {
  //     isSuccess ? router.push("/service") : null;
  //   }, [isSuccess]);
  return (
    <>
      <div>
        {isLoading && <p>loading...</p>}
        {/* {isSuccess && <p>{data}</p>} */}
        {isError && <p>error</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="service-name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="service-name"
                type="text"
                onChange={handleChange}
                value={services.title}
                name="title"
                placeholder="facebook ad campaign"
              />
              <p className="text-gray-600 text-xs italic">
                Make it shorter and as simpler as you'd like
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="service-description"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="service-description"
                onChange={handleChange}
                value={services.description}
                name="description"
                placeholder="Facebook ads are targeted to users based on their location, demographic, and profile information"
              />
            </div>
          </div>
          <button
            className="bg-black py-1 px-6 rounded text-white capitalize"
            type="submit"
          >
            {isLoading ? "loading..." : "add"}
          </button>
        </form>
      </div>
    </>
  );
}
