import { redirect } from "next/navigation";
import { checkAuth } from "./actions";
import { getPortfolioContent } from "@/lib/db";
import { AdminDashboard } from "./AdminDashboard";

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const initialContent = await getPortfolioContent();

  return <AdminDashboard initialContent={initialContent} />;
}
