import { useParams, Link, Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
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
            if (response.status === 401) {
                localStorage.removeItem('user')
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, id]);
    
    return (
        <>
            <div className="container car-details flex justify-center  mt-20 mb-20">
                <div className="card mb-3" style={{width:"30rem"}}>
                    <img src={`/public/${data.image}`} className="card-img-top img-fluid" alt="image"/>
                    <div  className="card-body">
                        <h3 style={{textTransform: "uppercase"}} className="text-2xl font-medium mb-3">{data.marque} {data.model && data.model.nom_model}</h3>
                        <p className="card-text mb-1 font-medium">Prix par jour: {data.prix} DH</p>
                        <p className="card-text mb-1 font-medium">Kilomitrage: {data.kilomitrage} km</p>
                        <p className="card-text mb-1 font-medium">Annee: {data.annee}</p>
                        <p className="card-text mb-1 font-medium">type carburant: {data.model && data.model.type_carburant}</p>
                        <p className="card-text mb-1 font-medium">GPS: {data.model && data.model.gps === 0 ? "Non disponible" : "Disponible"}</p>
                        <p className="card-text mb-1 font-medium">Capacite assises: {data.model && data.model.capacite_assises}</p>
                        <button className="mt-3  bg-cyan-300  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-400 "><Link to={`/reserve/${data.id}`} >Reserve</Link></button>
                    </div>
                </div>
            </div>
        </>
    );
}
