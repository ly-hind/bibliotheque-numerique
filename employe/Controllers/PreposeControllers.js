const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Prepose = require('../Models/Prepose');


const JWT_SECRET = 'votre_clé_secrète'; 

exports.registerPrepose = async (req, res) => {
  try {
    const { nom, prenom, age, sexe, email, password } = req.body;

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPrepose = new Prepose({ nom, prenom, age, sexe, email, password: hashedPassword });
    await newPrepose.save();

    res.status(201).json({ message: 'Prepose inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

exports.loginPrepose = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Rechercher le préposé par email
    const prepose = await Prepose.findOne({ email });
    if (!prepose) return res.status(404).send('Préposé non trouvé');

    // Comparer le mot de passe
    const validPassword = await bcrypt.compare(password, prepose.password);
    if (!validPassword) return res.status(400).send('Mot de passe incorrect');

    // Générer un token JWT si nécessaire, ou renvoyer l'ID du préposé
    res.status(200).json({ id: prepose._id });
  } catch (error) {
    res.status(500).send('Erreur du serveur');
  }
};
exports.getPreposeById = async (req, res) => {
  try {
    const prepose = await Prepose.findById(req.params.id);
    if (!prepose) {
      return res.status(404).json({ message: 'Préposé non trouvé' });
    }
    res.status(200).json(prepose);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du préposé :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations du préposé.' });
  }
};