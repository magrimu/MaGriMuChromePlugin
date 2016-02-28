var sender =  "";
var empfaenger = "";

function fillSpndrKto(callback){  
chrome.storage.sync.get({
    mgm_spndr: ""
  },function(items){
  sender = items.mgm_spndr;
  chrome.tabs.executeScript(null, { file: "jquery-1.12.1.min.js" }, function() {
    chrome.tabs.executeScript(null, { code: 'var d = $("#mgm_id").attr("mgm_kto"); d '},
      function(results){
	empfaenger = results;
	callback(sender, empfaenger)});
   });
  });
};

function sendUeberweisung(sender, empfaenger) {
  var searchUrl = 'http://filip-vfb.cloudapp.net:8080' +
    '?name=' + sender + '&empfaenger=' + empfaenger;
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'document';
  x.onload = function() {
    renderStatus("Dankeschön     ");
  };
  x.onerror = function() {
    alert('Network error.');
  };
  if (sender == '') {
  	alert("Kein MGM Guthaben gefunden." + sender);
	return;
  }
  if (empfaenger == '') {
  	alert("Kein MGM Empfänger gefunden." + empfaenger);
	return;
  }
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function(){
	renderStatus("Suche MGM Ktos.");	
	fillSpndrKto(function(){
	  sendUeberweisung(sender, empfaenger);
	  });
	});


