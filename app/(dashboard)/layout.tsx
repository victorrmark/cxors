import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "../components/dashlayout";
import { UserProvider } from "../context/userContext";
import { DateProvider } from "../context/dateContext";
import { getGreetingAndDate } from "@/utils/greetings";

export default async function DashboardHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { greeting, date } = getGreetingAndDate();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <UserProvider initialUser={user}>
        <DateProvider value={{ greeting, date }}>
          <DashboardLayout>{children}</DashboardLayout>
        </DateProvider>
      </UserProvider>
    </>
  );
}
