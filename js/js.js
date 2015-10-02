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
	if(navigator.onLine){ // work around for appcache
		
		if(!localStorage.username || localStorage.username == ""){
		document.getElementById("map").style.display = "none";
		document.getElementById("temp").innerHTML = '<div class="login"><div id="loggain">Logga in</div><form method="POST" name="log-form" id="log-form"><input id="user" type="text" pattern="^[a-zA-ZÅÄÖåäö]+$" required name="username" placeholder="Användarnamn"> </br><input type="password" name="loglosen" pattern="^[a-zA-ZÅÄÖåäö]+$"required  placeholder="Lösenord"></br><input class="knapp" id="login" type="submit" value="Logga in"></div>';
		document.getElementById("temp").innerHTML += '<div class="registrera"><div id="skapa">Skapa användare</div><form method="GET" name="reg-form" id="reg-form"><input type="text" name="user" autofocus pattern="^[a-zA-ZÅÄÖåäö]+$"  required placeholder="Användarnamn"> </br><input type="password" name="losen" minlength="6" required  placeholder="Lösenord"></br><input type="text" pattern="^[a-zA-ZÅÄÖåäö0-9._%+-]+@[a-zA-ZÅÄÖåäö0-9.-]+\.[a-zA-ZÅÄÖåäö]{2,6}$" required name="epost" placeholder="Epost"> </br><input class="knappreg" id="send" type="submit" value="Registrera"></form></div>';
		document.getElementById("log-form").addEventListener("submit", function(e){
			e.preventDefault();
			login();
		});
		}else{
			document.getElementById("temp").style.display = "none";
			if (navigator.geolocation) { // GPS ON 
				navigator.geolocation.getCurrentPosition(saveLogLat); // fetch coords
			} else {
				document.getElementById("temp").innerHTML = "Turn on Geolocation :c";
				alert("Geolocation is not supported");
			}
		}
	}else{
		document.getElementById("temp").innerHTML = "Sorry, you are offline";
	}
}

function login(){
	localStorage.username = document.getElementById("user").value;

	var audio = document.getElementById("music");
	audio.play();
	
	var myDataRef = new Firebase('https://sweltering-torch-5016.firebaseio.com/'); //firebase
	myDataRef.push({user:{name:localStorage.username, data:{}}});
	init(); //do I have username now? 
}


function saveLogLat(myLatLng){
	document.getElementById("map").style.display = "block";
	var myDataRef = new Firebase('https://sweltering-torch-5016.firebaseio.com/'); //firebase
	
	//todo: check if internet .username needs to be defined
	//save network . 
	myDataRef.on("child_added", function(snapshot) {
			if(snapshot.val().user.name == localStorage.username){
				console.log(snapshot.val().user.name);
				var myDataRefUser = new Firebase('https://sweltering-torch-5016.firebaseio.com/' + snapshot.key() + '/user/data');
				myDataRefUser.update({lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude});
				
				//save local
				localStorage.latitude = myLatLng.coords.latitude;
				localStorage.longitude = myLatLng.coords.longitude;
				
				initMap(localStorage.latitude, localStorage.longitude);
			}
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});	
}


function initMap(latitude, longitude){
	//myLatLng = {lat: myLatLng.coords.latitude, lng: myLatLng.coords.longitude};
	
	// Create a map object
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: Number(latitude), lng: Number(longitude)},
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
	if(localStorage.friends !== undefined){
	
	var tempArr = JSON.parse(localStorage.friends);
	
		myDataRef.on("child_added", function(snapshot) {	
			for(var i=0;i<tempArr.length;i++){
				if(snapshot.val().user.name == tempArr[i]){
					setMarker(map,snapshot.val().user.data.lat,snapshot.val().user.data.lng,snapshot.val().user.name);
				}
			}
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}
	
	
	
	
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
