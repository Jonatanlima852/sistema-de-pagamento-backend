export interface CreateTagData {
  name: string;
  userId: number;
}

export interface UpdateTagData {
  name?: string;
}

export interface TagResponse {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionData {
  description: string;
  amount: number;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  isRecurring: boolean;
  categoryId: number;
  accountId: number;
  userId: number;
  tagIds?: number[];
}

export interface UpdateTransactionData {
  description?: string;
  amount?: number;
  date?: Date;
  type?: 'INCOME' | 'EXPENSE';
  isRecurring?: boolean;
  categoryId?: number;
  accountId?: number;
  tagIds?: number[];
} 