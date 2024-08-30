const { Router } = require('express');
const Cliente = require('../models/Cliente');
const { Op } = require('sequelize');

const router = Router();

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post('/clientes', async (req, res) => {
  const {
    nome,
    email,
    telefone,
    dataNascimento,
    cep,
    logradouro,
    bairro,
    cidade,
    uf,
    numero,
    complemento,
    procedimentoFavorito,
  } = req.body;

  if (!nome || !email || !telefone || !dataNascimento || !cep || !logradouro || !bairro || !cidade || !uf || !numero || !procedimentoFavorito) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const cliente = await Cliente.create({
      nome,
      email,
      telefone,
      dataNascimento,
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      numero,
      complemento,
      procedimentoFavorito,
    });
    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: "Erro ao criar cliente." });
  }
});

router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, dataNascimento, cep, logradouro, bairro, cidade, uf, numero, complemento, procedimentoFavorito } = req.body;

  if (!nome || !email || !telefone || !dataNascimento || !cep || !logradouro || !bairro || !cidade || !uf || !numero || !procedimentoFavorito) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    await cliente.update({ nome, email, telefone, dataNascimento, cep, logradouro, bairro, cidade, uf, numero, complemento, procedimentoFavorito });
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao editar cliente:', error);
    res.status(500).json({ message: "Erro ao editar cliente." });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    await cliente.destroy();
    res.status(200).json({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ message: "Erro ao excluir cliente." });
  }
});

// Endpoint de busca de clientes por nome (pode ser ajustado conforme sua implementação)
router.get('/clientes/search', async (req, res) => {
  const { nome } = req.query; // Obtém o nome da query string

  try {
    const clientes = await Cliente.findAll({
      where: {
        nome: {
          [Op.iLike]: `%${nome}%`, // Busca case-insensitive que contém a string do nome
        }
      }
    });
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes.' });
  }
});

router.get('/clientes', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const clientes = await Cliente.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      totalPages: Math.ceil(clientes.count / limit),
      currentPage: parseInt(page),
      data: clientes.rows,
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ message: 'Erro ao listar clientes.' });
  }
});

module.exports = router;
