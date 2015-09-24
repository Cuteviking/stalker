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
	
	if (navigator.geolocation) { // GPS ON 
        navigator.geolocation.getCurrentPosition(saveLogLat); // fetch coords
    } else {
        // todo: inform that geolocation is not on. 
		console.log("Geolocation is not supported");
    }
}

function saveLogLat(myLatLng){
	
	var myDataRef = new Firebase('https://sweltering-torch-5016.firebaseio.com/'); //firebase
	
	//todo: check if internet .username needs to be defined
	//save network . 
	myDataRef.on("child_added", function(snapshot) {
			if(snapshot.val().user.name == localStorage.username){
				console.log(snapshot.val().user.name);
				var myDataRefUser = new Firebase('https://sweltering-torch-5016.firebaseio.com/' + snapshot.key() + '/user/data');
				console.log('https://sweltering-torch-5016.firebaseio.com/' + snapshot.key() + '/user/data');
				myDataRefUser.update({lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude});
				
				//save local
				localStorage.latitude = myLatLng.coords.latitude;
				localStorage.longitude = myLatLng.coords.longitude;
				
				initMap();
			}
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	})	
}


function initMap(){
	//myLatLng = {lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude};
	
	// Create a map object
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: Number(localStorage.latitude), lng: Number(localStorage.longitude)},
		scrollwheel: false,
		zoom: 14
	});
	setUser(map);
}

function setUser(map){
	setMarker(map, localStorage.latitude, localStorage.longitude, localStorage.username);
	setFriends(map);
}

function setFriends(map){
	var myDataRef = new Firebase('https://sweltering-torch-5016.firebaseio.com/');
	
	myDataRef.on("child_added", function(snapshot) {
		setMarker(map,snapshot.val().user.data.lat,snapshot.val().user.data.lng,snapshot.val().user.name);
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	})
	
}

//---

function setMarker(map, latitude, longitude, name){
	// Create a marker and set its position
	var marker = new google.maps.Marker({
		map: map,
		position: {lat: Number(latitude), lng: Number(longitude)},
		title: name
	});
	return 0;
}
