import mysql from "mysql2";
import bcrypt from "bcrypt";

import { dbConfig } from "../config/db.config.js";

import projectModel from "./project.model.js";

const getProjectsByUserId = async (id) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM user_project WHERE userId = ${id}`,
      async (err, rows, fields) => {
        connection.end();
        if (err) {
          reject(err);
        }
        if (rows.length === 0) {
          resolve(rows);
        }

        let result = [];
        try {
          // 將每個異步操作都放入到陣列中
          const promises = rows.map(async (row) => {
            let project = await projectModel.getProjectById(row.projectId);
            project.role = row.role;
            return project;
          });

          // 使用 Promise.all 等待所有異步操作完成
          const projects = await Promise.all(promises);
          resolve(projects);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// export model functions
const projectUserModel = {
  getProjectsByUserId,
};

export default projectUserModel;
