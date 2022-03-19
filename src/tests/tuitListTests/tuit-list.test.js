import Tuits from "../../components/tuits";
//The above was fixed by Piazza @342
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../../services/tuits-service";
import axios from "axios";

//jest.mock('axios');
//Above commented out, replaced with below

const mock = jest.spyOn(axios, 'get');
mock.mockImplementation(() =>
    Promise.resolve({data: {users: MOCKED_USERS}}));

mock.mockRestore();  // restore original implementation

//Above was used from Piazza @279 To fix "then" async issue

const MOCKED_USERS = [
    {username:"alice", password: "alice123", email: "alice@wonderland.com"},
    {username: "bob", password: "bob234", email: "bob@marley.com"},
    {username: "charlie", password: "snoopy", email: "charlie@peanut.com"}
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: ""},
    {tuit: "bob's tuit", postedBy: ""},
    {tuit: "charlie's tuit", postedBy:""}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits = {MOCKED_TUITS}/>
      </HashRouter>
  );
  //Below needs to be fixed
  const tuit = screen.getByText(/alice's tuit/i);
  expect(tuit).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashROuter>
        <TuitList tuits = {tuits}/>
      </HashROuter>
  )
  const tuit = screen.getByText(/alice/i);
  expect(tuit).toBeInTheDocument();
})

//Section commented out, moved to mocked file
//Piazza @279 Recommended fix
/*
test('tuit list renders mocked', async () => {
  axios.get.mockImplementations(() =>
    Promise.resolve({data: {tuits: MOCKED_TUITS} }));
  const response = await findAllUsers();
  const users = response.users;
  render(
      <HashRouter>
          <TuitList tuits={tuits}/>
      </HashRouter>
  )
  const tuit = screen.getByText(/alices_tuit/i);
  expect(tuit).toBeInTheDocument();
});
*/