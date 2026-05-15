// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Define as rotas da aplicação REST

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

// GET /tarefas - Lista todas as tarefas
router.get("/tarefas", TarefaController.listar);

// GET /tarefas/:id - Obtém uma tarefa específica
router.get("/tarefas/:id", TarefaController.buscarPorId);

// POST /tarefas - Cria uma nova tarefa
router.post("/tarefas", TarefaController.criar);

// PUT /tarefas/:id - Atualiza uma tarefa
router.put("/tarefas/:id", TarefaController.atualizar);

// DELETE /tarefas/:id - Remove uma tarefa
router.delete("/tarefas/:id", TarefaController.excluir);

export default router;
