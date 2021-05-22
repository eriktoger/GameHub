const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'gamehub-f36b8';
const db = firebase
  .initializeTestApp({
    projectId: MY_PROJECT_ID,
    auth: {uid: 'correct-uid'},
  })
  .firestore();

describe('Users tests', () => {
  it('should fail to Read user with auth but wrong uid ', async () => {
    const testDoc = db.collection('users').doc('wrong-uid');
    await firebase.assertFails(testDoc.get());
  });

  it('should fail to Write user wit with auth but wrong uid', async () => {
    const testDoc = db.collection('users').doc('wrong-uid');
    await firebase.assertFails(testDoc.set({foo: 'bar'}));
  });

  it('should succeed to Read user with auth and correct uid', async () => {
    const testDoc = db.collection('users').doc('correct-uid');
    await firebase.assertSucceeds(testDoc.get());
  });

  it('should succeed to Write user with auth and correct uid', async () => {
    const testDoc = db.collection('users').doc('correct-uid');
    await firebase.assertSucceeds(testDoc.set({foo: 'bar'}));
  });
});
