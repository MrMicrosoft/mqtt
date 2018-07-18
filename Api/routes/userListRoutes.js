module.exports = function(app) {
    var userList = require('../controllers/userListController');

    app.route('/login')
        .post(userList.login);

    app.route('/register')
        .post(userList.register);

    app.route('/user/:_id')
        .put(userList.updateUser);

    app.route('/users/:username')
        .get(userList.getUser);
};