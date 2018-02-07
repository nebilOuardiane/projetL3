


//nb_compta est pour savoir si nous nous trouvons dans une balise pourcentage (ou moyenne) (-1 si pourcentage, sinon nombre de comptabilis de ds)
	//p_bef int pour savoir si la balise précedant est un pourcentage ( -1 sinon)
	function fill_xml_rec(p_bef, nb_compta,etape, num_groupe){
		let str = "";
		let tabGroupes;
		let tabDetailGroupe;
		let tabType;

		
		if(nb_compta > -1){
			str += '<moyenne nb_meilleur="'+nb_compta+'"';
		}
		else{
			str += '<pourcentage';
		}
		if (p_bef > -1){
			str += ' p="'+p_bef+'"';
		}
		str += '>';

		switch(etape){
			case 3:
				tabGroupes=tabGroupesCC1;
				tabDetailGroupe=tabDetailGroupeCC1;
				tabType=typeDSCC1;
			break;


			case 4:
				tabGroupes=tabGroupesCT1;
				tabDetailGroupe=tabDetailGroupeCT1;
				tabType=typeDSCT1;
			break;
			
			case 5:
				tabGroupes=tabGroupesS1;
				tabDetailGroupe=tabDetailGroupeS1;

			break;
			

			case 7:
				tabGroupes=tabGroupesCC2;
				tabDetailGroupe=tabDetailGroupeCC2;
				tabType=typeDSCC2;
			break;


			case 8:
				tabGroupes=tabGroupesCT2;
				tabDetailGroupe=tabDetailGroupeCT2;
				tabType=typeDSCT2;
			break;
			
			case 9:
				tabGroupes=tabGroupesS2;
				tabDetailGroupe=tabDetailGroupeS2;
			break;

		}



		//pour chaque composant du grouppe courrant(num groupe)

		for (let i =0; i < tabGroupes[num_groupe-1].length ; i++ ){

			//variables
			let indice_groupe_courant = num_groupe-1 ;
			let first_char = tabGroupes[indice_groupe_courant][i].txt.charAt(0);
			let p_courant = tabDetailGroupe[indice_groupe_courant].tab[i] ;
			

			
			//cas le composant du groupe est un DS
			if (first_char != 'G'){

				//texte du ds
				let txt_ds = tabGroupes[indice_groupe_courant][i].txt ;

				//le numéro du ds
				let num_ds = txt_ds.substring(2, txt_ds.length) ;



				//si c'est un ds on lui ajoute son type
				let type_ds ;
				let link ='';
				if(etape!=5&&etape!=9){
					type_ds = tabType[num_ds-1] ;
				}
				//si ce n'est pas un ds : si on est dans l'étape 5 ou 9
				else{
					switch(txt_ds){
						case 'S1' : 
							link =  'a';
						break ;

						case 'CT_S1' : 
						case 'Contrôle Terminal' :
							link =  'b';
						break ;

						case 'CC_S1' :
						case 'Contrôle Continu' : 
							link =  'c';
						break ;

						case 'CT_S2' : 
							link =  'd';
						break ;

						case 'CC_S2' : 
							link =  'e';
						break ;
					}
					
				}

				str += '<ds';

				


				//si on est dans un poucentage
				if(nb_compta == -1){
					str += ' p="'+p_courant+'"';
				}

				if(etape!=5&&etape!=9){
					str+= ' type="'+type_ds+'"';
				}
				else{
					str+= ' link="'+link+'"' ;
				}
				str+='>';
				str += ''+tabGroupes[indice_groupe_courant][i].txt+'</ds>';
			
			}

			//Cas ou le composant est un sous groupe
			else{

				let num_g = tabGroupes[indice_groupe_courant][i].txt.substring(1, tabGroupes[indice_groupe_courant][i].txt.length) ;

				
				let num_groupe_bis = num_g ; 

				//si on est dans un moyenne
				let p_bef_bis =-1  ;
				//si in est dans sun pourcentage
				if(nb_compta == -1){
					p_bef_bis = p_courant ; 
				}

				//si on vas dans un poucentage
				let nb_compta_bis = -1;
				//si on va dans une moyenne
				
				if(tabDetailGroupe[num_groupe_bis-1].moyenne){
					nb_compta_bis= tabDetailGroupe[num_groupe_bis-1].nb_compta ;
				} 
			


				str+=fill_xml_rec(p_bef_bis , nb_compta_bis , etape , num_groupe_bis);

			}
				
		}



		if(nb_compta > -1){
			str += '</moyenne>';
		}
		else{
			str+= '</pourcentage>';
		}

		return str;
			
	}

	function fill_xml (){

		var str_s1 ="" ;
		var str_s2 ="" ;
		var str_cc1 ="" ;
		var str_cc2 ="" ;
		var str_ct1 ="" ;
		var str_ct2 ="" ;
		var str_validation = "" ;

		if(controle_continue_s1){
			str_cc1 = '<cc_session1 link="c">' ;

			if (tabDetailGroupeCC1[tab_total_select[0]-1].moyenne){

				str_cc1 += fill_xml_rec(-1 ,tabDetailGroupeCC1[tab_total_select[0]-1].nb_compta  ,3 ,tab_total_select[0]);
			}
			else{
				str_cc1 += fill_xml_rec(-1 ,-1  ,3 ,tab_total_select[0]);
			}
			str_cc1 +="</cc_session1>" ;
		}

		if(controle_terminal_s1){
			str_ct1 = '<ct_session1 link="b">' ;

			if (tabDetailGroupeCT1[tab_total_select[1]-1].moyenne){

				str_ct1 += fill_xml_rec(-1 ,tabDetailGroupeCT1[tab_total_select[1]-1].nb_compta  ,4 ,tab_total_select[1]);
			}
			else{
				str_ct1 += fill_xml_rec(-1 ,-1  ,4 ,tab_total_select[1]);
			}
			str_ct1 +="</ct_session1>" ;
		}

		if(controle_continue_s2){
			str_cc2 = '<cc_session2 link="e">' ;

			if (tabDetailGroupeCC2[tab_total_select[3]-1].moyenne){

				str_cc2 += fill_xml_rec(-1 ,tabDetailGroupeCC2[tab_total_select[3]-1].nb_compta  ,7 ,tab_total_select[3]);
			}
			else{
				str_cc2 += fill_xml_rec(-1 ,-1  , 7,tab_total_select[3]);
			}
			str_cc2 +="</cc_session2>" ;
		}

		if(controle_terminal_s2){
			str_ct2 = '<ct_session2 link="d">' ;

			if (tabDetailGroupeCT2[tab_total_select[4]-1].moyenne){

				str_ct2 += fill_xml_rec(-1 ,tabDetailGroupeCT2[tab_total_select[4]-1].nb_compta  ,8 ,tab_total_select[4]);
			}
			else{
				str_ct2 += fill_xml_rec(-1 ,-1  ,8 ,tab_total_select[4]);
			}
			str_ct2 +="</ct_session2>" ;
		}


		if(nbSession==2){
			str_s2 = '<session2>';

			if (tabDetailGroupeS2[tab_total_select[5]-1].moyenne){

				str_s2 += fill_xml_rec(-1 ,tabDetailGroupeS2[tab_total_select[5]-1].nb_compta  ,9 ,tab_total_select[5]);
			}
			else{
				str_s2 += fill_xml_rec(-1 ,-1  ,9 ,tab_total_select[5]);
			}
			str_s2 +="</session2>";
		}

		if(controle_terminal_s1&&controle_continue_s1){
		
			str_s1 = '<session1 link="a">';

			if (tabDetailGroupeS1[tab_total_select[2]-1].moyenne){

				str_s1 += fill_xml_rec(-1 ,tabDetailGroupeS1[tab_total_select[2]-1].nb_compta  ,5 ,tab_total_select[2]);
			}
			else{
				str_s1 += fill_xml_rec(-1 ,-1  ,5 ,tab_total_select[2]);
			}
			str_s1 +="</session1>";
		}
		else if (controle_continue_s1&&!controle_terminal_s1){

			str_s1 = '<session1 link="a">';

			str_s1+='<pourcentage><ds p="100" link="c">CC1</ds></pourcentage>';
			str_s1 +="</session1>";
		
		}
		else{

			str_s1 = '<session1 link="a">';

			str_s1+='<pourcentage><ds p="100" link="b">CT1</ds></pourcentage>';
			str_s1 +="</session1>";
		}

		let min_validation = Number($('#e10_note_session2').val()) ;
		str_validation = '<validation>'+min_validation+'</validation>' ;


		xml = '<?xml version="1.0" encoding="UTF-8" ?>' ;
		xml += "<module>" ;
		xml += str_s1+str_s2+str_cc1+str_cc2+str_ct1+str_ct2+str_validation ;
		xml += "</module>" ;

		console.log(xml) ;
	}


