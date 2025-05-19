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
      throw new Error("すべてのフィールドを入力してください");
    }

    const parsedBirthday = new Date(birthdayStr);
    if (isNaN(parsedBirthday.getTime())) {
      throw new Error("有効な生年月日を入力してください");
    }

    const gender = genderStr as Gender;
    if (!["MALE", "FEMALE", "OTHER"].includes(gender)) {
      throw new Error("性別が不正です");
    }

    const existing = await ur.getUserByEmail(email);
    if (existing) {
      throw new Error("このメールアドレスはすでに使用されています");
    }

    const hashedPassword = await hash(password, 10);

    return await ur.createUser({
      name,
      uuid: uuidv4(),
      email,
      password: hashedPassword,
      birthday: parsedBirthday,
      gender: gender,
    });
  };
}
