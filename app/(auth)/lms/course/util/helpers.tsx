export function countByType<T, K extends keyof T>(items: T[], key: K) {
  return items.reduce<Record<string, number>>((acc, item) => {
    const value = String(item[key]); // ensure it's a string key
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

export function getModuleInfo(lectures?: number, quizzes?: number): string {
  // Changed return type to string
  const lec = lectures ?? 0;
  const quiz = quizzes ?? 0;

  if (lec === 0 && quiz === 0) {
    return "Module is empty";
  }

  if (lec === 0) {
    return `${quiz} quiz${quiz !== 1 ? "zes" : ""}`;
  }

  if (quiz === 0) {
    return `${lec} lecture${lec !== 1 ? "s" : ""}`;
  }

  return `${lec} lecture${lec !== 1 ? "s" : ""}, ${quiz} quiz${
    quiz !== 1 ? "zes" : ""
  }`;
}

// utils/countErrors.ts
export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function hasMessage(x: unknown): x is { message: unknown } {
  return isRecord(x) && "message" in x;
}

/**
 * Recursively count error leaves (objects that contain a `message`) inside
 * the RHF/Zod error tree.
 */
export function countErrors(error: unknown): number {
  if (error == null) return 0;

  // Leaf: object that contains a message -> count 1
  if (hasMessage(error)) {
    const m = error.message;
    // if there's any message-like value count it as one error
    if (typeof m === "string" || typeof m === "number" || m !== undefined) {
      return 1;
    }
  }

  // If it's an array (e.g. items / sections), sum each element
  if (Array.isArray(error)) {
    return error.reduce<number>((acc, val) => acc + countErrors(val), 0);
  }

  // If it's a plain object (fields), sum its values
  if (isRecord(error)) {
    const values = Object.values(error); // unknown[]
    return values.reduce<number>((acc, val) => acc + countErrors(val), 0);
  }

  return 0;
}

type ErrorSummary = { count: number; messages: string[] };

export function countErrorsMessage(error: unknown): ErrorSummary {
  if (error == null) return { count: 0, messages: [] };

  // Leaf: object that contains a message
  if (hasMessage(error)) {
    const m = error.message;
    if (typeof m === "string" || typeof m === "number" || m !== undefined) {
      return { count: 1, messages: [String(m)] };
    }
  }

  // Handle arrays
  if (Array.isArray(error)) {
    return error.reduce<ErrorSummary>(
      (acc, val) => {
        const res = countErrorsMessage(val);
        return {
          count: acc.count + res.count,
          messages: [...acc.messages, ...res.messages],
        };
      },
      { count: 0, messages: [] },
    );
  }

  // Handle plain objects
  if (isRecord(error)) {
    const values = Object.values(error);
    return values.reduce<ErrorSummary>(
      (acc, val) => {
        const res = countErrorsMessage(val);
        return {
          count: acc.count + res.count,
          messages: [...acc.messages, ...res.messages],
        };
      },
      { count: 0, messages: [] },
    );
  }

  return { count: 0, messages: [] };
}
