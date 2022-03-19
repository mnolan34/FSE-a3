import Tuits from "../../components/tuits";
//The above was fixed by Piazza @342
import axios from "axios";
import {render, screen} from "@testing-library/react";
import {findAllTuits} from "../../services/tuits-service";
import {HashRouter} from "react-router-dom";

jest.mock('axios');

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

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );
    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});