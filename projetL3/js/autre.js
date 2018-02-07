	
function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}


//La fonction suivante sert à récupérer un arguments à une page distincte
function getQueryVariable(variable){
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);

}


function showResult(xml) {
	var txt = "";
	path = "/listType/typeName";
	if (xml.evaluate) {
		var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
		var result = nodes.iterateNext();
		while (result) {
			txt += "<option>"+result.childNodes[0].nodeValue + "</option>";
			result = nodes.iterateNext();
		} 
	// Code For Internet Explorer
	} else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
		xml.setProperty("SelectionLanguage", "XPath");
		nodes = xml.selectNodes(path);
		for (i = 0; i < nodes.length; i++) {
			txt += "<option>"+nodes[i].childNodes[0].nodeValue + "</option>";
		}
	}
	return txt;
}

				