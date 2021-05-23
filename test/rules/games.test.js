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

  it('should succeed to Create a game, with correct data', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    await firebase.assertSucceeds(
      db.collection('games').add({
        player1_name: 'a name',
        player1_id: 'myAuth',
        player2_name: '',
        active: true,
      }),
    );
  });

  it('should fail to Create a game, with wrong data', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    await firebase.assertFails(
      db.collection('games').add({
        player1_name: 'a name',
        player1_id: 'myAuth',
        player2_name: '',
        active: false,
      }),
    );
  });

  it('should fail to Create a game, with out auth', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
      })
      .firestore();
    await firebase.assertFails(
      db.collection('games').add({
        player1_name: 'a name',
        player1_id: 'myAuth',
        player2_name: '',
        active: true,
      }),
    );
  });

  it('should succeed to Update a game, with correct data', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    db.collection('games').doc('game').set({
      player1_name: 'a name',
      player1_id: 'myAuth',
      player2_name: '',
      active: true,
    });
    await firebase.assertSucceeds(
      db.collection('games').doc('game').update({player2_id: 'myAuth'}),
    );
  });

  it('should fail to Update a game, with non matching ids', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    db.collection('games').doc('game').set({
      player1_name: 'a name',
      player1_id: 'myAuth',
      player2_name: '',
      active: true,
    });
    await firebase.assertFails(
      db.collection('games').doc('game').update({player2_id: 'anotherAuth'}),
    );
  });

  it('should succeed to Update a game with moves, with correct data', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    db.collection('games').doc('game1').set({
      player1_name: 'a name',
      player1_id: 'myAuth',
      player2_id: 'player2ID',
      player2_name: '',
      active: true,
      turn: 'myAuth',
    });

    await firebase.assertSucceeds(
      db.collection('games').doc('game1').update({
        moves: [],
        turn: 'player2ID',
      }),
    );
  });
  it('should succeed to Update a game with moves, when it is not your turn', async () => {
    const db = firebase
      .initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth: {uid: 'myAuth'},
      })
      .firestore();
    db.collection('games').doc('game1').set({
      player1_name: 'a name',
      player1_id: 'myAuth',
      player2_id: 'player2ID',
      player2_name: '',
      active: true,
      turn: 'not-myAuth',
    });

    await firebase.assertFails(
      db.collection('games').doc('game1').update({
        moves: [],
        turn: 'player2ID',
      }),
    );
  });
});
