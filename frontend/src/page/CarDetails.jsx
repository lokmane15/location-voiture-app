import { useParams, Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { FaRoad } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdGpsFixed } from "react-icons/md";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchCarId } from "../services/api";
export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const baseImageUrl = import.meta.env.VITE_API_URL_IMAGE;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarId(id, user.token),
  });

  if (isError) {
    return (
      <p>There was an error loading the car details. Please try again later.</p>
    );
  }

  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <Link to="/cars" className="p-4">
          &larr; <span>Back</span>
        </Link>
      </div>

      <div className="container car-details flex justify-center  mt-20 mb-20">
        <div className="card mb-3" style={{ width: "30rem" }}>
          {isLoading ? (
            <Skeleton height={200} />
          ) : (
            <img
              src={`${baseImageUrl}/storage/${data.image}`}
              className="card-img-top img-fluid"
              alt="image"
            />
          )}

          <div className="card-body">
            {isLoading ? (
              <Skeleton width={300} />
            ) : (
              <h3
                style={{ textTransform: "uppercase" }}
                className="text-2xl font-medium mb-3"
              >
                {data.marque} {data.model && data.model.nom_model}
              </h3>
            )}
            {isLoading ? (
              <Skeleton width={200} count={6} />
            ) : (
              <>
                <p className="card-text mb-1 font-medium">
                  <MdPriceChange className="size-6 inline mr-3" /> Price by day:{" "}
                  {data.prix} DH
                </p>
                <p className="card-text mb-1 font-medium">
                  {" "}
                  <FaRoad className="size-6 inline mr-3" /> Mileage:{" "}
                  {data.kilomitrage} km
                </p>
                <p className="card-text mb-1 font-medium">
                  <IoCalendarClear className="size-6 inline mr-3" />
                  year: {data.annee}
                </p>
                <p className="card-text mb-1 font-medium">
                  {" "}
                  <BsFillFuelPumpFill className="size-6 inline mr-3" /> fuel
                  type: {data.model && data.model.type_carburant}
                </p>
                <p className="card-text mb-1 font-medium">
                  <MdGpsFixed className="size-6 inline mr-3" /> GPS:{" "}
                  {data.model && data.model.gps === 0
                    ? "Non disponible"
                    : "Disponible"}
                </p>
                <p className="card-text mb-1 font-medium">
                  {" "}
                  <MdOutlineReduceCapacity className="size-6 inline mr-3" />{" "}
                  Seating capacity: {data.model && data.model.capacite_assises}
                </p>
              </>
            )}
            {isLoading ? (
              <Skeleton width={100} height={30} />
            ) : (
              <button className="mt-3  bg-cyan-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-500">
                <Link to={`/reserve/${data.id}`}>Reserve</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
