// Payment.js

import { useState } from "react";
import { useDataContext } from "../Context/DataContext";
import { useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function Payment() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State for storing error message
    const { data } = useDataContext();
    const baseUrl = 'http://localhost:8000/api';
    const { id } = useParams();
    const { user } = useAuthContext();
    // const [car, setCar] = useState("");
    // console.log(car);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://127.0.0.1:8000/api/car/${id}`, {
    //             headers: { "Authorization": `Bearer ${user.token}` }
    //         });

    //         if (response.ok) {
    //             const json = await response.json();
    //             setCar(json);
    //         }
    //     };

    //     if (user) {
    //         fetchData();
    //     }
    // }, [user, id]);



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
                    session_id: session_id,
                    date_debut: data.dated, 
                    date_fin: data.datef,
                    id: id
                }));
                window.location.replace(url);
            } else {
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
        <div className="pt-20 mt-20">
            <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4" method="POST">
                {error && <div className="text-red-500">{error}</div>} {/* Render error message if error exists */}
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
