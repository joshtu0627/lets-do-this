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

            // 計算與現在時間的差距
            const now = new Date();
            const timeDiff = now - row.timestamp;
            const minuteDiff = Math.floor(timeDiff / 1000 / 60);
            const hourDiff = Math.floor(minuteDiff / 60);
            const dayDiff = Math.floor(hourDiff / 24);
            const monthDiff = Math.floor(dayDiff / 30);
            const yearDiff = Math.floor(monthDiff / 12);

            // 設定時間顯示格式
            let time = "";
            if (yearDiff > 0) {
              time = `${yearDiff} years ago`;
            } else if (monthDiff > 0) {
              time = `${monthDiff} months ago`;
            } else if (dayDiff > 0) {
              time = `${dayDiff} days ago`;
            } else if (hourDiff > 0) {
              time = `${hourDiff} hours ago`;
            } else if (minuteDiff > 0) {
              time = `${minuteDiff} minutes ago`;
            } else {
              time = "just now";
            }

            // 將計算後的時間差距加入到 row 物件中
            row = {
              ...row,
              timeDiff: time,
            };

            row = {
              ...row,
              project: project,
            };
            console.log(timeDiff);
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

const createNotification = async (notification) => {
  const connection = mysql.createConnection(dbConfig);

  console.log(notification);

  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO notification (userId, text, projectId, role, type, timestamp) VALUES (?,?,?,?,?,?)`;
    let params = [
      notification.userId,
      notification.text,
      notification.projectId,
      notification.role,
      notification.type,
      notification.timestamp,
    ];

    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }
      console.log(result.insertId);
      // connection.end(); // 確保資料庫連線被關閉
      resolve(result);
    });
  });
};

const deleteNotification = async (id) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM notification WHERE id = ?`;
    let params = [id];

    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }
      console.log(result);
      // connection.end(); // 確保資料庫連線被關閉
      resolve(result);
    });
  });
};

const notificationModel = {
  getNotificationByUserId,
  createNotification,
  deleteNotification,
};

export default notificationModel;
