export const chdir = async <T>(dir: string, fn: () => Promise<T>) => {
  process.chdir(dir);
  try {
    const value = await fn();
    return value;
  } finally {
    process.chdir(dir);
  }
};
