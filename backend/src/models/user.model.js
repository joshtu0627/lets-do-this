import mysql from "mysql2";
import bcrypt from "bcrypt";

import { dbConfig } from "../config/db.config.js";

const signup = async (user) => {
  console.log(user);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  // set hashed password
  user.password = hashedPassword;

  const connection = mysql.createConnection(dbConfig);
  // console.log(dbConfig);
  // console.log(connection);
  console.log(process.env.DBHOST);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [user.email],
      (err, rows) => {
        console.log(user.email);
        if (rows && rows.length > 0) {
          reject("user already exists");
        }
        connection.query(`INSERT INTO user SET ?`, [user], (err, result) => {
          if (err) {
            // console.log(err);
            reject(err);
          }

          // connection.end();
          resolve(result.insertId);
        });
      }
    );
  });
};

const signin = async (email, password) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      (err, rows, fields) => {
        connection.end();
        if (err) {
          reject(err);
        }

        if (rows.length === 0) {
          reject("user not found");
        }

        const hashedPassword = rows[0].password;

        // compare password to check if it is correct
        bcrypt.compare(password, hashedPassword).then((result) => {
          if (result) {
            resolve(rows[0]);
          } else {
            reject("wrong password");
          }
        });
      }
    );
  });
};

const getUserById = async (id) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user WHERE id = ?`, [id], (err, rows) => {
      connection.end();
      if (err) {
        reject(err);
      }

      if (rows.length === 0) {
        reject("wrong token");
      }

      resolve(rows[0]);
    });
  });
};

const getUserByExpertise = async (type) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE expertise = ?`,
      [type],
      (err, rows) => {
        // connection.end();
        if (err) {
          console.log(err);
          reject(err);
        }

        if (rows.length === 0) {
          reject("no user found");
        }

        resolve(rows);
      }
    );
  });
};

// export model functions
const userModel = {
  signup,
  signin,
  getUserById,
  getUserByExpertise,
};

export default userModel;
