/**
 * Created by ameno on 1/4/17.
 */
var selectionText;

function selectionOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    selectionText = info.selectionText;
    openPopup();
}

function openPopup(){
    console.log(selectionText);
    var newURL = "popup.html";
    chrome.tabs.create({ url: newURL });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "getAnalytics") {
        sendResponse(selectionText);
    }
});

chrome.contextMenus.create({"title": "think twise", "contexts":["selection"], "onclick": selectionOnClick});