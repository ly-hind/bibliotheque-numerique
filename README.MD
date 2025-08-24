# 📚 Bibliothèque Numérique Intelligente — Projet Fullstack + IA

Ce projet a été réalisé dans le cadre de mon stage de fin d'études chez AIRPD, dans le but de concevoir une **plateforme numérique intelligente** pour la gestion complète d’une bibliothèque.

L’objectif principal était de remplacer les processus manuels traditionnels (inscription, emprunts, retours, paiements, rappels) par une solution **moderne, sécurisée, automatisée** et accessible sur tous les appareils (ordinateur, tablette, mobile).

---

## ✅ Fonctionnalités principales réalisées

- 🔐 **Système d'inscription et de connexion sécurisé** pour les clients et les employés (avec authentification JWT).
- 📚 **Gestion des livres** : ajout, mise à jour, consultation, disponibilité, recherche, réservation.
- 🔁 **Emprunts & retours** en temps réel, suivis dans le système.
- 💳 **Paiement en ligne des amendes** via PayPal ou carte bancaire.
- 📩 **Notifications automatiques** pour les retards ou réservations disponibles.
- 📷 **Module d'intelligence artificielle** avec :
  - Reconnaissance de code-barres via webcam (OpenCV)
  - Génération d'une base d'encodage facial (face_recognition)

---

## 🧰 Technologies utilisées

### 🔙 Backend (APIs)
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token
- bcryptjs
- Multer
- CORS

### 🎨 Frontend
- React.js
- Axios
- React Router

### 🤖 Intelligence artificielle
- Python
- OpenCV
- face_recognition
- numpy
- requests

---

Le projet a été développé en suivant la **méthodologie Agile**, avec des sprints de deux semaines et des livraisons progressives, incluant tests, validations et améliorations continues.

👉 Vous trouverez ci-dessous les étapes pour lancer le projet.



# Lancer l'API Client
cd client
npm install
npm start

# Lancer l'API Employé
cd ../employe
npm install
npm start

# Lancer le Frontend React
cd ../frontend/bibliotheque
npm install
npm start

# Installer les dépendances de l'IA (Python)
cd ../../ia
pip install -r requirements.txt

# Lancer la détection en temps réel (via webcam)
python app.py

# Générer la base d'encodage faciale
python signatures.py