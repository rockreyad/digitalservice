"use client";

import { addService, getServiceCategory } from "@/utils/api/services";
import { Checkbox, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
export default function CreateServiceForm() {
  const [services, setServices] = useState({
    title: String(""),
    description: String(""),
    categoryId: Number(""),
    status: Boolean(true),
  });

  //mutate the inputfiled data
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setServices({
      ...services,
      [e.target.name]: e.target.value,
    });
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

  const { data: categories } = useQuery("categories", getServiceCategory);

  //validation and send data to backend

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(services);
  };

  const router = useRouter();
  React.useEffect(() => {
    isSuccess ? router.push(`/dashboard/service/${services.categoryId}`) : null;
  }, [isSuccess, services.categoryId, router]);
  return (
    <>
      <div>
        {isLoading && <p>loading...</p>}
        {/* {isSuccess && <p>{data}</p>} */}
        {isError && <p>error</p>}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Title and Description field  */}
            <div className="space-y-4">
              <div className="">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="service-name"
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-transparent  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="service-name"
                  type="text"
                  onChange={handleChange}
                  value={services.title}
                  name="title"
                  placeholder="facebook ad campaign"
                />
                <p className="text-gray-600 text-xs italic">
                  Make it shorter and as simpler as you&apos;d like
                </p>
              </div>
              <div className="">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="service-description"
                >
                  Description
                </label>
                <Textarea
                  onChange={handleChange}
                  value={services.description}
                  id="service-description"
                  name="description"
                  _focus={{ backgroundColor: "white" }}
                  placeholder="Facebook ads are targeted to users based on their location, demographic, and profile information"
                  size="sm"
                />
              </div>
            </div>

            {/* Category field  */}
            <div className="w-full ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="service-description"
              >
                Category
              </label>
              <Select
                value={services.categoryId}
                onChange={handleChange}
                name="categoryId"
                placeholder="Select option"
              >
                {categories &&
                  categories.data?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
              </Select>
            </div>
            {/* Status Field */}
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="service-description"
              >
                Status
              </label>

              <Stack spacing={5} direction="row">
                <Checkbox
                  onChange={handleChange}
                  colorScheme="green"
                  defaultChecked
                >
                  Active
                </Checkbox>
              </Stack>
            </div>
          </div>

          {/* Submit Button */}
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
