import { UserRepositoryImpl } from "../repository/UserRepository";
import { signupUser } from "../usecase/SignupUseCase";

// instance
const signupUserUsecase = signupUser(UserRepositoryImpl);

export async function signup({
  name,
  email,
  password,
  birthdayStr,
  genderStr,
}: {
  name: string;
  email: string;
  password: string;
  birthdayStr: string;
  genderStr: string;
}) {
  const user = await signupUserUsecase({
    name,
    email,
    password,
    birthdayStr,
    genderStr,
  });

  return user;
}
