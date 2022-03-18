/**
 * @jest-environment node
 */
import {
    createTuit, deleteTuitByText,
    findTuitById, deleteTuit,
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
        return deleteTuit(mockTuit);
    });

    test('can delete with REST API', async() => {
       const status = await deleteTuit(newTuit._id);

       expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

//Test One, failed, brought back WHOLE user, not just ID
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

        const existingTuit = await findTuitById(newTuit._id);
        console.log(existingTuit.postedBy);

        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        expect(existingTuit.postedBy).toEqual(newTuit.postedBy);
    });
});

describe('can retrieve all tuits with REST API', () => {
  const listOfTuits = [
      'O I bid farewell to the port and the land',
      'And I paddle away from brave Englands white sands',
      'To search for my long ago forgotten friends',
      'To search for the place I hear all sailors end'
  ];

  beforeAll( async ()=>

    newUser = await createUser(dummyUser)
    listOfTuits.map(tuit=>
    createTuit({
        postedBY: newUser._id,
        tuit,
    })
    )
  );

  afterAll(()=>
    listOfTuits.map(tuit =>
        deleteTuit(tuit)
    )
  );

  test('retrieve all tuits from REST API', async () => {
      const tuits = await findAllTuits();

      expect(tuits.length).toBeGreaterThanOrEqual(listOfTuits.length);

      const tuitsWeInserted = listOfTuits.filter(
          tuitExample => listOfTuits.indexOf(tuit.tuit) >= 0 );

      tuitsWeInserted(tuit => {
          const tuitExample = listOfTuits.find(tuit => tuit === tuit.tuit);
          expect(tuitExample.tuit).toEqual(tuit);
          expect(tuitExample.postedBy).toEqual(SeaShanty);
      })
  })
});