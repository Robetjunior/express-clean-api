import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret_key';  // 🔸 Segredo do token

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });  // 🔸 Gera token com expiração de 1h
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);  // 🔸 Verifica se token é válido
};
