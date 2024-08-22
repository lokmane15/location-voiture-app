import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "../api/Cars";

export default function RandomCars() {
  const { data: cars, isloading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });
  if (isloading) return "loading...";
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand Name</th>
              <th>Matricule</th>
              <th>Year</th>
              <th>Color</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {cars.slice(0, 6).map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                  #{car.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.marque}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.num_matricule}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.annee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.couleur}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {car.etat == 1 ? (
                    <p className="text-green-600 text-xs rounded-md px-2 py-1 capitalize bg-green-100">
                      availible
                    </p>
                  ) : (
                    <p className="text-red-600 text-xs rounded-md px-2 py-1 capitalize bg-red-100">
                      reserved
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
