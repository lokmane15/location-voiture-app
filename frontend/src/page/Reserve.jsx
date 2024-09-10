import { useParams, Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import { useDataContext } from "../Context/DataContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCarId } from "../services/api";

export default function Reserve() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [dated, setDateD] = useState("");
  const [datef, setDateF] = useState("");
  //   const [car, setCar] = useState("");
  //const [totalPrice, setTotalPrice] = useState(0);
  const { data, setData } = useDataContext();
  const navigate = useNavigate();

  const { data: car } = useQuery({
    queryKey: ["car"],
    queryFn: () => fetchCarId(id, user.token),
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setData({ dated: dated, datef: datef, id_car: car.id });
    navigate(`/payment/${id}`);
    console.log(data);
  };
  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <Link to={`/carDetails/${id}`} className="p-4">
          &larr; <span>Back</span>
        </Link>
      </div>
      <div className="container mx-auto px-4  mt-5">
        <div className="container mx-auto px-4 py-8 mt-16 ">
          <form
            className="max-w-md mx-auto reserve-form"
            onSubmit={handleFormSubmit}
            style={{ boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;" }}
          >
            <div className="mb-4">
              <h1 className="text-center text-2xl font-black mb-3 ">
                FORMULAIRE DE RESERVATION
              </h1>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                first nsme
              </label>
              <input
                type="text"
                value={user.user.nom}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                last name
              </label>
              <input
                type="text"
                value={user.user.prenom}
                className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Car
              </label>
              <input
                type="text"
                value={car.marque}
                className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date de début
              </label>
              <input
                type="date"
                required
                onChange={(e) => setDateD(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date de fin
              </label>
              <input
                type="date"
                required
                onChange={(e) => setDateF(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
            {/* datetime-local */}
            <div className="flex justify-center">
              <button className="bg-cyan-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-500 ">
                Réserver
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
