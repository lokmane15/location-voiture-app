import { useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function CarDetails() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [data, setData] = useState({});
    const baseUrl = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${baseUrl}/car/${id}`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });

            if (response.ok) {
                const json = await response.json();
                setData(json);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, id]);
    console.log(data.image);
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mt-20">
                <img src={data.image} alt="" className="w-60 h-auto mr-4" />
                <div>
                    <h1 className="text-2xl font-bold mb-2">{data.marque} {data.model && data.model.nom_model}</h1>
                    <p className="mb-2">Kilomitrage: {data.kilomitrage}</p>
                    <p className="mb-2">Annee: {data.annee}</p>
                    <p className="mb-2">Type carburant: {data.model && data.model.type_curburant}</p>
                    <p className="mb-2">{`GPS: ${data.model && data.model.gps === 0 ? "ne pas disponible" : "disponible"}`}</p>
                    <p className="mb-2">Capacite assises: {data.model && data.model.capacite_assises}</p>
                </div>
            </div>
        </div>
    );
}
