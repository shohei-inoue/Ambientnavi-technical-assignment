"use client";

import { redirect, useRouter } from "next/navigation";
import LoginForm from "../LoginForm/LoginForm";
import Button from "@/app/components/Button/Button";
import { useEffect, useState } from "react";
import { getSession } from "@/app/actions/web/tableSession/controller/TableSessionController";
import { hasLoggedInUserInSession } from "@/app/actions/web/userSession/controller/UserSessionController";
import Loader from "@/app/components/Loader/Loader";

type LoginContentsProps = {
  tableNumber: number;
};

const LoginContents: React.FC<LoginContentsProps> = ({ tableNumber }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession(tableNumber);
        if (!session) {
          router.replace(`/table_number=${tableNumber}`);
          return;
        }

        const alreadyLoggedIn = await hasLoggedInUserInSession(
          session.sessionId
        );
        if (alreadyLoggedIn) {
          router.replace("/menu");
        }
      } catch (error) {
        console.error("セッション取得エラー:", error);
        router.replace("/404");
        return;
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [tableNumber, router]);

  const handleRegisterClick = () => {
    const redirectUrl = tableNumber
      ? `/auth/register?table_number=${tableNumber}`
      : "/auth/register";
    router.push(redirectUrl);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <LoginForm />
      <Button onClick={handleRegisterClick} size="fixed">
        新規登録はこちら
      </Button>
    </div>
  );
};

export default LoginContents;
