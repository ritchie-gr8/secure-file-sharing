import { redirect } from "next/navigation";
import { handleApiError } from "./handle-api-error";

export const withActionHandler = async <T>(action: () => Promise<T>) => {
  try {
    return await action();
  } catch (error) {
    const { status, message, location } = handleApiError(error);

    if (location) {
      redirect(location);
    }

    return {
      status,
      message,
    };
  }
};
