
const mongoose = require('mongoose'); // Utilisation du module mongoose

// Définition du modèle de données pour la base mongoDB des Posts

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  comments: { type: [String], required: true},
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

module.exports = mongoose.model('Post', postSchema);   // Exportation du modèle sauce
