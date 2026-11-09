import React from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  requireRole,
  ALL_ROLES,
  ROLE_LABELS,
  getManageableRoles,
} from "@/lib/rbac";
import type { RoleType } from "@/lib/validations/auth";
import { UsersManagementClient } from "./UsersManagementClient";

export const dynamic = "force-dynamic";

interface AdminUsersPageProps {
  searchParams: Promise<{
    q?: string;
    role?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const currentUser = await requireRole("SUPER_ADMIN", "ADMIN");
  const resolvedParams = await searchParams;

  const q = (resolvedParams.q || "").trim();
  const roleParam = (resolvedParams.role || "").trim().toUpperCase();
  const statusParam = (resolvedParams.status || "all").trim().toLowerCase();
  const rawPage = Number(resolvedParams.page || "1");
  const pageSize = 10;
  const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const validRole = ALL_ROLES.includes(roleParam as RoleType)
    ? (roleParam as RoleType)
    : undefined;

  const where: Prisma.UserWhereInput = {};

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { identifier: { contains: q } },
    ];
  }

  if (validRole) {
    where.role = validRole;
  }

  if (statusParam === "active") {
    where.isActive = true;
  } else if (statusParam === "inactive") {
    where.isActive = false;
  }

  const [totalCount, users, labs, activeSuperAdminCount] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        identifier: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        labId: true,
        lab: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        lastLoginAt: true,
        failedLoginCount: true,
        lockedUntil: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.lab.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    }),
    prisma.user.count({
      where: {
        role: "SUPER_ADMIN",
        isActive: true,
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const manageableRoles = [...getManageableRoles(currentUser.role)];

  const serializedUsers = users.map((u) => ({
    ...u,
    lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
    lockedUntil: u.lockedUntil ? u.lockedUntil.toISOString() : null,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  }));

  return (
    <UsersManagementClient
      currentUser={{
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        roleLabel: ROLE_LABELS[currentUser.role],
      }}
      users={serializedUsers}
      labs={labs}
      manageableRoles={manageableRoles}
      activeSuperAdminCount={activeSuperAdminCount}
      filters={{
        q,
        role: validRole || "",
        status: statusParam,
        page: currentPage,
        pageSize,
        totalCount,
        totalPages,
      }}
    />
  );
}

