// ========================================
// MODEL - CAMADA DE DADOS
// ========================================
// Operações CRUD usando Prisma Client

import { prisma } from "../config/prisma.js";

/**
 * Lista todas as tasks
 * @returns {Promise<Array>} - Array de tasks
 */
export async function listar() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return tasks;
  } catch (error) {
    console.error("Erro ao listar tasks:", error);
    throw error;
  }
}

/**
 * Busca uma task pelo ID
 * @param {number} id - ID da task
 * @returns {Promise<Object|null>} - Task encontrada ou null
 */
export async function buscarPorId(id) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true
      }
    });
    return task || null;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro ao buscar task:", error);
    throw error;
  }
}

/**
 * Cria uma nova task
 * @param {string} title - Título da task
 * @param {string} description - Descrição (opcional)
 * @param {number} categoryId - ID da categoria (opcional)
 * @returns {Promise<Object>} - Task criada
 */
export async function criar(title, description = null, categoryId = null) {
  try {
    const novaTask = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : null,
        categoryId: categoryId ? parseInt(categoryId) : null
      },
      include: {
        category: true
      }
    });
    return novaTask;
  } catch (error) {
    console.error("Erro ao criar task:", error);
    throw error;
  }
}

/**
 * Atualiza uma task existente
 * @param {number} id - ID da task
 * @param {Object} dados - Dados a atualizar (title, description, completed, categoryId)
 * @returns {Promise<Object|null>} - Task atualizada ou null se não encontrar
 */
export async function atualizar(id, dados) {
  try {
    const dataAtualizar = {};

    if (dados.title !== undefined) {
      dataAtualizar.title = dados.title.trim();
    }
    if (dados.description !== undefined) {
      dataAtualizar.description = dados.description ? dados.description.trim() : null;
    }
    if (dados.completed !== undefined) {
      dataAtualizar.completed = dados.completed;
    }
    if (dados.categoryId !== undefined) {
      dataAtualizar.categoryId = dados.categoryId ? parseInt(dados.categoryId) : null;
    }

    const taskAtualizada = await prisma.task.update({
      where: { id: parseInt(id) },
      data: dataAtualizar,
      include: {
        category: true
      }
    });
    return taskAtualizada;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro ao atualizar task:", error);
    throw error;
  }
}

/**
 * Exclui uma task
 * @param {number} id - ID da task
 * @returns {Promise<Object|null>} - Task excluída ou null se não encontrar
 */
export async function excluir(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: { id: parseInt(id) },
      include: {
        category: true
      }
    });
    return taskRemovida;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    console.error("Erro ao excluir task:", error);
    throw error;
  }
}