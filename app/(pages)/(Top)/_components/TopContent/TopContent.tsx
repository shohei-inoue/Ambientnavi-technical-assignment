"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EntryForm from "../EntryForm/EntryForm";
import { getSession } from "@/app/actions/web/tableSession/controller/TableSessionController";
import { hasLoggedInUserInSession } from "@/app/actions/web/userSession/controller/UserSessionController";
import Loader from "@/app/components/Loader/Loader";

type TopContentProps = {
  tableNumber: number;
};

const TopContent: React.FC<TopContentProps> = ({ tableNumber }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionExists, setSessionExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession(tableNumber);
        if (session) {
          const alreadyLoggedIn = await hasLoggedInUserInSession(session.sessionId);
          if (alreadyLoggedIn) {
            router.replace("/menu");
          } else {
            router.replace(`/auth/login?table_number=${tableNumber}&session_id=${session.sessionId}`);
          }
        } else {
          setSessionExists(false);
        }
      } catch (error) {
        console.error("セッション取得エラー:", error);
        setSessionExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [tableNumber, router]);

  if (loading) return <Loader />;

  if (sessionExists === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">居酒屋3900へようこそ!</h1>
        <p className="mt-4 text-lg">居酒屋3900をご利用いただきありがとうございます。</p>
        <p>ご利用人数を入力してください。</p>
        <EntryForm tableNumber={tableNumber} />
      </div>
    );
  }

  return null; // リダイレクトが走っている最中
};

export default TopContent;