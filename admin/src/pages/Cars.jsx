import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCars, fetchDeleteCar } from "../api/Cars";
import { MdLibraryAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Cars() {
  // Initialize hooks at the top level
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  const deleteMutation = useMutation({
    mutationFn: fetchDeleteCar,
    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries(["cars"]);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error loading data</div>;

  return (
    <>
      <button className="px-3 py-2 text-white flex bg-blue-500 rounded-md mb-5">
        <MdLibraryAdd className="mt-1" />
        <Link to="/addcar">
          <span className="ml-2">Add new Car</span>
        </Link>
      </button>
      <div className="bg-white-100 px-4 pb-4 rounded-sm border border-gray-200">
        <strong className="text-gray-700 font-medium">Car list</strong>
        <div className="mt-3">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marque Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matricule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type Carburant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {query.data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                    #{item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.marque + " " + item.model.nom_model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.num_matricule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.annee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.couleur}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {item.model.type_carburant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-white bg-blue-600 p-2 rounded-md">
                      <Link to={`/updatecar/${item.id}`}>
                        <GrUpdate />
                      </Link>
                    </button>
                    <button
                      className="ml-4 text-white bg-red-600 p-2 rounded-md"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
