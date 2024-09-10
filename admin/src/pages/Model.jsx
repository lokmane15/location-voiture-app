import { MdLibraryAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteModel, fetchModel } from "../api/Cars";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";

export default function Model() {
  const queryClient = useQueryClient();
  const { admin } = useAuth();
  const { data: model, isLoading } = useQuery({
    queryKey: ["model"],
    queryFn: () => fetchModel(admin),
  });
  const DeleteModelMutation = useMutation({
    mutationFn: (id) => DeleteModel(id, admin),
    onSuccess: () => {
      queryClient.invalidateQueries(["model"]);
    },
  });

  const handledelete = (id) => {
    DeleteModelMutation.mutate(id);
  };

  return (
    <div>
      <button className="px-3 py-2 text-white flex bg-blue-500 rounded-md mb-5">
        <MdLibraryAdd className="mt-1" />
        <Link to="/addmodel">
          <span className="ml-2">Add new Model</span>
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
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  type_carburant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  gps
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  capacite assises
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading
                ? Array(10)
                    .fill()
                    .map((_, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                          <Skeleton />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Skeleton />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          <Skeleton />
                        </td>
                        <td className="px-6 py-4 flex justify-around whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={30} height={30} />
                          <Skeleton width={30} height={30} />
                        </td>
                      </tr>
                    ))
                : model &&
                  model.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.nom_model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.type_carburant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.gps}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                        {item.capacite_assises}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-white bg-blue-600 p-2 rounded-md">
                          <Link to={`/updatemodel/${item.id}`}>
                            <GrUpdate />
                          </Link>
                        </button>
                        <button
                          className="ml-4 text-white bg-red-600 p-2 rounded-md"
                          onClick={() => handledelete(item.id)}
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
    </div>
  );
}
