import * as admin from 'firebase-admin'

var serviceAccount = require("../../../../phelyppe-services-firebase-adminsdk-fetgg-be41e4591d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



export const database = admin.firestore()