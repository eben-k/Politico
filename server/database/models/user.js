export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users
    (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(100) NOT NULL,
      lastname VARCHAR(100) NOT NULL,
      email VARCHAR(250) UNIQUE NOT NULL,
      password VARCHAR(250) NOT NULL,
      phoneNumber VARCHAR(150),
      isadmin BOOLEAN NOT NULL DEFAULT FALSE,
      passportUrl TEXT NOT NULL
    )
  `,
};
