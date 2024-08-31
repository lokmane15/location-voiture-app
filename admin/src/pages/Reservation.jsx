import { fetchReservation, fetchSingleCar, fetchSingleUser } from "../api/Cars";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "react-modal";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import ReactLoading from "react-loading";

export default function Reservation() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [car, setCar] = useState();
  const [user, setUser] = useState();
  const { data: reservation, isLoading } = useQuery({
    queryKey: ["reservation"],
    queryFn: fetchReservation,
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const carInfo = async (id) => {
    const carData = await fetchSingleCar(id);
    setUser("");
    setCar(carData);
    setIsModelOpen(true);
  };
  const handleUserModel = async (id) => {
    const carData = await fetchSingleUser(id);
    setCar("");
    setUser(carData);
    setIsModelOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading type={"spin"} color={"black"} height={50} width={50} />
      </div>
    );
  }
  const generateCarHtml = (car) => {
    return (
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex">
        <div className="img flex items-center justify-center bg-gray-200 w-40 h-40 overflow-hidden">
          <img
            src={`http://127.0.0.1:8000/storage/${car.image}`}
            alt=""
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="p-4">
          <h4 className="text-blue-500 text-lg font-bold">
            {car.marque + " " + car.model.nom_model}
          </h4>
          <p className="text-gray-600">Matricule: {car.num_matricule}</p>
          <p className="text-gray-600">Year: {car.annee}</p>
          <p className="text-gray-600">Color: {car.couleur}</p>
        </div>
      </div>
    );
  };

  const generateUserHtml = (user) => {
    return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex">
        <div className="img flex items-center justify-center bg-gray-200 w-40 h-40 overflow-hidden">
          <img
            src="http://127.0.0.1:8000/storage/user/download.jfif"
            alt=""
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="p-4 flex-1">
          <h4 className="text-blue-500 text-lg font-bold">
            {user.nom + " " + user.prenom}
          </h4>
          <div className="flex items-center text-gray-600 mt-2">
            <MdOutlineMailOutline className="mr-2" />
            <p>{user.email}</p>
          </div>
          <div className="flex items-center text-gray-600 mt-2">
            <FaPhoneAlt className="mr-2" />
            <p>{user.num_tel}</p>
          </div>
        </div>
      </div>
    );
  };
  console.log(reservation);

  return (
    <>
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
                  data start
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  date end
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  user_id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  car_id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  total price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  brand
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservation &&
                reservation.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-300">
                      #{item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.date_debut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(item.date_fin)}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 cursor-pointer"
                      onClick={() => handleUserModel(item.user_id)}
                    >
                      #{item.user_id}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-blue-300 cursor-pointer"
                      onClick={() => carInfo(item.car_id)}
                    >
                      #{item.car_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.prix_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
                      {item.marque}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModelOpen}
        onRequestClose={() => setIsModelOpen(false)}
        style={{
          content: {
            width: "40%",
            height: "30%",
            margin: "auto",
          },
        }}
      >
        {car && generateCarHtml(car)}
        {user && generateUserHtml(user)}
      </Modal>
    </>
  );
}
