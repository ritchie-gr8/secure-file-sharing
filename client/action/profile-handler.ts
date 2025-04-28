'use server'

import { withActionHandler } from "@/utils/action-utils";
import { GlobalApiCall } from "@/utils/global-api-call";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getMe() {
  return withActionHandler(async () => {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/user/me`,
      options: {
        method: "get",
        cache: "no-store",
      },
    });
    return response;
  });
}

export async function updateUserName({ name }: { name: string }) {
  return withActionHandler(async () => {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/user/name`,
      options: {
        method: "put",
        body: JSON.stringify({ name }),
        cache: "no-store",
      },
    });
    return response;
  });
}

export async function updateUserPassword({
  old_password,
  new_password,
  new_password_confirm,
}: {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}) {
  return withActionHandler(async () => {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/user/password`,
      options: {
        method: "put",
        body: JSON.stringify({
          old_password,
          new_password,
          new_password_confirm,
        }),
        cache: "no-store",
      },
    });
    return response;
  });
}
