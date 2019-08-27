const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'cmol',
    password : 'Cmol@123',
    database : 'influx',
    charset  : 'utf8'
  }
});

const bookshelf = require('bookshelf')(knex);

exports.saveUser = userData => {
	console.log("userData");
	// console.log(bookshelf);
	var User = bookshelf.Model.extend({
		tableName: 'users',
	});

	var userResponse = {};

	User.forge({"name" : "test"}).fetch().then((user) => {
		// console.log(user);
		if (user == null) {
			User.forge(userData).save().then((user) => {
				console.log("ok saved");
				console.log(user);
				return userResponse.userSaved = true;
			}).catch(() => {
				console.log("err");
			});
		} else {
			return userResponse.emailTaken = true;
		}
	}).catch(() => {
		console.log("err");
	})
	/**/
	// console.log(res.locals.bookshelf);
};