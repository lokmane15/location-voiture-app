import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import {Link} from 'react-router-dom'
export default function Success() {
    const baseUrl = 'http://localhost:8000/api';
    const [error, setError] = useState(null); // State for storing error message
    const reservation = JSON.parse(localStorage.getItem('reservation'));
    const { user } = useAuthContext();
    console.log(reservation);
    useEffect(() => {
        if (reservation && user && user.token) { // Check if user and token exist
            completeReservation();
        }
    }, [reservation, user]);

    const completeReservation = async () => {
        try {
            const response = await fetch(`${baseUrl}/reservation/success/${reservation.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    date_debut: reservation.date_debut,
                    date_fin: reservation.date_fin,
                    session_id: reservation.session_id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to complete reservation');
            }

            // Reservation completed successfully, you can handle further actions if needed
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message); // Set error message state
        }
    };

    return (
        <div className='p-40'>
            <div className="card bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 p-10">
            <IoCheckmarkDoneCircle style={{color:"green",fontSize:"45px",marginBottom:"15px"}} className='' />
                <h1 style={{color:"green"}} className="text-xl font-bold  mb-2">Payment successful</h1>
                <p className="text-gray-600">Congratulations! Your reservation has been successfuly confirmed</p>
                <button style={{backgroundColor:"green",width:"20%"}} className=" text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline" ><Link to='/contrat'>see your contract</Link> </button>
            </div>
        </div>
    );
}
