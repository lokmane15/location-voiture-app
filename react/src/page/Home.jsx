import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchMarque from "../services/FetchMarque";
import fetchCars from "../services/FetchCars";
import { MdPriceChange, MdOutlineDateRange, MdOutlinePayment } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [marque, setMarque] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonDataMarque = await fetchMarque(baseUrl);
        setMarque(jsonDataMarque);
        const jsonDataCars = await fetchCars(baseUrl);
        setCars(jsonDataCars);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  const renderSkeleton = () => {
    return Array(6).fill().map((_, index) => (
      <div key={index} className="col-md-4 mb-4">
        <div className="card box-shadow">
          <Skeleton height={200} />
          <div className="card-body">
            <Skeleton count={3} />
          </div>
        </div>
      </div>
    ));
  }

  const renderMarqueSkeleton = () => {
    return Array(6).fill().map((_, index) => (
      <div key={index} className="col-md-2 col-sm-6 mb-4">
          <Skeleton height={150} />
      </div>
    ));
  }

  return (
    <>
      <main className="bg-center bg-sky-600">
        <div className="container mx-auto p-5">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-5">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Car Rental</h1>
              <p className="mb-3">Rev up your journey with our seamless car rental web app. Browse, book, and hit the road hassle-free. From compact to luxury, find the perfect ride for every adventure. Your next memorable trip starts here.</p>
              <button className="bg-cyan-400">
                <Link to="/cars">Explore More</Link>
              </button>
            </div>
            <div className="md:w-1/2 p-5">
              <img src="../../public/bro-takes-photos-fKNPmWPtESI-unsplash-removebg-preview.png" alt="Car" />
            </div>
          </div>
        </div>
      </main>

      <div className="container mx-auto mt-5">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Explore Cars picked for you</h1>
          <Link className="text-cyan-400" to="/cars">See More</Link>
        </div>
        <div className="row">
          {isLoading ? (
            <div className="row">
              {renderSkeleton()}
            </div>
          ) : (
            cars.slice(0, 6).map((car, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4 box-shadow transition-transform duration-300 transform hover:scale-105">
                  <Link to={`/carDetails/${car.id}`} className="text-decoration-none">
                    <img className="card-img-top" src={car.image} alt="Car" />
                    <div className="card-body">
                      <h1 className="card-title">{car.marque} {car.model.nom_model}</h1>
                      <p className="card-text text-gray-700">
                        <MdPriceChange className="size-6 inline mr-3" /> Prix: {car.prix} DH/Jour
                        <span className="text-2xl flex justify-end">&rarr;</span>
                      </p>
                    </div>
                  </Link>
                  <div className="card-hover-overlay">
                    <Link to={`/carDetails/${car.id}`} className="text-decoration-none">
                      <div className="overlay-content">
                        <p className="text-white font-weight-bold">Détails</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* marque */}
      <div className="container">
      <div className="row">
        <h1 className=" font-weight-bold text-4xl text-sky-500 text-center font-bold  mb-3">All Brands</h1>
        { isLoading ? (
          renderMarqueSkeleton()
        ):(
        marque.map(item => (
          <div key={item.id} className="col-md-2 col-sm-6 mb-4">
            <Link to={`/cars?marque=${item.nom_marque}`}>
              <img src={item.image_path}  className="col-span-1 max-h-24 w-full object-contain" alt={item.nom_marque} />
            </Link>
          </div>
        )
        ))}
      </div>
    </div>

      <h1 className="text-center text-4xl mb-4 font-bold text-sky-500">How it works</h1>
      <div className="flex flex-wrap mb-2">
        {[
          { icon: <FaCar className="text-sky-500 text-3xl" />, title: "Choose a Car", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sapiente!" },
          { icon: <MdOutlineDateRange className="text-sky-500 text-3xl" />, title: "Select A Date", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sapiente!" },
          { icon: <FaCar className="text-sky-500 text-3xl" />, title: "Make Reservation", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sapiente!" },
          { icon: <MdOutlinePayment className="text-sky-500 text-3xl" />, title: "Payment online", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, sapiente!" }
        ].map((item, index) => (
          <div key={index} className="w-full lg:w-1/4 px-2 mb-4">
            <div className="card p-4 bg-slate-50 hover:bg-white text-center transition-transform duration-300 transform hover:scale-105 hover:z-10">
              <div className="flex justify-center">
                {item.icon}
              </div>
              <h1 className="card-title font-bold text-2xl">{item.title}</h1>
              <p className="mb-3 p-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
