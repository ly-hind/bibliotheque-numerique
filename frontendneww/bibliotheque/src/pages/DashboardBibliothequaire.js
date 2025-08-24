import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DashboardBibliothequaire() {
    const { bibliothequaireId } = useParams();  // Récupération de l'ID du bibliothécaire depuis l'URL
    const [bibliothequaireInfo, setBibliothequaireInfo] = useState(null);

    useEffect(() => {
        // Appel à l'API pour récupérer les informations du bibliothécaire avec son ID
        axios.get(`http://localhost:3001/bibliothequaire/${bibliothequaireId}`)
            .then(response => {
                setBibliothequaireInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du bibliothécaire', error);
            });
    }, [bibliothequaireId]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tableau de bord du Bibliothécaire</h1>
            {bibliothequaireInfo ? (
                <div className="info-container">
                    <p><strong>Nom:</strong> {bibliothequaireInfo.nom}</p>
                    <p><strong>Prénom:</strong> {bibliothequaireInfo.prenom}</p>
                    <p><strong>Email:</strong> {bibliothequaireInfo.email}</p>
                    <p><strong>Âge:</strong> {bibliothequaireInfo.age}</p>
                    <p><strong>Sexe:</strong> {bibliothequaireInfo.sexe}</p>
                    {/* Ajouter d'autres informations spécifiques */}
                    <Link className="white-link" to="/livre/ajout">Ajouter Livre</Link><br></br>
                    <Link className="white-link" to="/codebarreRecus">code barre scan</Link>

                </div>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </div>
    );
}

export default DashboardBibliothequaire;
