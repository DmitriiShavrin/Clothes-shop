import React from 'react';
import Banner from '../Banner/Banner';
import BigCards from '../BigCards/BigCards';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <>
      <Navbar /> 
      <Banner />
      <BigCards />
      <Footer />
    </>
  )
}

export default Home
