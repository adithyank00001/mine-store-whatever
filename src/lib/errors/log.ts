export type ErrorCategory =
  | "validation"
  | "rate_limit"
  | "payment"
  | "database"
  | "unknown";

type LogServerErrorInput = {
  errorId: string;
  route: string;
  category: ErrorCategory;
  message: string;
};

export function logServerError(input: LogServerErrorInput) {
  console.error(
    JSON.stringify({
      level: "error",
      errorId: input.errorId,
      route: input.route,
      category: input.category,
      message: input.message,
      timestamp: new Date().toISOString(),
    }),
  );
}

