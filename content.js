window.onload = () =>{
	var button = document.createElement("button"); // Create the download button
	button.addEventListener('click',function() {
		var paragraphs =document.getElementsByClassName("navigation"); //get pages total number
		var links = paragraphs[0].getElementsByTagName("a");
		var totalNumber = links[links.length - 1].innerText;
		chrome.runtime.sendMessage({totalNumber: totalNumber, url : window.location.href});
	}, false);
	button.setAttribute("class","formButton"); 
	button.innerHTML = "Скачать!";
	document.getElementById("header").appendChild(button); 	
}
