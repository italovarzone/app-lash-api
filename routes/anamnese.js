const { Router } = require('express');
const Anamnese = require('../models/Anamnese'); // Importa o modelo de Anamnese
const { Op } = require('sequelize');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Anamnese
 *   description: Endpoints para gerenciar fichas de anamnese
 */

/**
 * @swagger
 * /api/anamnese:
 *   post:
 *     summary: Cria uma nova ficha de anamnese
 *     tags: [Anamnese]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *                 description: ID do cliente
 *               datetime:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora do cadastro
 *               rimel:
 *                 type: string
 *                 description: Indica se está de rímel
 *               gestante:
 *                 type: string
 *                 description: Indica se está gestante
 *               procedimento_olhos:
 *                 type: string
 *                 description: Procedimento nos olhos
 *               alergia:
 *                 type: string
 *                 description: Possui alergia
 *               especificar_alergia:
 *                 type: string
 *                 description: Especificação da alergia
 *               tireoide:
 *                 type: string
 *                 description: Possui problemas de tireoide
 *               problema_ocular:
 *                 type: string
 *                 description: Possui problemas oculares
 *               especificar_ocular:
 *                 type: string
 *                 description: Especificação do problema ocular
 *               oncologico:
 *                 type: string
 *                 description: Indica se está em tratamento oncológico
 *               dorme_lado:
 *                 type: string
 *                 description: Indica se dorme de lado
 *               dorme_lado_posicao:
 *                 type: string
 *                 description: Posição ao dormir de lado
 *               problema_informar:
 *                 type: string
 *                 description: Problemas a informar
 *               procedimento:
 *                 type: string
 *                 description: Procedimento de preferência
 *               mapping:
 *                 type: string
 *                 description: Detalhes de mapeamento
 *               estilo:
 *                 type: string
 *                 description: Estilo
 *               modelo_fios:
 *                 type: string
 *                 description: Modelo dos fios
 *               espessura:
 *                 type: string
 *                 description: Espessura
 *               curvatura:
 *                 type: string
 *                 description: Curvatura
 *               adesivo:
 *                 type: string
 *                 description: Tipo de adesivo
 *               observacao:
 *                 type: string
 *                 description: Observações adicionais
 *     responses:
 *       201:
 *         description: Ficha de anamnese criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da ficha de anamnese criada
 *       500:
 *         description: Erro ao criar ficha de anamnese
 */

/**
 * @swagger
 * /api/anamnese:
 *   get:
 *     summary: Lista todas as fichas de anamnese
 *     tags: [Anamnese]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de resultados por página
 *     responses:
 *       200:
 *         description: Lista de fichas de anamnese
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *                 currentPage:
 *                   type: integer
 *                   description: Página atual
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Anamnese'
 *       500:
 *         description: Erro ao listar fichas de anamnese
 */
router.post('/anamnese', async (req, res) => {
  const {
    clientId, datetime, rimel, gestante, procedimento_olhos, alergia, especificar_alergia,
    tireoide, problema_ocular, especificar_ocular, oncologico, dorme_lado, dorme_lado_posicao, problema_informar,
    procedimento, mapping, estilo, modelo_fios, espessura, curvatura, adesivo, observacao
  } = req.body;

  try {
    const anamnese = await Anamnese.create({
      clientId, datetime, rimel, gestante, procedimento_olhos, alergia, especificar_alergia,
      tireoide, problema_ocular, especificar_ocular, oncologico, dorme_lado, dorme_lado_posicao, problema_informar,
      procedimento, mapping, estilo, modelo_fios, espessura, curvatura, adesivo, observacao
    });
    res.status(201).json(anamnese);
  } catch (error) {
    console.error('Erro ao criar ficha de anamnese:', error);
    res.status(500).json({ message: 'Erro ao criar ficha de anamnese.' });
  }
});

/**
 * Atualiza uma ficha de anamnese existente
 */
router.put('/anamnese/:clientId', async (req, res) => {
  const { clientId } = req.params;
  const {
    datetime, rimel, gestante, procedimento_olhos, alergia, especificar_alergia,
    tireoide, problema_ocular, especificar_ocular, oncologico, dorme_lado, dorme_lado_posicao, problema_informar,
    procedimento, mapping, estilo, modelo_fios, espessura, curvatura, adesivo, observacao
  } = req.body;

  try {
    const anamnese = await Anamnese.findOne({ where: { clientId } });
    if (!anamnese) {
      return res.status(404).json({ message: 'Ficha de anamnese não encontrada.' });
    }

    await anamnese.update({
      datetime, rimel, gestante, procedimento_olhos, alergia, especificar_alergia,
      tireoide, problema_ocular, especificar_ocular, oncologico, dorme_lado, dorme_lado_posicao, problema_informar,
      procedimento, mapping, estilo, modelo_fios, espessura, curvatura, adesivo, observacao
    });

    res.status(200).json(anamnese);
  } catch (error) {
    console.error('Erro ao atualizar ficha de anamnese:', error);
    res.status(500).json({ message: 'Erro ao atualizar ficha de anamnese.' });
  }
});

/**
 * Deleta uma ficha de anamnese
 */
router.delete('/anamnese/:clientId', async (req, res) => {
  const { clientId } = req.params;

  try {
    const anamnese = await Anamnese.findOne({ where: { clientId } });
    if (!anamnese) {
      return res.status(404).json({ message: 'Ficha de anamnese não encontrada.' });
    }

    await anamnese.destroy();
    res.status(200).json({ message: 'Ficha de anamnese excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir ficha de anamnese:', error);
    res.status(500).json({ message: 'Erro ao excluir ficha de anamnese.' });
  }
});

/**
 * Lista todas as fichas de anamnese
 */
router.get('/anamnese', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const anamneseData = await Anamnese.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['datetime', 'DESC']],
    });

    res.status(200).json({
      totalPages: Math.ceil(anamneseData.count / limit),
      currentPage: parseInt(page),
      data: anamneseData.rows,
    });
  } catch (error) {
    console.error('Erro ao listar fichas de anamnese:', error);
    res.status(500).json({ message: 'Erro ao listar fichas de anamnese.' });
  }
});

module.exports = router;
