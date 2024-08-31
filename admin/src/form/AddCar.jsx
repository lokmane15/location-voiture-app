import { useEffect, useState } from "react";
import { fetchCreateCar, fetchMarque, fetchmodelbymarqueid } from "../api/Cars";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

export default function AddCar() {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const [formData, setFormData] = useState({
    num_matricule: "",
    kilomitrage: "",
    annee: "",
    couleur: "",
    prix: "",
    etat: 1,
    image: "",
    marque: "BMW", // Set a default marque
    model_id: "",
  });
  const [models, setModels] = useState([]);

  const { data: datamarque } = useQuery({
    queryKey: ["marque"],
    queryFn: () => fetchMarque(admin),
  });
  console.log(formData);
  // Function to get the marque ID from its name
  const getMarqueIdByName = (marqueName) => {
    const marque = datamarque?.find((m) => m.nom_marque === marqueName);
    return marque ? marque.id : 1;
  };

  // Effect to fetch models when marque changes or on initial render
  useEffect(() => {
    if (formData.marque) {
      const marqueId = getMarqueIdByName(formData.marque);
      if (marqueId) {
        fetchmodelbymarqueid(marqueId).then(setModels);
      }
    }
  }, [formData.marque, datamarque]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked ? 0 : 1, // If checked, send 0 (reserved), else send 1 (available)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    try {
      fetchCreateCar({ data, token: admin });
      navigate("/cars");
    } catch (err) {
      console.log("Error creating car:", err);
    }
  };
  console.log(formData);

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
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                num_matricule
              </label>
              <div className="mt-2">
                <input
                  name="num_matricule"
                  type="text"
                  value={formData.num_matricule}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                kilomitrage
              </label>
              <div className="mt-2">
                <input
                  name="kilomitrage"
                  type="number"
                  value={formData.kilomitrage}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
              <div className="mt-2">
                <input
                  name="annee"
                  type="number"
                  value={formData.annee}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                color
              </label>
              <div className="mt-2">
                <input
                  name="couleur"
                  type="text"
                  value={formData.couleur}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                price
              </label>
              <div className="mt-2">
                <input
                  name="prix"
                  type="number"
                  value={formData.prix}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                marque
              </label>
              <div className="mt-2">
                <select
                  name="marque"
                  className="border-0 p-2 bg-white"
                  // Set the value to formData.marque
                  onChange={handleChange}
                >
                  <option value="" disabled selected hidden>
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
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                model
              </label>
              <div className="mt-2">
                <select
                  name="model_id"
                  className="border-0 p-2 bg-white"
                  onChange={handleChange}
                >
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
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                etat
              </label>
              <div className="mt-2">
                <input
                  type="checkbox"
                  name="etat"
                  checked={formData.etat === 0}
                  onChange={handleChange}
                  autoComplete="family-name"
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
              photo
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
                      required
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
