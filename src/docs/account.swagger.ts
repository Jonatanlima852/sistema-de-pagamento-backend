export const accountSwaggerDocs = {
  '/api/accounts': {
    post: {
      tags: ['Accounts'],
      summary: 'Criar nova conta',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'type', 'balance'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome da conta'
                },
                type: {
                  type: 'string',
                  enum: ['DEBIT_CARD', 'SAVING', 'CREDIT_CARD', 'CASH', 'INVESTMENT', 'BUSINESS_CARD', 'OTHER'],
                  description: 'Tipo da conta'
                },
                balance: {
                  type: 'number',
                  format: 'decimal',
                  description: 'Saldo inicial da conta'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Conta criada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                  balance: { type: 'number' },
                  createdAt: { type: 'string' }
                }
              }
            }
          }
        }
      }
    },
    get: {
      tags: ['Accounts'],
      summary: 'Listar todas as contas do usuário',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Lista de contas',
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
                    balance: { type: 'number' },
                    createdAt: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/accounts/{id}': {
    get: {
      tags: ['Accounts'],
      summary: 'Obter detalhes de uma conta específica',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da conta'
        }
      ],
      responses: {
        200: {
          description: 'Detalhes da conta',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                  balance: { type: 'number' },
                  createdAt: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Conta não encontrada'
        }
      }
    },
    put: {
      tags: ['Accounts'],
      summary: 'Atualizar uma conta',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da conta'
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
                  description: 'Nome da conta'
                },
                type: {
                  type: 'string',
                  enum: ['DEBIT_CARD', 'SAVING', 'CREDIT_CARD', 'CASH', 'INVESTMENT', 'BUSINESS_CARD', 'OTHER'],
                  description: 'Tipo da conta'
                },
                balance: {
                  type: 'number',
                  format: 'decimal',
                  description: 'Saldo da conta'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Conta atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                  balance: { type: 'number' },
                  updatedAt: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Conta não encontrada'
        }
      }
    },
    delete: {
      tags: ['Accounts'],
      summary: 'Excluir uma conta',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'ID da conta'
        }
      ],
      responses: {
        204: {
          description: 'Conta excluída com sucesso'
        },
        404: {
          description: 'Conta não encontrada'
        },
        400: {
          description: 'Não é possível excluir uma conta com transações'
        }
      }
    }
  }
}; 