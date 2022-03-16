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
    tuit: "Here is an example tuit!",
    postedBy: ""
};

let newUser = "";
let newTuit = "";


describe('can create tuit with REST API', () => {

    //As mentioned in Piazza 307, create new tuit delete
    beforeAll(()=> {
        newUser = createUser(dummyUser);
        mockTuit.postedBy = newUser;
        //deleteTuitByText(mockTuit.tuit);
        return(newUser);

    });
    afterAll(()=>{
        return(deleteUsersByUsername('Pringles'));
        //return deleteTuitByText(mockTuit.tuit);
    });

    test('can insert with REST API', async() => {
        //insert dummyTuit into Database
        console.log(mockTuit);
        newTuit = await createTuit(mockTuit.postedBy, mockTuit);
        console.log(newTuit);

        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser);
    });
});

describe('can delete tuit wtih REST API', () => {

    beforeAll(()=> {
        return createTuit(mockTuit);
    });

    afterAll(()=>{
        return deleteTuit(mockTuit);
    });

    test('can delete with REST API', async() => {
       const status = await
       deleteTuit(markTuit);

       expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // Create a Fake User
    const osPod = {
        username: 'Overly Sarcarstic Productions',
        password: 'DomeOfFlorence',
        email: 'osp@youtube.com'
    };
    //Create Fake Tuit
    const ospTuit = {
        tid: 567182,
        tuit: 'Welcome to another episode of the Time Heist!',
        postedBy: osPod.username
    };

    beforeAll(()=> {
        return deleteTuit(ospTuit);
    });

    afterAll(()=>{
        return deleteTuit(ospTuit);
    });

    test('can find a tuit via ID with REST API', async() => {
        const newTuit = await
            createTuit(ospTuit);

        expect(newTuit.tid).toEqual(ospTuit.tid);
        expect(newTuit.tuit).toEqual(ospTuit.tuid);
        expect(newTuit.postedBy).toEqual(ospTuit.postedBy);

        const existingTuit = await findTuitById(newTuit.tid);

        expect(existingTuit.tuit).toEqual(ospTuit.tuit);
        expect(existingTuit.postedBy).toEqual(ospTuit.postedBy);
    });
});

describe('can retrieve all tuits with REST API', () => {
  const listOfTuits = [
      'O I bid farewell to the port and the land',
      'And I paddle away from brave Englands white sands',
      'To search for my long ago forgotten friends',
      'To search for the place I hear all sailors end'
  ];

  beforeAll(()=>
    listOfTuits.map(tuit=>
    createTuit({
      tuit,
      postedBy: SeaShanty
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