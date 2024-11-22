export const transactionSwaggerDocs = {
    '/api/transactions': {
      post: {
        tags: ['Transactions'],
        summary: 'Criar nova transação',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['description', 'amount', 'date', 'type', 'isRecurring', 'categoryId', 'accountId'],
                properties: {
                  description: {
                    type: 'string',
                    description: 'Descrição da transação'
                  },
                  amount: {
                    type: 'number',
                    description: 'Valor da transação'
                  },
                  date: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Data da transação'
                  },
                  type: {
                    type: 'string',
                    enum: ['INCOME', 'EXPENSE'],
                    description: 'Tipo da transação'
                  },
                  isRecurring: {
                    type: 'boolean',
                    description: 'Se a transação é recorrente'
                  },
                  categoryId: {
                    type: 'integer',
                    description: 'ID da categoria'
                  },
                  accountId: {
                    type: 'integer',
                    description: 'ID da conta'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Transação criada com sucesso',
            content: {
              'application/json': {
                schema: {
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
                    updatedAt: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      get: {
        tags: ['Transactions'],
        summary: 'Listar todas as transações do usuário',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de transações',
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
    '/api/transactions/{id}': {
      get: {
        tags: ['Transactions'],
        summary: 'Obter detalhes de uma transação específica',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da transação'
          }
        ],
        responses: {
          200: {
            description: 'Detalhes da transação',
            content: {
              'application/json': {
                schema: {
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
                    updatedAt: { type: 'string' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Transação não encontrada'
          }
        }
      },
      put: {
        tags: ['Transactions'],
        summary: 'Atualizar uma transação',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da transação'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  description: {
                    type: 'string',
                    description: 'Descrição da transação'
                  },
                  amount: {
                    type: 'number',
                    description: 'Valor da transação'
                  },
                  date: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Data da transação'
                  },
                  type: {
                    type: 'string',
                    enum: ['INCOME', 'EXPENSE'],
                    description: 'Tipo da transação'
                  },
                  isRecurring: {
                    type: 'boolean',
                    description: 'Se a transação é recorrente'
                  },
                  categoryId: {
                    type: 'integer',
                    description: 'ID da categoria'
                  },
                  accountId: {
                    type: 'integer',
                    description: 'ID da conta'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Transação atualizada com sucesso',
            content: {
              'application/json': {
                schema: {
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
                    updatedAt: { type: 'string' }
                  }
                }
              }
            }
          },
          404: {
            description: 'Transação não encontrada'
          }
        }
      },
      delete: {
        tags: ['Transactions'],
        summary: 'Excluir uma transação',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID da transação'
          }
        ],
        responses: {
          204: {
            description: 'Transação excluída com sucesso'
          },
          404: {
            description: 'Transação não encontrada'
          }
        }
      }
    },
    '/api/transactions/summary': {
      get: {
        tags: ['Transactions'],
        summary: 'Obter resumo das transações por período',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'startDate',
            required: true,
            schema: {
              type: 'string',
              format: 'date-time'
            },
            description: 'Data de início do período'
          },
          {
            in: 'query',
            name: 'endDate',
            required: true,
            schema: {
              type: 'string',
              format: 'date-time'
            },
            description: 'Data de fim do período'
          }
        ],
        responses: {
          200: {
            description: 'Resumo das transações',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      _sum: {
                        type: 'object',
                        properties: {
                          amount: { type: 'number' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };