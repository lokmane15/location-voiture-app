import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchMarque,
  fetchmodelbymarqueid,
  fetchSingleCar,
  fetchupdateCar,
} from "../api/Cars";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

export default function UpdateCar() {
  const { id } = useParams();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { data: carData } = useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchSingleCar(id),
  });
  const [data, setData] = useState({
    num_matricule: "",
    kilomitrage: 0,
    annee: 0,
    couleur: "",
    prix: 0,
    etat: "",
    marque: "",
    image: "",
    model_id: 0,
  });

  useEffect(() => {
    if (carData) {
      setData({
        num_matricule: carData.num_matricule,
        kilomitrage: carData.kilomitrage,
        annee: carData.annee,
        couleur: carData.couleur,
        prix: carData.prix,
        etat: carData.etat,
        marque: carData.marque,
        model_id: carData.model_id,
      });
    }
  }, [carData]);

  const [models, setModels] = useState([]);

  const { data: datamarque } = useQuery({
    queryKey: ["marque"],
    queryFn: fetchMarque,
  });

  // Function to get the marque ID from its name
  const getMarqueIdByName = (marqueName) => {
    const marque = datamarque?.find((m) => m.nom_marque === marqueName);
    return marque ? marque.id : 1;
  };

  // Effect to fetch models when marque changes or on initial render
  useEffect(() => {
    if (data.marque) {
      const marqueId = getMarqueIdByName(data.marque);
      if (marqueId) {
        fetchmodelbymarqueid(marqueId).then(setModels);
      }
    }
  }, [data.marque, datamarque]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData({
        ...data,
        [name]: checked ? 0 : 1, // If checked, send 0 (reserved), else send 1 (available)
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each property in data to FormData
    for (const key in data) {
      formData.append(key, data[key]);
    }
    await fetchupdateCar({ formData, id, token: admin });
    navigate("/cars");
  };
  console.log(data);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-xl mx-auto mt-10 p-8 rounded-lg shadow-md "
    >
      <div className="space-y-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add New Car
        </h2>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-8">
            <div className="sm:col-span-3">
              <label
                htmlFor="num_matricule"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Num Matricule
              </label>
              <div className="mt-2">
                <input
                  name="num_matricule"
                  type="text"
                  value={data.num_matricule}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="kilomitrage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kilomitrage
              </label>
              <div className="mt-2">
                <input
                  name="kilomitrage"
                  type="number"
                  value={data.kilomitrage}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="annee"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
              <div className="mt-2">
                <input
                  name="annee"
                  type="number"
                  value={data.annee}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="couleur"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Color
              </label>
              <div className="mt-2">
                <input
                  name="couleur"
                  type="text"
                  value={data.couleur}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="prix"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  name="prix"
                  type="number"
                  value={data.prix}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="marque"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Marque
              </label>
              <div className="mt-2">
                <select
                  name="marque"
                  className="border-0 p-2 bg-white"
                  value={data.marque} // Set the value to data.marque
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Marque
                  </option>
                  {datamarque &&
                    datamarque.map((item) => (
                      <option key={item.id} value={item.nom_marque}>
                        {item.nom_marque}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="model_id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Model
              </label>
              <div className="mt-2">
                <select
                  name="model_id"
                  className="border-0 p-2 bg-white"
                  value={data.model_id} // Set the value to data.model_id
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Model
                  </option>
                  {models &&
                    models.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nom_model}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="etat"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Etat
              </label>
              <div className="mt-2">
                <input
                  type="checkbox"
                  name="etat"
                  checked={data.etat == 0}
                  onChange={handleChange}
                  className=""
                />{" "}
                Reserved
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate("/cars")}
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
