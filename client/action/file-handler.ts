"use server";

import { withActionHandler } from "@/utils/action-utils";
import { GlobalApiCall } from "@/utils/global-api-call";

const API_BASE_URL = process.env.API_BASE_URL;

export async function sendFileList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return withActionHandler(async () => {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/list/send?page=${page}&limit=${limit}`,
      options: {
        method: "get",
        cache: "no-store",
      },
    });

    return response;
  });
}

export async function receiveFileList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return withActionHandler(async () => {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/list/receive?page=${page}&limit=${limit}`,
      options: {
        method: "get",
        cache: "no-store",
      },
    });

    return response;
  });
}

export async function searchEmail(query: string) {
  return withActionHandler(async () => {
    const response = await GlobalApiCall({
      url: `${API_BASE_URL}/users/search-emails?query=${query}`,
      options: {
        method: "get",
        cache: "no-store",
      },
    });

    return response;
  });
}
