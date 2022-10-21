
const Post = require('../models/Post'); // Import du modèle post
const fs = require('fs');     // module pour la gestion des fichiers locaux

// Middleware pour créer une post dans la base de donnée

exports.createPost = (req, res, next) => {
   const post = new Post({
      ...req.body,
      userId: req.auth.userId,
      name: req.body.name,
      comments: [],
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
   });
   post.save()
      .then(() => res.status(201).json({ message: 'recorded post !' }))
      .catch(error => res.status(400).json({ error }));
};

// Middleware pour modifier un post de la base de donnée

exports.modifyPost = (req, res, next) => {  
   Post.findOne({ _id: req.params.id })
      .then((post) => {
         if ((req.body.newComment) || (post.userId === req.auth.userId) || (req.body.isAdmin)) {
            const postObject = JSON.parse(JSON.stringify(post));
            if (req.body.newComment) {
               postObject.comments.push(req.body.newComment);  //ajouter le nouveau commentaire
            }
            if (req.file) {
               const filename = post.imageUrl.split('/images/')[1];  // supprimer l'ancien fichier
               fs.unlink(`images/${filename}`, err => {
                  console.log('File deleted ! --> '+err);
               });
               postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            if (req.body.name) {
               postObject.name = req.body.name;
            }
            delete postObject._id;
            delete postObject._userId;
            delete postObject.__v;
            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
               .then(() => res.status(200).json({ message: 'modified post' }))
               .catch(error => res.status(401).json({ error }));
         } else {
            res.status(401).json({ message: 'Not authorized' });
         }})
      .catch((error) => {
         res.status(400).json({ error });
      });
};

// Middleware pour effacer une post dans la base de donnée

exports.deletePost = (req, res, next) => {
   Post.findOne({ _id: req.params.id })
      .then(post => {
         if ((post.userId === req.auth.userId) || (req.body.isAdmin)) {
            const filename = post.imageUrl.split('/images/')[1];
            // suppression asynchrone du fichier physiquement sur le disque
            fs.unlink(`images/${filename}`, () => {
               Post.deleteOne({ _id: req.params.id }) // suppression dans la base de données
                  .then(() => { res.status(200).json({ message: 'post removed' }) })
                  .catch(error => res.status(401).json({ error }));
            });  
         } else {
            res.status(401).json({ message: 'Not authorized' });
         }
      })
      .catch(error => {
         res.status(500).json({ error });
      });
};

// Middleware pour la récupération de toutes les posts

exports.getAllPosts = (req, res, next) => {
   Post.find()
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
}

// Middleware pour la gestion des likes

exports.likePost = (req, res, next) => {
   Post.findOne({ _id: req.params.id })
      .then(post => {
         // traitement like
         switch (req.body.like) {
            case 0:     // annule le like/dislike précédent
               let pos = post.usersLiked.indexOf(req.auth.userId);
               if (pos != -1) {
                  post.usersLiked.splice(pos, 1);
                  post.likes--;
               } else {
                  pos = post.usersDisliked.indexOf(req.auth.userId);
                  post.usersDisliked.splice(pos, 1);
                  post.dislikes--;
               }
               break;
            case 1:     // ajoute un like
               post.likes++;
               // ajout userId au tab usersLiked
               post.usersLiked.push(req.auth.userId);
               break;
            case -1:    // ajoute un dislike
               post.dislikes++;
               // ajout userId au tab usersDisliked
               post.usersDisliked.push(req.auth.userId);
               break;
         }
         const postObject = JSON.parse(JSON.stringify(post));
         delete postObject._id;
         delete postObject._userId;
         delete postObject.__v;
         Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Updated like' }))
            .catch(error => res.status(401).json({ error }));
      })
      .catch(error => res.status(404).json({ error }));
};
