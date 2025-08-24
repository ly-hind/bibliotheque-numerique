const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Comptable = require('../Models/Comptable');


const JWT_SECRET = 'votre_clé_secrète'; 

exports.registerComptable = async (req, res) => {
  try {
    const { nom, prenom, age, sexe, email, password } = req.body;

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newComptable = new Comptable({ nom, prenom, age, sexe, email, password: hashedPassword });
    await newComptable.save();

    res.status(201).json({ message: 'Comptable inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

exports.loginComptable = async (req, res) => {
  try {
    const { email, password } = req.body;
    const comptable = await Comptable.findOne({ email });
    if (!comptable) return res.status(404).send('Comptable non trouvé');

    const validPassword = await bcrypt.compare(password, comptable.password);
    if (!validPassword) return res.status(400).send('Mot de passe incorrect');

    res.status(200).json({ id: comptable._id });
  } catch (error) {
    res.status(500).send('Erreur du serveur');
  }
};
exports.getComptableById = async (req, res) => {
  try {
    const comptable = await Comptable.findById(req.params.id);
    if (!comptable) {
      return res.status(404).json({ message: 'Comptable non trouvé' });
    }
    res.status(200).json(comptable);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du comptable :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations du comptable.' });
  }
};