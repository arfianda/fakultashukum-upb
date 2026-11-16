import React from "react";
import { requireAuthenticatedUser, ROLE_LABELS } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  // Sementara: seluruh pengguna terautentikasi dapat mengakses dashboard Lintas Hukum
  const user = await requireAuthenticatedUser();

  const [userCount, dbPostCount, dbEventCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.event.count(),
  ]);

  return (
    <AdminDashboardClient
      currentUser={{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleLabel: ROLE_LABELS[user.role] || user.role,
      }}
      stats={{
        userCount,
        dbPostCount,
        dbEventCount,
      }}
    />
  );
}
