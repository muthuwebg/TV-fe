const verifyAjaxRequest = (req, res, next) => {
	if (req.xhr)
		next();
	else
		res.status(401).send({ status: "unauthorized" });
};

const checkLoginStatus = (req, res, next) => {
	if (req.session && req.session.userInfo && req.session.userInfo.isLoggedIn)
		next();
	else
		res.redirect("/");
};

module.exports = {
	verifyAjaxRequest: verifyAjaxRequest,
	checkLoginStatus: checkLoginStatus
};