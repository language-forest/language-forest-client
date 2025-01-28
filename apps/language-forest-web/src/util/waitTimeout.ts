export const waitTimeout = (millisecond: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};
