import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start" style={{ backgroundColor: "#000" }}>
      <div className="container d-flex justify-content-center py-5">
        <FaFacebookF style={{color:"white",marginRight:"10px"}} size={17} />
        <FaLinkedinIn style={{color:"white",marginRight:"10px"}} size={17} />
        <FaInstagram style={{color:"white",marginRight:"10px"}} size={17} />
        <FaTwitter style={{color:"white",marginRight:"10px"}} size={17} />
      </div>
      <div className="text-center text-white p-3 " style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2024 Abderrahamane Bsar & Lokmane Ouarrachi
      </div>
    </footer>
  );
};

export default Footer;
