var app = require('../../express');


var users =  [
    {_id: "123", username: "alice",    password: "alice", email: "alice@husky.neu.edu",  firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",  email: "bob@husky.neu.edu" ,   firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly", email: "charly@husky.neu.edu",  firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@husky.neu.edu",firstName: "Jose",   lastName: "Annunzi" },
    {_id: "567", username: "chaudhari", password: "chaudhari", email: "chaudhari.su@husky.neu.edu", firstName: "Sushmita",   lastName: "Chaudhari" }
];


app.get("/api/user/", findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.post('/api/user/', createUser);
app.delete('/api/user/:userId', deleteUser);

function updateUser(req, res)
{
    var user = req.body;
    for (var u in users)
    {
        var user = users[u];
        for (var u in users)
        {
            if (user._id === userId)
            {
                users[u].firstName = newUser.firstName;
                users[u].LastName = newUser.LastName;
                users[u].email = newUser.email;
                res.sendStatus(200);
            }
        }
        res.sendStatus(404);

    }
}

    function deleteUser(req, res)
    {
    var userId = req.params.userId;
        for (var u in users)
        {
            if (users[u]._id === userId)
            {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res)
    {
        var newUser = req.body;
        var len = users.length;
        var lastUser = users[len - 1];
        var newId = parseInt(lastUser._id) + 1;

        var newUserData =  {
            _id : newId.toString(),
            username : newUser.username,
            password : newUser.password
        };

        users.push(newUserData);
        res.json(newUserData);

    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        for (var u in users) {
            if (users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;
        var user = users.find(function (arrUser) {
            return arrUser.username == username;
        });

        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res) {

    var username = req.query.username;
    var password = req.query.password;

    var user = users.find(function (arrUser) {
        return arrUser.username == username && arrUser.password == password;
    });

    res.json(user);
    }

    function findUser(req, res)
    {
        console.log(921921921921912);
        var username = req.query['username'];
        var password = req.query['password'];
        console.log("sush");
        if(username && password)
        {
            console.log("fdgdfgh");
            findUserByCredentials(req, res);

        }
        else if(username)
        {
            findUserByUsername(req, res);
        }


}