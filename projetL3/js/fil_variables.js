//recupération du détails des grouppe
//récupération du total select
//récupération des types des ds

console.log("te mère") ;

function fill_variables(){

	

		//pour le CC1
		for (let i=0 ; i<nbGroupeCC1 ; i++){
			let struct_groupe = { moyenne : true, nb_compta : 1 , tab : [] };


			struct_groupe.moyenne = $('#e3_chkG'+(i+1)).prop("checked") ;

			

			struct_groupe.nb_compta =  Number($('#e3_nbComptaG'+(i+1)).val() ) ;

			for (let j = 0 ; j<tabGroupesCC1[i].length ; j++){

				struct_groupe.tab[j]= Number($('#e3_nbPourcent'+j+'G'+(i+1)).val());
			}
		
			tabDetailGroupeCC1[i] = deepCopy(struct_groupe) ;
			
		}

		//pour le CT1
		for (let i=0 ; i<nbGroupeCT1 ; i++){
			let struct_groupe = { moyenne : true, nb_compta : 1 , tab : [] };


			struct_groupe.moyenne = $('#e4_chkG'+(i+1)).prop("checked") ;

			

			struct_groupe.nb_compta =  Number($('#e4_nbComptaG'+(i+1)).val() ) ;

			for (let j = 0 ; j<tabGroupesCT1[i].length ; j++){

				struct_groupe.tab[j]= Number($('#e4_nbPourcent'+j+'G'+(i+1)).val());
			}
		
			tabDetailGroupeCT1[i] = deepCopy(struct_groupe) ;
			
		}

			//pour le CC2
		for (let i=0 ; i<nbGroupeCC2 ; i++){
			let struct_groupe = { moyenne : true, nb_compta : 1 , tab : [] };


			struct_groupe.moyenne = $('#e7_chkG'+(i+1)).prop("checked") ;

			

			struct_groupe.nb_compta =  Number($('#e7_nbComptaG'+(i+1)).val() ) ;

			for (let j = 0 ; j<tabGroupesCC2[i].length ; j++){

				struct_groupe.tab[j]= Number($('#e7_nbPourcent'+j+'G'+(i+1)).val());
			}
		
			tabDetailGroupeCC2[i] = deepCopy(struct_groupe) ;
			
		}
		

		//pour le CT2
		for (let i=0 ; i<nbGroupeCT2 ; i++){
			let struct_groupe = { moyenne : true, nb_compta : 1 , tab : [] };


			struct_groupe.moyenne = $('#e8_chkG'+(i+1)).prop("checked") ;

			

			struct_groupe.nb_compta =  Number($('#e8_nbComptaG'+(i+1)).val() ) ;

			for (let j = 0 ; j<tabGroupesCT2[i].length ; j++){

				struct_groupe.tab[j]= Number($('#e8_nbPourcent'+j+'G'+(i+1)).val());
			}
		
			tabDetailGroupeCT2[i] = deepCopy(struct_groupe) ;
			
		}
//pour le S1
		for (let i=0 ; i<nbGroupeS1 ; i++){
			let struct_groupe = { moyenne : true, nb_compta : 1 , tab : [] };


			struct_groupe.moyenne = $('#e5_chkG'+(i+1)).prop("checked") ;

			

			struct_groupe.nb_compta =  Number($('#e5_nbComptaG'+(i+1)).val() ) ;

			for (let j = 0 ; j<tabGroupesS1[i].length ; j++){

				struct_groupe.tab[j]= Number($('#e5_nbPourcent'+j+'G'+(i+1)).val());
			}
		
			tabDetailGroupeS1[i] = deepCopy(struct_groupe) ;
			
		}

		//pour le S2
		for (let i=0 ; i<nbGroupeS2 ; i++){
			let struct_groupe = { moyenne : true, nb_compta : 1 , tab : [] };


			struct_groupe.moyenne = $('#e9_chkG'+(i+1)).prop("checked") ;

			

			struct_groupe.nb_compta =  Number($('#e9_nbComptaG'+(i+1)).val() ) ;

			for (let j = 0 ; j<tabGroupesS2[i].length ; j++){

				struct_groupe.tab[j]= Number($('#e9_nbPourcent'+j+'G'+(i+1)).val());
			}
		
			tabDetailGroupeS2[i] = deepCopy(struct_groupe) ;
			
		}


		//remplissage de total_select
		tab_total_select[0] =  $('#e3_select').val().substring(1, $('#e3_select').val().length);

		tab_total_select[1] =  $('#e4_select').val().substring(1, $('#e4_select').val().length);

		tab_total_select[2] =  $('#e5_select').val().substring(1, $('#e5_select').val().length);

		tab_total_select[3] =  $('#e7_select').val().substring(1, $('#e7_select').val().length);

		tab_total_select[4] =  $('#e8_select').val().substring(1, $('#e8_select').val().length);

		tab_total_select[5] =  $('#e9_select').val().substring(1, $('#e9_select').val().length);
		

		//remplissage des varailbles qui stockes les type des DS

		//pour CC1
		for (let i = 1 ; i<=nbDSCC1 ; i++){
			typeDSCC1[i-1] =  $('#e3_DS'+i+' > td > select').val() ;
		}

		//pour CT1
		for (let i = 1 ; i<=nbDSCT1 ; i++){
			typeDSCT1[i-1] =  $('#e4_DS'+i+' > td > select').val() ;
		}

		//pour CC2
		for (let i = 1 ; i<=nbDSCC2 ; i++){
			typeDSCC2[i-1] =  $('#e7_DS'+i+' > td > select').val() ;
		}

		//pour CT2
		for (let i = 1 ; i<=nbDSCT2 ; i++){
			typeDSCT2[i-1] =  $('#e8_DS'+i+' > td > select').val() ;
		}


	}
