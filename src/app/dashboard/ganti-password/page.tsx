import React from "react";
import { requireAuthenticatedUser } from "@/lib/rbac";
import { ChangePasswordClient } from "./ChangePasswordClient";

export default async function ChangePasswordPage() {
  const user = await requireAuthenticatedUser({
    allowMustChangePassword: true,
  });

  return (
    <div className="py-6">
      <ChangePasswordClient
        mustChangePassword={user.mustChangePassword}
        userName={user.name}
      />
    </div>
  );
}

