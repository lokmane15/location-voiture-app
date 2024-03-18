import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';

export default function Success() {
    const baseUrl = 'http://localhost:8000/api';
    const [error, setError] = useState(null); // State for storing error message
    const reservation = JSON.parse(localStorage.getItem('reservation'));
    const { user } = useAuthContext();

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
                    session_id: reservation.session_id,
                    date_debut: reservation.dated,
                    date_fin: reservation.datef,
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
        <div>
            <h1>Success</h1>
            {error && <div className="text-red-500">{error}</div>} {/* Render error message if error exists */}
        </div>
    );
}
