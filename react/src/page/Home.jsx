import {Link} from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Vitesse du défilement en millisecondes
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Activation du défilement automatique
    autoplaySpeed: 2000 // Durée de chaque slide en millisecondes
  
  };
  
  return (
    <>
      <main className="relative bg-cover bg-center h-screen w-full" style={{ backgroundImage: "url(https://www.topgear.com/sites/default/files/cars-car/image/2023/11/1%20Mercedes%20AMG%20GT.jpg)" }}>
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

    {/* aboute */}
      
              
  

    </>
  );
}

export default Home;
