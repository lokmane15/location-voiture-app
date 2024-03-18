import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function CarDetails() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [data, setData] = useState({});
    const baseUrl = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${baseUrl}/car/${id}`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });

            if (response.ok) {
                const json = await response.json();
                setData(json);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, id]);

    return (
        <div className="pb-24 ">
  <div className="container ">
    {/* Car listing */}
    <div className="flex justify-center items-center mt-20 pt-20  rounded-lg mf-8">
      <div className="max-w-lg border-r border-gray-300 pr-8">
        <img src={data.image} alt="" className="w-full h-auto" />
      </div>
      <div className="ml-8">
        <h1 className="text-3xl font-bold mb-2">
          {data.marque} {data.model && data.model.nom_model}
        </h1>
        <p className="mb-2 text-xl">
          Kilométrage: {data.kilomitrage} km
        </p>
        <p className="mb-2 text-xl">Année: {data.annee} ans</p>
        <p className="mb-2 text-xl">
          Type carburant: {data.model && data.model.type_curburant}
        </p>
        <p className="mb-2 text-xl">
          {`GPS: ${
            data.model && data.model.gps === 0
              ? "non disponible"
              : "disponible"
          }`}
        </p>
        <p className="mb-2 text-xl">
          Capacité assises: {data.model && data.model.capacite_assises}
        </p>
      </div>
    </div>
    {/* End of car listing */}
  </div>
</div>

    );
}
