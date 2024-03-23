import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchCars from '../services/FetchCars';

export default function Cars() {
    const baseUrl = 'http://127.0.0.1:8000/api';

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [marques, setMarques] = useState([]);
    const [prix, setPrix] = useState([]);
    const [couleurs, setCouleurs] = useState([]);
    const [marqueFilter, setMarqueFilter] = useState('');
    const [prixFilter, setPrixFilter] = useState('');
    const [couleurFilter, setCouleurFilter] = useState('');
    const [marqueUrl, setMarqueUrl] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(2);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await fetchCars(baseUrl);
                setData(jsonData);
                setFilteredData(jsonData);

                const uniqueMarques = Array.from(new Set(jsonData.map(item => item.marque)));
                const uniquePrix = Array.from(new Set(jsonData.map(item => parseFloat(item.prix))));
                const uniqueCouleurs = Array.from(new Set(jsonData.map(item => item.couleur)));

                setMarques(uniqueMarques);
                setPrix(uniquePrix);
                setCouleurs(uniqueCouleurs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const variable = params.get('marque');
        if (variable) {
            setMarqueUrl(variable);
        } else {
            setMarqueUrl('');
        }
    }, []);

    useEffect(() => {
        filterData();
    }, [marqueUrl, marqueFilter, prixFilter, couleurFilter, currentPage]);

    const filterData = () => {
        let filtered = [...data]; // Start with the entire dataset

        if (marqueFilter) {
            filtered = filtered.filter(car => car.marque === marqueFilter);
        }

        if (prixFilter) {
            filtered = filtered.filter(car => parseFloat(car.prix) <= parseFloat(prixFilter));
        }

        if (couleurFilter) {
            filtered = filtered.filter(car => car.couleur === couleurFilter);
        }

        if (marqueUrl) {
            filtered = filtered.filter(car => car.marque === marqueUrl);
        }

        // Update filteredData with filtered results
        setFilteredData(filtered);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate pagination
    const indexOfLastCar = currentPage * dataPerPage;
    const indexOfFirstCar = indexOfLastCar - dataPerPage;
    const currentCars = filteredData.slice(indexOfFirstCar, indexOfLastCar);

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / dataPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{minHeight:"70vh"}} className="container mx-auto mt-20">
            <div className="flex mb-4">
            <select onChange={(e) => setMarqueFilter(e.target.value)} value={marqueFilter} className="text-neutral-500 m-2 p-2 border-solid border-2 rounded border-gray-300">
                    <option value="">Filtrer par Marque</option>
                    {marques.map(marque => (
                        <option key={marque} value={marque}>{marque}</option>
                    ))}
                </select>

                <select onChange={(e) => setPrixFilter(e.target.value)} value={prixFilter} className="text-neutral-500 m-2 p-2 border-solid border-2 rounded border-gray-300">
                    <option value="">Filtrer par Prix</option>
                    {prix.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <select onChange={(e) => setCouleurFilter(e.target.value)} value={couleurFilter} className="text-neutral-500 m-2 p-2 border-solid border-2 rounded border-gray-300">
                    <option value="">Filtrer par Couleur</option>
                    {couleurs.map(couleur => (
                        <option key={couleur} value={couleur}>{couleur}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-2">
                {currentCars.length > 0 ? (
                    currentCars.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                            <Link to={`/carDetails/${item.id}`}>
                                <div>
                                    <img src={item.image} alt="Car" className="mb-2" />
                                    <h1 className="text-xl font-bold mb-2">{item.marque} {item.model.nom_model}</h1>
                                    <p className="text-gray-700">Num Matricule: {item.num_matricule}</p>
                                    <p className="text-gray-700">Prix: {item.prix}DH/Jour</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Aucune voiture ne correspond aux filtres sélectionnés.</p>
                )}

                {/* Pagination */}
            </div>
                <nav className='flex justify-center'>
                    <ul className="pagination">
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
        </div>
    );
}
