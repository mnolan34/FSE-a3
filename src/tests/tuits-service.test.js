/**
 * @jest-environment node
 */
import {
    createTuit,
    findTuitById,
    deleteTuit,
    findAllTuits
} from "../services/tuits-service";

import {
    createUser, deleteUsersByUsername
} from "../services/users-service";

//create a fake User
const dummyUser = {
    username: 'Pringles',
    password: 'chip123',
    email: 'mustache@snacks.com'
}

//Create Fake Tuit
const mockTuit = {
    _id: "62184c059eb449f9c82c1ed1",
    tuit: "Here is an example tuit!",
    postedBy: ""
};

let newUser = "";
let newTuit = "";

//Passed
describe('can create tuit with REST API', () => {

    //As mentioned in Piazza 307, mock tuit number or delete it
    beforeAll(async ()=> {
        //Insert user into DB
        newUser = await createUser(dummyUser);
        mockTuit.postedBy = newUser._id;
        return(deleteTuit(mockTuit._id));
    });

    afterAll(()=>{
        deleteTuit(mockTuit._id);
        return(deleteUsersByUsername('Pringles'));
    });

    test('can insert with REST API', async() => {
        //insert dummyTuit into Database
        newTuit = await createTuit(mockTuit.postedBy, mockTuit);

        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    });
});

//Passed
describe('can delete tuit wtih REST API', () => {

    beforeAll(async ()=> {
        //Insert user into DB
        newUser = await createUser(dummyUser);
        mockTuit.postedBy = newUser._id;
        //insert dummyTuit into Database
        return(newTuit = await createTuit(mockTuit.postedBy, mockTuit));
    });

    afterAll(()=>{
        deleteUsersByUsername('Pringles');
        return deleteTuit(mockTuit._id);
    });

    test('can delete with REST API', async() => {
       const status = await deleteTuit(newTuit._id);

       expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

//Passed
describe('can retrieve a tuit by their primary key with REST API', () => {

    beforeAll(async ()=> {
        newUser = await createUser(dummyUser);
        return(mockTuit.postedBy = newUser._id);
    });

    afterAll(()=>{
        deleteUsersByUsername('Pringles');
        return deleteTuit(mockTuit._id);
    });

    test('can find a tuit via ID with REST API', async() => {
        //new tuit created with mockTuit.postedBy, which is made with newuser._id
        newTuit = await createTuit(mockTuit.postedBy, mockTuit);

        expect(newTuit._id).toEqual(mockTuit._id);
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);
        //console.log(newTuit);

        let existingTuit = await findTuitById(newTuit._id);
        //console.log(existingTuit);

        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        //Professors Model, stored as a User for PostedBy
        expect(existingTuit.postedBy._id).toEqual(newTuit.postedBy);
    });
});


//Create Fake Tuit
const firstTuit = {
    _id: "62184c059eb449f9c82c1ed2",
    tuit: "Let's make a list",
    postedBy: ""
};

//Create Fake Tuit
const secondTuit = {
    _id: "62184c059eb449f9c82c1ed3",
    tuit: "to test how the tuits pull",
    postedBy: ""
};

//Create Fake Tuit
const thirdTuit = {
    _id: "62184c059eb449f9c82c1ed4",
    tuit: "in an async fashion!",
    postedBy: ""
};

let tuitOne = "";
let tuitTwo = "";
let tuitThree = "";

describe('can retrieve all tuits with REST API', () => {
  const listOfTuits = [
      firstTuit,
      secondTuit,
      thirdTuit
  ];

  beforeAll( async ()=> {

      newUser = await createUser(dummyUser);
      //have tuits with IDs
      firstTuit.postedBy = newUser._id;
      secondTuit.postedBy = newUser._id;
      thirdTuit.postedBy = newUser._id;
      //create tuits
      tuitOne = await createTuit(firstTuit.postedBy, firstTuit);
      tuitTwo = await createTuit(secondTuit.postedBy, secondTuit);
      return(tuitThree = await createTuit(thirdTuit.postedBy, thirdTuit));
  });

  afterAll(()=> {
      listOfTuits.map(tuit =>
          deleteTuit(tuit._id)
      )
      return (deleteUsersByUsername('Pringles'));
  });

  test('retrieve all tuits from REST API', async () => {

      const tuits = await findAllTuits();

      expect(tuits.length).toBeGreaterThanOrEqual(listOfTuits.length);

      //Look for users we made tuit with
      const tuitsWeInserted = tuits.filter(
          tuit => listOfTuits.indexOf(tuit) >= 0 );

      //Verify properties
      tuitsWeInserted.forEach(tuit => {
          const tuitExample = listOfTuits.find(tuit => tuit === tuit.tuit);
          expect(tuitExample.tuit).toEqual(tuit);
          expect(tuitExample.postedBy).toEqual(newUser);
      })
  })
});