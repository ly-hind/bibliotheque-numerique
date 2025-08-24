import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faBook, faHeart } from '@fortawesome/free-solid-svg-icons';
import creole from '../images/creole.jpg'; // Le nouveau chemin après avoir déplacé le dossier images dans src
import culture from '../images/culture.jpg';
import film from '../images/film.jpg';

import '../App.css';

function Home() {
  const images = [creole, culture, film]; // Tableau des images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour passer à l'image suivante
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour passer à l'image précédente
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="home">
      <h1>Bienvenue à la Bibliothèque</h1>
      <br>
      
      
      </br>

      {/* Section Statistiques */}
      <div className="stats-section">
        <div className="stat-item">
          <FontAwesomeIcon icon={faBuilding} className="icon" />
          <p className="stat-number">747</p>
          <p className="stat-label">BIBLIOTHÈQUES MEMBRES</p>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <p className="stat-number">1 437 833</p>
          <p className="stat-label">POPULATION DESSERVIE</p>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faBook} className="icon" />
          <p className="stat-number">4 748 762</p>
          <p className="stat-label">PRÊTS</p>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faHeart} className="icon" />
          <p className="stat-number">+ DE 5 996 918</p>
          <p className="stat-label">DOCUMENTS</p>
        </div>
      </div>

      {/* Carrousel d'actualités */}
      <div className="carousel">
        <button className="carousel-button left" onClick={prevImage}>‹</button>
        <img src={images[currentIndex]} alt="Actualité" className="carousel-image" />
        <button className="carousel-button right" onClick={nextImage}>›</button>
      </div>

      {/* Nouvelle section Mission, Vision, Valeurs */}
      <div className="mission-vision-values">
        <div className="mission">
          <h3>Notre Mission</h3>
          <p>
            Offrir un accès équitable à la connaissance, à la culture et à l'information pour enrichir la vie des communautés.
          </p>
        </div>

        <div className="vision">
          <h3>Notre Vision</h3>
          <p>
            Être un leader dans le développement des bibliothèques publiques, en favorisant l'innovation et l'accessibilité pour tous.
          </p>
        </div>

        <div className="values">
          <h3>Nos Valeurs</h3>
          <p>
            Intégrité, Innovation, Inclusion, Respect, Collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
