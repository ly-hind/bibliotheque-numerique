import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import LoginGerant from './pages/LoginGerant';
import RegisterGerant from './pages/InscriptionGerant';
import InscriptionBibliothequaire from './pages/InscriptionBibliothequaire';
import LoginBibliothequaire from './pages/LoginBibliothequaire';
import LoginPrepose from './pages/LoginPrepose';
import InscriptionPrepose from './pages/InscriptionPrepose';
import InscriptionComptable from './pages/InscriptionComptable';
import LoginComptable from './pages/LoginComptable';
import LoginClient from './pages/LoginClient';
import InscriptionClient from './pages/InscriptionClient';
import AddLivre from './pages/AddLivre';
import UnavailableLivres from './pages/UnavailableLivres';
import AllLivres from './pages/AllLivres';
import LivresDisponibles from './pages/LivresDisponibles';
import DashboardGerant from './pages/DashboardGerant';
import DashboardClient from './pages/DashboardClient';
import DashboardComptable from './pages/DashboardComptable';
import DashboardPrepose from './pages/DashboardPrepose';
import DashboardBibliothequaire from './pages/DashboardBibliothequaire';
import LivresReserves from './pages/LivresReserves';
import LivresNonReserves from './pages/LivresNonReserves';
import UnconfirmedReservations from './pages/UnconfirmedReservations';
import CreateReservation from './pages/CreateReservation';
import './App.css'; // Custom CSS
import logo from './images/your-logo.png';
import PaymentForm from './pages/PaymentForm';
import RetourLivre from './pages/RetourLivre';
import ConfirmationPage from './pages/ConfirmationPage';
import BarcodeResult from './pages/BarcodeResult';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>
          <img src={logo} alt="Logo de la bibliothèque" className="logo-icon" /> Bibliotheque AIRPD
        </h1>
        <header>
          <nav className="navbar">
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li className="dropdown">
                <span>Connexion</span>
                <div className="dropdown-content">
                  <Link to="/gerant/login">Login Gérant</Link>
                  <Link to="/bibliotecaire/login">Login Bibliothèquaire</Link>
                  <Link to="/prepose/login">Login Préposé</Link>
                  <Link to="/comptable/login">Login Comptable</Link>
                  <Link to="/client/login">Login Client</Link>
                </div>
              </li>
              <li className="dropdown">
                <span>Inscription</span>
                <div className="dropdown-content">
                  <Link to="/gerant/register">Inscription Gérant</Link>
                  <Link to="/client/register">Inscription Client</Link>
                </div>
              </li>
              <li className="dropdown">
                <span>Autre</span>
                <div className="dropdown-content">
               
                  <Link to="/livres">Tous les Livres</Link>
                  <Link to="/livres/disponible">Livres Disponibles</Link>
                  <Link to="/livre/indisponible">Livres Indisponibles</Link>
                  <Link to="/retour-livre">Livres retour</Link>

                  /retour-livre
                  <Link to="/codebarreRecus">code barre scan</Link>

                </div>
              </li>
              <li>
                <Link to="/" onClick={() => localStorage.clear()}>Déconnexion</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gerant/register" element={<RegisterGerant />} />
          <Route path="/gerant/login" element={<LoginGerant />} />
          <Route path="/bibliotecaire/register" element={<InscriptionBibliothequaire />} />
          <Route path="/bibliotecaire/login" element={<LoginBibliothequaire />} />
          <Route path="/prepose/register" element={<InscriptionPrepose />} />
          <Route path="/prepose/login" element={<LoginPrepose />} />
          <Route path="/comptable/register" element={<InscriptionComptable />} />
          <Route path="/comptable/login" element={<LoginComptable />} />
          <Route path="/client/register" element={<InscriptionClient />} />
          <Route path="/client/login" element={<LoginClient />} />
          <Route path="/livre/ajout" element={<AddLivre />} />
          <Route path="/livre/indisponible" element={<UnavailableLivres />} />
          <Route path="/livres" element={<AllLivres />} />
          <Route path="/livres/disponible" element={<LivresDisponibles />} />
          <Route path="/gerant/:gerantId" element={<DashboardGerant />} />
          <Route path="/client/:clientId" element={<DashboardClient />} />
          <Route path="/comptable/:comptaId" element={<DashboardComptable />} />
          <Route path="/prepose/:preposeId" element={<DashboardPrepose />} />
          <Route path="/bibliothequaire/:bibliothequaireId" element={<DashboardBibliothequaire />} />
          <Route path="/LivresReserves" element={<LivresReserves />} />
          <Route path="/LivresNonReserves" element={<LivresNonReserves />} />
          <Route path="/nonconfirmer" element={<UnconfirmedReservations />} />
          <Route path="/addReservation" element={<CreateReservation />} />
          <Route path="/client/:clientId/payment" element={<PaymentForm />} />
          <Route path="/retour-livre" element={<RetourLivre />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/codebarreRecus" element={<BarcodeResult />} /> {/* Route pour la détection de livre */}

        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-item">
            <a href="https://www.google.com/maps/place/Your+Library+Address" target="_blank" rel="noopener noreferrer">
              Adresse: 123 Rue de la Bibliothèque, Montreal
            </a>
          </div>
          <div className="footer-item">
            <a href="mailto:contact@bibliothequeairpd.com">
              Email: contact@bibliothequeairpd.com
            </a>
          </div>
          <div className="footer-item">
            <a href="tel:+1234567890">
              Téléphone: +1 234 567 890
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
