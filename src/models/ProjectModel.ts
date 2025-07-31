// const pool = require("../config/db");

// exports.insertProject = async (data) => {
//   const { name, start_date, end_date, description, technologies, image } = data;
//   const result = await pool.query(
//     `INSERT INTO projects (name, start_date, end_date, description, technologies, image)
//      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
//     [name, start_date, end_date, description, technologies, image]
//   );
//   return result.rows[0];
// };

// exports.getAllProjects = async () => {
//   const result = await pool.query(`SELECT * FROM projects ORDER BY id DESC`);
//   return result.rows;
// };
