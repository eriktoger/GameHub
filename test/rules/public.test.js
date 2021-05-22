const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'gamehub-f36b8';

describe('Public tests', () => {
  it('should fail to Read public without auth ', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
      })
      .firestore();
    const testDoc = db.collection('public').doc('test');
    await firebase.assertFails(testDoc.get());
  });

  it('should succed to Read public with auth', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'uid'},
      })
      .firestore();
    const testDoc = db.collection('public').doc('a-file');
    await firebase.assertSucceeds(testDoc.get());
  });

  it('should fail to Write public with auth', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'uid'},
      })
      .firestore();
    const testDoc = db.collection('public').doc('a-file');
    await firebase.assertFails(testDoc.set({foo: 'bar'}));
  });
});
