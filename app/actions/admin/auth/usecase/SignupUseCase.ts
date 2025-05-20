import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { Gender, User } from "../domain/User";
import { UserRepository } from "../repository/UserRepository";

type SignupParams = {
  name: string;
  email: string;
  password: string;
  birthdayStr: string;
  genderStr: string;
};

export function signupUser(ur: UserRepository) {
  return async ({
    name,
    email,
    password,
    birthdayStr,
    genderStr,
  }: SignupParams): Promise<User> => {
    if (!name || !email || !password || !birthdayStr || !genderStr) {
      throw new Error("すべての項目を入力してください。");
    }

    const parsedBirthday = new Date(birthdayStr);
    if (isNaN(parsedBirthday.getTime())) {
      throw new Error("生年月日が無効です。");
    }

    const gender = genderStr as Gender;
    if (!["MALE", "FEMALE", "OTHER"].includes(gender)) {
      throw new Error("性別の値が不正です。");
    }

    const existing = await ur.getUserByEmail(email.toLowerCase());
    if (existing) {
      throw new Error("このメールアドレスは既に登録されています。");
    }

    const hashedPassword = await hash(password, 10);

    return await ur.createUser({
      name,
      uuid: uuidv4(),
      email: email.toLowerCase(),
      password: hashedPassword,
      birthday: parsedBirthday,
      gender: gender,
    });
  };
}
