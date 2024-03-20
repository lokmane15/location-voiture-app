import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import fetchMarque from "../services/FetchMarque";
import fetchCars from "../services/FetchCars";
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
    console.log(cars);
  return (
    <>
      <main className="relative bg-cover bg-center h-screen w-full" style={{ backgroundImage: "url(https://media.istockphoto.com/id/1135541222/fr/photo/concept-de-conduite-dessai.jpg?s=612x612&w=0&k=20&c=gguulpHsvwhVYdUwnwgBYn5Dc70mq3UESG4VPXmUeC4=)" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Bienvenue sur site location de voiture</h1>
            <p className="text-xl">Bienvenue sur notre site de location de voitures ! Découvrez notre large sélection de véhicules pour répondre à tous vos besoins en matière de déplacement. De la petite citadine pratique, nous avons ce quil vous faut. Réservez dès maintenant et partez à laventure en toute simplicité !</p>
            <button className="mt-8 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-blue-600 hover:border-blue-600 transition duration-300">
              <Link to="/cars">Voir les voitures</Link>
            </button>
          </div>
        </div>
      </main>

            {/* Display first three cars in cards */}
            <div className="container mx-auto mt-5">
          <Link  className="flex p-3 font-semibold text-cyan-400 justify-end" to="/cars">voir plus</Link>
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

      {/* Display marque cards */}
          {/* <div className="container mx-auto mt-5">
            <h1 className="text-center display-4 mb-5">Nos Marques</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {marque.map((item, index) => (
                <div key={index} className="col">
                  <div className="card h-100">
                    <img src={`public/${item.image_path}`} className="card-img-top img-fluid" alt={item.name} style={{ height: "190px" , objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary">
                        <Link to={`/cars?marque=${item.nom_marque}`} className="text-white text-decoration-none">Détails</Link>
                      </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div> */}
    </>
  );
}

export default Home;
