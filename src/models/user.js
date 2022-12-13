const pool = require("../configs/db");

const createUser = (data) => {
  const { username, email, phone, password, otp } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_users (username, email, phone, password, otp) VALUES ('${username}', '${email}', '${phone}', '${password}', '${otp}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getUserById = (id) => {
  return pool.query(
    `SELECT username, photo, phone, id FROM tbl_users WHERE id = '${id}'`
  );
};

const updateUser = (id, data) => {
  const { username, phone, photo } = data;
  return pool.query(
    `UPDATE tbl_users SET username = '${username}', phone = '${phone}', photo = '${photo}' WHERE id = '${id}'`
  );
};

const findUser = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const verificationAccount = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_users SET verification=1 WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  createUser,
  updateUser,
  findUser,
  verificationAccount,
  getUserById,
};
