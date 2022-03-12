import {
    createTuit, findTuitByUser,
    findTuitById, deleteTuit,
    findAllTuits, updateTuit
} from "../services/tuits-service";


describe('can create tuit with REST API', () => {
  // Create a Fake User
    const tennyson = {
        username: 'alfred_tennyson',
        password: 'ulysses',
        email: 'tenny@poems.com'
    };
    //Create Fake Tuit
    const tennyTuit = {
        tuit: 'Some work of noble note, may yet be done, not unbecoming men that strove with Gods.',
        postedBy: tennyson.username
    };

    beforeAll(()=> {
        return deleteTuit(tennyTuit);
    });

    afterAll(()=>{
        return deleteTuit(tennyTuit);
    });

    test('can insert with REST API', async() => {
        const newTuit = await createTuit(tennyTuit);

        expect(newTuit.tuit).toEqual('Some work of noble note, may yet be done, not unbecoming men that strove with Gods.');
        expect(newTuit.postedBy).toEqual(tennyson);
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