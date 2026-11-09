import React from "react";
import { requireAuthenticatedUser, ROLE_LABELS } from "@/lib/rbac";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuthenticatedUser({
    allowMustChangePassword: true,
  });

  return (
    <DashboardShell
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleLabel: ROLE_LABELS[user.role] || user.role,
        mustChangePassword: user.mustChangePassword,
      }}
    >
      {children}
    </DashboardShell>
  );
}

