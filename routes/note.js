import express from 'express';
const router = express.Router();

// importar el modelo nota
import Note from '../models/note';

// middlewares
const {AuthCheck} = require('../middlewares/authentication.js');

// Agregar una nota
router.post('/notes', AuthCheck, async(req, res) => {
  const body = req.body;  
  try {
    const noteDB = await Note.create(body);
    res.status(200).json(noteDB); 
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }
});

// Get con parámetros
router.get('/notes/:id', AuthCheck, async(req, res) => {
  const _id = req.params.id;
  try {
    const noteDB = await Note.findOne({_id});
    res.json(noteDB);
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }
});

// Get con todos los documentos
router.get('/notes', AuthCheck, async(req, res) => {
  try {
    const noteDb = await Note.find();
    res.json(noteDb);
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }
});

// Put actualizar una nota
router.put('/notes/:id', AuthCheck, async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const noteDb = await Note.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(noteDb);  
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }
});

// Delete eliminar una nota
router.delete('/notes/:id', AuthCheck, async(req, res) => {
  const _id = req.params.id;
  try {
    const noteDb = await Note.findByIdAndDelete({_id});
    if(!noteDb){
      return res.status(404).json({
        response: 'Entity not found',
        error
      })
    }
    res.json('Deleted successfully');
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }
});

// Exportamos la configuración de express app
module.exports = router;