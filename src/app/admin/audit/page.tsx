import React from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireRole, ROLE_LABELS } from "@/lib/rbac";
import { AuditLogClient } from "./AuditLogClient";

export const dynamic = "force-dynamic";

interface AdminAuditPageProps {
  searchParams: Promise<{
    q?: string;
    action?: string;
    page?: string;
  }>;
}

export default async function AdminAuditPage({
  searchParams,
}: AdminAuditPageProps) {
  const currentUser = await requireRole("SUPER_ADMIN");
  const resolvedParams = await searchParams;

  const q = (resolvedParams.q || "").trim();
  const actionParam = (resolvedParams.action || "").trim().toUpperCase();
  const rawPage = Number(resolvedParams.page || "1");
  const pageSize = 15;
  const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const where: Prisma.AuditLogWhereInput = {};

  if (actionParam) {
    where.action = actionParam;
  }

  if (q) {
    where.OR = [
      { action: { contains: q } },
      { entity: { contains: q } },
      { entityId: { contains: q } },
      { ip: { contains: q } },
      { actor: { name: { contains: q } } },
      { actor: { email: { contains: q } } },
    ];
  }

  const [totalCount, logs, distinctActions] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        actorId: true,
        action: true,
        entity: true,
        entityId: true,
        meta: true,
        ip: true,
        createdAt: true,
        actor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    }),
    prisma.auditLog.findMany({
      distinct: ["action"],
      select: { action: true },
      orderBy: { action: "asc" },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const actionOptions = Array.from(
    new Set([
      "LOGIN_SUCCESS",
      "LOGIN_FAILED",
      "PASSWORD_CHANGED",
      "USER_CREATED",
      "USER_UPDATED",
      "USER_STATUS_CHANGED",
      "USER_ROLE_CHANGED",
      "USER_PASSWORD_RESET",
      "USER_CSV_IMPORTED",
      ...distinctActions.map((a) => a.action),
    ])
  );

  const serializedLogs = logs.map((log) => ({
    id: log.id,
    actorId: log.actorId,
    action: log.action,
    entity: log.entity,
    entityId: log.entityId,
    meta: log.meta,
    ip: log.ip,
    createdAt: log.createdAt.toISOString(),
    actor: log.actor,
  }));

  return (
    <AuditLogClient
      currentUser={{
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        roleLabel: ROLE_LABELS[currentUser.role],
      }}
      logs={serializedLogs}
      actionOptions={actionOptions}
      filters={{
        q,
        action: actionParam,
        page: currentPage,
        pageSize,
        totalCount,
        totalPages,
      }}
    />
  );
}

