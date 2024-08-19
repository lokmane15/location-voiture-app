import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "../api/Cars";
import { Link } from "react-router-dom";
import { MdLibraryAdd, MdDelete } from "react-icons/md";

export default function Users() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Ensure this matches your query key
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error loading data</div>;

  return (
    <div>
      {/* <button className="px-3 py-2 text-white flex bg-blue-500 rounded-md mb-5">
        <MdLibraryAdd className="mt-1" />
        <Link to="/addUser">
          <span className="ml-2">Add new User</span>
        </Link>
      </button> */}
      <div className="bg-white-100 px-4 pb-4 rounded-sm border border-gray-200">
        <strong className="text-gray-700 font-medium">User list</strong>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CIN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created at
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
                    {item.num_cin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.nom + " " + item.prenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {item.adresse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
    </div>
  );
}
