export const categorySwaggerDocs = {
  '/api/categories': {
    post: {
      tags: ['Categories'],
      summary: 'Criar nova categoria',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'type'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome da categoria'
                },
                type: {
                  type: 'string',
                  enum: ['INCOME', 'EXPENSE'],
                  description: 'Tipo da categoria'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Categoria criada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    get: {
      tags: ['Categories'],
      summary: 'Listar todas as categorias do usuário',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista de categorias',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/categories/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Obter detalhes de uma categoria específica',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da categoria'
        }
      ],
      responses: {
        200: {
          description: 'Detalhes da categoria',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Categoria não encontrada'
        }
      }
    },
    put: {
      tags: ['Categories'],
      summary: 'Atualizar uma categoria',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da categoria'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome da categoria'
                },
                type: {
                  type: 'string',
                  enum: ['INCOME', 'EXPENSE'],
                  description: 'Tipo da categoria'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Categoria atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Categoria não encontrada'
        }
      }
    },
    delete: {
      tags: ['Categories'],
      summary: 'Excluir uma categoria',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da categoria'
        }
      ],
      responses: {
        204: {
          description: 'Categoria excluída com sucesso'
        },
        404: {
          description: 'Categoria não encontrada'
        }
      }
    }
  }
};