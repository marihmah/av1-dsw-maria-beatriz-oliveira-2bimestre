// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Recebe requisições HTTP, valida dados e chama o Model

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * GET /tarefas - Lista todas as tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ erro: "Erro ao listar tarefas" });
  }
}

/**
 * GET /tarefas/:id - Obtém uma tarefa específica
 */
export async function buscarPorId(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (Number.isNaN(idNumero) || idNumero <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = await TarefaModel.buscarPorId(idNumero);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
}

/**
 * POST /tarefas - Cria uma nova tarefa
 */
export async function criar(req, res) {
  try {
    const { title, description, categoryId } = req.body;

    // Validações
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "Campo 'title' é obrigatório e deve ser texto" });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({ erro: "Campo 'description' deve ser texto" });
    }

    if (categoryId !== undefined && (isNaN(categoryId) || categoryId <= 0)) {
      return res.status(400).json({ erro: "Campo 'categoryId' deve ser um número válido" });
    }

    const tarefaCriada = await TarefaModel.criar(title, description, categoryId);

    res.status(201).json({
      mensagem: "Tarefa criada com sucesso!",
      tarefa: tarefaCriada
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
}

/**
 * PUT /tarefas/:id - Atualiza uma tarefa
 */
export async function atualizar(req, res) {
  try {
    const idNumero = Number(req.params.id);
    const { title, description, completed, categoryId } = req.body;

    // Validação do ID
    if (Number.isNaN(idNumero) || idNumero <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    // Validações dos campos opcionais
    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
      return res.status(400).json({ erro: "Campo 'title' deve ser texto não vazio" });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({ erro: "Campo 'description' deve ser texto" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({ erro: "Campo 'completed' deve ser boolean" });
    }

    if (categoryId !== undefined && categoryId !== null && (isNaN(categoryId) || categoryId <= 0)) {
      return res.status(400).json({ erro: "Campo 'categoryId' deve ser um número válido" });
    }

    // Se nenhum campo foi enviado, retorna erro
    if (!title && !description && completed === undefined && !categoryId) {
      return res.status(400).json({ erro: "Nenhum campo para atualizar foi enviado" });
    }

    const tarefaAtualizada = await TarefaModel.atualizar(idNumero, {
      title,
      description,
      completed,
      categoryId
    });

    if (!tarefaAtualizada) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa atualizada com sucesso!",
      tarefa: tarefaAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
}

/**
 * DELETE /tarefas/:id - Remove uma tarefa
 */
export async function excluir(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (Number.isNaN(idNumero) || idNumero <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefaRemovida = await TarefaModel.excluir(idNumero);

    if (!tarefaRemovida) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa excluída com sucesso!",
      tarefa: tarefaRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ erro: "Erro ao excluir tarefa" });
  }
}
