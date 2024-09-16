import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  BanknotesIcon,
  LifebuoyIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { fedIn } from "../variants";
import { useQuery } from "@tanstack/react-query";
import { fetchCars, fetchMarque } from "../services/api";

function Home() {
  const baseImageUrl = import.meta.env.VITE_API_URL_IMAGE;
  const features = [
    {
      name: "Wide Range of Vehicles",
      description:
        "Choose from a diverse selection of cars, from compact models for city driving to luxury vehicles for special occasions, ensuring we have the perfect car for every need and preference.",
      icon: BuildingStorefrontIcon,
    },
    {
      name: "Outstanding Customer Support",
      description:
        "Our dedicated team is available 24/7 to assist with any questions or concerns, providing personalized support to make your rental experience as smooth and convenient as possible",
      icon: LifebuoyIcon,
    },
    {
      name: "Affordable Rates",
      description:
        "Enjoy competitive pricing and great value for money, with no hidden fees or surprises. We offer flexible rental options and regular promotions to suit any budget.",
      icon: BanknotesIcon,
    },
  ];

  const { data: cars, isLoading } = useQuery({
    queryKey: ["car"],
    queryFn: fetchCars,
  });

  const { data: marque, isLoading: marqueIsLoading } = useQuery({
    queryKey: ["marque"],
    queryFn: fetchMarque,
  });

  const renderSkeleton = () => {
    return Array(6)
      .fill()
      .map((_, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card box-shadow">
            <Skeleton height={200} />
            <div className="card-body">
              <Skeleton count={3} />
            </div>
          </div>
        </div>
      ));
  };

  const renderMarqueSkeleton = () => {
    return (
      <div className="d-flex flex-wrap justify-content-center">
        {Array(6)
          .fill()
          .map((_, index) => (
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
            <motion.div
              variants={fedIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="md:w-1/2 p-5"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Car Rental
              </h1>
              <p className="mb-3">
                Rev up your journey with our seamless car rental web app.
                Browse, book, and hit the road hassle-free. From compact to
                luxury, find the perfect ride for every adventure. Your next
                memorable trip starts here.
              </p>
              <button className="bg-cyan-400">
                <Link to="/cars">Explore More</Link>
              </button>
            </motion.div>
            <div className="md:w-1/2 p-5">
              <motion.img
                variants={fedIn("left", 0.5)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.5 }}
                src="../../public/bro-takes-photos-fKNPmWPtESI-unsplash-removebg-preview.png"
                alt="Car"
              />
            </div>
          </div>
        </div>
      </main>

      <div className="container p-20 mx-auto mt-5">
        <div className="flex justify-between mb-4 ">
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div>
                <h1 className="font-bold text-2xl pl-4 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-500">
                  Explore Our Cars
                </h1>
              </div>
              <div>
                <Link className="text-cyan-400 flex" to="/cars">
                  <p className="text-sm">VIEW MORE</p>
                  <MdOutlineArrowOutward className="ml-1" />
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="row">
          {isLoading ? (
            <div className="row">{renderSkeleton()}</div>
          ) : (
            cars &&
            cars.slice(0, 6).map((car, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4 box-shadow transition-transform duration-300 transform hover:scale-105">
                  <Link
                    to={`/carDetails/${car.id}`}
                    className="text-decoration-none"
                  >
                    <img
                      className="card-img-top"
                      src={`${baseImageUrl}/storage/${car.image}`}
                      alt="Car"
                    />
                    <div className="card-body">
                      <h1 className="card-title font-bold">
                        {car.marque} {car.model.nom_model}
                      </h1>
                      <p className="card-text text text-gray-700 font-medium">
                        Prix: {car.prix} DH/Day
                      </p>
                    </div>
                  </Link>
                  <div className="card-hover-overlay">
                    <Link
                      to={`/carDetails/${car.id}`}
                      className="text-decoration-none"
                    >
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
      <div className="container mb-10">
        <div className="row">
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="mb-3">
              <p className="text-sm text-center text-sky-600 font-bold">
                FIND YOUR CAR BY CAR BRAND
              </p>
              <h1 className="text-center text-4xl mb-4 font-bold">
                Browse By Brands
              </h1>
            </div>
          )}
          <Marquee>
            {marqueIsLoading ? (
              renderMarqueSkeleton()
            ) : (
              <div className="d-flex flex-wrap justify-content-center">
                {marque &&
                  marque.map((item) => (
                    <div key={item.id} className="brand-item">
                      <Link to={`/cars?marque=${item.nom_marque}`}>
                        <img
                          src={`${baseImageUrl}/storage/${item.image_path}`}
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

      {/* the road section  */}
      <div className="flex justify-around items-center bg-[url('public/bg2.jpg')] bg-cover bg-center lg:pt-40 lg:pb-40 bg-fixed mt-20 mb-10 sm:pt-20 sm:pb-20  flex-col lg:flex-row">
        <div className="p-10 lg:w-2/4 sm:text-center lg:text-left">
          <p className="text-sky-400 text-xl">FIND YOUR CAR BY CAR BRAND</p>
          <h1 className="text-5xl font-bold text-white">
            Leading The Best Car Dealers In Morocco
          </h1>
        </div>
        <div className="lg:w-2/5 p-5 lg:p-0 sm:text-center lg:text-left">
          <p className="text-white">
            There are many variations of simply free text passages of Lorem
            available but the majority have suffered alteration in some form by
            injected hum randomised words which don &#39;t slightly.
          </p>
        </div>
      </div>
      {/* section with images */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <motion.div
                variants={fedIn("right", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="lg:max-w-lg"
              >
                <h2 className="text-base font-semibold leading-7 text-sky-600">
                  Rental faster
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Why Choose Us
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  At Car Rantel, we offer a superior car rental experience
                  tailored to your needs with a fleet of well-maintained
                  vehicles, exceptional customer service, and competitive
                  pricing. Whether for business or leisure, our commitment to
                  quality ensures a seamless and stress-free journey.
                </p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-sky-600"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              variants={fedIn("left", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <img
                src="../../public/pexels-pixabay-164634 (1).jpg"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-col lg:flex-row p-20 mt-5 mb-5 bg-[url('public/bg1.jpg')] bg-cover bg-center">
        <div className="mt-8 p-10">
          <p className="text-sky-400 text-xl">Trusted Car Delaer Service</p>
          <h1 className="text-5xl font-bold pb-4 text-white">Browse By Body</h1>
          <p className="text-gray-300">
            For 15 years, we raising the standard of used car retailing with one
            of the most innovative and reliable used vehicle
          </p>
          <button className="text-white bg-sky-400 p-3 mt-4 rounded-md">
            <Link to="/cars">View All Listings</Link>
          </button>
        </div>
        <div className="grid grid-col-3 sm:grid-cols-3 lg:grid-cols-3 bg-white">
          {cars &&
            cars.slice(6, 12).map((car) => (
              <div key={car.id} className="border p-4 hover:border-sky-300">
                <Link to={`/carDetails/${car.id}`}>
                  <img
                    src={`${baseImageUrl}/storage/${car.image}`}
                    alt=""
                    className="w-72"
                  />
                  <p className="text-center font-bold">{car.marque}</p>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-sky-400 flex justify-between items-center p-5 mb-5 w-4/5 rounded-md mx-auto mr-10 ml-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Find Local Car</h1>
        </div>
        <div className="flex justify-around items-center">
          <div className="ml-5">
            <FaPhone className="text-white text-2xl" />
          </div>
          <div className="mr-5 ml-5 text-white">
            <p className="font-bold text-xl">Phone Number</p>
            <p>+212 6112233445</p>
          </div>
          <div>
            <button className="font-bold p-3 bg-white rounded-md">
              <Link to="/cars">Browse Cars</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
