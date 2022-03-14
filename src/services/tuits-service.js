import axios from "axios";

const TUITS_API = "https://fse-a3.herokuapp.com/api/tuits";
const USERS_API = "https://fse-a3.herokuapp.com/api/users";

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    axios.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

//Create new Delete function to test create Tuit
export const deleteTuitByText = (tuitString) =>
    axios.delete(`${TUITS_API}/${tuitString}`)
        .then(response => response.data);
