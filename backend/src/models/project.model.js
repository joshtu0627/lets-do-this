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

const createProject = async (project) => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO project (name,image,bannerImage, tag, members, about, progress,  hiring, progressTag, createAt ) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    let params = [
      project.name,
      project.image,
      project.bannerImage,
      project.tag,
      project.members,
      project.about,
      project.progress,
      project.hiring,
      project.progressTag,
      project.createAt,
    ];
    // let params = [
    //   project.name,
    //   project.image,
    //   project.bannerImage,
    //   project.tag,
    //   JSON.stringify(project.members),
    //   project.about,
    //   project.progress,
    //   JSON.stringify(project.hiring),
    //   JSON.stringify(project.progressTag),
    //   project.createAt,
    // ];
    // let sql = `INSERT INTO project (name,image,bannerImage, tag, members, about, progress, progressTag, createAt ) VALUES (?,?,?,?,?,?,?,?,?)`;
    // let params = [
    //   project.name,
    //   project.image,
    //   project.bannerImage,
    //   project.tag,
    //   project.members,
    //   project.about,
    //   project.progress,
    //   project.progressTag,
    //   project.createAt,
    // ];

    console.log(params);

    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }
      console.log(result.insertId);
      resolve(result.insertId);
    });
  });
};

// export model functions
const projectModel = {
  getProjectById,
  createProject,
};

export default projectModel;
