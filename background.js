chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var totalNumber = request.totalNumber;
    url = request.url;
	var readyCounter=0;
	var div=[];
	for(var i = 0; i <totalNumber; i++){
		var href = new URL(url);
		href.searchParams.set('p', i+1);
		div.push( $('<div>'));
		div[i].load(href.href + ' #content p', function(){
			//Detect when the current content is loaded. Once all download actions are done, reqdyCounter should be equal to the total number of pages
			readyCounter++;
		});
	}
	function myTimer() {
		setTimeout(function () {
			if(readyCounter != totalNumber){
				myTimer();
			}else{
				var totalText = "";
				for(var j = 0; j <totalNumber; j++){
					if(j!=0){
						totalText += "\n";
					}
					totalText += div[j].text();
				}
				download('loveread.txt', totalText);
			}
		}, 500);
	}
	myTimer();
});

function download(filename, text) { //Download as text file
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}