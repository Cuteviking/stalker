/*
todo:
get contacts
if no geolocation use localStorage
if no internet do not update others location
friends
mark friends 
save friends location 
 
*/
function init(){
	    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLogLat);
    } else {
        // todo: inform that geolocation is not on. 
		console.log("Geolocation is not supported");
    }
}

function saveLogLat(myLatLng){
	//todo: save to database
	//save
	localStorage.latitude = myLatLng.coords.latitude;
	localStorage.longitude = myLatLng.coords.longitude;
	
	initMap(myLatLng);
}

function initMap(myLatLng){
	//myLatLng = {lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude};
	
	
	
	// Create a map object
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude},
		scrollwheel: false,
		zoom: 14
	});
	setUser(myLatLng, map);
}

function setUser(myLatLng, map){
	setMarker(myLatLng, map);
	setFriends(map);
}

function setFriends(map){
	/*for(var i=0; i<localStorage.friends.length; i++){
		setMarker(localStorage.friends[i],map);
	}*/
}

//---

function setMarker(myLatLng, map){
	// Create a marker and set its position
	var marker = new google.maps.Marker({
		map: map,
		position: {lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude},
		title: 'Hello World!'
	});
	return 0;
}
