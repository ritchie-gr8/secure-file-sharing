import { useCurrentUserServer } from "@/hooks/use-current-user-server";
import { RedirectError } from "./error-utils";

interface GlobalApiCallProps {
  url: string;
  options?: RequestInit;
}

export const GlobalApiCall = async ({
  url,
  options = {},
}: GlobalApiCallProps) => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const session = await useCurrentUserServer();

    const token = session?.accessToken ?? null;

    console.log('url', url)
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 401) {
      throw new RedirectError(302, "/logout", "session expired");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("fetch Error:", error);
    throw error;
  }
};
