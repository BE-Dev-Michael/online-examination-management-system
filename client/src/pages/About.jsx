import React from 'react';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import AboutDevelopers from '../components/Landing/AboutDevelopers';

function About() {
    return(
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <AboutDevelopers/>
      </main>
      <Footer/>
    </div>
    )
}

export default About