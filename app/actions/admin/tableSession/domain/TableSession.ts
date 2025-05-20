export type TableSession = {
  id: number;
  sessionId: string;
  tableId: number;
  guestCount: number;
  checkedInAt: Date;
  checkedOutAt: Date | null;
};