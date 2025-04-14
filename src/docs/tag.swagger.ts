export const tagSwaggerDocs = {
  '/api/tags': {
    post: {
      tags: ['Tags'],
      summary: 'Criar nova tag',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome da tag'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Tag criada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
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
      tags: ['Tags'],
      summary: 'Listar todas as tags do usuário',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista de tags',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
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
  '/api/tags/{id}': {
    get: {
      tags: ['Tags'],
      summary: 'Obter detalhes de uma tag específica',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da tag'
        }
      ],
      responses: {
        200: {
          description: 'Detalhes da tag',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Tag não encontrada'
        }
      }
    },
    put: {
      tags: ['Tags'],
      summary: 'Atualizar uma tag',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da tag'
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
                  description: 'Nome da tag'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Tag atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Tag não encontrada'
        }
      }
    },
    delete: {
      tags: ['Tags'],
      summary: 'Excluir uma tag',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da tag'
        }
      ],
      responses: {
        204: {
          description: 'Tag excluída com sucesso'
        },
        404: {
          description: 'Tag não encontrada'
        }
      }
    }
  },
  '/api/tags/{id}/transactions': {
    get: {
      tags: ['Tags'],
      summary: 'Listar todas as transações de uma tag',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da tag'
        }
      ],
      responses: {
        200: {
          description: 'Lista de transações com esta tag',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    description: { type: 'string' },
                    amount: { type: 'number' },
                    date: { type: 'string' },
                    type: { type: 'string' },
                    isRecurring: { type: 'boolean' },
                    categoryId: { type: 'number' },
                    accountId: { type: 'number' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                    tags: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'number' },
                          name: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Tag não encontrada'
        }
      }
    }
  }
}; 