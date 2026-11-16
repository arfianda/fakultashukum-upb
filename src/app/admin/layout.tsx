import React from "react";
import { requireAuthenticatedUser } from "@/lib/rbac";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Sementara: seluruh pengguna terautentikasi dapat mengakses layout Lintas Hukum
  await requireAuthenticatedUser();

  return <>{children}</>;
}

