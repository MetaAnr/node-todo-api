 const {User} = require("./../models/user.js")

var authenticate = (req, res, next) => {
	var token = req.header("x-auth");
	User.findByToken(token)
		.then( user => {
			if (!user) {
				return Promise.reject("No matching user found");
			}
			req.user = user;
			req.token = token;
			next()
		}).catch( e => res.status(401).send(e));
}

module.exports =  {authenticate};