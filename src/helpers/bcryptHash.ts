const bcrypt = require('bcrypt');
const { SALT } = process.env;

export const createHash = (password: string) => {
  const salt = bcrypt.genSaltSync(+`${SALT}`);
  return bcrypt.hashSync(password, salt);
}

export const checkHash = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};