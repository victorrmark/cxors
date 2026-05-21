import DashboardLayout from "../components/dashlayout";
import { DateProvider } from "../context/dateContext";
import { getGreetingAndDate } from "@/utils/greetings";

export default async function DashboardHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { greeting, date } = getGreetingAndDate();



  return (
    <>
        <DateProvider value={{ greeting, date }}>
          <DashboardLayout>{children}</DashboardLayout>
        </DateProvider>
    </>
  );
}
