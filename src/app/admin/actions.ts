"use server";

import { cookies } from "next/headers";
import { updatePortfolioContent } from "@/lib/db";
import { PortfolioContent } from "@/lib/types";

// Fallback password if ADMIN_PASSWORD is not set in environment
const DEFAULT_PASSWORD = "admin";

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("portfolio_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Incorrect password" };
}

export async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("portfolio_admin_session");
  return session?.value === "authenticated";
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("portfolio_admin_session");
  return { success: true };
}

export async function saveContent(newContent: PortfolioContent) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { success: false, error: "Unauthorized" };
  }

  const success = await updatePortfolioContent(newContent);
  return { success };
}
