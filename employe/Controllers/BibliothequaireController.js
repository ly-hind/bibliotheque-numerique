const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Bibliothequaire = require('../Models/Bibliothequaire');


const JWT_SECRET = 'votre_clé_secrète'; 

exports.registerBibliothequaire = async (req, res) => {
  try {
    const { nom, prenom, age, sexe, email, password } = req.body;

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newBibliothequaire = new Bibliothequaire({ nom, prenom, age, sexe, email, password: hashedPassword });
    await newBibliothequaire.save();

    res.status(201).json({ message: 'Bibliothequaire inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

exports.loginBibliothequaire = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Rechercher le bibliothécaire par email
    const bibliothequaire = await Bibliothequaire.findOne({ email });
    if (!bibliothequaire) return res.status(404).send('Bibliothécaire non trouvé');

    // Comparer le mot de passe
    const validPassword = await bcrypt.compare(password, bibliothequaire.password);
    if (!validPassword) return res.status(400).send('Mot de passe incorrect');

    // Générer un token JWT si nécessaire, ou renvoyer l'ID du bibliothécaire
    res.status(200).json({ id: bibliothequaire._id });
  } catch (error) {
    res.status(500).send('Erreur du serveur');
  }
};
exports.getBibliothequaireById = async (req, res) => {
  try {
    const bibliothequaire = await Bibliothequaire.findById(req.params.id);
    if (!bibliothequaire) {
      return res.status(404).json({ message: 'Bibliothécaire non trouvé' });
    }
    res.status(200).json(bibliothequaire);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du bibliothécaire :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations du bibliothécaire.' });
  }
};