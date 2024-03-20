import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter ici la logique pour envoyer les données du formulaire
    console.log(formData);
    // Réinitialiser le formulaire après la soumission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat  mt-5" style={{ backgroundImage: "url()" }}>

    <div className="max-w-md mx-auto bg-white rounded-md p-8 shadow-md mt-20">
      <h2 className="text-2xl font-semibold ">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Send
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ContactForm;
