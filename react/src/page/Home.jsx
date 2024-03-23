import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchMarque from "../services/FetchMarque";
import fetchCars from "../services/FetchCars";

function Home() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [marque, setMarque] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonDataMarque = await fetchMarque(baseUrl);
      setMarque(jsonDataMarque);

      const jsonDataCars = await fetchCars(baseUrl);
      setCars(jsonDataCars);
    };

    fetchData();
  }, [baseUrl]);

  return (
    <>
    <main className="bg-center bg-sky-600">
      <div className="container mx-auto p-20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="mb-3">Car Rental</h1>
            <p className="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquid odit perspiciatis corporis eveniet porro voluptas commodi perferendis officia maxime, nulla laborum ea optio molestiae dolor possimus officiis ratione est.</p>
            <button className="bg-cyan-400"><Link to="/cars">Explore More</Link></button>
          </div>
          <div className="md:w-1/2">
            <img src="../../public/bro-takes-photos-fKNPmWPtESI-unsplash-removebg-preview.png" alt="" />
          </div>
        </div>
      </div>
    </main>
      <div className="container mx-auto mt-5">
        <Link className="flex p-3 font-normal text-cyan-400 justify-end" to="/cars">Voir Plus</Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cars.slice(0, 3).map((car, index) => (
            <div key={index} className="bg-white p-4 rounded-md my-1 flex flex-col justify-between">
              <Link to={`/carDetails/${car.id}`}>
                <div>
                  <img src={car.image} alt="Car" className="mb-2" />
                  <h1 className="text-xl font-bold mb-2">{car.marque} {car.model.nom_model}</h1>
                  <p className="text-gray-700">Prix: {car.prix}DH/Jour</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </>

  );
}

export default Home;
