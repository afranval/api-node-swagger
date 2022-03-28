var express = require('express');
const router = express.Router();
const _ = require('underscore');

// Importamos modelo Tarea
import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// middleware
const {AuthCheck} = require('../middlewares/authentication.js');

router.post('/user', AuthCheck, async (req, res) => {

  const body = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }

  body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

  try {

    const userDB = await User.create(body);

    return res.json(userDB);
    
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    });
  }

});

// Actualizar
router.put('/user/:id', AuthCheck, async(req, res) => {

  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'email', 'role', 'pass']);
  
  if(body.pass){
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
  }

  try {
    // {new:true} nos devuelve el usuario actualizado
    const usuarioDB = await User.findByIdAndUpdate(id, body, {new: true,  runValidators: true});

    return res.json(usuarioDB);

  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }

});

// Delete method
router.delete('/user/:id', AuthCheck, async(req, res) => {

  let id = req.params.id;

  try {

    const usuarioDelete = await User.findByIdAndRemove(id);

    if(!usuarioDelete){
      return res.status(400).json({
        response: 'User not found'
      })
    }

    return res.json(usuarioDelete);
    
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    })
  }

});

/* GET users listing. */
router.get('/users', AuthCheck, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;