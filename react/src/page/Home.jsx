import React from 'react';
import { Link } from 'react-router-dom';


function Main() {
  
  
  
  
  return (
    <>
      <main className="relative bg-cover bg-center h-screen w-full" style={{ backgroundImage: "url(https://www.topgear.com/sites/default/files/cars-car/image/2023/11/1%20Mercedes%20AMG%20GT.jpg)" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Bienvenue sur site location de voiture</h1>
            <p className="text-xl">Bienvenue sur notre site de location de voitures ! Découvrez notre large sélection de véhicules pour répondre à tous vos besoins en matière de déplacement. De la petite citadine pratique, nous avons ce qu'il vous faut. Réservez dès maintenant et partez à l'aventure en toute simplicité !</p>
            <button className="mt-8 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-blue-600 hover:border-blue-600 transition duration-300">
              <Link to="/cars">Voir les voitures</Link>
            </button>
          </div>
        </div>
      </main>



      {/* card */}
      <h1 className="text-center text-3xl font-bold mt-5">Catégorie</h1>
      <div className="flex flex-wrap justify-center mt-10">
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img className="w-full" src="https://image.cnbcfm.com/api/v1/image/107238183-1683642530891-All-New_Ford_Ranger_Raptor_12.jpg?v=1684584001&w=1600&h=900" alt="Car 1" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Les dernières tendances automobiles</div>
    <p className="text-gray-700 text-base">
      Découvrez les derniers modèles de voitures et les innovations de l'industrie automobile.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
      <Link to="/car-details">Détails</Link>
    </button>
  </div>
</div>

<div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img className="w-full" src="https://www.kia.com/content/dam/kwcms/kme/uk/en/assets/static/nav22/Explore_range/kia-xceed_2019-gt-line-s-spirit-green_512x288_left.png" alt="Car 1" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Les dernières tendances automobiles</div>
    <p className="text-gray-700 text-base">
      Découvrez les derniers modèles de voitures et les innovations de l'industrie automobile.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
      <Link to="/car-details">Détails</Link>
    </button>
  </div>
</div>
        
<div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img className="w-full" src= "https://assets.volkswagen.com/is/image/volkswagenag/t-roc-3-4-Frontal-View?Zml0PWNyb3AsMSZmbXQ9d2VicC1hbHBoYSZxbHQ9Nzkmd2lkPTgwMCZiZmM9b2ZmJjU0MDQ=" alt="Car 1" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Les dernières tendances automobiles</div>
    <p className="text-gray-700 text-base">
      Découvrez les derniers modèles de voitures et les innovations de l'industrie automobile.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
      <Link to="/car-details">Détails</Link>
    </button>
  </div>
</div>
        
      </div>

      <div className="flex flex-wrap justify-center mt-10">
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img className="w-full" src="https://maroc-diplomatique.net/wp-content/uploads/2023/03/Renault-e1679064465668.jpg" alt="Car 1" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Les dernières tendances automobiles</div>
    <p className="text-gray-700 text-base">
      Découvrez les derniers modèles de voitures et les innovations de l'industrie automobile.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
      <Link to="/car-details">Détails</Link>
    </button>
  </div>
</div>

<div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img className="w-full" src="https://etimg.etb2bimg.com/photo/102922437.cms"  alt="Car 1" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Les dernières tendances automobiles</div>
    <p className="text-gray-700 text-base">
      Découvrez les derniers modèles de voitures et les innovations de l'industrie automobile.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
      <Link to="/car-details">Détails</Link>
    </button>
  </div>
</div>
        
<div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img className="w-full" src= "https://media.ed.edmunds-media.com/audi/rs-7/2024/oem/2024_audi_rs-7_sedan_performance_fq_oem_1_1600.jpg" alt="Car 1" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Les dernières tendances automobiles</div>
    <p className="text-gray-700 text-base">
      Découvrez les derniers modèles de voitures et les innovations de l'industrie automobile.
    </p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
      <Link to="/car-details">Détails</Link>
    </button>
  </div>
</div>
        
   </div>


      {/* slider */}
      
      


      
    </>
  );
}

export default Main;
