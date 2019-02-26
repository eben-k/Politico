export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS parties
    (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      hqAddress VARCHAR(250) NOT NULL,
      logoUrl TEXT,
      email VARCHAR(250) NOT NULL,
      phone VARCHAR(100) NOT NULL
    )
  `,
};
