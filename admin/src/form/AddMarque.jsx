import { useState } from "react";
import { useNavigate } from "react-router-dom";

export async function createMarque(data) {
  const formData = new FormData();
  formData.append("nom_marque", data.nom_marque);
  formData.append("image_path", data.image_path);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/createmarque", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("The data created successfully!");
    } else {
      console.log("There was an error creating the data.");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function AddMarque() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nom_marque: "",
    image_path: null,
  });

  const handleFileChange = (e) => {
    setData({
      ...data,
      image_path: e.target.files[0],
    });
  };

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
      await createMarque(data);
      navigate("/marque");
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
                  Name of the Brand
                </label>
                <div className="mt-2">
                  <input
                    name="nom_marque"
                    type="text"
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
