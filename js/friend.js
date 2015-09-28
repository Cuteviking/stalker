function init(){
	
	var myDataRef = new Firebase('https://sweltering-torch-5016.firebaseio.com/'); //firebase
	var friendList = document.getElementById("friendList");
	myDataRef.on("child_added", function(snapshot) {
		friendList.innerHTML += "<li>"+snapshot.val().user.name+"</li>";
	})
}

window.addEventListener("load", init);