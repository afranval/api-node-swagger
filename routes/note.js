import express from 'express';
const router = express.Router();

// importar el modelo nota
import Note from '../models/note';

// middlewares
const {AuthCheck} = require('../middlewares/autenticacion.js');

// Agregar una nota
router.post('/note', AuthCheck, async(req, res) => {
  const body = req.body;  
  try {
    const noteDB = await Note.create(body);
    res.status(200).json(noteDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Get con parámetros
router.get('/note/:id', AuthCheck, async(req, res) => {
  const _id = req.params.id;
  try {
    const noteDB = await Note.findOne({_id});
    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
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
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar una nota
router.put('/note/:id', AuthCheck, async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const noteDb = await Note.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(noteDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Delete eliminar una nota
router.delete('/note/:id', AuthCheck, async(req, res) => {
  const _id = req.params.id;
  try {
    const noteDb = await Note.findByIdAndDelete({_id});
    if(!noteDb){
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.json(noteDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Exportamos la configuración de express app
module.exports = router;