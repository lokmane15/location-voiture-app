import { useState } from "react";
import { CreateModel, fetchMarque } from "../api/Cars";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

export default function AddModel() {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { data: marquedata } = useQuery({
    queryKey: ["marque"],
    queryFn: () => fetchMarque(admin),
  });

  const [data, setData] = useState({
    nom_model: "",
    type_carburant: "",
    gps: "",
    capacite_assises: "",
    marque_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CreateModel({ data, token: admin });
      navigate("/model");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nom_marque"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name of model
                </label>
                <div className="mt-2">
                  <input
                    name="nom_model"
                    type="text"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="nom_marque"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  type carburant
                </label>
                <div className="mt-2">
                  <input
                    name="type_carburant"
                    type="text"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="nom_marque"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gps
                </label>
                <div className="mt-2">
                  <input
                    name="gps"
                    type="number"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="nom_marque"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  capacite assises
                </label>
                <div className="mt-2">
                  <input
                    name="capacite_assises"
                    type="number"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="nom_marque"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  marque
                </label>
                {/* <div className="mt-2">
                  <input
                    name="marque_id"
                    type="number"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div> */}
                <select name="marque_id" id="" onChange={handleChange}>
                  {marquedata?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nom_marque}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
