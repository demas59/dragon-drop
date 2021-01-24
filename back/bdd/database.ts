import sqlite3 from "sqlite3";

const BDSOURCE = "./db.sqlite";

const db = new sqlite3.Database(BDSOURCE, (err: Error | null) => {
  if (err) {
    console.error(err.message);
  } else {
    db.run(createImagesQuery, (err: Error) => {
      if (!err) {
        populateImages(db);
      }
    });
  }
});

const createImagesQuery = `CREATE TABME images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metadata text, 
    path text
)`;

function populateImages(db: sqlite3.Database) {
  const insert = "INSERT INTO images(id,metadata,path) VALUES (?,?,?)";

  db.run(insert, [1, "test", "asset/path/1"]);
}

export default db;
