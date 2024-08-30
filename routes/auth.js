const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendVerificationEmail = require('../utils/sendVerificationEmail');

const router = Router();
let tempUserData = {};

// Rota de registro de usuário
router.post('/register', async (req, res) => {
  const { nome, email, dataNascimento, telefone, password } = req.body;

  if (!nome || !email || !dataNascimento || !telefone || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    tempUserData[email] = {
      nome,
      email,
      dataNascimento,
      telefone,
      password: await bcrypt.hash(password, 10),
      verificationCode
    };

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: 'Código de verificação enviado para o email!' });
  } catch (error) {
    console.error('Erro ao enviar código de verificação:', error);
    res.status(500).json({ error: 'Erro ao enviar código de verificação' });
  }
});

// Rota de verificação do código de registro
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const userData = tempUserData[email];

    if (!userData) {
      return res.status(400).json({ error: 'Dados do usuário não encontrados ou expirados' });
    }

    if (userData.verificationCode !== code) {
      return res.status(400).json({ error: 'Código de verificação incorreto' });
    }

    const newUser = await User.create({
      nome: userData.nome,
      email: userData.email,
      dataNascimento: userData.dataNascimento,
      telefone: userData.telefone,
      password: userData.password,
      isVerified: true
    });

    delete tempUserData[email];

    res.status(201).json({ message: 'Email verificado com sucesso! Usuário registrado.', userId: newUser.id });
  } catch (error) {
    console.error('Erro ao verificar o código:', error);
    res.status(500).json({ error: 'Erro ao verificar o código' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email não verificado. Verifique seu email.' });
    }

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });

    // Inclua o nome do usuário na resposta
    res.json({ token, nome: user.nome });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
