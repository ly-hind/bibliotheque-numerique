import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DashboardGerant() {
    const { gerantId } = useParams();  // Récupération de l'ID du gérant depuis l'URL
    const [gerantInfo, setGerantInfo] = useState(null);

    useEffect(() => {
        // Appel pour récupérer les informations du gérant avec son ID
        axios.get(`https://employe-oub4.onrender.com/gerant/${gerantId}`)
            .then(response => {
                setGerantInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du gérant', error);
            });
    }, [gerantId]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tableau de bord du Gérant</h1>
            {gerantInfo ? (
                <div className="info-container">
                    <p><strong>Nom:</strong> {gerantInfo.nom}</p>
                    <p><strong>Prenom:</strong> {gerantInfo.prenom}</p>
                    <p><strong>Email:</strong> {gerantInfo.email}</p>
                    <p><strong>Age:</strong> {gerantInfo.age}</p>
                    <p><strong>Sexe:</strong> {gerantInfo.sexe}</p>

                    <Link className="white-link" to="/gerant/register">Inscription Gérant</Link><br></br>
                    <Link className="white-link" to="/bibliotecaire/register">Inscription Bibliothèquaire</Link><br></br>
                    <Link className="white-link" to="/prepose/register">Inscription Préposé</Link><br></br>
                    <Link className="white-link" to="/comptable/register">Inscription Comptable</Link><br></br>
                    <Link className="white-link" to="/client/register">Inscription Client</Link><br></br>
                </div>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </div>
    );
}

export default DashboardGerant;
