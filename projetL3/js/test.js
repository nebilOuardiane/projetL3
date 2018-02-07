$(document).ready(function(){


	// on cache toutes les étapes sauf la première
	$("#etape2").hide();
	$("#etape3").hide();
	$("#etape4").hide();
	$("#etape5").hide();
	$("#etape6").hide();
	$("#etape7").hide();
	$("#etape8").hide();
	$("#etape9").hide();
	$("#etape10").hide();
	$("#etape11").hide();

	// on cache certains éléments de la barre de la navigation
	// ne reste affiché que les étapes dont on est sûr de la présence 
	$("#nav_2").hide();
	$("#nav_3").hide();
	$("#nav_4").hide();
	$("#nav_5").hide();
	$("#nav_6").hide();
	$("#nav_7").hide();
	$("#nav_8").hide();
	$("#nav_9").hide();


	// on cache les erreurs 
	// nous les afficherons quand cela sera nécessaire
	$(".error").hide();

//----------------------------------------------------------------------

	// on defini les évenement de la barre de navigation
	$("#nav_1").click(function(){
		go_to_etape(1) ;
	});

	$("#nav_2").click(function(){
		go_to_etape(2) ;
	});

	$("#nav_3").click(function(){
		go_to_etape(3) ;
	});

	$("#nav_4").click(function(){
		go_to_etape(4) ;
	});

	$("#nav_5").click(function(){
		go_to_etape(5) ;
	});

	$("#nav_6").click(function(){
		go_to_etape(6) ;
	});

	$("#nav_7").click(function(){
		go_to_etape(7) ;
	});

	$("#nav_8").click(function(){
		go_to_etape(8) ;
	});

	$("#nav_9").click(function(){
		go_to_etape(9) ;
	});

	$("#nav_10").click(function(){
		go_to_etape(10) ;
	});

	$("#nav_11").click(function(){
		go_to_etape(11) ;
	});

//----------------------------------------------
//			Etape 1 to Etape2
//---------------------------------------------

	$("#1boutton1").click(function(){
		nbSession=1;
		$("#nav_6").hide();
		$("#nav_9").hide();
		$("#nav_7").hide();
		$("#nav_8").hide();
	});

	$("#1boutton2").click(function(){
		nbSession=2;
		$("#nav_6").show();
		$("#nav_9").show();
	});

	$("#1boutton1,#1boutton2 ").click(function(){
		to_next_step(2) ;
		$("#nav_2").show();
		//$("#nav_5").show();

	});



//----------------------------------------------
//			Etape 2 to Etape3 OU 4
//---------------------------------------------

	$("#2boutonValider").click(function(){


			
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

		if (this.readyState == 4 && this.status == 200) {
			var txt=showResult(xhttp.responseXML);
			
			
			$(".typeDs").append(txt);


			controle_continue_s1 = $('input[name="CC1"]:checked').attr('value');
			controle_terminal_s1 = $('input[name="CT1"]:checked').attr('value');



			if((controle_continue_s1=="no")&&(controle_terminal_s1=="no")){

				$("#e2_error1").show();
			}
			else{
				$(".error").hide();
				controle_continue_s1= (controle_continue_s1=="yes")? true : false;
				controle_terminal_s1= (controle_terminal_s1=="yes")? true : false;
				
				controle_continue_s1 ? to_next_step(3) : to_next_step(4) ;

				controle_continue_s1? $("#nav_3").show() : $("#nav_3").hide();
				controle_terminal_s1? $("#nav_4").show() : $("#nav_4").hide();
			}

			if(controle_continue_s1 && controle_terminal_s1){
				$("#nav_5").show();
			}
			else{
				$("#nav_5").hide();
			}
			
		}



	};
	xhttp.open("GET", "../xml_profils/type_ds.xml", true);
	xhttp.send(); 

	
	
	
	
	});


	
	
		
	
	

	//----------------------------------------------
	//			Etape 3 to Etape 4 OU 5 OU 10
	//---------------------------------------------

	$("#e3_btn_Valider").click(function(){

		var ok = true ;
		var i  ; 
		for (i = 1; i<=nbGroupeCC1 ; i++){
			ok=true ; 
			if($('#e3_chkG'+i).prop("checked")){

				//vérifer que le nombre de ds comptablisé est compris entre 1 et nombre de ds pour ce groupe
				var nb_ds_compta = Number($('#e3_nbComptaG'+i).val());

				if (nb_ds_compta<1 ||nb_ds_compta> tabGroupesCC1[i-1].length ){
					
					ok = false ; 
					break ; 
				}
			}
			else{
				var sum = 0 ; 
				for (var j = 0 ; j<tabGroupesCC1[i-1].length ; j++){
					sum += Number($('#e3_nbPourcent'+j+'G'+i).val());
					
				}

				
				if (sum!=100){
					ok = false ;
				 	break ; 

				}	

			}
		}

		if(!ok){
			
			$("#e3_error1").text("Erreur : dans les paramètres du groupe "+i).show() ;
		}
		else{
			$("#e3_error1").hide() ;
			if(controle_terminal_s1){
				to_next_step(4) ;
			}
			else if (nbSession==2){
				to_next_step(6);
			}
			else{
				to_next_step(10);
			}
		}
		
	
	});


	

	//----------------------------------------------
	//			Etape 4 to Etape 5 OU 6 OU 10
	//---------------------------------------------

	$("#e4_btn_Valider").click(function(){

		var ok = true ;
		var i  ; 
		for (i = 1; i<=nbGroupeCT1 ; i++){
			ok=true ; 
			if($('#e4_chkG'+i).prop("checked")){

				//vérifer que le nombre de ds comptablisé est compris entre 1 et nombre de ds pour ce groupe
				var nb_ds_compta = Number($('#e4_nbComptaG'+i).val());

				if (nb_ds_compta<1 ||nb_ds_compta> tabGroupesCT1[i-1].length ){
					
					ok = false ; 
					break ; 
				}
			}
			else{
				var sum = 0 ; 
				for (var j = 0 ; j<tabGroupesCT1[i-1].length ; j++){
					sum += Number($('#e4_nbPourcent'+j+'G'+i).val());
					
				}

				
				if (sum!=100){
					ok = false ;
				 	break ; 

				}	

			}
		}

		if(!ok){

			$("#e4_error1").text("Erreur : dans les paramètres du groupe "+i).show() ;
		}
		else{
			$("#e4_error1").hide() ;
			
			if (controle_continue_s1){
				to_next_step(5);
			}
			else if (nbSession==2){
				to_next_step(6);
			}
			else{
				to_next_step(10);
			}
			
		}
		
	
	});

	//----------------------------------------------
	//			Etape 5 TO 6 OU 10
	//---------------------------------------------

	$("#e5_btn_Valider").click(function(){

		var ok = true ;
		var i  ; 
		for (i = 1; i<=nbGroupeS1 ; i++){
			ok=true ; 
			if($('#e5_chkG'+i).prop("checked")){

				//vérifer que le nombre de ds comptablisé est compris entre 1 et nombre de ds pour ce groupe
				var nb_ds_compta = Number($('#e5_nbComptaG'+i).val());

				if (nb_ds_compta<1 ||nb_ds_compta> tabGroupesS1[i-1].length ){
					
					ok = false ; 
					break ; 
				}
			}
			else{
				var sum = 0 ; 
				for (var j = 0 ; j<tabGroupesS1[i-1].length ; j++){
					sum += Number($('#e5_nbPourcent'+j+'G'+i).val());
					
				}

				
				if (sum!=100){
					ok = false ;
				 	break ; 

				}	

			}
		}

		if(!ok){

			$("#e5_error1").text("Erreur : dans les paramètres du groupe "+i).show() ;
		}
		else{
			$("#e5_error1").hide() ;
			
			if (nbSession==2){
				to_next_step(6);
			}
			else{
				to_next_step(10);
			}
			
		}
		
	
	});




//----------------------------------------------
//			Etape 6 to Etape 7 OU 8
//---------------------------------------------

	$("#6boutonValider").click(function(){


		controle_continue_s2 = $('input[name="CC2"]:checked').attr('value');
		controle_terminal_s2 = $('input[name="CT2"]:checked').attr('value');



		if((controle_continue_s2=="no")&&(controle_terminal_s2=="no")){

			$("#e6_error1").show();
		}
		else{
			$(".error").hide();
			controle_continue_s2= (controle_continue_s2=="yes")? true : false;
			controle_terminal_s2= (controle_terminal_s2=="yes")? true : false;
			
			controle_continue_s2? to_next_step(7) : to_next_step(8) ;

			controle_continue_s2? $("#nav_7").show() : $("#nav_7").hide();
			controle_terminal_s2? $("#nav_8").show() : $("#nav_8").hide();
		}


	});



	//----------------------------------------------
	//			Etape 7 to Etape 8 OU 10
	//---------------------------------------------

	$("#e7_btn_Valider").click(function(){

		var ok = true ;
		var i  ; 
		for (i = 1; i<=nbGroupeCC2 ; i++){
			ok=true ; 
			if($('#e7_chkG'+i).prop("checked")){

				//vérifer que le nombre de ds comptablisé est compris entre 1 et nombre de ds pour ce groupe
				var nb_ds_compta = Number($('#e7_nbComptaG'+i).val());

				if (nb_ds_compta<1 ||nb_ds_compta> tabGroupesCC2[i-1].length ){
					
					ok = false ; 
					break ; 
				}
			}
			else{
				var sum = 0 ; 
				for (var j = 0 ; j<tabGroupesCC2[i-1].length ; j++){
					sum += Number($('#e7_nbPourcent'+j+'G'+i).val());
					
				}

				
				if (sum!=100){
					ok = false ;
				 	break ; 

				}	

			}
		}

		if(!ok){

			$("#e7_error1").text("Erreur : dans les paramètres du groupe "+i).show() ;
		}
		else{
			$("#e7_error1").hide() ;
			if(controle_terminal_s2){
				to_next_step(8) ;
			}
			else{
				
				if (controle_continue_s1 && !btn_CC1_is_present){
					$("#e9_table_btn tr ").append('<td id="e9_td_CC1"><input type="button" id="e9_btn_CC1" value="CC_S1" class="dsButton clickableCC1"/></td>');
					btn_CC1_is_present = true ; 
				}
				else if (btn_CC1_is_present && !controle_continue_s1  ){
					$(" #e9_td_CC1").remove() ;
					btn_CC1_is_present = false ;

				}
				if (controle_terminal_s1 && !btn_CT1_is_present){
					$("#e9_table_btn tr").append('<td id="e9_td_CT1"><input type="button" id="e9_btn_CT1" value="CT_S1" class="dsButton clickableCC1"/></td>');
					btn_CT1_is_present = true ;
				}
				else if (btn_CT1_is_present && !controle_terminal_s1){
					$(" #e9_td_CT1").remove() ;
					btn_CT1_is_present = false ;

				}
				if (controle_continue_s2  && !btn_CC2_is_present){
					$("#e9_table_btn tr").append('<td id="e9_td_CC2"><input type="button" id="e9_btn_CC2" value="CC_S2" class="dsButton clickableCC1"/></td>');
					btn_CC2_is_present = true ;
				}
				else if (btn_CC2_is_present && !controle_continue_s2){
					$(" #e9_td_CC2").remove() ;
					btn_CC2_is_present = false ;

				}
				if (controle_terminal_s2 && !btn_CT2_is_present){
					$("#e9_table_btn tr").append('<td id="e9_td_CT2"><input type="button" id="e9_btn_CT2" value="CT_S2" class="dsButton clickableCC1"/></td>');
					btn_CT2_is_present = true ;
				}
				else if (btn_CT2_is_present && !controle_terminal_s2 ){
					$(" #e9_td_CT2").remove() ;
					btn_CT2_is_present = false ;

				}
				to_next_step(9);
			}
		}
		
	
	});


	

	//----------------------------------------------
	//			Etape 8 to Etape  9 OU 10
	//---------------------------------------------

	$("#e8_btn_Valider").click(function(){

		var ok = true ;
		var i  ; 
		for (i = 1; i<=nbGroupeCT2 ; i++){
			ok=true ; 
			if($('#e8_chkG'+i).prop("checked")){

				//vérifer que le nombre de ds comptablisé est compris entre 1 et nombre de ds pour ce groupe
				var nb_ds_compta = Number($('#e8_nbComptaG'+i).val());

				if (nb_ds_compta<1 ||nb_ds_compta> tabGroupesCT2[i-1].length ){
					
					ok = false ; 
					break ; 
				}
			}
			else{
				var sum = 0 ; 
				for (var j = 0 ; j<tabGroupesCT2[i-1].length ; j++){
					sum += Number($('#e8_nbPourcent'+j+'G'+i).val());
					
				}

				
				if (sum!=100){
					ok = false ;
				 	break ; 

				}	

			}
		}

		if(!ok){

			$("#e8_error1").text("Erreur : dans les paramètres du groupe "+i).show() ;
		}
		else{
			$("#e8_error1").hide() ;

		
				if (controle_continue_s1 && !btn_CC1_is_present){
					$("#e9_table_btn tr ").append('<td id="e9_td_CC1"><input type="button" id="e9_btn_CC1" value="CC_S1" class="dsButton clickableCC1"/></td>');
					btn_CC1_is_present = true ; 
				}
				else if (btn_CC1_is_present && !controle_continue_s1  ){
					$(" #e9_td_CC1").remove() ;
					btn_CC1_is_present = false ;

				}
				if (controle_terminal_s1 && !btn_CT1_is_present){
					$("#e9_table_btn tr").append('<td id="e9_td_CT1"><input type="button" id="e9_btn_CT1" value="CT_S1" class="dsButton clickableCC1"/></td>');
					btn_CT1_is_present = true ;
				}
				else if (btn_CT1_is_present && !controle_terminal_s1){
					$(" #e9_td_CT1").remove() ;
					btn_CT1_is_present = false ;

				}
				if (controle_continue_s2  && !btn_CC2_is_present){
					$("#e9_table_btn tr").append('<td id="e9_td_CC2"><input type="button" id="e9_btn_CC2" value="CC_S2" class="dsButton clickableCC1"/></td>');
					btn_CC2_is_present = true ;
				}
				else if (btn_CC2_is_present && !controle_continue_s2){
					$(" #e9_td_CC2").remove() ;
					btn_CC2_is_present = false ;

				}
				if (controle_terminal_s2 && !btn_CT2_is_present){
					$("#e9_table_btn tr").append('<td id="e9_td_CT2"><input type="button" id="e9_btn_CT2" value="CT_S2" class="dsButton clickableCC1"/></td>');
					btn_CT2_is_present = true ;
				}
				else if (btn_CT2_is_present && !controle_terminal_s2 ){
					$(" #e9_td_CT2").remove() ;
					btn_CT2_is_present = false ;

				}
				to_next_step(9);


			
		}



		
	
	});

	//----------------------------------------------
	//			Etape 9 to 10
	//---------------------------------------------

	$("#e9_btn_Valider").click(function(){
	
		var ok = true ;
		var i  ; 
		for (i = 1; i<=nbGroupeS2 ; i++){
			ok=true ; 
			if($('#e9_chkG'+i).prop("checked")){

				//vérifer que le nombre de ds comptablisé est compris entre 1 et nombre de ds pour ce groupe
				var nb_ds_compta = Number($('#e9_nbComptaG'+i).val());

				if (nb_ds_compta<1 ||nb_ds_compta> tabGroupesS2[i-1].length ){
					
					ok = false ; 
					break ; 
				}
			}
			else{
				var sum = 0 ; 
				for (var j = 0 ; j<tabGroupesS2[i-1].length ; j++){
					sum += Number($('#e9_nbPourcent'+j+'G'+i).val());
					
				}

				
				if (sum!=100){
					ok = false ;
				 	break ; 

				}	

			}
		}

		if(!ok){

			$("#e9_error1").text("Erreur : dans les paramètres du groupe "+i).show() ;
		}
		else{
			$("#e9_error1").hide() ;
			to_next_step(10);
			
			
		}
		
	
	});
	



	//----------------------------------------------
	//			Etape 10 to 11
	//---------------------------------------------

	$("#e10_btn_Valider").click(function(){
	
		var tmp= Number($("#e10_note_session2").val());

		if(tmp<0 || tmp>20){

			$("#e10_error1").show() ;
		}
		else{
			$("#e10_error1").hide() ;
			to_next_step(11);
			fill_variables() ;
			console.log('tab_total_select');
			console.log(tab_total_select) ;

			console.log('CC1');
			console.log(typeDSCC1) ;
			console.log('CT1');
			console.log(typeDSCT1) ;
			console.log('CC2');
			console.log(typeDSCC2) ;
			console.log('CT2');
			console.log(typeDSCT2) ;
		

			fill_xml() ;

			// var xmlString='<?xml version="1.0" encoding="UTF-8" ?><module><session1 link="a"><pourcentage><ds p="100" link="c">CC1</ds></pourcentage></session1><cc_session1 link="c"><moyenne nb_meilleur="1"><ds type="TP">DS4</ds><pourcentage><ds p="20" type="TP">DS3</ds><moyenne nb_meilleur="2" p="80"><ds type="TP">DS3</ds><ds type="TP">DS4</ds></moyenne></pourcentage></moyenne></cc_session1><validation>10</validation></module>';

			$(".tree").remove();
			$("#texte").empty();



			
			transform_with_xslt(xml , "../arbres.xsl" , "exemple") ;

			transform_with_xslt(xml , "../texte.xsl" , "texte") ;



						
		}

	});
	
	
	


});
