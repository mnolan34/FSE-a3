import {UserList} from "../../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../../services/users-service";
import axios from "axios";

//jest.mock('axios');

//Above commented out, replaced with below

const mock = jest.spyOn(axios, 'get');
mock.mockImplementation(() =>
    Promise.resolve({data: {users: MOCKED_USERS}}));

mock.mockRestore();  // restore original implementation

//Above was used from Piazza @279 To fix "then" async issue


const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

test('user list renders async', async () => {
  const users = await findAllUsers();
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);
  const linkElement = screen.getByText(/NASA/i);
  expect(linkElement).toBeInTheDocument();
})


//Below is commented out, because it was moved to a separate file

/*
test('user list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {users: MOCKED_USERS} }));

  const response = await findAllUsers();
  const users = response.users;

  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);

  const user = screen.getByText(/ellen_ripley/i);
  expect(user).toBeInTheDocument();
});

 */
