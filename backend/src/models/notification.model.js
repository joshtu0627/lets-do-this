import mysql from "mysql2";

import projectModel from "./project.model.js";

import { dbConfig } from "../config/db.config.js";

const getNotificationByUserId = async (userId) => {
  const connection = mysql.createConnection(dbConfig);
  console.log(userId);
  return new Promise(async (resolve, reject) => {
    connection.query(
      `SELECT * FROM notification WHERE userId = ${userId}`,
      async (err, rows, fields) => {
        if (err) {
          reject(err);
        }

        connection.end(); // 確保資料庫連線被關閉

        if (err) {
          reject(err);
        }
        if (rows.length === 0) {
          resolve(rows);
        }

        // console.log(rows);

        try {
          // 將每個異步操作都放入到陣列中
          const promises = rows.map(async (row) => {
            let project = await projectModel.getProjectById(row.projectId);
            row = {
              ...row,
              project: project,
            };
            return row;
          });

          // 使用 Promise.all 等待所有異步操作完成
          const rowsResult = await Promise.all(promises);
          console.log(rowsResult);
          resolve(rowsResult);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

const notificationModel = {
  getNotificationByUserId,
};

export default notificationModel;
