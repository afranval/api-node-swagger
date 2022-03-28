const express = require('express');
const router = express.Router();
import User from '../models/user';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

router.post('/login', async(req, res) => {
  let body = req.body;

  try {
    // Buscamos email en DB
    const usuarioDB = await User.findOne({email: body.email});

    // Evaluamos si existe el usuario en DB
    if(!usuarioDB){
      return res.status(401).json({
        response: 'User or password wrong!',
      });
    }

    // Evaluamos la contraseña correcta
    if( !bcrypt.compareSync(body.pass, usuarioDB.pass) ){
      return res.status(401).json({
        response: 'User or password wrong!',
      });
    }

    // Generar Token
    let token = jwt.sign({
      data: usuarioDB
    }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días

    // Pasó las validaciones
    return res.json({
      token: token
    })
    
  } catch (error) {
    return res.status(500).json({
      response: 'An error occurred',
      error
    });
  }

});

router.get('/', async(req, res) => {
  res.json({response: 'It works!'})
})

module.exports = router;