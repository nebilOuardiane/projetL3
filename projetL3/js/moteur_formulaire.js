function write_on_groupe (groupe){



		//recupération de l'id
		var id = $(groupe).attr("id") ;
		
		//récupération du texte
		var txt = $(groupe).attr("value") ;

		

		//vérifier que le truc qu'on veur ajouter n'est pas déjà présent
		var ok = true  ;

		

		switch(sectionCourante){
			case 3:

				//on regarde s'il y est pas déjà
				for(var i = 0 ; i<DSCC1.length; i++){
					if (DSCC1[i].id ==id){
						ok=false ;
					}
				}
				
				
				
				

				//si il y est pas
				if (ok){

					DSCC1.push({id:id, txt:txt});

					strCC1 += txt+" ";

					

					//insertion dans la ligne de display
					$("#e3_groupeCreationDisplay").text(strCC1) ;
				}
		 	break ;

		 	case 4 :
				
		 		for(var i = 0 ; i<DSCT1.length; i++){
					if (DSCT1[i].id ==id){
						ok=false ;
					}
				}
			
				if (ok){

					DSCT1.push({id:id, txt:txt});

					strCT1 += txt+" ";
					
					//insertion dans la ligne de display
					$("#e4_groupeCreationDisplay").text(strCT1) ;
				}
		 	break ;

		 	case 5: 
		 	
		 		for(var i = 0 ; i<DSS1.length; i++){
					if (DSS1[i].id ==id){
						ok=false ;
					}
				}
			
				if (ok){

					DSS1.push({id:id, txt:txt});

					strS1 += txt+" ";
					
					//insertion dans la ligne de display
					$("#e5_groupeCreationDisplay").text(strS1) ;
				}

		 	break ;

		 	case 7 :
		 		
				
		 		for(var i = 0 ; i<DSCC2.length; i++){
					if (DSCC2[i].id ==id){
						ok=false ;
					}
				}
			
				if (ok){

					DSCC2.push({id:id, txt:txt});

					strCC2 += txt+" ";

					//insertion dans la ligne de display
					$("#e7_groupeCreationDisplay").text(strCC2) ;
				}
		 	break ;

		 	case 8 :
		 		

		 		for(var i = 0 ; i<DSCT2.length; i++){
					if (DSCT2[i].id ==id){
						ok=false ;
					}
				}

				if (ok){

					DSCT2.push({id:id, txt:txt});

					strCT2 += txt+" ";

					//insertion dans la ligne de display
					$("#e8_groupeCreationDisplay").text(strCT2) ;
				}
		 	break ;

		 	case 9: 
		 		
		 	
		 		for(var i = 0 ; i<DSS2.length; i++){
					if (DSS2[i].id ==id){
						ok=false ;
					}
				}
			
				if (ok){

					DSS2.push({id:id, txt:txt});

					strS2 += txt+" ";
					
					
					//insertion dans la ligne de display
					$("#e9_groupeCreationDisplay").text(strS2) ;
				}

		 	break ;
		}
		
	}

	function reset_on_groupe (){
		
		switch(sectionCourante){
			case 3:

				strCC1="";
				
				DSCC1 = [] ;
				$("#e3_groupeCreationDisplay").text("") ;
				
		 	break ;

		 	case 4 :
		 		strCT1="";
				
				DSCT1 = [] ;
				$("#e4_groupeCreationDisplay").text("") ;
		 	break ;

		 	case 5 :
		 		strS1="";
				
				DSS1 = [] ;
				$("#e5_groupeCreationDisplay").text("") ;
		 	break ; 

		 	case 7 :
		 		strCC2="";
				
				DSCC2 = [] ;
				$("#e7_groupeCreationDisplay").text("") ;
		 	break ;

		 	case 8 :
		 		strCT2="";
				
				DSCT2 = [] ;
				$("#e8_groupeCreationDisplay").text("") ;
		 	break ;

		 	case 9 :
		 		strS2="";
				
				DSS2 = [] ;
				$("#e9_groupeCreationDisplay").text("") ;
		 	break ; 
		}
		
	}

	function ntm (etape){
	

		//pour gérer le changement du nombre de ds sur les étape 3, 4, 7 et8
		if(etape ==3 || etape ==4 || etape ==7 || etape ==8 ){

			//mise à jour du nombrede ds
			$("#e"+etape+"_nbDS").change(function(){

				
				//tmp sert à stocker la nouvelle valeur du nombre de ds
				var tmp= Number($("#e"+etape+"_nbDS").val());
				
				//vérification de tmp
				if(tmp>20){
					tmp=20;
				}
				else if(tmp<1){
					tmp=1;
				}

				//nombre de ds actuel
				var nb_ds ; 
				switch(etape){
					case 3:
						nb_ds = nbDSCC1 ;
				 	break ;

				 	case 4 :
				 		nb_ds = nbDSCT1 ;
				 	break ;

				 	case 7 :
				 		nb_ds = nbDSCC2 ;
				 	break ;

				 	case 8 :
				 		nb_ds = nbDSCT2 ;
				 	break ;
				}
				
				//si on veut ajouter un ou plusieurs ds
				if (tmp>nb_ds){
					
					
					var xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function() {

						if (this.readyState == 4 && this.status == 200) {
							var txt=showResult(xhttp.responseXML);
							
							for(var i=nb_ds+1 ;i<=tmp ;i++){
								var val='<tr id="e'+etape+'_DS'+i+'">' ;
									val += '<td>';
									val+=	'<input type="button" value="DS'+i+'" class="dsButton clickableCC1" id="e'+etape+'_btn_DS'+i+'"/>';
									val += '</td>' ; 
									val += '<td><select  name="nomDS" size="1" >' ;
									val += 	txt;
								
									val +=	 '</select></td></tr>';
												
									$("#e"+etape+"_tableDS").append(val);

									
									
								$('#e'+etape+'_btn_DS'+i).click(function() {
									write_on_groupe(this) ;
								});
							}
						}
							
						
					};
					xhttp.open("GET", "../xml_profils/type_ds.xml", true);
					xhttp.send(); 
				


				}

				//si on veut suprimer un ou plusieurs ds
				else if (tmp<nb_ds){
				
					for(var i=tmp ;i<nb_ds ;i++){
						
						$("#e"+etape+"_tableDS tr:last").remove();
						
					}
				
				}
				

				switch(etape){
					case 3:
						nbDSCC1 =tmp ;
				 	break ;

				 	case 4 :
				 		nbDSCT1 =tmp ;
				 	break ;

				 	case 7 :
				 		nbDSCC2 =tmp;
				 	break ;

				 	case 8 :
				 		nbDSCT2 =tmp;
				 	break ;
				}
			});
		
		}



		//--------------------------------------------------------------


		// //quand on clique sur le premier ds qui est présent de base sur la page
		// $("#e"+etape+"_btn_DS1").click(function() {
		// 	write_on_groupe(this) ;
		// });


		let tmp_nb_btn =0;
		switch(etape){
			case 3 :
				tmp_nb_btn =nbDSCC1;
			break;

			case 4:
				tmp_nb_btn =nbDSCT1 ;
			break ;

			case 7:
				tmp_nb_btn =nbDSCC2 ;
			break;

			case 8 :
				tmp_nb_btn =nbDSCT2 ;
			break ;
		}

		// pour les ds  qui sont déjà présents ajouter événment click pour write on groupe
		for (let i = 1 ; i<=tmp_nb_btn  ; i++){
			$("#e"+etape+"_btn_DS"+i).click(function() {
				write_on_groupe(this) ;
			});
		}

		switch(etape){
			case 3 :
				tmp_nb_btn =nbGroupeCC1;
			break;

			case 4:
				tmp_nb_btn =nbGroupeCT1 ;
			break ;

			case 5:
				tmp_nb_btn =nbGroupeS1 ;
			break ;

			case 7:
				tmp_nb_btn =nbGroupeCC2 ;
			break;

			case 8 :
				tmp_nb_btn =nbGroupeCT2 ;
			break ;

			case 9:
				tmp_nb_btn =nbGroupeS2 ;
			break ;
		}

		// pour les groupe qui sont déjà présents ajouter événment click pour write on groupe
		for (let i = 1 ; i<=tmp_nb_btn  ; i++){
			$("#e"+etape+"_btnG"+i).click(function() {
				write_on_groupe(this) ;
			});
		}


		//pour chaque grouppe créer faire les hides du input nb_meilleurs ou les input de pourcentages

		for (let i = 1 ; i<=tmp_nb_btn  ; i++){
			if($('#e'+etape+'_chkG'+i).prop("checked")){
				$('#e'+etape+'_cas2G'+i).hide() ;
				$('#e'+etape+'_cas1G'+i).show() ;
			}
			else{
				$('#e'+etape+'_cas2G'+i).show() ;
				$('#e'+etape+'_cas1G'+i).hide() ;
			}

			$('#e'+etape+'_chkG'+i).change(function(){
				if($(this).prop("checked")){
					$('#e'+etape+'_cas2G'+i).hide() ;
					$('#e'+etape+'_cas1G'+i).show() ;
				}
				else{
					$('#e'+etape+'_cas2G'+i).show() ;
					$('#e'+etape+'_cas1G'+i).hide() ;
				}
			});
		}


		
		$("#e"+etape+"_btn_CC1").click(function() {
			
			write_on_groupe(this) ;
		});
		$("#e"+etape+"_btn_CT1").click(function() {
			write_on_groupe(this) ;
		});


		$("#e"+etape+"_btn_S1").click(function() {
			write_on_groupe(this) ;
		});

		$("#e"+etape+"_btn_CC2").click(function() {
			
			write_on_groupe(this) ;
		});
		$("#e"+etape+"_btn_CT2").click(function() {
			write_on_groupe(this) ;
		});



		//quand on click sur le bouton annuler
		$("#e"+etape+"_btn_Annuler").click(function(){
			reset_on_groupe() ;
		});


	//--------------------------------------------------------------


		//quand on click sur le bouton creer
		$("#e"+etape+"_btn_Creer").click(function(){


			
			//récupération des varaibles courantes 
			var cur_str ="" ; 
			var cur_DS = [] ;
			var cur_nbDS = 1 ;
			var cur_nbGroupe=0 ;
			var cur_tabGroupes =  [] ;
			
			switch(etape){
				case 3 : 
					cur_str = strCC1 ;

					cur_DS = deepCopy(DSCC1);
					//prendre direct la cipy pour pouvoir la mettre dans tabGroupe

					cur_nbDS = nbDSCC1 ;

					cur_nbGroupe=nbGroupeCC1;

					cur_tabGroupes = tabGroupesCC1 ; 


				break;

				case 4 : 
					cur_str = strCT1 ;
					cur_DS =  deepCopy(DSCT1) ;


					cur_nbGroupe=nbGroupeCT1;
					cur_nbDS = nbDSCT2 ;
					cur_tabGroupes = tabGroupesCT1 ; 
					
				break ; 

				case 5 : 
					cur_str = strS1 ;
					cur_DS =  deepCopy(DSS1) ;


					cur_nbGroupe=nbGroupeS1;
					//cur_nbDS = nbDSS1 ;
					cur_tabGroupes = tabGroupesS1 ; 

				break; 

				case 7 : 
					cur_str = strCC2 ;

					cur_DS =  deepCopy(DSCC2) ;

					cur_nbGroupe=nbGroupeCC2;
					cur_nbDS = nbDSCC2 ;
					cur_tabGroupes = tabGroupesCC2 ; 
				break ; 

				case 8 : 
					cur_str = strCT2 ;

					cur_DS =  deepCopy(DSCT2) ;

					cur_nbDS = nbDSCT2 ;

					cur_nbGroupe=nbGroupeCT2;

					cur_tabGroupes = tabGroupesCT2 ; 
				break ; 

				case 9 : 
					cur_str = strS2 ;
					cur_DS =  deepCopy(DSS2) ;


					cur_nbGroupe=nbGroupeS2;
					//cur_nbDS = nbDSS1 ;
					cur_tabGroupes = tabGroupesS2 ; 

				break; 
			}
			
			

			//stockage du grouppe dans le tableau de groupes

			var nb_ds_groupe ;

			nb_ds_groupe = cur_DS.length ;


			if(nb_ds_groupe>0){

				
				cur_tabGroupes.push(cur_DS) ;

				cur_nbGroupe++ ;

				switch(etape){
					case 3 :
						nbGroupeCC1=cur_nbGroupe ;
					break ;
					case 4 :
						nbGroupeCT1=cur_nbGroupe ;
					break ;
					case 5:
						nbGroupeS1=cur_nbGroupe ;
					break ; 
					case 7 :
						nbGroupeCC2=cur_nbGroupe ;
					break ;
					case 8 :
						nbGroupeCT2=cur_nbGroupe ;
					break ; 
					case 9:
						nbGroupeS2 = cur_nbGroupe ;
					break  ;
				}


				reset_on_groupe() ;

				//mettre le truc qui crée un groupe au groupe suivant
				$("#e"+etape+"_numGroupe").text("G"+(cur_nbGroupe+1)) ;



				//creer le groupe
				var str_new_groupe = '<tr id="e'+etape+'_G'+cur_nbGroupe+'">' ;

				str_new_groupe += '<td><input type="button" id="e'+etape+'_btnG'+cur_nbGroupe+'" value="G'+cur_nbGroupe+'" class="GroupeButton clickableCC1"/></td>' ;

				str_new_groupe += '<td>' ;


				
				for (var i= 0 ; i<cur_tabGroupes[cur_nbGroupe-1].length ; i++){
					str_new_groupe += cur_tabGroupes[cur_nbGroupe-1][i].txt+" " ;
				}


				str_new_groupe += '</td><td>' ;

				str_new_groupe += '<input type="checkbox" id="e'+etape+'_chkG'+cur_nbGroupe+'" checked /><label for="e'+etape+'_chkG'+cur_nbGroupe+'" >même pourcentage</label>';

				str_new_groupe += '</td><td id="e'+etape+'_cas1G'+cur_nbGroupe+'">' ;

				str_new_groupe +=  '<label for="e'+etape+'_nbComptaG'+cur_nbGroupe+'">Nombre de Ds à comptabiliser</label><input type="number" id="e'+etape+'_nbComptaG'+cur_nbGroupe+'" min="1" max="'+nb_ds_groupe+'" value="'+nb_ds_groupe+'"/>' ;

				str_new_groupe += '</td><td id="e'+etape+'_cas2G'+cur_nbGroupe+'">' ;


				

				for (var i = 0 ; i<nb_ds_groupe ; i++){
					str_new_groupe +='<label for="e'+etape+'_nbComptaG'+cur_nbGroupe+'">Pourcentage '+cur_tabGroupes[cur_nbGroupe-1][i].txt+'</label>' ;
				    str_new_groupe	+='<input type="number" id="e'+etape+'_nbPourcent'+i+'G'+cur_nbGroupe+'" min="1" max="100" value="' ;

				    if (100%nb_ds_groupe!=0 && i==(nb_ds_groupe-1)){
				    	str_new_groupe += parseInt(100/nb_ds_groupe+1, 10) ;
				    }
				    else{
				    	str_new_groupe += parseInt(100/nb_ds_groupe, 10);
				    }

				    str_new_groupe +='"/>' ;
				}

				str_new_groupe += '</td></tr>' ;

				
				$("#e"+etape+"_tableGroupe").append(str_new_groupe);

				$('#e'+etape+'_btnG'+cur_nbGroupe).click(function() {
						write_on_groupe(this) ;
				});




				$('#e'+etape+'_cas2G'+cur_nbGroupe).hide() ;


				$('#e'+etape+'_chkG'+cur_nbGroupe).change(function(){
					//on récupère le numéro du groupe
					var groupe = $(this).attr("id").charAt(7);
					
					if($(this).prop("checked")){
						$('#e'+etape+'_cas2G'+groupe).hide() ;
						$('#e'+etape+'_cas1G'+groupe).show() ;
					}
					else{
						$('#e'+etape+'_cas2G'+groupe).show() ;
						$('#e'+etape+'_cas1G'+groupe).hide() ;
					}
				}) ;


				//ajouter dans le selec du total

				//si le nombre de grouppe est supérieu à zero enlever le disable
				if (cur_nbGroupe>0){
					
					$("#e"+etape+"_select").prop('disabled',false) ;
					$("#e"+etape+"_btn_Valider").prop('disabled',false) ;
					if (cur_nbGroupe==1){
						$("#e"+etape+"_SelectInitial").remove() ;
					}
					$("#e"+etape+"_select").append('<option id="e'+etape+'_select'+cur_nbGroupe+'">G'+cur_nbGroupe+'</option>');

				}
				else{
					$("#e"+etape+"_select").prop('disabled',true) ;
					$("#e"+etape+"_btn_Valider").prop('disabled',true) ;
					$("#e"+etape+"_select").append('<option id="#e'+etape+'_SelectInitial">Vous devez créer un groupe</option>');
				}

			}
		});


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

