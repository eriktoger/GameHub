const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'gamehub-f36b8';
const correctInfo = {nickname: 'nn', favFood: 'ff', favAnimal: 'fa'};
const wrongInfo = {notNickname: 'nn'};
const correctBaseScore = {tictactoe_wins: 0, tictactoe_losses: 0};
const wrongBaseScore = {tictactoe_wins: 1, tictactoe_losses: 1};

const db = firebase
  .initializeTestApp({
    projectId: MY_PROJECT_ID,
    auth: {uid: 'correct-uid'},
  })
  .firestore();

beforeEach(async () => {
  await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
});

describe('Users tests', () => {
  it('should fail to Read user with auth but wrong uid ', async () => {
    const testDoc = db.collection('users').doc('wrong-uid');
    await firebase.assertFails(testDoc.get());
  });

  it('should fail to Write user wit with auth but wrong uid', async () => {
    const testDoc = db.collection('users').doc('wrong-uid');
    await firebase.assertFails(testDoc.set(correctInfo));
  });

  it('should succeed to Read user with auth and correct uid', async () => {
    const testDoc = db.collection('users').doc('correct-uid');
    await firebase.assertSucceeds(testDoc.get());
  });

  it('should succeed to update user with auth/uid and correct info', async () => {
    await db.collection('users').doc('correct-uid').set(correctBaseScore);
    const testDoc = db.collection('users').doc('correct-uid');
    await firebase.assertSucceeds(testDoc.update(correctInfo));
  });

  it('should fail to Write user wit with auth/uid but wrong info', async () => {
    await db.collection('users').doc('correct-uid').set(correctBaseScore);
    const testDoc = db.collection('users').doc('correct-uid');
    await firebase.assertFails(testDoc.set(wrongInfo));
  });

  it('should succeed to Write user with auth/uid and correct base score', async () => {
    await firebase.assertSucceeds(
      db.collection('users').doc('correct-uid').set(correctBaseScore),
    );
  });

  it('should fail to Write user with auth/uid but wrong base score', async () => {
    await firebase.assertFails(
      db.collection('users').doc('correct-uid').set(wrongBaseScore),
    );
  });

  it('should succeed to update user score with correct increment ', async () => {
    await db.collection('games').doc('game').set({
      player1_name: 'a name',
      player1_id: 'correct-uid',
      player2_name: '',
      active: true,
    });

    await db.collection('users').doc('correct-uid').set(correctBaseScore);
    const testDoc = db.collection('users').doc('correct-uid');

    await firebase.assertSucceeds(
      testDoc.update({tictactoe_wins: 1, tictactoe_losses: 0, game: 'game'}),
    );
  });

  it('should fail to update user score with wrong increment ', async () => {
    await db.collection('games').doc('game').set({
      player1_name: 'a name',
      player1_id: 'correct-uid',
      player2_name: '',
      active: true,
    });

    await db.collection('users').doc('correct-uid').set(correctBaseScore);
    const testDoc = db.collection('users').doc('correct-uid');

    await firebase.assertFails(
      testDoc.update({tictactoe_wins: 1, tictactoe_losses: 1, game: 'game'}),
    );
  });
});
