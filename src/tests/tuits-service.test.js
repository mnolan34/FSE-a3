/**
 * @jest-environment node
 */
import {
    createTuit, deleteTuitByText,
    findTuitById, deleteTuit,
    findAllTuits
} from "../services/tuits-service";

import {
    createUser
} from "../services/users-service";

//create a fake User
const dummyUser = {
    username: 'TWRP',
    password: 'lifeParty',
    email: 'phobos@music.com'
}


describe('can create tuit with REST API', () => {

    //Create Fake Tuit
    const mockTuit = {
        tuit: 'Here is an example tuit!'
    };

    //As mentioned in Piazza 307, create new tuit delete
    beforeAll(()=> {
        return deleteTuitByText(mockTuit.tuit);
    });
    afterAll(()=>{
        return deleteTuitByText(mockTuit.tuit);
    });

    test('can insert with REST API', async() => {
        //insert dummyUser into Database
        const newUser = await createUser(dummyUser);
        //insert dummyTuit into Database
        const newTuit = await createTuit(newUser._id, mockTuit.tuit);

        expect(newTuit).toEqual(mockTuit);
        //expect(newTuit.postedBy).toEqual(newUser._id);
    });

});

describe('can delete tuit wtih REST API', () => {
    // Create a Fake User
    const markiplier = {
        username: 'markiplier',
        password: 'letsPlay',
        email: 'mark@youtube.com'
    };
    //Create Fake Tuit
    const markTuit = {
        tuit: 'Ill see you! in the next video. BUHBYE',
        postedBy: markiplier.username
    };

    beforeAll(()=> {
        return createTuit(markTuit);
    });

    afterAll(()=>{
        return deleteTuit(markTuit);
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