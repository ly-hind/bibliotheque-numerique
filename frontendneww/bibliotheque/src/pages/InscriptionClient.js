import React, { useState } from 'react';
import axios from 'axios';

function InscriptionClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [sexe, setSexe] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Fonction pour calculer l'âge à partir de la date de naissance
    const calculerAge = (dateNaissance) => {
        const birthDate = new Date(dateNaissance);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentYear = new Date().getFullYear();
        const birthYear = new Date(dateNaissance).getFullYear();

        // Validation checks
        if (birthYear >= currentYear) {
            setMessage('La date de naissance doit être avant l\'année actuelle.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setMessage('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        if (password.length < 6) {
            setMessage('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        try {
            const age = calculerAge(dateNaissance); // Calcul de l'âge
            await axios.post('http://localhost:3002/clients/register', {
                nom,
                prenom,
                age, // Envoi de l'âge au lieu de la date de naissance
                sexe,
                email,
                password,
            });
            setMessage('Inscription réussie !');
        } catch (error) {
            setMessage('Une erreur est survenue lors de l\'inscription.');
        }
    };

    return (
        <div className="form-container">
            <h2>Inscription Client</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input 
                        type="text" 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        required 
                        placeholder="Votre nom"
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input 
                        type="text" 
                        value={prenom} 
                        onChange={(e) => setPrenom(e.target.value)} 
                        required 
                        placeholder="Votre prénom"
                    />
                </div>
                <div>
                    <label>Date de Naissance:</label>
                    <input 
                        type="date" 
                        value={dateNaissance} 
                        onChange={(e) => setDateNaissance(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Sexe:</label>
                    <select value={sexe} onChange={(e) => setSexe(e.target.value)} required>
                        <option value="">Sélectionner</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Votre email"
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Votre mot de passe"
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>
    );
}

export default InscriptionClient;
