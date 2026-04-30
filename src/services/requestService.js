import { storageService } from "./storageService";

const REQUEST_DELAY = 500;

function createAbortError() {
  const error = new Error("Request aborted");
  error.name = "AbortError";
  return error;
}

export function simulateRequest(callback, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError());
      return;
    }

    const timer = window.setTimeout(() => {
      if (storageService.getApiFailure()) {
        reject(
          new Error(
            "Simulated API failure. Disable failure mode from the admin dashboard and try again."
          )
        );
        return;
      }

      try {
        resolve(callback());
      } catch (error) {
        reject(error);
      }
    }, REQUEST_DELAY);

    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          window.clearTimeout(timer);
          reject(createAbortError());
        },
        { once: true }
      );
    }
  });
}
