import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchMarque from "../services/FetchMarque";
import fetchCars from "../services/FetchCars";
import { MdPriceChange, MdOutlineDateRange, MdOutlinePayment } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { BanknotesIcon,LifebuoyIcon,BuildingStorefrontIcon  } from "@heroicons/react/24/outline";
import Marquee from "react-fast-marquee";

function Home() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [marque, setMarque] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const features = [
    {
      name: 'Wide Range of Vehicles',
      description:
        'Choose from a diverse selection of cars, from compact models for city driving to luxury vehicles for special occasions, ensuring we have the perfect car for every need and preference.',
        icon:BuildingStorefrontIcon 
    },
    {
      name: 'Outstanding Customer Support',
      description: 'Our dedicated team is available 24/7 to assist with any questions or concerns, providing personalized support to make your rental experience as smooth and convenient as possible',
      icon:LifebuoyIcon 

    },
    {
      name: 'Affordable Rates',
      description: 'Enjoy competitive pricing and great value for money, with no hidden fees or surprises. We offer flexible rental options and regular promotions to suit any budget.',
      icon:BanknotesIcon
    },
  ]
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
    return (
      <div className="d-flex flex-wrap justify-content-center">
        {Array(6).fill().map((_, index) => (
          <div key={index} className="brand-item">
            <Skeleton height={150} width={150} className="ml-20" />
          </div>
        ))}
      </div>
    );
  };
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
        <div className="flex justify-end mb-4 ml-20">
          {isLoading ? <Skeleton/>:<Link className="text-cyan-400 text-bold" to="/cars">See More</Link>}
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
                      <h1 className="card-title font-bold">{car.marque} {car.model.nom_model}</h1>
                      <p className="card-text text text-gray-700 font-medium">
                        Prix: {car.prix} DH/Day
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
        {isLoading ? <Skeleton/>:<h1 className="text-center text-4xl mb-4 font-bold">All Brands</h1>}
        <Marquee>
          {isLoading ? (
            renderMarqueSkeleton()
          ) : (
            <div className="d-flex flex-wrap justify-content-center">
              {marque.map((item) => (
                <div key={item.id} className="brand-item">
                  <Link to={`/cars?marque=${item.nom_marque}`}>
                    <img
                      src={item.image_path}
                      className="max-h-24 w-full ml-20 object-contain"
                      alt={item.nom_marque}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Marquee>
      </div>
    </div>

      <h1 className="text-center text-4xl mb-4 font-bold ">How it works</h1>
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

      {/* section with images */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-sky-600">Rental faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose Us</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              At Car Rantel, we offer a superior car rental experience tailored to your needs with a fleet of well-maintained vehicles, exceptional customer service, and competitive pricing. Whether for business or leisure, our commitment to quality ensures a seamless and stress-free journey.
              </p>
              <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                    <feature.icon className="absolute left-1 top-1 h-5 w-5 text-sky-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img
            src="../../public/pexels-pixabay-164634 (1).jpg"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
