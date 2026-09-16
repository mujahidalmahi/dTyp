export const sleep = (ms: number): Promise<void> => {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateDelayWithJitter = (baseDelayMs: number, jitterMs: number = 0): number => {
  if (jitterMs <= 0) return Math.max(0, baseDelayMs);
  const variance = (Math.random() * 2 - 1) * jitterMs;
  return Math.max(0, Math.round(baseDelayMs + variance));
};
