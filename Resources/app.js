var win = Titanium.UI.createWindow({
    backgroundColor:'#fff'
});

var data = [];
var table = Ti.UI.createTableView();
win.add(table);

var url="http://apod.nasa.gov/apod.rss"; //  rss feed url
var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function() {
	// Data is returned from the blog, start parsing
	var doc = this.responseXML.documentElement;

	// begin looping through blog posts
	var items = doc.getElementsByTagName("item");
	for (var i=0;i<items.length;i++) {
		data.push({
			title: items.item(i).getElementsByTagName("title").item(0).text
		});
	}
	table.data = data;
};
xhr.onerror = function(e) {
	alert('Network error '+e.error);
};

xhr.open('GET',url);
xhr.send();

win.open();