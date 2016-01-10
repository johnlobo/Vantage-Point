/*!
 *
 * Vantage Point
 *
 */

 function exists_cookie(){
 	if (/(^|;)\s*vp=/.test(document.cookie)) {
 		alert("Hello again!");
 	} else {
    document.cookie = "vp=true; max-age=" + 60 * 60 * 24 * 10; // 60 seconds to a minute, 60 minutes to an hour, 24 hours to a day, and 10 days.
    alert("This is your first time!");
	}
}
