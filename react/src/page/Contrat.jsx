import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import useAuthContext from '../hooks/useAuthContext';
import ReactDOMServer from 'react-dom/server';

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

        return <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <h6 style={{ fontWeight: 'medium', fontSize: '1.125rem' }}>Location<span style={{ color: '#2DD4BF' }}>Voiture</span></h6>
        <h1 style={{ textAlign: 'center', fontSize: '1.875rem', marginTop: '1rem', marginBottom: '2rem', fontWeight: 'bold' }}>Car Rental Contract</h1>
    
        <div style={{ borderTop: '1px solid #CBD5E0', paddingTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Reservation Information:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ width: '50%', marginBottom: '0.75rem' }}>
                    <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
                    <p><strong>End Date:</strong> {formatDate(endDate)}</p>
                </div>
                <div style={{ width: '50%' }}>
                    <p><strong>Duration:</strong> {differenceInDays}</p>
                    <p><strong>Total Price:</strong> {totalPrice.toFixed(2)} DH</p>
                </div>
            </div>
        </div>
    
        <div style={{ borderTop: '1px solid #CBD5E0', paddingTop: '1.5rem', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '1rem' }}>User Information:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ width: '50%', marginBottom: '0.75rem' }}>
                    <p><strong>Name:</strong> {contract.user.nom} {contract.user.prenom}</p>
                    <p><strong>CIN:</strong> {contract.user.num_cin}</p>
                </div>
                <div style={{ width: '50%' }}>
                    <p><strong>Address:</strong> {contract.user.adresse}</p>
                    <p><strong>Phone:</strong> {contract.user.num_tel}</p>
                    <p><strong>Email:</strong> {contract.user.email}</p>
                </div>
            </div>
        </div>
    
        <div style={{ borderTop: '1px solid #CBD5E0', paddingTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Car Information:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ width: '50%', marginBottom: '0.75rem' }}>
                    <p><strong>Matricule:</strong> {contract.car.num_matricule}</p>
                    <p><strong>Kilomitrage:</strong> {contract.car.kilomitrage}</p>
                    <p><strong>Year:</strong> {contract.car.annee}</p>
                </div>
                <div style={{ width: '50%' }}>
                    <p><strong>Color:</strong> {contract.car.couleur}</p>
                    <p><strong>Price per day:</strong> {contract.car.prix}</p>
                    <p><strong>Brand:</strong> {contract.car.marque}</p>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img src="../../public/signteur.png" style={{ width: '100px' }} alt="signteur" />
        </div>
    </div>
    
    };



    const openContractInNewTab = (contract) => {
        const contractHtml = ReactDOMServer.renderToString(generateContractHTML(contract));
        const newWindow = window.open('', '_blank');
        newWindow.document.write(contractHtml);
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
        <div style={{minHeight:"70vh"}} className="container mx-auto mt-40">
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
