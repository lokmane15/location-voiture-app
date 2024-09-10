import { MdLibraryAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMarque, fetchMarque } from "../api/Cars";
import ReactLoading from "react-loading";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";

export default function Marque() {
  const queryClient = useQueryClient();
  const { admin } = useAuth();
  const query = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchMarque(admin),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteMarque(id, admin),
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
  });

  const handledelete = (id) => {
    deleteMutation.mutate(id);
  };

  // if (query.isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <ReactLoading type={"spin"} color={"black"} height={50} width={50} />
  //     </div>
  //   );

  // if (query.isError) return <div>Error loading data</div>;
  return (
    <div>
      <button className="px-3 py-2 text-white flex bg-blue-500 rounded-md mb-5">
        <MdLibraryAdd className="mt-1" />
        <Link to="/addmarque">
          <span className="ml-2">Add new Marque</span>
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
                  nom_marque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  image path
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {query.isLoading
                ? Array(5)
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
                        <td className="px-6 py-4 flex justify-around whitespace-nowrap text-sm text-gray-500">
                          <Skeleton width={30} height={30} />
                          <Skeleton width={30} height={30} />
                        </td>
                      </tr>
                    ))
                : query.data &&
                  query.data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.nom_marque}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.image_path}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-white bg-blue-600 p-2 rounded-md">
                          <Link to={`/updatemarque/${item.id}`}>
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
