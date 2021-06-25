import Dexie from "dexie";

const db = new Dexie("files_database")
db.version(1).stores({upload: 'fileid'});

export default db;