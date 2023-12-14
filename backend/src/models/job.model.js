import mysql from "mysql2";
import bcrypt from "bcrypt";
import axios from "axios";

import { dbConfig } from "../config/db.config.js";

import projectModel from "../models/project.model.js";

const allJob = async () => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise(async (resolve, reject) => {
    connection.query(`SELECT * FROM project_job`, async (err, rows, fields) => {
      if (err) {
        reject(err);
      }

      for (let job of rows) {
        let project = await projectModel.getProjectById(job.projectId);
        job.tagStr = project.tag.join(", ");
        job.image = project.image;
        job.name = project.name;
      }

      // connection.end(); // 確保資料庫連線被關閉

      console.log(rows);
      resolve(rows);
    });
  });
};

const getJobByType = async (type) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise(async (resolve, reject) => {
    connection.query(
      `SELECT * FROM project_job WHERE jobType = ?`,
      [type],
      async (err, rows, fields) => {
        if (err) {
          reject(err);
        }

        for (let job of rows) {
          let project = await projectModel.getProjectById(job.projectId);
          job.tagStr = project.tag.join(", ");
          job.image = project.image;
          job.name = project.name;
        }

        // connection.end(); // 確保資料庫連線被關閉

        console.log(rows);
        resolve(rows);
      }
    );
  });
};

// export model functions
const jobModel = {
  allJob,
  getJobByType,
};

export default jobModel;
