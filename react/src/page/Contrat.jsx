import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import useAuthContext from '../hooks/useAuthContext';

const Contrat = () => {
    const baseUrl = 'http://localhost:8000/api';
    const [data, setData] = useState([]);
    const { user } = useAuthContext();
    console.log(data);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/getContrat`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                }else if(response.status === 401) {
                    localStorage.removeItem('user')
                    location.reload()
                }else{
                    console.error('Failed to fetch contract data');
                }
            } catch (error) {
                console.error('Error fetching contract data:', error);
            }
        };

        fetchData();
    }, [baseUrl, user.token]);

    const generateContractHTML = (contract) => {
        // Calculate the duration in days between date_debut and date_fin
        const startDate = new Date(contract.reservation.date_debut);
        const endDate = new Date(contract.reservation.date_fin);
        const differenceInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round up
        const totalPrice = differenceInDays * contract.car.prix; // Total price based on duration and car price

        return `
        <div style="padding: 20px; border: 1px solid #ccc; background-color: #f9f9f9;">
            <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Car Rental Contract</h1>
            <h2 style="font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 10px;">Reservation Information:</h2>
            <p><strong>Start Date:</strong> ${formatDate(startDate)}</p>
            <p><strong>End Date:</strong> ${formatDate(endDate)}</p>
            <p><strong>Duration:</strong> ${differenceInDays} days</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)} DH</p>
            <!-- User Information -->
            <h2 style="font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 10px;">User Information:</h2>
            <p><strong>Name:</strong> ${contract.user.nom} ${contract.user.prenom}</p>
            <p><strong>CIN:</strong> ${contract.user.num_cin}</p>
            <p><strong>Address:</strong> ${contract.user.adresse}</p>
            <p><strong>Phone:</strong> ${contract.user.num_tel}</p>
            <p><strong>Email:</strong> ${contract.user.email}</p>
            <!-- Car Information -->
            <h2 style="font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 10px;">Car Information:</h2>
            <p><strong>Matricule:</strong> ${contract.car.num_matricule}</p>
            <p><strong>Kilomitrage:</strong> ${contract.car.kilomitrage}</p>
            <p><strong>Year:</strong> ${contract.car.annee}</p>
            <p><strong>Color:</strong> ${contract.car.couleur}</p>
            <p><strong>Price per day:</strong> ${contract.car.prix}</p>
            <p><strong>Brand:</strong> ${contract.car.marque}</p>
        </div>
        `;
    };

    const openContractInNewTab = (contract) => {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(generateContractHTML(contract));
    };

    const downloadContractAsPDF = (contract) => {
        const contractHtml = generateContractHTML(contract);
        html2pdf().from(contractHtml).save('contract.pdf');
    };

    // Function to format date in 'YYYY-MM-DD' format
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container mx-auto mt-40">
            {data.map((contract, index) => (
                <div key={index} className="mb-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => openContractInNewTab(contract)}>View Contract {index + 1}</button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => downloadContractAsPDF(contract)}>Download Contract {index + 1} as PDF</button>
                </div>
            ))}
        </div>
    );
};

export default Contrat;
