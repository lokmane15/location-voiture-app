import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleCar } from "../api/Cars";
import { useQuery } from "@tanstack/react-query";

export default function UpdateCar() {
  const { id } = useParams();
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

  const updateData = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/updatecar/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("The data updated successfully!");
        navigate("/cars");
      } else {
        console.log("There was an error updating the data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // const handleClick = () => {
  //   updateData(id);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(id);
  };
  const handleFileChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
  };
  return (
    <div className="max-w-md mx-auto p-10 bg-gray-100 rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Num Matricule
          </label>
          <input
            type="text"
            name="num_matricule"
            value={data.num_matricule}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kilomitrage
          </label>
          <input
            type="text"
            name="kilomitrage"
            value={data.kilomitrage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Année
          </label>
          <input
            type="text"
            name="annee"
            value={data.annee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Couleur
          </label>
          <input
            type="text"
            name="couleur"
            value={data.couleur}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix
          </label>
          <input
            type="text"
            name="prix"
            value={data.prix}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            État
          </label>
          <input
            type="text"
            name="etat"
            value={data.etat}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marque
          </label>
          <input
            type="text"
            name="marque"
            value={data.marque}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model ID
          </label>
          <input
            type="text"
            name="model_id"
            value={data.model_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
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
        </div>
        <button type="submit">submit</button>
      </form>

      {/* <button
          onClick={handleClick}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Click
        </button> */}
    </div>
  );
}
