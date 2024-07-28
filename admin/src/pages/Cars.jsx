import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/Cars";
import { CiCircleRemove } from "react-icons/ci";
import { RxUpdate } from "react-icons/rx";

export default function Cars() {
    const query = useQuery({ queryKey: ['cars'], queryFn: fetchCars });

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Error loading data</div>;

return (
    <div className="mbr-white px-4 pb-3 rounded-sm border border-gray-200 flex-1">
    <span className="text-gray-700 font-medium">Car List</span>
    <div className="mt-3">
        <table className="w-full text-gray-700 ">
        <thead>
            <tr>
            <th className="">id</th>
            <th className="">Marque Name</th>
            <th className="">Matricule</th>
            <th className="">Year</th>
            <th className="">Color</th>
            <th className="">Type Carburant</th>
            <th className="">action</th>
            </tr>
        </thead>
        <tbody>
            {query.data.map(item => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="">#{item.id}</td>
                <td className="">{item.marque + " " + item.model.nom_model}</td>
                <td className="">{item.num_matricule}</td>
                <td className="">{item.annee}</td>
                <td className="">{item.couleur}</td>
                <td className="">{item.model.type_carburant}</td>
                <td><button><RxUpdate /></button></td>
                <td><button><CiCircleRemove /></button></td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
    );
}
