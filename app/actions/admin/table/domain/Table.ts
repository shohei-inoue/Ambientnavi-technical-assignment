export type Table = {
  id: number;
  number: number;
  guestCount: number;
  isPaid: boolean;
  checkedInAt: Date;
  checkedOutAt: Date | null;
};
