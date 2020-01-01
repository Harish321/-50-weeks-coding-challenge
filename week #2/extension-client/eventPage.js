var client = {
    "id": "client",
    "title": "Register Client Job",
    "contexts": ["selection"]
};
var clientData = {
    "id": "client_data",
    "title": "Register Client Data Job",
    "contexts": ["selection"]
};
var server = {
    "id": "server",
    "title": "Register Server Job",
    "contexts": ["selection"]
};

chrome.contextMenus.create(client);
chrome.contextMenus.create(clientData);
chrome.contextMenus.create(server);

chrome.contextMenus.onClicked.addListener(function(clickData){  
    var jobId = clickData.selectionText.split(":")[0].replace('#','');
    var jobType = clickData.menuItemId;
    register_job(jobType,jobId);
});

var register_job= function(jobType,jobId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    };
    xhttp.open("GET", "http://localhost:3000/api/notifyme/"+jobType+"?buildId="+jobId);
    xhttp.send();
}