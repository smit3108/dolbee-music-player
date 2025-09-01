const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccoundKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
