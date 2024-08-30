const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, email, dataNascimento, telefone, senha } = req.body;

  if (!nome || !email || !dataNascimento || !telefone || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await User.create({ nome, email, dataNascimento, telefone, senha: hashedPassword });

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: newUser.id });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
});

module.exports = router;
