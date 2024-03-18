import  { useEffect, useState } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {Link} from "react-router-dom"
export default function Cars() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [marques, setMarques] = useState([]);
    const [prix, setPrix] = useState([]);
    const [couleurs, setCouleurs] = useState([]);
    const [marqueFilter, setMarqueFilter] = useState('');
    const [prixFilter, setPrixFilter] = useState('');
    const [couleurFilter, setCouleurFilter] = useState('');
    const { user } = useAuthContext();
    const baseUrl = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/carsDispo`, {
                    headers: { "Authorization": `Bearer ${user.token}` }
                });
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                    setFilteredData(jsonData);

                    // Extract unique values for marque, prix, and couleur
                    const uniqueMarques = Array.from(new Set(jsonData.map(item => item.marque)));
                    const uniquePrix = Array.from(new Set(jsonData.map(item => item.prix)));
                    const uniqueCouleurs = Array.from(new Set(jsonData.map(item => item.couleur)));

                    setMarques(uniqueMarques);
                    setPrix(uniquePrix);
                    setCouleurs(uniqueCouleurs);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (user) {
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        filterData();
    }, [marqueFilter, prixFilter, couleurFilter]);

    const filterData = () => {
        let filtered = data;
        if (marqueFilter) {
            filtered = filtered.filter(car => car.marque === marqueFilter);
        }
        if (prixFilter) {
            filtered = filtered.filter(car => car.prix <= prixFilter);
        }
        if (couleurFilter) {
            filtered = filtered.filter(car => car.couleur === couleurFilter);
        }
        setFilteredData(filtered);
    };

    return (
        <div className="container mx-auto mt-20">
            <div className="flex  mb-4">
                <select onChange={(e) => setMarqueFilter(e.target.value)} value={marqueFilter} className="text-neutral-500 m-2 p-2 border-solid border-2 rounded  border-gray-300">
                    <option value="">Filtrer par Marque</option>
                    {marques.map(marque => (
                        <option key={marque} value={marque}>{marque}</option>
                    ))}
                </select>

                <select onChange={(e) => setPrixFilter(e.target.value)} value={prixFilter} className="text-neutral-500 m-2 p-2 border-solid border-2 rounded  border-gray-300">
                    <option value="">Filtrer par Prix</option>
                    {prix.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>

                <select onChange={(e) => setCouleurFilter(e.target.value)} value={couleurFilter} className="text-neutral-500 m-2 p-2 border-solid border-2 rounded  border-gray-300">
                    <option value="">Filtrer par Couleur</option>
                    {couleurs.map(couleur => (
                        <option key={couleur} value={couleur}>{couleur}</option>
                    ))}
                </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-2">
                {filteredData.length > 0 ? filteredData.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                        <Link to={`/carDetails/${item.id}`}>
                            <div>
                                <img  src={item.image} alt="Car" className="mb-2 " />
                                <h1 className="text-xl font-bold mb-2">{item.marque} {item.model.nom_model}</h1>
                                <p className="text-gray-700">Num Matricule: {item.num_matricule}</p>
                                <p className="text-gray-700">Prix: {item.prix}</p>
                                <p className="text-gray-700">Couleur: {item.couleur}</p>
                            </div>
                        
                        </Link>
                    </div>
                )):<p>no item found</p>}
            </div>
        </div>
    );
}
