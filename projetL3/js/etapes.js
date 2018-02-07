function  go_to_etape (etape){
		//if (etape<=etape_max){
		if(etape< sectionCourante || etape == etape_max){
			//enlever le active de l'ancienne section courante
			if (etape< sectionCourante){
				etape_max=etape ;
			}

			if (etape > sectionCourante){
				$("#nav_"+sectionCourante).removeClass("active") ;

				$("#btn_nav_"+sectionCourante+" span").removeClass("glyphicon-pencil") ;

				$("#btn_nav_"+sectionCourante+" span").addClass("glyphicon-star") ;


				var str_cur = "#etape"+sectionCourante ;
				$(str_cur).hide();
				sectionCourante = etape ;

				$("#btn_nav_"+sectionCourante+" span").removeClass("glyphicon-star-empty") ;

				$("#btn_nav_"+sectionCourante+" span").addClass("glyphicon-pencil") ;

			}
			else{
				

				$("#nav_"+sectionCourante).removeClass("active") ;


				for(var i=etape+1;i<=sectionCourante;i++){

					if(i==sectionCourante){
						$("#btn_nav_"+i+" span").removeClass("glyphicon-pencil") ;

					}else{
						$("#btn_nav_"+i+" span").removeClass("glyphicon-star") ;
					}

					$("#btn_nav_"+i+" span").addClass("glyphicon-star-empty") ;

				}

				var str_cur = "#etape"+sectionCourante ;
				$(str_cur).hide();
				sectionCourante = etape ;

				$("#btn_nav_"+sectionCourante+" span").removeClass("glyphicon-star") ;

				$("#btn_nav_"+sectionCourante+" span").addClass("glyphicon-pencil") ;

			}




			var str_cur = "#etape"+sectionCourante ;
			$(str_cur).show();

			//ajouter la active à la nouvelle section courante
			$("#nav_"+sectionCourante).addClass("active") ;


		}
	}

	function update_etape_max (etape){
		if(etape_max<etape){
			etape_max =etape ;
			if(etape ==3 || etape ==4 || etape ==7 || etape ==8  ||etape ==5 || etape==9){
				ntm(etape) ;
			}
			
		}
	}

	function to_next_step(next){
		update_etape_max(next) ;
		go_to_etape(next) ;
	}

	