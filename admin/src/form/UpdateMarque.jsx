import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleMarque, updateMarque } from "../api/Cars";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function UpdateMarque() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();
  const { data: marquedata } = useQuery({
    queryKey: ["marque", id],
    queryFn: () => fetchSingleMarque({ id, token: admin }),
  });
  const [marque, setMarque] = useState({
    nom_marque: "",
    image_path: null,
  });

  useEffect(() => {
    if (marquedata) {
      setMarque({
        nom_marque: marquedata.nom_marque,
        // image_path: marquedata.image_path,
      });
    }
  }, [marquedata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarque({
      ...marque,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setMarque({
      ...marque,
      image_path: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in marque) {
      formData.append(key, marque[key]);
    }

    await updateMarque({ formData, id, token: admin });
    navigate("/marque");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md"
      encType="multipart/form-data"
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
                  Name of the Brand
                </label>
                <div className="mt-2">
                  <input
                    name="nom_marque"
                    type="text"
                    value={marque.nom_marque}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Marque photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-6">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        onChange={handleFileChange}
                        name="image_path"
                        type="file"
                        id="file-upload"
                        className="sr-only"
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
