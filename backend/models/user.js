const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'biography',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
});

const User = {
  async create(username, email, passwordHash) {
    const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at';
    const values = [username, email, passwordHash];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

const Biography = {
  async get() {
    const query = 'SELECT * FROM biography LIMIT 1';
    const result = await pool.query(query);
    return result.rows[0];
  }
};

module.exports = { User, Biography, pool };

