import posts from "./tuits.js";
let tuits = posts;

export default (app) => {
    app.post("/api/tuits", createTuit);
    app.get("/api/tuits", findTuits);
    app.put("/api/tuits/:tid", updateTuit);
    app.delete("/api/tuits/:tid", deleteTuit);
}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = new Date().getTime()+'';
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
    tuits.push(newTuit);
    res.json(newTuit);
}

const findTuits = (req, res) => {
    // send the tuits back to the client
    res.json(tuits);
}

const updateTuit = (req, res) => {
    const tuitToUpdate = req.params['tid'];

    // the updates to the tuit are passed in the body
    const updates = req.body;

    // get the tuit requested for updating
    const tuitIndex = tuits.findIndex((t) => t._id === tuitToUpdate)

    // need to investigate this syntax
    // merging/updating old tuit with updates
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates}
    res.sendStatus(200);
}

const deleteTuit = (req, res) => {
    // 'filtering out' the tuit to be deleted
    const tuitToDelete = req.params['tid'];
    tuits = tuits.filter((tuit) => tuit._id !== tuitToDelete);
    res.sendStatus(200);
}