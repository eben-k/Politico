export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS offices
    (
      id SERIAL PRIMARY KEY,
      type VARCHAR(150) NOT NULL,
      name VARCHAR(150) NOT NULL

    )
  `,
}
