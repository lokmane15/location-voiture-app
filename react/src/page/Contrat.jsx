import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import html2pdf from 'html2pdf.js';
import useAuthContext from '../hooks/useAuthContext';
import ReactDOMServer from 'react-dom/server';
import ReactLoading from 'react-loading';
import { FaCarSide } from "react-icons/fa";

const Contrat = () => {
    const baseUrl = 'http://localhost:8000/api';
    const [data, setData] = useState([]);
    const { user } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);
    const [isLoading,setIsLoading]=useState(true)

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
                    setIsLoading(false)
                } else if(response.status === 401) {
                    localStorage.removeItem('user')
                    location.reload()
                } else {
                    console.error('Failed to fetch contract data');
                }
            } catch (error) {
                console.error('Error fetching contract data:', error);
                setIsLoading(false)
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

        return (
            <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#F7FAFC', padding: '20px', maxWidth: '800px', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h6 className="text-2xl">Car<span className="text-cyan-400">Rental</span><FaCarSide className="inline ml-1 text-2xl" /></h6>
                <h1 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '20px', color: '#2D3748' }}>Car Rental Contract</h1>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px', color: '#4A5568' }}>Reservation Information:</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
                        <p><strong>End Date:</strong> {formatDate(endDate)}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p><strong>Duration:</strong> {differenceInDays} Days</p>
                        <p><strong>Total Price:</strong> {totalPrice.toFixed(2)} DH</p>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px', color: '#4A5568' }}>User Information:</h2>
                    <p><strong>Name:</strong> {contract.user.nom} {contract.user.prenom}</p>
                    <p><strong>CIN:</strong> {contract.user.num_cin}</p>
                    <p><strong>Address:</strong> {contract.user.adresse}</p>
                    <p><strong>Phone:</strong> {contract.user.num_tel}</p>
                    <p><strong>Email:</strong> {contract.user.email}</p>
                </div>
                <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '10px', color: '#4A5568' }}>Car Information:</h2>
                    <p><strong>Matricule:</strong> {contract.car.num_matricule}</p>
                    <p><strong>Kilomitrage:</strong> {contract.car.kilomitrage}</p>
                    <p><strong>Year:</strong> {contract.car.annee}</p>
                    <p><strong>Color:</strong> {contract.car.couleur}</p>
                    <p><strong>Price per day:</strong> {contract.car.prix} DH</p>
                    <p><strong>Brand:</strong> {contract.car.marque}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <img src="../../public/signteur.png" style={{ width: '100px', marginRight: '20px' }} alt="signature" />
                </div>
            </div>


        );
    };

    const openContractInModal = (contract) => {
        setSelectedContract(contract);
        setIsModalOpen(true);
    };
    
    const downloadContractAsPDF = (contract) => {
        const contractHtml = ReactDOMServer.renderToString(generateContractHTML(contract));
        html2pdf().from(contractHtml).save('contract.pdf', () => {
            console.log('PDF generated successfully');
        });
    };
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div style={{minHeight:"70vh"}} className="container mx-auto mt-40">
            {isLoading ? (
                <div className='flex justify-center items-center'>
                <ReactLoading  type={'spin'} color={'#000'} height={'3rem'} width={'3rem'} />
                </div>
            ):data.length > 0 ? data.map((contract, index) => (
                <div key={index} className="mb-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => openContractInModal(contract)}>View Contract {index + 1}</button>
                    <button className="bg-green-500 hover:bg-green-700 text-white mt-3 font-bold py-2 px-4 rounded" onClick={() => downloadContractAsPDF(contract)}>Download Contract {index + 1} as PDF</button>
                    </div>
            )):(
                <h1 className="p-40 text-center text-2xl ">You haven&apos;t made any reservations yet :(</h1>
            )}
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: {
                        width: '60%',
                        height: '80%',
                        margin: 'auto'
                    }
                }}
            >
                {selectedContract && generateContractHTML(selectedContract)}
            </Modal>
        </div>
    );
};

export default Contrat;
