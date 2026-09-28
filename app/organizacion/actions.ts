"use server";
import { redirect } from "next/navigation";
import { matches, createReportSession, clearReportSession } from "@/lib/report-auth";
export async function login(form: FormData) {
  const password = form.get("password");
  if (!process.env.REPORT_PASSWORD || typeof password !== "string" || !matches(password, process.env.REPORT_PASSWORD)) redirect("/organizacion?error=1");
  await createReportSession();
  redirect("/organizacion");
}
export async function logout() { await clearReportSession(); redirect("/organizacion"); }
