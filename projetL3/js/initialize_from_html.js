
function initialize_from_html () {
	var tmp = "" ; 
	//récupération du nombre de session
	nbSession=2 ;

	//initialiser la section courante

	//récupération des booléen qui indique la présences des ct/cc session
	controle_continue_s1= ($('input[name="CC1"]:checked').attr('value')=="yes")? true : false;
	controle_terminal_s1= ($('input[name="CT1"]:checked').attr('value')=="yes")? true : false;
	controle_continue_s2= ($('input[name="CC2"]:checked').attr('value')=="yes")? true : false;
	controle_terminal_s2= ($('input[name="CT2"]:checked').attr('value')=="yes")? true : false;

	//initialiser les varaibles qui disent si les boutons de l'étape9 sont présent
	btn_CC1_is_present = controle_continue_s1 ;
	btn_CT1_is_present = controle_terminal_s1 ; 
	btn_CC2_is_present = controle_continue_s2 ; 
	btn_CT2_is_present = controle_terminal_s2 ; 


	//récupération du nombre de ds pour chaque étape
	nbDSCC1 = Number($("#e3_nbDS").val()); 
	nbDSCT1 = Number($("#e4_nbDS").val()); 
	nbDSCC2 = Number($("#e7_nbDS").val());
	nbDSCT2 = Number($("#e8_nbDS").val());

	//récuprération du nombre de groupe pour chaque étape
	tmp = $('#e3_table_new_groupe tr >td:nth-of-type(2)').text() ;
	nbGroupeCC1 = tmp.substring(1 , tmp.length)-1;


	tmp = $('#e4_table_new_groupe tr >td:nth-of-type(2)').text() ;
	nbGroupeCT1 = tmp.substring(1 , tmp.length)-1;

	tmp = $('#e7_table_new_groupe tr >td:nth-of-type(2)').text() ;
	nbGroupeCC2 = tmp.substring(1 , tmp.length)-1;

	tmp = $('#e8_table_new_groupe tr >td:nth-of-type(2)').text() ;
	nbGroupeCT2 = tmp.substring(1 , tmp.length)-1;

	tmp = $('#e5_table_new_groupe tr >td:nth-of-type(2)').text() ;
	nbGroupeS1  = tmp.substring(1 , tmp.length)-1;

	tmp = $('#e9_table_new_groupe tr >td:nth-of-type(2)').text() ;
	nbGroupeS2  = tmp.substring(1 , tmp.length)-1;


	//récupération de la composition des grouppe

	function tmp_treatment (tmp){
		res ="" ;



		return res ;
	}


	
	tabGroupesCC1=[] ;
	for (let i = 0 ; i<nbGroupeCC1 ; i++){
		tmp = $('#e3_G'+(i+1)+' > td:nth-of-type(2)').text() ;
		
		tabGroupesCC1[i] = [] ;
		let num_ds=0 ;
		let ds_string="" ;

		for (let c = 0 ; c<tmp.length; c++){
			if(tmp.charCodeAt(c)==160){
				tabGroupesCC1[i].push({txt:ds_string , id:"e3_"+ds_string});
				num_ds+=1 ;
				ds_string="";
			}
			else {
				ds_string = ds_string+tmp.charAt(c);
			}
		} 


	}

	
	tabGroupesCT1=[] ;
	for (let i = 0 ; i<nbGroupeCT1 ; i++){
		tmp = $('#e4_G'+(i+1)+' > td:nth-of-type(2)').text() ;
		
		tabGroupesCT1[i] = [] ;
		let num_ds=0 ;
		let ds_string="" ;
		for (let c = 0 ; c<tmp.length; c++){
			if(tmp.charCodeAt(c)==160){
				//ajout du ds(ou groupe) dans le groupe
				tabGroupesCT1[i].push({txt:ds_string , id:"e4_"+ds_string});
				num_ds+=1 ;
				ds_string="";
			}
			else {
				ds_string = ds_string+tmp.charAt(c);
			}
		} 
	}

	
	tabGroupesCC2=[] ;
	for (let i = 0 ; i<nbGroupeCC2 ; i++){
		tmp = $('#e7_G'+(i+1)+' > td:nth-of-type(2)').text() ;
		
		tabGroupesCC2[i] = [] ;
		let num_ds=0 ;
		let ds_string="" ;
		for (let c = 0 ; c<tmp.length; c++){
			if(tmp.charCodeAt(c)==160){
				//ajout du ds(ou groupe) dans le groupe
				tabGroupesCC2[i].push({txt:ds_string , id:"e7_"+ds_string});
				num_ds+=1 ;
				ds_string="";
			}
			else {
				ds_string = ds_string+tmp.charAt(c);
			}
		} 
	}

	
	tabGroupesCT2=[] ;
	for (let i = 0 ; i<nbGroupeCT2 ; i++){
		tmp = $('#e8_G'+(i+1)+' > td:nth-of-type(2)').text() ;
		
		tabGroupesCT2[i] = [] ;
		let num_ds=0 ;
		let ds_string="" ;
		for (let c = 0 ; c<tmp.length; c++){
			if(tmp.charCodeAt(c)==160){
				//ajout du ds(ou groupe) dans le groupe
				tabGroupesCT2[i].push({txt:ds_string , id:"e8_"+ds_string});
				num_ds+=1 ;
				ds_string="";
			}
			else {
				ds_string = ds_string+tmp.charAt(c);
			}
		} 
	}



	tabGroupesS1=[] ;
	for (let i = 0 ; i<nbGroupeS1 ; i++){
		tmp = $('#e5_G'+(i+1)+' > td:nth-of-type(2)').text() ;
		
		tabGroupesS1[i] = [] ;
		let num_ds=0 ;
		let ds_string="" ;
		for (let c = 0 ; c<tmp.length; c++){
			if(tmp.charCodeAt(c)==160){
				//ajout du ds(ou groupe) dans le groupe
				tabGroupesS1[i].push({txt:ds_string , id:"e5_"+ds_string});
				num_ds+=1 ;
				ds_string="";
			}
			else {
				ds_string = ds_string+tmp.charAt(c);
			}
		} 
	}

	
	tabGroupesS2=[] ;
	for (let i = 0 ; i<nbGroupeS2 ; i++){
		tmp = $('#e9_G'+(i+1)+' > td:nth-of-type(2)').text() ;
		
		tabGroupesS2[i] = [] ;
		let num_ds=0 ;
		let ds_string="" ;
		for (let c = 0 ; c<tmp.length; c++){
			if(tmp.charCodeAt(c)==160){
				//ajout du ds(ou groupe) dans le groupe
				tabGroupesS2[i].push({txt:ds_string , id:"e9_"+ds_string});
				num_ds+=1 ;
				ds_string="";
			}
			else {
				ds_string = ds_string+tmp.charAt(c);
			}
		} 
	}



}