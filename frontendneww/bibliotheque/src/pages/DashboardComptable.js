import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DashboardComptable() {
    const { comptaId } = useParams();  // Récupérer l'ID du comptable depuis l'URL
    const [comptableInfo, setComptableInfo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/comptable/${comptaId}`)
            .then(response => {
                setComptableInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du comptable', error);
            });
    }, [comptaId]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tableau de bord du Comptable</h1>
            {comptableInfo ? (
                <div className="info-container">
                    <p><strong>Nom:</strong> {comptableInfo.nom}</p>
                    <p><strong>Prenom:</strong> {comptableInfo.prenom}</p>
                    <p><strong>Email:</strong> {comptableInfo.email}</p>
                    <p><strong>Age:</strong> {comptableInfo.age}</p>
                    <p><strong>Sexe:</strong> {comptableInfo.sexe}</p>
                    {/* Ajouter d'autres informations spécifiques au comptable */}
                </div>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </div>
    );
}

export default DashboardComptable;
