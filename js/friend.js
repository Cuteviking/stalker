function init(){
	var friendList = document.getElementById("friendList");
	friendList.innerHTML ="";
	var tempArr = JSON.parse(localStorage.friends);
	for(var i=0;i<tempArr.length;i++){
		friendList.innerHTML +="<li>"+tempArr[i]+"</li>";
	}
}

function addFriend(){
	var temp = document.getElementById("username").value;
	if(localStorage.friends === undefined){
	var tempArr = [temp];
	}else{
		var tempArr = JSON.parse(localStorage.friends);
		tempArr.push(temp);
	}
	
	localStorage.friends=JSON.stringify(tempArr);
	
	init();
}

document.getElementById("myForm").addEventListener("submit", function(e){
	e.preventDefault();
	addFriend();
});
window.addEventListener("load", init);