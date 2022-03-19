import Tuits from "../../components/tuits";
//The above was fixed by Piazza @342
import axios from "axios";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";

jest.mock('axios');

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