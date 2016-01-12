/*!
 *
 * Vantage Point
 *
 */

//
//	Config
//

//Global URL API Rest
var apiURL = "http://localhost:3000/api/"

	//
	//	Exists Cookie
	//
function exists_cookie() {
	if (/(^|;)\s*vp=/.test(document.cookie)) {
		alert("Hello again!");
	} else {
		//document.cookie = "vp=true; max-age=" + 60 * 60 * 24 * 10; // 60 seconds to a minute, 60 minutes to an hour, 24 hours to a day, and 10 days.
		console.log("No cookie present");
		createUser();
		alert("This is your first time!");
	}
}

function createRequest() {
	var result = null;
	if (window.XMLHttpRequest) {
		// FireFox, Safari, etc.
		result = new XMLHttpRequest();
		//if (typeof xmlhttp.overrideMimeType != 'undefined') {
		//	result.overrideMimeType('text/xml'); // Or anything else
		//}
	} else if (window.ActiveXObject) {
		// MSIE
		result = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		// No known mechanism -- consider aborting the application
	}
	return result;
}

//
// Create User
//
function createUser() {
	var req = createRequest(); // defined above
	// Create the callback:
	req.onreadystatechange = function () {
		if (req.readyState != 4)
			return; // Not there yet
		//if (req.status != 200) {
			// Handle request failure here...
		//	console.log("Error:" + req.status)
		//	return;
		//}
		
		// Request successful, read the response
		console.log("request successful");
		var resp = eval(req.responseText);
		console.log(resp);
		//document.cookie = "vp=true; max-age=" + 60 * 60 * 24 * 10; // 60 seconds to a minute, 60 minutes to an hour, 24 hours to a day, and 10 days.
	}
	//POST method
	console.log(apiURL + "users/");
	req.open("POST", apiURL + "/users/", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}
