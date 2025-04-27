"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { GlobalApiCall } from "@/utils/global-api-call";
import { AuthError } from "next-auth";

const API_BASE_URL = process.env.API_BASE_URL;

export async function LoginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const errorWithType = error as AuthError & { type?: string };
      switch (errorWithType.type) {
        case "CredentialsSignin":
          return { error: "Invalid Email or password!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}

export async function RegisterApi({
  name,
  email,
  password,
  passwordConfirm,
}: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  try {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/auth/register`,
      options: {
        method: "post",
        body: JSON.stringify({ name, email, password, passwordConfirm }),
        cache: "no-store",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function Logout() {
  await signOut({ redirectTo: "/login" });
}
