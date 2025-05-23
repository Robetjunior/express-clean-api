import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);  // 🔸 Hasheia senha com salt de 10
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);  // 🔸 Compara senha e hash
};
