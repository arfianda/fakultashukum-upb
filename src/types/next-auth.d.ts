import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { RoleType } from "@/lib/validations/auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    role: RoleType;
    labId?: number | null;
    mustChangePassword: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email?: string | null;
      role: RoleType;
      labId: number | null;
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    role: RoleType;
    labId: number | null;
    mustChangePassword: boolean;
  }
}

