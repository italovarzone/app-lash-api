const { Router } = require('express');
const Cliente = require('../models/Cliente');

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

  // Verificação se todos os campos obrigatórios estão presentes
  if (!nome || !email || !telefone || !dataNascimento || !cep || !logradouro || !bairro || !cidade || !uf || !numero || !procedimentoFavorito) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Criação do cliente no banco de dados com todos os campos
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

  // Verificação se todos os campos obrigatórios estão presentes
  if (!nome || !email || !telefone || !dataNascimento || !cep || !logradouro || !bairro || !cidade || !uf || !numero || !procedimentoFavorito) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Atualiza o cliente com os novos dados
    await cliente.update({ nome, email, telefone, dataNascimento, cep, logradouro, bairro, cidade, uf, numero, complemento, procedimentoFavorito });
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao editar cliente:', error);
    res.status(500).json({ message: "Erro ao editar cliente." });
  }
});

// Rota para listar todos os clientes
router.get('/clientes', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Padrão: página 1, 10 clientes por página

  try {
    const clientes = await Cliente.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']], // Ordena pela data de criação mais recente
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
