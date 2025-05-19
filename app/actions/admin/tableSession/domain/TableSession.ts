export type TableSession = {
  id: number;
  sessionId: string;
  tableId: number;
  userId: number | null;
  createdAt: Date;
};
