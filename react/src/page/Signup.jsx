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
  const [errors, setErrors] = useState({});
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
  const validateForm = () =>{
    let errors = {};
    let isValid =true;

    if(!email){
      errors.email = "Veuillez entrer votre adresse e-mail.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!password) {
      errors.password = "Please enter your password.";
      isValid = false;
    }else if (password.length < 8) {
      errors.password = "The password must contain at least 8 characters.";
      isValid = false;
    }
    
    if (!num_cin) {
      errors.num_cin = "Please enter your cin.";
      isValid = false;
    }
    if (!nom) {
      errors.nom = "VPlease enter your last name.";
      isValid = false;
    }
    if (!prenom) {
      errors.prenom = "Please enter your first name.";
      isValid = false;
    }
    if (!num_tel) {
      errors.num_tel = "Please enter your phone number.";
      isValid = false;
    }else{
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(num_tel)) {
        errors.num_tel = "Please enter a valid phone number (10 digits).";
        isValid = false;
      }
    }
    if (!adresse) {
      errors.adresse = "Please enter your adress.";
      isValid = false;
    }


    setErrors(errors)
    return isValid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await signup(num_cin,nom,prenom,num_tel,adresse,email,password);
    }
  };
  

  return (
    <div className="bg-cover bg-center bg-no-repeat  " style={{ backgroundImage: "url(https://infodunordsainteagathe.ca/wp-content/uploads/2023/07/concessionnaire20001-1024x768.jpg)" }}>
    <div className="  flex items-center justify-center h-screen mt-10" >
      <div className="border border-white p-2 rounded shadow-md w-full sm:w-96 text-black  " style={{backdropFilter: "blur(20px)",minHeight: "400px" }}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-1">
              <label
                htmlFor="cin"
                className="block text-sm  font-medium text-black"
              >
                CIN
              </label>
              <input
                type="text"
                id="cin"
                name="cin"
                value={num_cin}
                onChange={handleCINChange}
                className={`block w-full rounded-md  shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
            {errors.num_cin && <div className="text-red-500 text-sm">{errors.num_cin}</div>}
            </div>
            <div className="mb-1">
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-black"
              >
                Last name
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={nom}
                onChange={handleNomChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
                {errors.nom && <div className="text-red-500 text-sm">{errors.nom}</div>}
            </div>
            <div className="mb-1">
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-black"
              >
                First name
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={prenom}
                onChange={handlePrenomChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
              {errors.prenom && <div className="text-red-500 text-sm">{errors.prenom}</div>}
            </div>
            <div className="mb-1">
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-black"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={num_tel}
                onChange={handleTelephoneChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
              {errors.num_tel && <div className="text-red-500 text-sm">{errors.num_tel}</div>}
              </div>
            <div className="mb-1 col-span-2">
              <label
                htmlFor="adresse"
                className="block text-sm font-medium text-black"
              >
                Adress
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={adresse}
                onChange={handleAdresseChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
              />
                {errors.adresse && <div className="text-red-500 text-sm">{errors.adresse}</div>}
            </div>
            <div className="mb-1 col-span-2">
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
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 `}
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>
            <div className="mb-1 col-span-2">
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
                className={` block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 }`}
              />
              {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-cyan-400 text-white py-2 px-4 rounded-md hover:bg-cyan-500 ocus:outline-none btn-center"
            >
              {isLoading ? "LOADING..." : "Sign up"}
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