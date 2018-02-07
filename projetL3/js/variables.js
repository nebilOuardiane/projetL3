/*
 * Aurore Vandroux
 * Nébil Ouardianne
 * Rémi Kouidria
 *
 * fichier contenant les déclaration des variables globale
 */


//####################################################################
//                        ||               ||
//			  			  ||   VARIABLES   ||
//                        ||               ||
//####################################################################

	//entier représentant le nombre de session
	var nbSession=1;

	//entier représentant la sectioncourante, le numéro de l'étape courante
	var sectionCourante=1;

	//entier représentant l'etape maximale atteinte 
	var etape_max = 1 ; 

	//booléens représente la présence la présence d'un contrôle continue/terminal pour chacune des sessions
	var controle_continue_s1 =false; 
	var controle_terminal_s1 =false;
	var controle_continue_s2 =false; 
	var controle_terminal_s2 =false;

	//variables qui dit si les btn sont déjà la spour l'étape9
	var btn_CC1_is_present = false ; 
	var btn_CT1_is_present = false ; 
	var btn_CC2_is_present = false ; 
	var btn_CT2_is_present = false ; 


	//variables pour stocker les nombres de ds pour le controle continu/terminal de chaque sessions
	var nbDSCC1 =1 ;
	var nbDSCT1 =1 ;
	var nbDSCC2 =1 ;
	var nbDSCT2 =1 ;

	//varaibles pour stocker les type des ds
	var typeDSCC1 = [] ;
	var typeDSCT1 = [] ;
	var typeDSCC2 = [] ;
	var typeDSCT2 = [] ;


	//chaîne de caractère représentant le contenu de la ligne de display lors de la création de groupe
	var strCC1 = "" ;
	var strCT1 = "" ;
	var strCC2 = "" ;
	var strCT2 = "" ;
	var strS1  = "" ;
	var strS2  = "" ;
	
	/*	
	 *	tableaux d'objet réprésentant le grouppe en cour de création 
	 *	où chaque objet est {id , txt}
	 *	id est une chaîne de caractère et réprénte l'id du ds ou du groupe selectionné, ex : "e3_DS1"
	 *	txt est une chaine de caractères et réprésente la valeure texutelle du ds ou du groupe selectionné, ex : "DS1"
	 */
	var DSCC1 = [] ; 
	var DSCT1 = [] ;
	var DSCC2 = [] ;
	var DSCT2 = [] ;
	var DSS1  = [] ; 
	var DSS2  = [] ;
	
	//entier réprensetant le nombre de grouppe créer 
	var nbGroupeCC1 = 0 ;
	var nbGroupeCT1 = 0 ;
	var nbGroupeCC2 = 0 ;
	var nbGroupeCT2 = 0 ;
	var nbGroupeS1  = 0 ;
	var nbGroupeS2  = 0 ;

	//talbeau de tableau d'ojet réprésentant les groupe créer
	//les objet sont du type décrit ci-dessus
	var tabGroupesCC1 = [] ;
	var tabGroupesCT1 = [] ;
	var tabGroupesCC2 = [] ;
	var tabGroupesCT2 = [] ; 
	var tabGroupesS1  = [] ;
	var tabGroupesS2  = [] ;

	//{bool(m ou p) moyenne ; int nb_compta ; tab pour sotcker les pourcentage int  }
	var tabDetailGroupeCC1 = [] ; 
	var tabDetailGroupeCT1 = [] ; 
	var tabDetailGroupeCC2 = [] ; 
	var tabDetailGroupeCT2 = [] ; 
	var tabDetailGroupeS1  = [] ; 
	var tabDetailGroupeS2  = [] ; 

	/*
	* tableaux contenant les num de groupes sélectionner pour les différente étapes
	*
	* à l'indice 0 se trouve le numéro du groupe sélectionner pour le CC1
	* à l'indice 1 se trouve le numéro du groupe sélectionner pour le CT1
	* à l'indice 2 se trouve le numéro du groupe sélectionner pour le S1
	* à l'indice 3 se trouve le numéro du groupe sélectionner pour le CC2
	* à l'indice 4 se trouve le numéro du groupe sélectionner pour le CT2
	* à l'indice 5 se trouve le numéro du groupe sélectionner pour le S2
	*/
	var tab_total_select = [] ;

	//contenu du fichier xml
	var xml = "" ;
	



