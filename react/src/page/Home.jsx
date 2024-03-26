import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchMarque from "../services/FetchMarque";
import fetchCars from "../services/FetchCars";
import { MdPriceChange } from "react-icons/md";
function Home() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [marque, setMarque] = useState([]);
  const [cars, setCars] = useState([]);
  console.log(marque);
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
      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-5">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Car Rental</h1>
            <p className="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aliquid odit perspiciatis corporis eveniet porro voluptas commodi perferendis officia maxime, nulla laborum ea optio molestiae dolor possimus officiis ratione est.</p>
            <button className="bg-cyan-400"><Link to="/cars">Explore More</Link></button>
          </div>
          <div className="md:w-1/2 p-5">
            <img src="../../public/bro-takes-photos-fKNPmWPtESI-unsplash-removebg-preview.png" alt="" />
          </div>
        </div>
      </div>
    </main>

      <div className="container mx-auto mt-5">
        <div className="flex justify-between mb-4">
        <h1 className=" font-weight-bold text-2xl font-semibold">Explore Cars picked for you</h1>
          <Link className=" font-normal text-cyan-400 " to="/cars">See More</Link>
        </div>
        <div className="row">
  {cars.slice(0, 6).map((car, index) => (
    <div key={index} className="col-md-4">
      <div className="card mb-4 box-shadow" >
        <Link to={`/carDetails/${car.id}`} className="text-decoration-none">
          <img className="card-img-top" src={car.image}alt="Car" />
          <div className="card-body">
            <h1 className="card-title">{car.marque} {car.model.nom_model}</h1>
            <p className="card-text text-gray-700">
              <MdPriceChange className="size-6 inline mr-3" /> Prix: {car.prix} DH/Jour
            </p>
          </div>
        </Link>
        {/* Effet de survol */}
        <div className="card-hover-overlay">
          <Link to={`/carDetails/${car.id}`} className="text-decoration-none">
            <div className="overlay-content">
              <p className="text-white font-weight-bold">Détails</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
      {/* marque */}
      <div className="container">
      <div className="row">
        <h1 className=" font-weight-bold text-2xl font-semibold mb-3">All Brands</h1>
        {marque.map(item => (
          <div key={item.id} className="col-md-2 col-sm-6 mb-4">
            <Link to={`/cars?marque=${item.nom_marque}`}>
            <div className="card" style={{width:"12rem", height: "10rem"}}>
              <img src={item.image_path} style={{objectFit: "cover"}} className="" alt={item.nom_marque} />
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
