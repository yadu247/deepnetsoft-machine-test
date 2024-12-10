import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Footer from './components/Footer';

const Home = () => (
  <div className="flex flex-col justify-between h-full">
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold py-4">Home Page</h1>
      <p>Welcome to DEEP NET SOFT.</p>
    </div>
  </div>
);

const Reservation = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold py-4">Make A Reservation</h1>
    <p>Learn more about reservation.</p>
  </div>
);

const Contact = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold py-4">Contact Us</h1>
    <p>Have any questions? Reach out to us!</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
