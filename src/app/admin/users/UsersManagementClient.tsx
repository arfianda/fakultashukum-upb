"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ALL_ROLES, ROLE_LABELS } from "@/lib/rbac";
import type { RoleType } from "@/lib/validations/auth";
import type { CsvRawRowInput } from "@/lib/validations/user";
import {
  createUserAction,
  updateUserAction,
  toggleUserActiveAction,
  changeUserRoleAction,
  resetUserPasswordAction,
  previewCsvImportAction,
  commitCsvImportAction,
  type CsvPreviewRowResult,
} from "@/lib/actions/users";
import {
  Users,
  UserPlus,
  Upload,
  Search,
  Filter,
  Edit3,
  KeyRound,
  Power,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Download,
  History,
  Lock,
} from "lucide-react";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  identifier: string | null;
  role: RoleType;
  isActive: boolean;
  mustChangePassword: boolean;
  labId: number | null;
  lab: {
    id: number;
    name: string;
    slug: string;
  } | null;
  lastLoginAt: string | null;
  failedLoginCount: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LabItem {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

interface UsersManagementClientProps {
  currentUser: {
    id: number;
    name: string;
    email: string;
    role: RoleType;
    roleLabel: string;
  };
  users: SerializedUser[];
  labs: LabItem[];
  manageableRoles: RoleType[];
  activeSuperAdminCount: number;
  filters: {
    q: string;
    role: string;
    status: string;
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

interface OneTimePasswordData {
  title: string;
  name: string;
  email: string;
  identifier: string | null;
  role: RoleType;
  generatedPassword: string;
}

function parseCsvText(csvText: string): CsvRawRowInput[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  const splitCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if ((ch === "," || ch === ";") && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const firstRowCols = splitCsvLine(lines[0]).map((c) => c.toLowerCase());
  const hasHeader =
    firstRowCols.includes("email") ||
    firstRowCols.includes("name") ||
    firstRowCols.includes("nama");

  let nameIdx = 0;
  let emailIdx = 1;
  let identifierIdx = 2;
  let roleIdx = 3;

  if (hasHeader) {
    nameIdx = firstRowCols.findIndex((c) => c === "name" || c === "nama");
    emailIdx = firstRowCols.findIndex((c) => c === "email");
    identifierIdx = firstRowCols.findIndex(
      (c) =>
        c === "identifier" || c === "nim" || c === "nidn" || c === "nip"
    );
    roleIdx = firstRowCols.findIndex((c) => c === "role" || c === "peran");

    if (nameIdx === -1) nameIdx = 0;
    if (emailIdx === -1) emailIdx = 1;
    if (identifierIdx === -1) identifierIdx = 2;
    if (roleIdx === -1) roleIdx = 3;
  }

  const startIndex = hasHeader ? 1 : 0;
  const rows: CsvRawRowInput[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.every((c) => c === "")) continue;
    rows.push({
      rowNumber: i + 1,
      name: cols[nameIdx] ?? "",
      email: cols[emailIdx] ?? "",
      identifier: cols[identifierIdx] ?? "",
      role: cols[roleIdx] ?? "",
    });
  }

  return rows;
}

export function UsersManagementClient({
  currentUser,
  users,
  labs,
  manageableRoles,
  activeSuperAdminCount,
  filters,
}: UsersManagementClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filter local state for search form
  const [searchQuery, setSearchQuery] = useState(filters.q);
  const [roleFilter, setRoleFilter] = useState(filters.role);
  const [statusFilter, setStatusFilter] = useState(filters.status);

  // Feedback banner / toast
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Create / Edit User modal state
  const [userModalMode, setUserModalMode] = useState<"create" | "edit" | null>(
    null
  );
  const [editingUser, setEditingUser] = useState<SerializedUser | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formIdentifier, setFormIdentifier] = useState("");
  const [formRole, setFormRole] = useState<RoleType>("MAHASISWA");
  const [formLabId, setFormLabId] = useState<number | "">("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Quick Change Role modal state
  const [roleModalUser, setRoleModalUser] = useState<SerializedUser | null>(
    null
  );
  const [quickRole, setQuickRole] = useState<RoleType>("MAHASISWA");
  const [quickLabId, setQuickLabId] = useState<number | "">("");
  const [quickRoleError, setQuickRoleError] = useState<string | null>(null);

  // One-Time Password Display modal state
  const [oneTimePassword, setOneTimePassword] =
    useState<OneTimePasswordData | null>(null);
  const [copiedOtp, setCopiedOtp] = useState(false);

  // CSV Import modal state
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [csvRawRows, setCsvRawRows] = useState<CsvRawRowInput[]>([]);
  const [csvPreviewRows, setCsvPreviewRows] = useState<
    CsvPreviewRowResult[] | null
  >(null);
  const [csvValidCount, setCsvValidCount] = useState(0);
  const [csvErrorCount, setCsvErrorCount] = useState(0);
  const [csvErrorBanner, setCsvErrorBanner] = useState<string | null>(null);
  const [csvImportedCredentials, setCsvImportedCredentials] = useState<
    Array<{
      id: number;
      name: string;
      email: string;
      identifier: string | null;
      role: RoleType;
      generatedPassword: string;
    }> | null
  >(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const canManageUser = (target: SerializedUser): boolean => {
    return manageableRoles.includes(target.role);
  };

  const isLastActiveSuperAdmin = (target: SerializedUser): boolean => {
    return (
      target.role === "SUPER_ADMIN" &&
      target.isActive &&
      activeSuperAdminCount <= 1
    );
  };

  const buildFilterUrl = (overrides: {
    q?: string;
    role?: string;
    status?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    const nextQ = overrides.q !== undefined ? overrides.q : searchQuery;
    const nextRole = overrides.role !== undefined ? overrides.role : roleFilter;
    const nextStatus =
      overrides.status !== undefined ? overrides.status : statusFilter;
    const nextPage = overrides.page !== undefined ? overrides.page : 1;

    if (nextQ.trim()) params.set("q", nextQ.trim());
    if (nextRole) params.set("role", nextRole);
    if (nextStatus && nextStatus !== "all") params.set("status", nextStatus);
    if (nextPage > 1) params.set("page", String(nextPage));

    const qs = params.toString();
    return qs ? `/admin/users?${qs}` : "/admin/users";
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      buildFilterUrl({
        q: searchQuery,
        role: roleFilter,
        status: statusFilter,
        page: 1,
      })
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setRoleFilter("");
    setStatusFilter("all");
    router.push("/admin/users");
  };

  const openCreateModal = () => {
    setUserModalMode("create");
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormIdentifier("");
    setFormRole("MAHASISWA");
    setFormLabId(labs[0]?.id ?? "");
    setFormIsActive(true);
    setFormError(null);
  };

  const openEditModal = (user: SerializedUser) => {
    setUserModalMode("edit");
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormIdentifier(user.identifier || "");
    setFormRole(user.role);
    setFormLabId(user.labId ?? (labs[0]?.id ?? ""));
    setFormIsActive(user.isActive);
    setFormError(null);
  };

  const openQuickRoleModal = (user: SerializedUser) => {
    setRoleModalUser(user);
    setQuickRole(user.role);
    setQuickLabId(user.labId ?? (labs[0]?.id ?? ""));
    setQuickRoleError(null);
  };

  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    startTransition(async () => {
      if (userModalMode === "create") {
        const result = await createUserAction({
          name: formName,
          email: formEmail,
          identifier: formIdentifier,
          role: formRole,
          isActive: formIsActive,
          labId:
            formRole === "KEPALA_LAB" && formLabId !== ""
              ? Number(formLabId)
              : null,
        });

        if (!result.success) {
          setFormError(result.error);
          return;
        }

        setUserModalMode(null);
        setOneTimePassword({
          title: "Akun Pengguna Baru Berhasil Dibuat",
          name: result.user.name,
          email: result.user.email,
          identifier: result.user.identifier,
          role: result.user.role,
          generatedPassword: result.generatedPassword,
        });
        setCopiedOtp(false);
        showToast(
          "success",
          `Akun ${result.user.name} berhasil ditambahkan dan dicatat ke AuditLog.`
        );
        router.refresh();
      } else if (userModalMode === "edit" && editingUser) {
        const result = await updateUserAction({
          id: editingUser.id,
          name: formName,
          email: formEmail,
          identifier: formIdentifier,
          role: formRole,
          isActive: formIsActive,
          labId:
            formRole === "KEPALA_LAB" && formLabId !== ""
              ? Number(formLabId)
              : null,
        });

        if (!result.success) {
          setFormError(result.error);
          return;
        }

        setUserModalMode(null);
        setEditingUser(null);
        showToast(
          "success",
          `Data pengguna ${result.user.name} berhasil diperbarui.`
        );
        router.refresh();
      }
    });
  };

  const handleToggleActive = (user: SerializedUser) => {
    startTransition(async () => {
      const result = await toggleUserActiveAction({
        userId: user.id,
        isActive: !user.isActive,
      });

      if (!result.success) {
        showToast("error", result.error);
        return;
      }

      showToast(
        "success",
        `Akun ${result.user.name} berhasil ${
          result.user.isActive ? "diaktifkan" : "dinonaktifkan"
        }.`
      );
      router.refresh();
    });
  };

  const handleQuickRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleModalUser) return;
    setQuickRoleError(null);

    startTransition(async () => {
      const result = await changeUserRoleAction({
        userId: roleModalUser.id,
        role: quickRole,
        labId:
          quickRole === "KEPALA_LAB" && quickLabId !== ""
            ? Number(quickLabId)
            : null,
      });

      if (!result.success) {
        setQuickRoleError(result.error);
        return;
      }

      setRoleModalUser(null);
      showToast(
        "success",
        `Role ${result.user.name} berhasil diubah menjadi ${result.user.role}.`
      );
      router.refresh();
    });
  };

  const handleResetPassword = (user: SerializedUser) => {
    const confirmed = window.confirm(
      `Reset kata sandi untuk "${user.name}" (${user.email})?\nKata sandi sementara baru akan digenerate satu kali dan pengguna wajib menggantinya saat login berikutnya.`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const result = await resetUserPasswordAction({ userId: user.id });
      if (!result.success) {
        showToast("error", result.error);
        return;
      }

      setOneTimePassword({
        title: "Kata Sandi Sementara Hasil Reset",
        name: result.user.name,
        email: result.user.email,
        identifier: result.user.identifier,
        role: result.user.role,
        generatedPassword: result.generatedPassword,
      });
      setCopiedOtp(false);
      showToast(
        "success",
        `Kata sandi ${result.user.name} berhasil direset dan dicatat ke AuditLog.`
      );
      router.refresh();
    });
  };

  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || "");
      setCsvText(content);
      setCsvPreviewRows(null);
      setCsvImportedCredentials(null);
      setCsvErrorBanner(null);
    };
    reader.readAsText(file);
  };

  const handleDownloadCsvTemplate = () => {
    const sample = [
      "name,email,identifier,role",
      "Budi Santoso,budi.santoso@mhs.pelitabangsa.ac.id,312410001,MAHASISWA",
      "Dr. Hendra Wijaya S.H. M.H.,hendra.wijaya@pelitabangsa.ac.id,0412088901,DOSEN",
      "Siti Rahmawati S.H.,siti.rahma@pelitabangsa.ac.id,STF-FH-012,STAFF",
    ].join("\n");

    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template-import-users-fh-upb.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreviewCsv = () => {
    setCsvErrorBanner(null);
    setCsvImportedCredentials(null);

    const parsedRows = parseCsvText(csvText);
    if (parsedRows.length === 0) {
      setCsvErrorBanner(
        "Data CSV kosong. Pastikan terdapat baris data dengan kolom: name, email, identifier, role."
      );
      return;
    }

    setCsvRawRows(parsedRows);

    startTransition(async () => {
      const result = await previewCsvImportAction({ rows: parsedRows });
      if (!result.success) {
        setCsvErrorBanner(result.error);
        return;
      }

      setCsvPreviewRows(result.previewRows);
      setCsvValidCount(result.validCount);
      setCsvErrorCount(result.errorCount);
    });
  };

  const handleCommitCsv = () => {
    if (csvRawRows.length === 0 || csvValidCount === 0) return;
    setCsvErrorBanner(null);

    startTransition(async () => {
      const result = await commitCsvImportAction({ rows: csvRawRows });
      if (!result.success) {
        setCsvErrorBanner(result.error);
        if (result.previewRows) {
          setCsvPreviewRows(result.previewRows);
        }
        return;
      }

      setCsvImportedCredentials(result.createdCredentials);
      showToast(
        "success",
        `Berhasil mengimpor ${result.importedCount} akun pengguna baru ke sistem.`
      );
      router.refresh();
    });
  };

  const handleDownloadImportedCredentials = () => {
    if (!csvImportedCredentials) return;
    const header = "name,email,identifier,role,initial_password";
    const lines = csvImportedCredentials.map(
      (c) =>
        `"${c.name.replace(/"/g, '""')}","${c.email}","${
          c.identifier || ""
        }","${c.role}","${c.generatedPassword}"`
    );
    const blob = new Blob([[header, ...lines].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kredensial-awal-import-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const roleBadgeClass = (role: RoleType) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-[#710912] text-white border-[#710912]";
      case "ADMIN":
        return "bg-[#EFE5D2] text-[#710912] border-[#D6C7B2]";
      case "KEPALA_LAB":
        return "bg-amber-50 text-amber-900 border-amber-200";
      case "DEKAN":
      case "WADEK":
        return "bg-purple-50 text-purple-900 border-purple-200";
      case "DOSEN":
        return "bg-blue-50 text-blue-900 border-blue-200";
      case "STAFF":
        return "bg-teal-50 text-teal-900 border-teal-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#0D0D0D] font-sans antialiased">
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        userRole={currentUser.role}
      />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        <AdminHeader
          onOpenSearch={() => {}}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-3xl border border-[#E2D9C8] p-6 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE5D2]/70 text-[#710912] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                Manajemen Identitas &amp; Otorisasi
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D]">
                Manajemen Pengguna Sistem
              </h1>
              <p className="text-xs sm:text-sm text-[#544942] mt-1">
                {currentUser.role === "SUPER_ADMIN"
                  ? "Akses penuh SUPER_ADMIN: kelola seluruh akun, penugasan Kepala Lab, impor CSV, dan perlindungan akun utama."
                  : "Akses ADMIN: kelola akun Mahasiswa, Dosen, Staf, Kepala Lab, Dekan, dan Wakil Dekan (akun SUPER_ADMIN & ADMIN lain dikunci)."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {currentUser.role === "SUPER_ADMIN" && (
                <Link
                  href="/admin/audit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#E2D9C8] bg-[#FAF7F2] hover:bg-[#EFE5D2]/60 text-xs font-semibold text-[#0D0D0D] transition-colors"
                >
                  <History className="w-4 h-4 text-[#710912]" />
                  <span>Log Audit</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  setCsvModalOpen(true);
                  setCsvPreviewRows(null);
                  setCsvImportedCredentials(null);
                  setCsvErrorBanner(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#0D0D0D] transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#710912]" />
                <span>Impor CSV</span>
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#710912] hover:bg-[#570000] text-white text-xs font-semibold shadow-sm shadow-[#710912]/20 transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Tambah Pengguna</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toast && (
            <div
              className={`rounded-2xl border px-4 py-3 flex items-center justify-between gap-3 text-xs font-medium ${
                toast.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {toast.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="p-1 rounded-lg hover:bg-black/5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Filter & Search Bar */}
          <form
            onSubmit={handleApplyFilters}
            className="bg-white rounded-3xl border border-[#E2D9C8] p-4 sm:p-5 shadow-xs space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
              <div className="lg:col-span-5 relative">
                <Search className="w-4 h-4 text-[#9C8F85] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama, email, atau NIM/NIDN/NIP..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#0D0D0D] focus:outline-none focus:border-[#710912]"
                />
              </div>

              <div className="lg:col-span-3">
                <select
                  aria-label="Filter Role"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#0D0D0D] focus:outline-none focus:border-[#710912]"
                >
                  <option value="">Semua Role</option>
                  {ALL_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r} — {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <select
                  aria-label="Filter Status Akun"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs text-[#0D0D0D] focus:outline-none focus:border-[#710912]"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>

              <div className="lg:col-span-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Terapkan</span>
                </button>
                {(filters.q || filters.role || filters.status !== "all") && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-3 py-2.5 rounded-2xl border border-[#E2D9C8] text-xs font-medium text-[#544942] hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#FAF7F2] text-[11px] text-[#73655D]">
              <span>
                Menampilkan <strong>{users.length}</strong> dari total{" "}
                <strong>{filters.totalCount}</strong> pengguna terdaftar
              </span>
              <span>
                SUPER_ADMIN Aktif: <strong>{activeSuperAdminCount}</strong> akun
                (minimal 1 wajib aktif)
              </span>
            </div>
          </form>

          {/* Users Table */}
          <div className="bg-white rounded-3xl border border-[#E2D9C8] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2D9C8] bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#73655D]">
                    <th className="py-3.5 px-4">Pengguna</th>
                    <th className="py-3.5 px-4">NIM / NIDN / NIP</th>
                    <th className="py-3.5 px-4">Role &amp; Unit Lab</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Login Terakhir</th>
                    <th className="py-3.5 px-4 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF7F2] text-xs">
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 px-4 text-center text-[#73655D]"
                      >
                        Tidak ada data pengguna yang cocok dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => {
                      const isSelf = u.id === currentUser.id;
                      const manageable = canManageUser(u);
                      const lastSuperAdmin = isLastActiveSuperAdmin(u);

                      return (
                        <tr
                          key={u.id}
                          className="hover:bg-[#FAF7F2]/60 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="font-semibold text-[#0D0D0D] flex items-center gap-1.5">
                                  <span>{u.name}</span>
                                  {isSelf && (
                                    <span className="px-2 py-0.5 rounded-full bg-[#EFE5D2] text-[#710912] text-[10px] font-bold">
                                      Anda
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-[#73655D]">
                                  {u.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-[#544942]">
                            {u.identifier || (
                              <span className="text-[#9C8F85] italic">—</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-col items-start gap-1">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${roleBadgeClass(
                                  u.role
                                )}`}
                              >
                                {u.role}
                              </span>
                              {u.role === "KEPALA_LAB" && (
                                <span className="inline-flex items-center gap-1 text-[11px] text-[#710912] font-medium">
                                  <FlaskConical className="w-3 h-3" />
                                  {u.lab ? u.lab.name : "Belum ditugaskan ke Lab"}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-col items-start gap-1">
                              {u.isActive ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  <ShieldCheck className="w-3 h-3" />
                                  Aktif
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                                  <ShieldAlert className="w-3 h-3" />
                                  Nonaktif
                                </span>
                              )}

                              {u.mustChangePassword && (
                                <span className="text-[10px] text-amber-700 font-medium">
                                  Wajib ganti sandi
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-[11px] text-[#544942]">
                            {u.lastLoginAt
                              ? new Date(u.lastLoginAt).toLocaleString("id-ID", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "Belum pernah login"}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {!manageable ? (
                              <span
                                title="Akun ADMIN tidak diizinkan menyentuh akun SUPER_ADMIN atau ADMIN lain"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#E2D9C8] text-[11px] text-[#73655D]"
                              >
                                <Lock className="w-3 h-3" />
                                Terkunci
                              </span>
                            ) : (
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  disabled={isPending}
                                  onClick={() => openEditModal(u)}
                                  title="Ubah Data Pengguna"
                                  className="px-2.5 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] text-[#0D0D0D] text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-[#710912]" />
                                  <span>Ubah</span>
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    isPending || isSelf || lastSuperAdmin
                                  }
                                  onClick={() => openQuickRoleModal(u)}
                                  title={
                                    isSelf
                                      ? "Dilarang mengubah role akun sendiri"
                                      : lastSuperAdmin
                                      ? "Minimal 1 SUPER_ADMIN aktif wajib dipertahankan"
                                      : "Ganti Role / Unit Lab"
                                  }
                                  className="px-2.5 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] text-[#0D0D0D] text-[11px] font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                  Role
                                </button>

                                <button
                                  type="button"
                                  disabled={isPending}
                                  onClick={() => handleResetPassword(u)}
                                  title="Reset Kata Sandi (Generate Baru Sekali Tampil)"
                                  className="px-2.5 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-amber-50 text-amber-900 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  <KeyRound className="w-3.5 h-3.5" />
                                  <span>Reset</span>
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    isPending ||
                                    (isSelf && u.isActive) ||
                                    (lastSuperAdmin && u.isActive)
                                  }
                                  onClick={() => handleToggleActive(u)}
                                  title={
                                    isSelf && u.isActive
                                      ? "Dilarang menonaktifkan akun sendiri"
                                      : lastSuperAdmin && u.isActive
                                      ? "Minimal 1 SUPER_ADMIN aktif wajib dipertahankan"
                                      : u.isActive
                                      ? "Nonaktifkan Akun"
                                      : "Aktifkan Akun"
                                  }
                                  className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                    u.isActive
                                      ? "border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800"
                                      : "border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                                  }`}
                                >
                                  <Power className="w-3.5 h-3.5" />
                                  <span>
                                    {u.isActive ? "Nonaktifkan" : "Aktifkan"}
                                  </span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-5 py-4 border-t border-[#E2D9C8] bg-[#FAF7F2]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[#544942]">
                Halaman <strong>{filters.page}</strong> dari{" "}
                <strong>{filters.totalPages}</strong> ({filters.totalCount}{" "}
                data)
              </div>

              <div className="flex items-center gap-2">
                {filters.page > 1 ? (
                  <Link
                    href={buildFilterUrl({ page: filters.page - 1 })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] font-semibold text-[#0D0D0D]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white/50 text-[#9C8F85] cursor-not-allowed">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </span>
                )}

                {filters.page < filters.totalPages ? (
                  <Link
                    href={buildFilterUrl({ page: filters.page + 1 })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#FAF7F2] font-semibold text-[#0D0D0D]"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2D9C8] bg-white/50 text-[#9C8F85] cursor-not-allowed">
                    <span>Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal: Create / Edit User */}
      {userModalMode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2D9C8] max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0D0D0D]">
                  {userModalMode === "create"
                    ? "Tambah Pengguna Baru"
                    : `Ubah Data: ${editingUser?.name}`}
                </h2>
                <p className="text-xs text-[#73655D]">
                  {userModalMode === "create"
                    ? "Kata sandi awal akan digenerate acak oleh server dan ditampilkan satu kali."
                    : "Perbarui identitas, role, atau penugasan laboratorium pengguna."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUserModalMode(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#73655D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUserFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Nama Lengkap &amp; Gelar <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Dr. Arifin, S.H., M.H."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs focus:outline-none focus:border-[#710912]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Alamat Email Institusi <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="nama@pelitabangsa.ac.id"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs focus:outline-none focus:border-[#710912]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Identifier (NIM / NIDN / NIP)
                </label>
                <input
                  type="text"
                  value={formIdentifier}
                  onChange={(e) => setFormIdentifier(e.target.value)}
                  placeholder="Contoh: 312410012 atau NIDN"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs font-mono focus:outline-none focus:border-[#710912]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                    Role Otorisasi <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formRole}
                    disabled={
                      userModalMode === "edit" &&
                      editingUser?.id === currentUser.id
                    }
                    onChange={(e) => setFormRole(e.target.value as RoleType)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs focus:outline-none focus:border-[#710912] disabled:opacity-50"
                  >
                    {manageableRoles.map((r) => (
                      <option key={r} value={r}>
                        {r} — {ROLE_LABELS[r]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                    Status Akun
                  </label>
                  <select
                    value={formIsActive ? "active" : "inactive"}
                    disabled={
                      userModalMode === "edit" &&
                      editingUser?.id === currentUser.id
                    }
                    onChange={(e) =>
                      setFormIsActive(e.target.value === "active")
                    }
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs focus:outline-none focus:border-[#710912] disabled:opacity-50"
                  >
                    <option value="active">Aktif (Dapat Login)</option>
                    <option value="inactive">Nonaktif (Diblokir)</option>
                  </select>
                </div>
              </div>

              {/* Lab Assignment for KEPALA_LAB */}
              {formRole === "KEPALA_LAB" && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <label className="block text-xs font-bold text-amber-950">
                    Penugasan Laboratorium Hukum (Wajib untuk KEPALA_LAB){" "}
                    <span className="text-rose-600">*</span>
                  </label>
                  <select
                    required
                    value={formLabId}
                    onChange={(e) =>
                      setFormLabId(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-xs text-[#0D0D0D] focus:outline-none focus:border-[#710912]"
                  >
                    <option value="">-- Pilih Laboratorium --</option>
                    {labs.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.name} ({lab.slug})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setUserModalMode(null)}
                  className="px-4 py-2.5 rounded-2xl border border-[#E2D9C8] text-xs font-semibold text-[#544942] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-2xl bg-[#710912] hover:bg-[#570000] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  {isPending
                    ? "Menyimpan..."
                    : userModalMode === "create"
                    ? "Buat Akun & Generate Sandi"
                    : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Quick Change Role & Lab Assignment */}
      {roleModalUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2D9C8] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#0D0D0D]">
                  Ubah Role &amp; Penugasan Lab
                </h2>
                <p className="text-xs text-[#73655D]">
                  {roleModalUser.name} ({roleModalUser.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRoleModalUser(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF7F2]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {quickRoleError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                {quickRoleError}
              </div>
            )}

            <form onSubmit={handleQuickRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                  Pilih Role Baru
                </label>
                <select
                  value={quickRole}
                  onChange={(e) => setQuickRole(e.target.value as RoleType)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs"
                >
                  {manageableRoles.map((r) => (
                    <option key={r} value={r}>
                      {r} — {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>

              {quickRole === "KEPALA_LAB" && (
                <div>
                  <label className="block text-xs font-semibold text-[#0D0D0D] mb-1">
                    Pilih Laboratorium Hukum <span className="text-rose-600">*</span>
                  </label>
                  <select
                    required
                    value={quickLabId}
                    onChange={(e) =>
                      setQuickLabId(
                        e.target.value ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs"
                  >
                    <option value="">-- Pilih Laboratorium --</option>
                    {labs.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRoleModalUser(null)}
                  className="px-4 py-2 rounded-2xl border border-[#E2D9C8] text-xs font-semibold text-[#544942]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-2xl bg-[#710912] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Menyimpan..." : "Simpan Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: One-Time Initial / Reset Password Display */}
      {oneTimePassword && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2D9C8] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#710912] text-[#EFE5D2] flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#0D0D0D]">
                    {oneTimePassword.title}
                  </h2>
                  <p className="text-[11px] text-rose-700 font-semibold">
                    PENTING: Kata sandi ini hanya ditampilkan SEKALI!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#73655D]">Nama:</span>
                <strong className="text-[#0D0D0D]">{oneTimePassword.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#73655D]">Email:</span>
                <span className="font-mono text-[#0D0D0D]">
                  {oneTimePassword.email}
                </span>
              </div>
              {oneTimePassword.identifier && (
                <div className="flex justify-between">
                  <span className="text-[#73655D]">NIM/NIDN/NIP:</span>
                  <span className="font-mono text-[#0D0D0D]">
                    {oneTimePassword.identifier}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#73655D]">Role:</span>
                <span className="font-bold text-[#710912]">
                  {oneTimePassword.role}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0D0D] text-white space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#EFE5D2]/70 block">
                Kata Sandi Sementara (Wajib Diganti Saat Login Pertama)
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="font-mono text-base font-bold tracking-wider text-[#EFE5D2] select-all">
                  {oneTimePassword.generatedPassword}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      oneTimePassword.generatedPassword
                    );
                    setCopiedOtp(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold text-white cursor-pointer"
                >
                  {copiedOtp ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#544942] leading-relaxed">
              Salin dan berikan kredensial ini kepada pengguna terkait. Sistem
              tidak menyimpan kata sandi dalam bentuk teks biasa dan pengguna
              otomatis diarahkan ke halaman ganti kata sandi saat login
              pertama.
            </p>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setOneTimePassword(null)}
                className="w-full py-2.5 rounded-2xl bg-[#710912] hover:bg-[#570000] text-white text-xs font-semibold cursor-pointer"
              >
                Saya Sudah Menyimpan Kata Sandi Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: CSV Import with Per-Row Validation Preview & Error Report */}
      {csvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2D9C8] max-w-4xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0D0D0D]">
                  Impor Massal Pengguna via CSV
                </h2>
                <p className="text-xs text-[#73655D]">
                  Format kolom: <code>name, email, identifier, role</code>.
                  Setiap baris divalidasi dengan Zod sebelum disimpan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCsvModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#FAF7F2]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {csvErrorBanner && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{csvErrorBanner}</span>
              </div>
            )}

            {!csvImportedCredentials ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-1 space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E2D9C8]">
                    <div className="text-xs font-bold text-[#0D0D0D]">
                      1. Unggah File CSV
                    </div>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleCsvFileUpload}
                      className="block w-full text-xs text-[#544942] file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#710912] file:text-white hover:file:bg-[#570000] cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={handleDownloadCsvTemplate}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#E2D9C8] bg-white hover:bg-[#EFE5D2]/40 text-xs font-semibold text-[#0D0D0D] cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#710912]" />
                      <span>Unduh Template CSV</span>
                    </button>
                    <div className="text-[11px] text-[#73655D] space-y-1 pt-2 border-t border-[#E2D9C8]">
                      <p className="font-semibold text-[#0D0D0D]">
                        Role yang diizinkan untuk akun Anda:
                      </p>
                      <p className="font-mono text-[10px]">
                        {manageableRoles.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-2">
                    <label className="block text-xs font-bold text-[#0D0D0D]">
                      2. Isi / Tempel Data CSV (name, email, identifier, role)
                    </label>
                    <textarea
                      rows={6}
                      value={csvText}
                      onChange={(e) => {
                        setCsvText(e.target.value);
                        setCsvPreviewRows(null);
                      }}
                      placeholder={`name,email,identifier,role\nBudi Santoso,budi@mhs.pelitabangsa.ac.id,312410001,MAHASISWA\nDr. Hendra S.H.,hendra@pelitabangsa.ac.id,0412088901,DOSEN`}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] text-xs font-mono focus:outline-none focus:border-[#710912]"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={isPending || !csvText.trim()}
                        onClick={handlePreviewCsv}
                        className="px-4 py-2 rounded-2xl bg-[#0D0D0D] hover:bg-[#710912] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                      >
                        {isPending
                          ? "Memvalidasi Baris..."
                          : "Validasi & Tampilkan Pratinjau"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview & Error Report Table */}
                {csvPreviewRows && (
                  <div className="space-y-3 pt-3 border-t border-[#E2D9C8]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          Valid: {csvValidCount} baris
                        </span>
                        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                          Error: {csvErrorCount} baris
                        </span>
                      </div>
                      <span className="text-[11px] text-[#73655D]">
                        Hanya baris berstatus Valid yang akan di-commit ke
                        database.
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto rounded-2xl border border-[#E2D9C8]">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-[#FAF7F2] border-b border-[#E2D9C8] text-[10px] font-bold uppercase text-[#73655D] sticky top-0">
                          <tr>
                            <th className="py-2.5 px-3">Baris</th>
                            <th className="py-2.5 px-3">Nama</th>
                            <th className="py-2.5 px-3">Email</th>
                            <th className="py-2.5 px-3">Identifier</th>
                            <th className="py-2.5 px-3">Role</th>
                            <th className="py-2.5 px-3">Status &amp; Laporan Validasi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#FAF7F2]">
                          {csvPreviewRows.map((r) => (
                            <tr
                              key={r.rowNumber}
                              className={
                                r.valid ? "bg-white" : "bg-rose-50/50"
                              }
                            >
                              <td className="py-2 px-3 font-mono">
                                #{r.rowNumber}
                              </td>
                              <td className="py-2 px-3 font-medium">
                                {r.name || "—"}
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">
                                {r.email || "—"}
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px]">
                                {r.identifier || "—"}
                              </td>
                              <td className="py-2 px-3 font-bold">{r.role}</td>
                              <td className="py-2 px-3">
                                {r.valid ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Siap Diimpor
                                  </span>
                                ) : (
                                  <ul className="list-disc list-inside text-rose-700 text-[11px] space-y-0.5">
                                    {r.errors.map((err, i) => (
                                      <li key={i}>{err}</li>
                                    ))}
                                  </ul>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setCsvModalOpen(false)}
                        className="px-4 py-2.5 rounded-2xl border border-[#E2D9C8] text-xs font-semibold text-[#544942]"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        disabled={isPending || csvValidCount === 0}
                        onClick={handleCommitCsv}
                        className="px-5 py-2.5 rounded-2xl bg-[#710912] hover:bg-[#570000] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                      >
                        {isPending
                          ? "Mengimpor ke Database..."
                          : `Commit Impor (${csvValidCount} Pengguna Valid)`}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* One-Time Batch Credentials Result after CSV Commit */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950">
                      Impor CSV Selesai ({csvImportedCredentials.length} Akun
                      Dibuat)
                    </h3>
                    <p className="text-xs text-emerald-800">
                      PENTING: Unduh atau salin daftar kata sandi awal di bawah
                      ini sekarang. Kata sandi hanya ditampilkan SEKALI!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadImportedCredentials}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#710912] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh CSV Kredensial Awal</span>
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto rounded-2xl border border-[#E2D9C8]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-[#E2D9C8] text-[10px] font-bold uppercase text-[#73655D] sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Nama</th>
                        <th className="py-2.5 px-3">Email</th>
                        <th className="py-2.5 px-3">Identifier</th>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">Kata Sandi Awal (Sekali Tampil)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FAF7F2]">
                      {csvImportedCredentials.map((cred) => (
                        <tr key={cred.id}>
                          <td className="py-2 px-3 font-semibold">
                            {cred.name}
                          </td>
                          <td className="py-2 px-3 font-mono text-[11px]">
                            {cred.email}
                          </td>
                          <td className="py-2 px-3 font-mono text-[11px]">
                            {cred.identifier || "—"}
                          </td>
                          <td className="py-2 px-3 font-bold text-[#710912]">
                            {cred.role}
                          </td>
                          <td className="py-2 px-3 font-mono font-bold bg-[#FAF7F2] select-all">
                            {cred.generatedPassword}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setCsvModalOpen(false);
                      setCsvImportedCredentials(null);
                      setCsvPreviewRows(null);
                      setCsvText("");
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-[#0D0D0D] text-white text-xs font-semibold cursor-pointer"
                  >
                    Selesai &amp; Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

