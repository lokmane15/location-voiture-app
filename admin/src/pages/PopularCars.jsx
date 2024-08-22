import { useQuery } from "@tanstack/react-query";
import { getCarsNotDisponible } from "../api/Cars";

export default function PopularCars() {
  const { data: cars } = useQuery({
    queryKey: ["cars"],
    queryFn: getCarsNotDisponible,
  });
  console.log(cars);

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium ">Popular cars</strong>
      <hr className="mt-2" />
      <div className="mt-4 flex flex-col gap-3">
        {cars?.slice(0, 6).map((car) => (
          <div className="flex items-start hover:no-underline" key={car.id}>
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-md"
                src={`http://localhost:8000/storage/${car.image}`}
                alt=""
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{`${car.marque} ${car.model?.nom_model}`}</p>
            </div>
            <div className="text-xs text-gray-400 pl-1.5">{car.prix} DH</div>
          </div>
        ))}
      </div>
    </div>
  );
}
