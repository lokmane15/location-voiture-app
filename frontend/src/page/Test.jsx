export default function Test() {
    return (
        <div className="p-20 max-w-3xl mx-auto">
        <h6 className="font-medium text-lg">Location<span className="text-cyan-400">Voiture</span></h6>
        <h1 className="text-center text-cyan-400 text-3xl mt-4 mb-8 font-bold">Car Rental Contract</h1>
      
        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-xl mb-4">Reservation Information:</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <p><strong>Start Date:</strong>${formatDate(startDate)}</p>
              <p><strong>End Date:</strong> ${formatDate(endDate)}</p>                
            </div>
            <div className="md:w-1/2">
              <p><strong>Duration:</strong> ${differenceInDays}</p>
              <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)} DH</p>                
            </div>
          </div>
        </div>
      
        <div className="border-t border-gray-300 pt-6 mb-3">
          <h2 className="text-xl mt-8 mb-4">User Information:</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <p><strong>Name:</strong> ${contract.user.nom} ${contract.user.prenom}</p>
              <p><strong>CIN:</strong>${contract.user.num_cin}</p>
            </div>
            <div className="md:w-1/2">
              <p><strong>Address:</strong>${contract.user.adresse}</p>
              <p><strong>Phone:</strong> ${contract.user.num_tel}</p>
              <p><strong>Email:</strong> ${contract.user.email}</p>
            </div>
          </div>
        </div>
      
        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-xl mt-8 mb-4">Car Information:</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <p><strong>Matricule:</strong> ${contract.car.num_matricule}</p>
              <p><strong>Kilomitrage:</strong> ${contract.car.kilomitrage}</p>
              <p><strong>Year:</strong>  ${contract.car.annee}</p>                
            </div>
            <div className="md:w-1/2">
              <p><strong>Color:</strong> ${contract.car.couleur}</p>
              <p><strong>Price per day:</strong> ${contract.car.prix}</p>
              <p><strong>Brand:</strong> ${contract.car.marque}</p>                
            </div>
          </div>
        </div>
        <div className="flex justify-end">
            <img src="../../public/signteur.png"  style={{width:"100px"}} alt="signteur" />
        </div>
      </div>
      
    )
}
