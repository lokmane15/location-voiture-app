import { useParams, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { FaRoad  } from "react-icons/fa6";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdGpsFixed } from "react-icons/md";
import { MdReduceCapacity } from "react-icons/md";
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
        <>
            <div className="container car-detailsd- mt-20 mb-20">
            <div className="card mb-3" style={{width:"30rem"}}>
            <img src={`/public/${data.image}`} className="card-img-top img-fluid" alt="image"/>
            <div className="card-body">
                <h5 className="card-title font-bold">{data.marque} {data.model && data.model.nom_model}</h5>
                <p className="card-text m-2"> <FaRoad  className="d-inline text-xl"/>  Kilomitrage: {data.kilomitrage} km </p>
                <p className="card-text m-2">Annee: {data.annee}</p>
                <p className="card-text m-2"> <BsFillFuelPumpFill className="d-inline text-xl" />  type carburant: {data.model && data.model.type_curburant} </p>
                <p className="card-text m-2"> <MdGpsFixed className="d-inline text-xl"/> GPS: {data.model && data.model.gps === 0 ? "Non disponible" : "Disponible"} </p>
                <p className="card-text m-2"> <MdReduceCapacity className="d-inline text-2xl" /> Capacite assises: {data.model && data.model.capacite_assises}</p>
                <Link to={`/reserve/${data.id}`} className="btn btn-primary mt-3">Reserve</Link>
            </div>
            </div>
            </div>

                {/* <div className="row">
                    <div className="col-lg-6">
                    <img src={`/public/${data.image}`} className="img-fluid rounded-start" alt="car" />
                    </div>
                    <div className="col-lg-6 mt-40">
                        <div className="card-s">
                            <h3 className="">{data.marque} {data.model && data.model.nom_model}</h3>
                                <p className="card-text">Kilomitrage: {data.kilomitrage} km</p>
                                <p className="card-text">Annee: {data.annee}</p>
                                <p className="card-text">Type carburant: {data.model && data.model.type_curburant}</p>
                                <p className="card-text">GPS: {data.model && data.model.gps === 0 ? "Non disponible" : "Disponible"}</p>
                                <p className="card-text">Capacite assises: {data.model && data.model.capacite_assises}</p>
                                <Link to={`/reserve/${data.id}`} className="btn btn-primary mt-3">Reserve</Link>
                            </div>
                        </div>
                </div> */}

        {/* <div className="container mx-auto p-4">
            <div className="flex items-center mt-20">
                <img src={data.image} alt="" className="w-60 h-auto mr-4" />
                <div>
                    <h1 className="text-2xl font-bold mb-2">{data.marque} {data.model && data.model.nom_model}</h1>
                    <p className="mb-2">Kilomitrage: {data.kilomitrage}</p>
                    <p className="mb-2">Annee: {data.annee}</p>
                    <p className="mb-2">Type carburant: {data.model && data.model.type_curburant}</p>
                    <p className="mb-2">{`GPS: ${data.model && data.model.gps === 0 ? "ne pas disponible" : "disponible"}`}</p>
                    <p className="mb-2">Capacite assises: {data.model && data.model.capacite_assises}</p>
                </div>
            </div>
        </div> */}
        </>
    );
}
