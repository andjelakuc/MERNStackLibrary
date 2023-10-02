import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import About from "../About";
import DonateBook from "../DonateBook";
import RentABook from "../RentABook";
import Blog from "../Blog";
import Footer from "../Footer";

function FirstPage() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar />
    <div className="bg-third content p-1">
      
      <About />
      <RentABook />
      <DonateBook />
      <Blog />
    </div>
    <Footer />
    </>
  );
}

export default FirstPage;
