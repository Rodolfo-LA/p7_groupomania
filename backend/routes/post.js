const express = require('express');    // Utilisation du module express
const router = express.Router();       // Appel aux méthodes de la gestion des routes

// Appel aux différents middleware pour les routes post

const auth = require('../controllers/auth');
const multer = require('../controllers/multer-config');
const postCtrl = require('../controllers/post');

// Création des liens entre les middlewares et leurs routes respectives

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer,postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;   // Pour recupération de la gestion des routes pour les posts
