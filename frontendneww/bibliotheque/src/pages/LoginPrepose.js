import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPrepose() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://employe-oub4.onrender.com/prepose/login', {
                email,
                password,
            });
            setMessage('Connexion réussie !');
            const preposeId = response.data.id;
            navigate(`/prepose/${preposeId}`);
        } catch (error) {
            setMessage('Une erreur est survenue lors de la connexion.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Connexion Préposé</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Votre email"
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Votre mot de passe"
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>
    );
}

export default LoginPrepose;
