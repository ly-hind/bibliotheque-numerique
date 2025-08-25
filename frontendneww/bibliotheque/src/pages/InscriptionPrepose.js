import React, { useState } from 'react';
import axios from 'axios';

function InscriptionPrepose() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [sexe, setSexe] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

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

    // Fonction pour valider les champs
    const validateForm = () => {
        const newErrors = {};
        const currentYear = new Date().getFullYear();

        // Validation du nom et prénom
        if (!nom) newErrors.nom = 'Le nom est requis';
        if (!prenom) newErrors.prenom = 'Le prénom est requis';

        // Validation de la date de naissance
        const birthYear = new Date(dateNaissance).getFullYear();
        if (!dateNaissance) {
            newErrors.dateNaissance = 'La date de naissance est requise';
        } else if (birthYear >= currentYear) {
            newErrors.dateNaissance = 'La date de naissance doit être avant l\'année actuelle.';
        }

        // Validation du sexe
        if (!sexe) newErrors.sexe = 'Le sexe est requis';

        // Validation de l'email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'L\'email est requis';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'L\'email n\'est pas valide';
        }

        // Validation du mot de passe
        if (!password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const age = calculerAge(dateNaissance); // Calcul de l'âge
            const response = await axios.post('https://employe-oub4.onrender.com/prepose/register', {
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
            <h2>Inscription Préposé</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input 
                        type="text" 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        required 
                    />
                    {errors.nom && <p className="error-message">{errors.nom}</p>}
                </div>
                <div>
                    <label>Prénom:</label>
                    <input 
                        type="text" 
                        value={prenom} 
                        onChange={(e) => setPrenom(e.target.value)} 
                        required 
                    />
                    {errors.prenom && <p className="error-message">{errors.prenom}</p>}
                </div>
                <div>
                    <label>Date de Naissance:</label>
                    <input 
                        type="date" 
                        value={dateNaissance} 
                        onChange={(e) => setDateNaissance(e.target.value)} 
                        required 
                    />
                    {errors.dateNaissance && <p className="error-message">{errors.dateNaissance}</p>}
                </div>
                <div>
                    <label>Sexe:</label>
                    <select value={sexe} onChange={(e) => setSexe(e.target.value)} required>
                        <option value="">Sélectionner</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </select>
                    {errors.sexe && <p className="error-message">{errors.sexe}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default InscriptionPrepose;
