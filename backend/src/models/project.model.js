import mysql from "mysql2";
import bcrypt from "bcrypt";

import { dbConfig } from "../config/db.config.js";

const getProjectById = async (id) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM project WHERE id = ${id}`,
      (err, rows, fields) => {
        connection.end();
        if (err) {
          reject(err);
        }

        resolve(rows[0]);
      }
    );
  });
};

// export model functions
const projectModel = {
  getProjectById,
};

export default projectModel;
