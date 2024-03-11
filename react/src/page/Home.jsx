import React from "react";

function Home() {
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Honda Civic",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Ford Mustang",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "BMW 3 Series",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to Car Dealership</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
