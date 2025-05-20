export type Gender = "MALE" | "FEMALE" | "OTHER";

export type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  birthday: Date;
  gender: Gender;
};
