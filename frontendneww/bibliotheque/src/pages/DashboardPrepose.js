import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DashboardPrepose() {
    const { preposeId } = useParams();  // Récupérer l'ID du préposé depuis l'URL
    const [preposeInfo, setPreposeInfo] = useState(null);

    useEffect(() => {
        axios.get(`https://employe-oub4.onrender.com/prepose/${preposeId}`)
            .then(response => {
                setPreposeInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du préposé', error);
            });
    }, [preposeId]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tableau de bord du Préposé</h1>
            {preposeInfo ? (
                <div className="info-container">
                    <p><strong>Nom:</strong> {preposeInfo.nom}</p>
                    <p><strong>Prenom:</strong> {preposeInfo.prenom}</p>
                    <p><strong>Email:</strong> {preposeInfo.email}</p>
                    <p><strong>Age:</strong> {preposeInfo.age}</p>
                    <p><strong>Sexe:</strong> {preposeInfo.sexe}</p>
                    {/* Ajouter d'autres informations spécifiques au préposé */}
                    <Link className="white-link" to="/client/register">Inscription Client</Link><br></br>
                    <Link className="white-link" to="/addReservation">Ajouter Réservation</Link><br></br>
                    <Link className="white-link" to="/nonconfirmer">confirmer les Réservations Non Confirmées</Link><br></br>
                    <Link className="white-link" to="/livres/disponible">Livres Disponibles</Link><br></br>
                    <Link className="white-link" to="/livre/indisponible">Livres Indisponibles</Link><br></br>
                    <Link className="white-link" to="/codebarreRecus">code barre scan</Link><br></br>
                    <Link className="white-link" to="/LivresReserves">verifier facture</Link><br></br>
                    <Link className="white-link" to="/retour-livre">Livres retour</Link><br></br>

                    

                </div>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </div>
    );
}

export default DashboardPrepose;
