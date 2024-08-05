const pool = require('../config/database');

class Task {
  static async create(userId, title, description) {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 AND deleted = false', [userId]);
    return result.rows;
  }

  static async update(id, userId, title, description) {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, description, id, userId]
    );
    return result.rows[0];
  }

  static async softDelete(id, userId) {
    const result = await pool.query(
      'UPDATE tasks SET deleted = true WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return result.rows[0];
  }
}

module.exports = Task;
