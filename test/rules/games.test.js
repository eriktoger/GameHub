const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'gamehub-f36b8';

describe('Games tests', () => {
  it('should fail to Read games without auth', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
      })
      .firestore();
    const testDoc = db.collection('games').doc('a-uid');
    await firebase.assertFails(testDoc.get());
  });

  it('should succeed to Read games with auth', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    const testDoc = db.collection('games').doc('a-uid');
    await firebase.assertSucceeds(testDoc.get());
  });

  it('should fail to Write games, even with auth', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    const testDoc = db.collection('games').doc('a-uid');
    await firebase.assertFails(testDoc.set({foo: 'bar'}));
  });
});
