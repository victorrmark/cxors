import DashboardLayout from "../components/dashlayout";

export default function DashboardHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
