export const generate = (
  { length = 50 }: { length?: number } = { length: 50 }
) => {
  let random = Math.random().toString();

  random = random.split(".")[1];
  random = random.slice(0, length);

  return random;
};

export default { generate };
