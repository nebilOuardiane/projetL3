function loadXMLDoc(filename){
	if (window.ActiveXObject){
	  xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	else {
	  xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
	xhttp.send("");
	return xhttp.responseXML;
}


/*
 *	fonction qui ajoute le résultat d'un transformation xslt à un page html
 *
 * 	xml_string		string correspondant au contenu d'un fichier xml
 * 	xsl_file		string correspondant à l'adresse du fichier xsl utilisé pour la transformation
 *	id_to_place		string correspondant à l'id de l'élement de la page html auquel ajouter le résultat
 */
function transform_with_xslt (xml_string , xsl_file , id_to_place){
	var xmlDoc = $.parseXML( xml_string );
	var xslDoc = loadXMLDoc(xsl_file);
	

	//pour iternet Explorer
	if (window.ActiveXObject || xhttp.responseType == "msxml-document"){
	  ex = xmlDoc.transformNode(xslDoc);
	  document.getElementById(id_to_place).innerHTML = ex;
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument){
	  xsltProcessor = new XSLTProcessor();
	  xsltProcessor.importStylesheet(xslDoc);
	  resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
	  // console.log(resultDocument);
	  document.getElementById(id_to_place).appendChild(resultDocument);
	}

}