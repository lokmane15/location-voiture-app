import { useParams, Link } from "react-router-dom";
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
        };

        if (user) {
            fetchData();
        }
    }, [user, id]);
    
    return (
        <>
            <div className="flex justify-center container car-detailsd- mt-20 mb-20">
            <div className="card mb-3" style={{width:"30rem"}}>
            <img src={`/public/${data.image}`} className="card-img-top img-fluid" alt="image"/>
            <div className="card-body">
                <h5 className="card-title">{data.marque} {data.model && data.model.nom_model}</h5>
                <p className="card-text">Kilomitrage: {data.kilomitrage} km</p>
                <p className="card-text">Annee: {data.annee}</p>
                <p className="card-text">ype carburant: {data.model && data.model.type_curburant}</p>
                <p className="card-text">GPS: {data.model && data.model.gps === 0 ? "Non disponible" : "Disponible"}</p>
                <p className="card-text">Capacite assises: {data.model && data.model.capacite_assises}</p>
                <Link to={`/reserve/${data.id}`} className="btn btn-primary mt-3">Reserve</Link>
            </div>
            </div>
            </div>

                {/* {/* <div className="row">
                    <div className="col-lg-6">
                    <img src={`/public/${data.image}`} className="img-fluid rounded-start" alt="car" />
                    </div>
                </div>
            </div>  */}
        </>
    );
}
