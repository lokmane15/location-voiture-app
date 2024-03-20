import { useEffect, useState } from "react";
import { useDataContext } from "../Context/DataContext";
import { useParams, Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import fetchCarId from "../services/FetchCarId";

export default function Payment() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State for storing error message
    const { data } = useDataContext();
    const baseUrl = 'http://localhost:8000/api';
    const { id } = useParams();
    const { user } = useAuthContext();
    const [car, setCar] = useState("");
    const [duration,setDuration] =useState()
    const [totalPrice,setTotalPrice] =useState()
    console.log(totalPrice,duration,data);
    useEffect(()=>{
        const getCarId = async ()=>{
        const jsonDataCar=await fetchCarId(baseUrl,id,user.token)
        setCar(jsonDataCar)
        }
        getCarId();
    },[baseUrl])

    useEffect(() => {
        if (data.datef && data.dated) {
            const startDate = new Date(data.dated);
            const endDate = new Date(data.datef);
            const differenceInMillis = endDate - startDate;
            const daysDifference = differenceInMillis / (1000 * 60 * 60 * 24); // Convert milliseconds to days
            setDuration(daysDifference);
        }
    }, [data.datef, data.dated]);
    
    // useEffect to calculate total price whenever duration changes
    useEffect(() => {
        // Assuming car rental rate is stored in car.ratePerDay
        if (car && car.prix) {
            const calculatedPrice = car.prix * duration;
            setTotalPrice(calculatedPrice);
        }
    }, [duration, car]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch(`${baseUrl}/reservecar/${id}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}` 
                },
                body: JSON.stringify({
                    date_debut: data.dated, 
                    date_fin: data.datef
                }),
            });
            
            if (response.ok) {
                const { url ,session_id } = await response.json();
                localStorage.setItem('reservation', JSON.stringify({
                    date_debut: data.dated, 
                    date_fin: data.datef,
                    session_id: session_id,
                    id: id
                }));
                window.location.replace(url);
            } else if(response.status === 401) {
                    localStorage.removeItem('user')
            }else{
                const error = await response.json();
                throw new Error(error.message || 'Failed to reserve car');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message); // Set error message state
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-20 mt-20 container">
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src={`/public/${car.image}`} className="img-fluid rounded-start" alt="loading.."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="text-lg mb-2 font-medium">{car.marque} {car.model && car.model.nom_model}</h5>
                        <p className="card-text mb-2 font-medium">Prix: {car.prix} DH/24hours</p>
                        <p className="card-text mb-2 font-medium">Duree: {duration} jours</p>
                        <p className="card-text mb-2 font-medium">Prix Total: <span className="text-lg font-medium">{totalPrice}DH </span></p>

                    </div>
                    <form onSubmit={handleSubmit} className="flex justify-end items-center mr-3 mt-4" method="POST">
                            {error && <div className="text-red-500">{error}</div>}
                            <span className="bg-cyan-300  hover:bg-cyan-400  mr-3 text-white text-center font-bold w-20 py-2 block  rounded"><Link to='/cars'>annuler</Link> </span>
                            
                            <button
                                disabled={isLoading}
                                type="submit"
                                className={`bg-cyan-300 hover:bg-cyan-400  text-white font-bold py-2 px-4 rounded ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                        {isLoading?"traiter...":"paiement en ligne"}
                    </button>
                </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

            // <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4" method="POST">
            //     {error && <div className="text-red-500">{error}</div>} {/* Render error message if error exists */}
            //     <button
            //         disabled={isLoading}
            //         type="submit"
            //         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            //             isLoading ? 'opacity-50 cursor-not-allowed' : ''
            //         }`}
            //     >
            //         Submit
            //     </button>
            // </form>