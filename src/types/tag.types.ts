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