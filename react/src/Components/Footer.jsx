import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    
      <footer className="text-center text-lg-start mt-" style={{ backgroundColor: "#000" }}>
        <div className="container d-flex justify-content-center py-5">
          <button type="button" className="btn btn-primary btn-floating mx-2" style={{ backgroundColor: "#fff", color: "#000", borderRadius: "50%", width: "50px", height: "50px" }}>
            <FaFacebookF size={20} />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-2" style={{ backgroundColor: "#fff", color: "#000", borderRadius: "50%", width: "50px", height: "50px" }}>
            <FaLinkedinIn size={20} />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-2" style={{ backgroundColor: "#fff", color: "#000", borderRadius: "50%", width: "50px", height: "50px" }}>
            <FaInstagram size={20} />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-2" style={{ backgroundColor: "#fff", color: "#000", borderRadius: "50%", width: "50px", height: "50px" }}>
            <FaTwitter size={20} />
          </button>
        </div>
        
        <div className="text-center text-white p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2024 Abderrahamane Bsar & Lokmane Ouarrachi
         
        </div>
      </footer>
    
  );
};

export default Footer;
