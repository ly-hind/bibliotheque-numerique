import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DashboardClient() {
    const { clientId } = useParams();  // Récupérer l'ID du client depuis l'URL
    const [clientInfo, setClientInfo] = useState(null);

    useEffect(() => {
        axios.get(`https://client-dseq.onrender.com/clients/${clientId}`)
            .then(response => {
                setClientInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du client', error);
            });
    }, [clientId]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tableau de bord du Client</h1>
            {clientInfo ? (
                <div className="info-container">
                    <p>Nom: {clientInfo.nom}</p>
                    <p>Prenom: {clientInfo.prenom}</p>
                    <p>Email: {clientInfo.email}</p>
                    <p>Age: {clientInfo.age}</p>
                    <p>Sexe: {clientInfo.sexe}</p>
                    <p>Solde: {clientInfo.solde}</p>
                    <p>Facture: {clientInfo.facture}</p>
                    <Link className="white-link" to="/addReservation">Ajouter Réservation</Link><br></br>
                    <Link className="white-link" to="/livres">Tous les Livres</Link><br></br>
                    <Link className="white-link" to="/livres/disponible">Livres Disponibles</Link><br></br>
                    <Link className="white-link" to="/livre/indisponible">Livres Indisponibles</Link><br></br>
                    <Link className="white-link" to={`/client/${clientId}/payment`}>Effectuer un paiement</Link><br></br>
                    


                    

                </div>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </div>
    );
}

export default DashboardClient;
