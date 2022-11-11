import people from "./users.js"
let users = people;

// Controller invokes the findUsers function
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById)  // map path pattern (which maps the 'directory' after the users
                                              // directory to the uid parameter
    app.post('/api/users/', createUser)
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

//3.2 Sending query parameters to a Web server
const findUsers = (req, res) => {

    // get the type requested in the query.
    // We can get the type due to an encoding of the url such that we pass string parameters after question marks in
    //      the url
    const queryType = req.query.type

    // if some query was made via the URL...
    if (queryType) {

        const usersOfType = users.filter(u => u.type === queryType)
        res.json(usersOfType)                   // respond with the filtered json retrieved using the passed query

        res.json(users)                         // function responds with an array of users
        return
    }

    res.json(users)
}

//3.3 Sending path parameters to a Web server
const findUserById = (req, res) => {
    const userID = req.params.uid;      // the userID is passed in through the HTTP request
    const user = users.find(u => u._id === userID);
    res.json(user)
}

//4.3 Posting data to a Web server using Postman
const createUser = (req, res) => {

    // the new user's data is sent from the request as the request's body
    const newUser = req.body

    // stringify the current time as the id for the new user
    newUser._id = new Date().getTime() + ''

    // append the newly created user to the array of users (declared at top)
    users.push(newUser)

    // send back the new user to the client
    res.json(newUser)
}

//4.4 deleting data from a Web server using Postman
const deleteUser = (req, res) => {
    const userID = req.params['uid'];

    // filter out the user whose id matches the requested id to be deleted
    users = users.filter(usr => usr._id !== userID);
    res.sendStatus(200);
}

//4.5 Updating data in a Web server with Postman
const updateUser = (req, res) => {
    const userId = req.params['uid'];
    const updates = req.body;
    users = users.map((usr) =>
        usr._id === userId ?
            {...usr, ...updates} :  // if we find the user to be updated, post the updates
            usr                     // otherwise, just keep the usr as is
    );
    res.sendStatus(200);
}

export default UserController;