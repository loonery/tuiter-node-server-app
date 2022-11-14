import * as tuitsDAO from '../tuits/tuits-dao.js'
import TuitsSchema from "./tuits-schema.js";

export default (app) => {
    app.post("/api/tuits", createTuit);
    app.get("/api/tuits", findTuits);
    app.put("/api/tuits/:tid", updateTuit);
    app.delete("/api/tuits/:tid", deleteTuit);
}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit.topic = "tuiter"
    newTuit.userName = "Ryan Looney"
    newTuit.time = "now"
    newTuit.userImage = "../images/profile_images/tuiter_profile_picture.jpg";
    newTuit.liked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.likes = 0;
    newTuit.dislikes = 0;
    newTuit.userHandle = "@rloon";
    const insertedTuit = await tuitsDAO.createTuit(newTuit);
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    // send the tuits back to the client
    const tuits = await tuitsDAO.findTuits();
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    const tuitToUpdate = req.params['tid'];

    // the updates to the tuit are passed in the body
    const updates = req.body;

    // use the data access object to update the tuit in the database
    const status = await tuitsDAO.updateTuit(tuitToUpdate, updates);
    res.json(status);
}

const deleteTuit = async (req, res) => {
    // 'filtering out' the tuit to be deleted
    const tuitToDelete = req.params['tid'];
    const status = await tuitsDAO.deleteTuit(tuitToDelete)
    res.json(status);
}