// routes/books.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todos os livros
router.get('/books', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM livros');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inserir um novo livro
router.post('/books/new', async (req, res) => {
  const { titulo, sinopse, editora, genero, preco_tabela, custo } = req.body;

  if (!titulo || !sinopse || !editora || !genero || !preco_tabela || !custo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO livros (titulo, sinopse, editora, genero, preco_tabela, custo) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, sinopse, editora, genero, preco_tabela, custo]
    );

    res.status(201).json({ message: 'Livro inserido com sucesso', livroId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar um livro pelo ID
router.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, sinopse, editora, genero, preco_tabela, custo } = req.body;

  if (!titulo || !sinopse || !editora || !genero || !preco_tabela || !custo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const [result] = await db.query(
      'UPDATE livros SET titulo = ?, sinopse = ?, editora = ?, genero = ?, preco_tabela = ?, custo = ? WHERE id = ?',
      [titulo, sinopse, editora, genero, preco_tabela, custo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover um livro pelo ID
router.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM livros WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;