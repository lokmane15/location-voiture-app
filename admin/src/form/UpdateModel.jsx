import { useEffect, useState } from "react";
import { fetchSingleModel, fetchUpdateModel } from "../api/Cars";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function UpdateModel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: modelData } = useQuery({
    queryKey: ["model", id],
    queryFn: () => fetchSingleModel(id),
  });
  const [data, setData] = useState({
    nom_model: "",
    type_carburant: "",
    gps: "",
    capacite_assises: "",
    marque_id: "",
  });
  useEffect(() => {
    if (modelData) {
      setData({
        nom_model: modelData.nom_model,
        type_carburant: modelData.type_carburant,
        gps: modelData.gps,
        capacite_assises: modelData.capacite_assises,
        marque_id: modelData.marque_id,
      });
    }
  }, [modelData]);
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
      await fetchUpdateModel(data, id);
      navigate("/model");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
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
                    value={data.nom_model}
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
                    value={data.type_carburant}
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
                    value={data.gps}
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
                    value={data.capacite_assises}
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
                  marque id
                </label>
                <div className="mt-2">
                  <input
                    name="marque_id"
                    type="number"
                    value={data.marque_id}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
