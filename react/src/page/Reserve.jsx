import { useParams, Link, useNavigate  } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { useDataContext } from "../Context/DataContext";

export default function Reserve() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [dated, setDateD] = useState("");
    const [datef, setDateF] = useState("");
    const [car, setCar] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const { data,setData } = useDataContext();
    const navigate=useNavigate()
    console.log(car);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/car/${id}`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });

            if (response.ok) {
                const json = await response.json();
                setCar(json);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, id]);

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setData({dated: dated,datef: datef,id_car:car.id});
        navigate(`/payment/${id}`);
        console.log(data);
    };
    useEffect(() => {
        console.log(data);
    }, [data]);
    
    
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="container mx-auto px-4 py-8 mt-20">
            <form className="max-w-lg mx-auto" onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                    <input 
                        type="text" 
                        value={user.user.nom} 
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                    <input 
                        type="text" 
                        value={user.user.prenom} 
                        className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Voiture</label>
                    <input 
                        type="text" 
                        value={car.marque} 
                        className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date de début</label>
                    <input 
                        type="datetime-local" 
                        onChange={e => setDateD(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date de fin</label>
                    <input 
                        type="datetime-local" 
                        onChange={e => setDateF(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button 
                        className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                    >
                        Réserver
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}
