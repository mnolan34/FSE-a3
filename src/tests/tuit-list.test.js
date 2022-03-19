import {Tuits} from "../components/tuits";
//The above may be an error,  Piazza @342

import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <TuitList tuits = {MOCKED_TUITS}/>
      </HashRouter>
  );
  //Below needs to be fixed
  const tuit = screen.getByText();
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
