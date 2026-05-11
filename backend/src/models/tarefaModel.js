// ========================================
// MODEL - CAMADA DE DADOS
// ========================================
// Esta camada é responsável por:
// - Armazenar os dados (em memória, banco de dados, etc.)
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)

/**
 * Array que armazena as tarefas temporariamente
 * Observação: esses dados somem quando o servidor reinicia
 * Futuramente, isso será substituído por um banco de dados
 */

import { prisma } from "../config/prisma.js";


/**
 * Cria uma nova task usando Prisma
 * @param {string} title - Título da tarefa
 * @param {string} description - Descrição da tarefa (opcional)
 * @param {number} categoryId - ID da categoria (opcional)
 * @returns {Promise<Object>} - A tarefa criada
 */
export async function criarTask(title, description = null, categoryId = null) {
  const novaTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null,
      categoryId: categoryId
    },
    include: {
      category: true
    }
  });

  return novaTask;
}

/**
 * Exclui uma task pelo id usando Prisma
 * @param {number} id - ID da task a ser excluída
 * @returns {Promise<Object|null>} - A task removida ou null se não encontrar
 */
export async function excluirTask(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: {
        id: id
      },
      include: {
        category: true
      }
    });

    return taskRemovida;
  } catch (error) {
    // Se o registro não for encontrado, retorna null
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}