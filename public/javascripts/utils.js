const ajaxCall = (url, method="GET", json={}, cb) => {
	$.ajax({
		url: url,
		method: method,
		data: json,
		success: response => {
			if (typeof cb === "function")
				cb(response);
		},
		error: err => {
			if (err.responseJSON && err.responseJSON.reload === true)
				window.location.reload();
			else if (typeof cb === "function")
				cb({ status: "error", data: {} });
		},
	});
};

export {
	ajaxCall
};