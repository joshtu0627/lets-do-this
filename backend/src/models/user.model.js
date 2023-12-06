import mysql from "mysql2";
import bcrypt from "bcrypt";

import { dbConfig } from "../config/db.config.js";
import { json } from "express";

const signup = async (user) => {
  console.log(user);

  // default avatar
  user.image = "https://i.imgur.com/6VBx3io.png";

  // default about
  user.about = "I am a new user";

  // default banner
  user.bannerImage =
    "https://upload.wikimedia.org/wikivoyage/zh/6/6a/Default_Banner.jpg";

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
            console.log(err);
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

  console.log(email, password);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      (err, rows, fields) => {
        if (err) {
          reject(err);
        }

        if (rows.length === 0) {
          reject("user not found");
        }
        console.log(rows);
        const hashedPassword = rows[0].password;

        connection.end();
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
    // search for users with matching expertise
    // expertise is like ["design", "sculpting"]

    connection.query(
      `SELECT * FROM user WHERE skill LIKE ?`,
      [`%${type}%`],
      (err, rows) => {
        console.log(rows);
        connection.end();
        resolve(rows);
      }
    );
  });
};

const getAllUsers = async () => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM user`, (err, rows) => {
      connection.end();
      if (err) {
        reject(err);
      }

      if (rows.length === 0) {
        reject("no user found");
      }

      resolve(rows);
    });
  });
};

const getWorkById = async (id) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM work WHERE id = ?`, [id], (err, rows) => {
      connection.end();
      if (err) {
        reject(err);
      }

      if (rows.length === 0) {
        reject("no work found");
      }

      resolve(rows[0]);
    });
  });
};

const getUserByEmail = async (email) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
      (err, rows) => {
        connection.end();
        if (err) {
          reject(err);
        }

        if (rows.length === 0) {
          reject("user not found");
        }

        resolve(rows[0]);
      }
    );
  });
};

const correctPassword = (encryptedPassword, password) => {
  return bcrypt.compareSync(password, encryptedPassword);
};

const updateProfile = async (user) => {
  const connection = mysql.createConnection(dbConfig);

  // 创建基本的 SQL 语句和参数数组
  let sql =
    "UPDATE user SET name = ?, job = ?, location = ?, about = ?, resumeLink = ?, userPreferences = ?";
  let params = [
    user.name,
    user.job,
    user.location,
    user.about,
    user.resumeLink,
    user.userPreferences,
  ];

  // 如果 user.image 存在，则更新 image 字段
  if (user.image) {
    sql += ", image = ?";
    params.push(user.image);
  }

  // 如果 user.bannerImage 存在，则更新 bannerImage 字段
  if (user.bannerImage) {
    sql += ", bannerImage = ?";
    params.push(user.bannerImage);
  }

  // 添加 WHERE 子句
  sql += " WHERE id = ?";
  params.push(user.id);

  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      connection.end();
      if (err) {
        reject(err);
      } else {
        console.log("Profile updated");
        resolve(rows);
      }
    });
  });
};

// export model functions
const userModel = {
  signup,
  signin,
  getUserById,
  getUserByExpertise,
  getUserByEmail,
  updateProfile,
  getAllUsers,
  getWorkById,
  correctPassword,
};

export default userModel;
