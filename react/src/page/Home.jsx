import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import fetchMarque from "../services/FetchMarque";
import fetchCars from "../services/FetchCars";
// import useAuthContext from '../hooks/useAuthContext';
function Home() {

  const baseUrl = 'http://127.0.0.1:8000/api';
  const [marque,setMarque]=useState([]);
  const [cars,setCars]=useState([]);
  console.log(marque);
    useEffect(()=>{
      const fetchDataMarque = async ()=>{
        const jsonData=await fetchMarque(baseUrl)
        setMarque(jsonData)
      }
      fetchDataMarque();
        const getCars = async ()=>{
        const jsonDataCar=await fetchCars(baseUrl)
        setCars(jsonDataCar)
      }
      getCars();
    },[baseUrl])
    console.log(marque)
  return (
    <>
      <main className=" bg-center bg-sky-600">
        <div className="row p-20">
          <div className="col-lg-6 mt-20">
            <h1 className="mb-3">car rental</h1>
            <p className="mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente aliquid odit perspiciatis corporis eveniet porro voluptas commodi perferendis officia maxime, nulla laborum ea optio molestiae dolor possimus officiis ratione est.</p>
            <button className="bg-cyan-400"><Link>Explore More</Link> </button>
          </div>
          <div className="col-lg-6">
          <img src="../../public/bro-takes-photos-fKNPmWPtESI-unsplash-removebg-preview.png"  alt="" />
          </div>
        </div>
      </main>

            {/* Display first three cars in cards */}
    <div className="container mx-auto mt-5">
    <Link  className="flex p-3 font-normal text-cyan-400 justify-end" to="/cars">voir plus</Link>
    <div className="row row-cols-1 row-cols-md-3 g-4">
        {cars.slice(0, 3).map((car, index) => (
        <div key={index} className="bg-white p-4 rounded-md  my-1 flex flex-col justify-between">
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
