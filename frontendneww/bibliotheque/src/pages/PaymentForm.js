import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css';  // Importer le fichier CSS pour les styles

function PaymentForm() {
    const { clientId } = useParams();
    const [clientInfo, setClientInfo] = useState(null);
    const [showCardForm, setShowCardForm] = useState(false);
    const [showPayPalForm, setShowPayPalForm] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3002/clients/${clientId}`)
            .then(response => {
                setClientInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du client', error);
            });
    }, [clientId]);

    const handleCardSubmit = (e) => {
        e.preventDefault();
        setMessage('Paiement par carte effectué avec succès !');
        setTimeout(() => {
            navigate('/confirmation');
        }, 2000);
    };

    const handlePayPalSubmit = (e) => {
        e.preventDefault();
        setMessage('Paiement PayPal effectué avec succès !');
        setTimeout(() => {
            navigate('/confirmation');
        }, 2000);
    };

    return (
        <div className="payment-container">
            <h2>Formulaire de Paiement</h2>
            {clientInfo ? (
                <>
                    <p>Nom du client: {clientInfo.nom} {clientInfo.prenom}</p>
                    <p>Solde disponible: {clientInfo.solde} €</p>

                    <h3>Choisissez une méthode de paiement :</h3>
                    <button className="btn-card" onClick={() => { setShowCardForm(true); setShowPayPalForm(false); }}>
    <i className="fa fa-credit-card"></i> Payer par carte
</button>

<button className="btn-paypal" onClick={() => { setShowPayPalForm(true); setShowCardForm(false); }}>
    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png" alt="PayPal" />
</button>

                    {/* Formulaire de carte affiché après clic sur le bouton "Payer par carte" */}
                    {showCardForm && (
                        <form onSubmit={handleCardSubmit}>
                            <h3>Paiement par carte</h3>
                            <div className="form-group">
                                <label>Nom sur la carte:</label>
                                <input 
                                    type="text" 
                                    value={cardName} 
                                    onChange={(e) => setCardName(e.target.value)} 
                                    required 
                                    placeholder="Nom sur la carte"
                                />
                            </div>
                            <div className="form-group">
                                <label>Numéro de carte (10 chiffres):</label>
                                <input 
                                    type="text" 
                                    value={cardNumber} 
                                    onChange={(e) => setCardNumber(e.target.value)} 
                                    required 
                                    pattern="\d{10}"  
                                    placeholder="Numéro de carte"
                                />
                            </div>
                            <div className="form-group">
                                <label>Date d'expiration:</label>
                                <input 
                                    type="text" 
                                    value={expiryDate} 
                                    onChange={(e) => setExpiryDate(e.target.value)} 
                                    required 
                                    placeholder="MM/AA"
                                />
                            </div>
                            <div className="form-group">
                                <label>CVV:</label>
                                <input 
                                    type="text" 
                                    value={cvv} 
                                    onChange={(e) => setCvv(e.target.value)} 
                                    required 
                                    placeholder="CVV"
                                    pattern="\d{3}"  
                                />
                            </div>
                            <button type="submit">Soumettre le paiement</button>
                        </form>
                    )}

                    {/* Formulaire PayPal affiché après clic sur le bouton "Payer avec PayPal" */}
                    {showPayPalForm && (
                        <form onSubmit={handlePayPalSubmit}>
                            <h3>Paiement PayPal (simulation)</h3>
                            <p>Entrez vos informations PayPal (simulation) :</p>
                            <div className="form-group">
                                <label>Email PayPal:</label>
                                <input 
                                    type="email" 
                                    placeholder="Email PayPal" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Mot de passe PayPal:</label>
                                <input 
                                    type="password" 
                                    placeholder="Mot de passe PayPal" 
                                    required 
                                />
                            </div>
                            <button type="submit">Soumettre le paiement PayPal</button>
                        </form>
                    )}

                    {message && <p>{message}</p>}
                </>
            ) : (
                <p>Chargement des informations...</p>
            )}
        </div>
    );
}

export default PaymentForm;
