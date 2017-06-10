/**
 * Created by ch_su_000 on 05/06/2017.
 */

var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server')
var userModel = mongoose.model('UserModel', UserSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}
function findUserById(userId) {
    return userModel.findById(userId);
}
function findUserByUsername(username) {
    console.log("sfsdfs");
    return userModel.findOne({"username":username});
}
function findUserByCredentials(username, password) {
    return userModel.findOne({username:username, password: password});
}
function updateUser(userId, newUser)
{
    return userModel.update({_id: userId},{$set:newUser});
}
function deleteUser(userId) {

    return userModel.findById({_id: userId})
        .then(function (user) {
            var websitesOfUser = user.websites;
            return deleteChildren(websitesOfUser, userId);
        }, function (err) {
            return err;
        });
}
function deleteChildren(websitesOfUser, userId) {
    if (websitesOfUser.length == 0) {
        return userModel.remove({_id: userId})
            .then(function (response) {
                if (response.result.n == 1 && response.result.ok == 1) {
                    return response;
                }
            }, function (err) {
                return err;
            });
    }
}

function addWebsite(userId, websiteId)
{
    return userModel.findById(userId)
        .then(function(user)
    {
       user.websites.push(websiteId);
       return user.save();
    });
}