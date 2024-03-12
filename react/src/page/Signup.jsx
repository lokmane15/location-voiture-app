import React, { useState } from "react";

function RegistrationForm() {
  const [cin, setCIN] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleCINChange = (e) => {
    setCIN(e.target.value);
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!cin.trim()) {
      errors.cin = "Veuillez saisir votre CIN.";
    }

    if (!nom.trim()) {
      errors.nom = "Veuillez saisir votre nom.";
    }

    if (!prenom.trim()) {
      errors.prenom = "Veuillez saisir votre prénom.";
    }

    if (!telephone.trim()) {
      errors.telephone = "Veuillez saisir votre numéro de téléphone.";
    }

    if (!adresse.trim()) {
      errors.adresse = "Veuillez saisir votre adresse.";
    }

    if (!email.trim()) {
      errors.email = "Veuillez saisir votre email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Veuillez saisir un email valide.";
    }

    if (!password.trim()) {
      errors.password = "Veuillez saisir votre mot de passe.";
    } else if (password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (Object.keys(errors).length === 0) {
      // Si le formulaire est valide, vous pouvez soumettre les données ou effectuer d'autres actions
      console.log("Formulaire valide, prêt à être soumis !");
      // Ajoutez ici la logique d'inscription
    } else {
      // Si des erreurs sont présentes, affichez-les et empêchez l'envoi du formulaire
      console.log("Erreurs de validation :", errors);
      setErrors(errors);
    }
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen mt-2 ">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96 ">
        <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="cin"
                className="block text-sm font-medium text-gray-700"
              >
                CIN
              </label>
              <input
                type="text"
                id="cin"
                name="cin"
                value={cin}
                onChange={handleCINChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.cin ? 'border-red-500' : ''}`}
              />
              {errors.cin && <p className="text-red-500 text-sm mt-1">{errors.cin}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={nom}
                onChange={handleNomChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.nom ? 'border-red-500' : ''}`}
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={prenom}
                onChange={handlePrenomChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.prenom ? 'border-red-500' : ''}`}
              />
              {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={telephone}
                onChange={handleTelephoneChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.telephone ? 'border-red-500' : ''}`}
              />
              {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="adresse"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={adresse}
                onChange={handleAdresseChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.adresse ? 'border-red-500' : ''}`}
              />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
