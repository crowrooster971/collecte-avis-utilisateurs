const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/collecte-avis', { useNewUrlParser: true, useUnifiedTopology: true });

const AvisSchema = new mongoose.Schema({
  produit: String,
  note: { type: Number, min: 1, max: 5 },
  avis: String,
  date: { type: Date, default: Date.now }
});

const Avis = mongoose.model('Avis', AvisSchema);

app.post('/avis', (req, res) => {
  const nouvelAvis = new Avis(req.body);
  nouvelAvis.save().then(() => res.status(201).send(nouvelAvis)).catch(err => res.status(400).send(err));
});

app.get('/avis', (req, res) => {
  Avis.find().then(avis => res.status(200).send(avis)).catch(err => res.status(500).send(err));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
