import { useState } from "react";
import useSignup from "../hooks/useSignup";

function RegistrationForm() {
  const [num_cin, setNum_cin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [num_tel, setNum_tel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup,error,isLoading} = useSignup()
  const handleCINChange = (e) => {
    setNum_cin(e.target.value);
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleTelephoneChange = (e) => {
    setNum_tel(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(num_cin,nom,prenom,num_tel,adresse,email,password);
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat  " style={{ backgroundImage: "url(https://infodunordsainteagathe.ca/wp-content/uploads/2023/07/concessionnaire20001-1024x768.jpg)" }}>
    <div className="  flex items-center justify-center h-screen mt-12  " >
      <div className="border border-white p-2 rounded shadow-md w-full sm:w-96 text-black  " style={{backdropFilter: "blur(20px)"}}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="cin"
                className="block text-sm font-medium text-black"
              >
                CIN
              </label>
              <input
                type="text"
                id="cin"
                name="cin"
                value={num_cin}
                onChange={handleCINChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-black"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={nom}
                onChange={handleNomChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-black"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={prenom}
                onChange={handlePrenomChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-black"
              >
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={num_tel}
                onChange={handleTelephoneChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
                          </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="adresse"
                className="block text-sm font-medium text-black"
              >
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={adresse}
                onChange={handleAdresseChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
            </div>
            <div className="mb-4 col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 }`}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 btn-center"
            >
              {isLoading ? "LOADING..." : "S'inscrire"}
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default RegistrationForm;