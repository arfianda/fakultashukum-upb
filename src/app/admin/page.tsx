import React from "react";
import { requireRole, ROLE_LABELS } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const user = await requireRole("SUPER_ADMIN", "ADMIN");

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
