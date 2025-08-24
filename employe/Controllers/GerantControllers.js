const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Gerant = require('../Models/Gerant');


const JWT_SECRET = 'votre_clé_secrète'; 

exports.registerGerant = async (req, res) => {
  try {
    const { nom, prenom, age, sexe, email, password } = req.body;

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newGerant = new Gerant({ nom, prenom, age, sexe, email, password: hashedPassword });
    await newGerant.save();

    res.status(201).json({ message: 'Gerant inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

exports.loginGerant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Rechercher le gérant par email
    const gerant = await Gerant.findOne({ email });
    if (!gerant) return res.status(404).send('Gérant non trouvé');

    // Comparer le mot de passe
    const validPassword = await bcrypt.compare(password, gerant.password);
    if (!validPassword) return res.status(400).send('Mot de passe incorrect');

    // Générer un token JWT si nécessaire, ou renvoyer l'ID du gérant
    res.status(200).json({ id: gerant._id });
  } catch (error) {
    res.status(500).send('Erreur du serveur');
  }
};
exports.getGerantById = async (req, res) => {
  try {
    const gerant = await Gerant.findById(req.params.id);  // Rechercher par ID
    if (!gerant) {
      return res.status(404).json({ message: 'Gérant non trouvé' });
    }
    res.status(200).json(gerant);  // Retourner les informations du gérant
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du gérant :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations du gérant.' });
  }
};