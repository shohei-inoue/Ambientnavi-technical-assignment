"use server";

import { prisma } from "@/app/lib/prisma";
import { Gender } from "@/app/types/types";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const birthdayStr = formData.get("birthday") as string;
  const parsedBirthday = new Date(birthdayStr);
  const genderStr = formData.get("gender") as Gender;

  if (!name || !email || !password || !birthdayStr || !genderStr) {
    throw new Error("すべてのフィールドを入力してください");
  }

  if (isNaN(parsedBirthday.getTime())) {
    throw new Error("有効な生年月日を入力してください");
  }

  if (!["MALE", "FEMALE", "OTHER"].includes(genderStr)) {
    throw new Error("性別が不正です");
  }

  const gender = genderStr as Gender;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("このメールアドレスはすでに使用されています");
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      uuid: uuidv4(),
      email,
      password: hashedPassword,
      birthday: parsedBirthday,
      gender,
    },
  });

  return user;
}
