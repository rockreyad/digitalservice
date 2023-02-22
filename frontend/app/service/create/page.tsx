"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useMutation } from "react-query";
import { useQuery, useQueryClient } from "react-query";

const addService = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  });
};

const Create = () => {
  const [services, setServices] = React.useState({
    title: "",
    description: "",
  });

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
    // let formData = new FormData();

    // for (let [key, value] of Object.entries(services)) {
    //   formData.append(key, value);
    // }

    // console.log(formData);
    console.log(services);
    mutate(services);
  };

  //   const router = useRouter();
  //   React.useEffect(() => {
  //     isSuccess ? router.push("/service") : null;
  //   }, [isSuccess]);

  return (
    <div>
      <div className="w-full px-4 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Create</h1>
            <p>Please add a new digital service</p>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Create;
