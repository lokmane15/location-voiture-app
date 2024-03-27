import { useParams, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { FaRoad } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdGpsFixed } from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
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
                location.reload()
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, id]);
    
    return (
        <>
        <div style={{marginTop:"80px"}}>
            <Link
                to="/cars"
                className="p-4"
            >&larr; <span>Back</span></Link>
        </div>
            <div className="container car-details flex justify-center  mt-20 mb-20">
                <div className="card mb-3" style={{width:"30rem"}}>
                    <img src={`/public/${data.image}`} className="card-img-top img-fluid" alt="image"/>
                    <div  className="card-body">
                        <h3 style={{textTransform: "uppercase"}} className="text-2xl font-medium mb-3">{data.marque} {data.model && data.model.nom_model}</h3>
                        <p className="card-text mb-1 font-medium"><MdPriceChange className="size-6 inline mr-3"/> Prix par jour: {data.prix} DH</p>
                        <p className="card-text mb-1 font-medium"> <FaRoad className="size-6 inline mr-3"/> Kilomitrage: {data.kilomitrage} km</p>
                        <p className="card-text mb-1 font-medium"><IoCalendarClear className="size-6 inline mr-3"/>Annee: {data.annee}</p>
                        <p className="card-text mb-1 font-medium"> <BsFillFuelPumpFill  className="size-6 inline mr-3"/> type carburant: {data.model && data.model.type_carburant}</p>
                        <p className="card-text mb-1 font-medium"><MdGpsFixed  className="size-6 inline mr-3"/> GPS: {data.model && data.model.gps === 0 ? "Non disponible" : "Disponible"}</p>
                        <p className="card-text mb-1 font-medium"> <MdOutlineReduceCapacity className="size-6 inline mr-3" />  Capacite assises: {data.model && data.model.capacite_assises}</p>
                        <button className="mt-3  bg-cyan-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-500"><Link to={`/reserve/${data.id}`} >Reserve</Link></button>
                    </div>
                </div>
            </div>  
        </>
    );
}
