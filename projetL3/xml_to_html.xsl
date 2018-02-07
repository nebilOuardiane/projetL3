<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:strip-space elements="*"/>

	<xsl:output method="html"/>




	<xsl:template match="/">
		<xsl:call-template name="etape2"></xsl:call-template>
		<xsl:call-template name="etape3"></xsl:call-template>
		<xsl:call-template name="etape4"></xsl:call-template>
		<xsl:call-template name="etape5"></xsl:call-template>
		<xsl:call-template name="etape6"></xsl:call-template>
		<xsl:call-template name="etape7"></xsl:call-template>
		<xsl:call-template name="etape8"></xsl:call-template>
		<xsl:call-template name="etape9"></xsl:call-template>
		<xsl:call-template name="etape10"></xsl:call-template>
	</xsl:template>


<!-- ############################################################################################## -->

<xsl:template match="moyenne|pourcentage">
	<xsl:param name="num_groupe"></xsl:param>
	<xsl:param name="num_etape"></xsl:param>


	<tr>
		<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_G<xsl:value-of select="$num_groupe"/></xsl:attribute>
			
		<td>
			<input type="button"  class="GroupeButton">
				<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_btnG<xsl:value-of select="$num_groupe"/></xsl:attribute>
				<xsl:attribute name="value">G<xsl:value-of select="$num_groupe"/></xsl:attribute>
			</input>
		</td>

		<td>
			<xsl:for-each select="./child::*">
				<xsl:choose>
					<xsl:when test="name(.) = 'ds'"><xsl:value-of select="."/><xsl:text >&#160;</xsl:text></xsl:when>
				<xsl:otherwise>G<xsl:value-of select="$num_groupe + count(./following-sibling::moyenne) + count(./following-sibling::pourcentage)+1"/><xsl:text >&#160;</xsl:text></xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</td>

		<td>
			<input type="checkbox">
				<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_chkG<xsl:value-of select="$num_groupe"/></xsl:attribute>
				<xsl:if test="name(.) = 'moyenne'">
					<xsl:attribute name="checked">true</xsl:attribute>
				</xsl:if>
			</input>

			<label><xsl:attribute name="for">e<xsl:value-of select="$num_etape"/>_chkG<xsl:value-of select="$num_groupe"/></xsl:attribute>même pourcentage</label>
		</td>

		<td>
			<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_cas1G<xsl:value-of select="$num_groupe"/></xsl:attribute>

			<label >
				<xsl:attribute name="for">e<xsl:value-of select="$num_etape"/>_nbComptaG<xsl:value-of select="$num_groupe"/></xsl:attribute>
				Nombre de Ds à comptabiliser
			</label>

			<input type="number" min="1" max="2">
				<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_nbComptaG<xsl:value-of select="$num_groupe"/></xsl:attribute>

				<xsl:attribute name="value">

					<xsl:choose>
						<xsl:when test="name(.) = 'moyenne'">
							<xsl:value-of select="./@nb_meilleur"/>
						</xsl:when>

						<xsl:otherwise>
							<xsl:value-of select="count(./child::*)"/>
						</xsl:otherwise>
					</xsl:choose>

				</xsl:attribute>
			</input>
		</td>

		<td >
			<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_cas2G<xsl:value-of select="$num_groupe"/></xsl:attribute>


			<xsl:for-each select="./child::*">
				<xsl:choose>
					<xsl:when test="name(.) = 'ds'">
						
						<label >
							<xsl:attribute name="for">e<xsl:value-of select="$num_etape"/>_nbComptaG<xsl:value-of select="$num_groupe"/></xsl:attribute>
							Pourcentage 
							<xsl:text >&#160;</xsl:text>
							<xsl:value-of select="."/>
						</label>


						<input type="number" min="1" max="100" value="50">
							<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_nbPourcent<xsl:value-of  select="count(./following-sibling::moyenne) + count(./following-sibling::pourcentage)+ count(./following-sibling::ds)"/>G<xsl:value-of select="$num_groupe"/></xsl:attribute>

							<xsl:attribute name="value">
								<xsl:value-of select="./@p"/>
							</xsl:attribute>
						</input>
						
					</xsl:when>

					<xsl:otherwise>
						<label >
							<xsl:attribute name="for">e<xsl:value-of select="$num_etape"/>_nbComptaG<xsl:value-of select="$num_groupe"/></xsl:attribute>
							Pourcentage 
							<xsl:text >&#160;</xsl:text>

							G<xsl:value-of select="$num_groupe + count(./following-sibling::moyenne) + count(./following-sibling::pourcentage)+1"/>
						</label>


						<input type="number" min="1" max="100" value="50">
							<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_nbPourcent<xsl:value-of  select="count(./following-sibling::moyenne) + count(./following-sibling::pourcentage)+ count(./following-sibling::ds)"/>G<xsl:value-of select="$num_groupe"/></xsl:attribute>

							<xsl:attribute name="value">
								<xsl:value-of select="./@p"/>
							</xsl:attribute>
						</input>

						
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>



		</td>
	</tr>


	<!-- pour faire les groupe -->
	<xsl:for-each select="./child::*">
		<xsl:choose>
			<xsl:when test="name(.) = 'ds'">
			</xsl:when>
			<xsl:otherwise>

				<xsl:apply-templates select=".">
					<xsl:with-param name="num_groupe"><xsl:value-of select="$num_groupe + count(./following-sibling::moyenne) + count(./following-sibling::pourcentage)+1"/></xsl:with-param>
					<xsl:with-param name="num_etape"><xsl:value-of select="$num_etape"/></xsl:with-param>
				</xsl:apply-templates>
				
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>


</xsl:template>


<!-- pour faire le options du total_select -->
<xsl:template name="generate_option">
	<xsl:param name="num_groupe"></xsl:param> 
	<xsl:param name="num_cur"></xsl:param> 
	<xsl:param name="num_etape"></xsl:param>

	<xsl:if test="$num_groupe &gt;= $num_cur ">
		<option >
			<xsl:attribute name="id">
				e<xsl:value-of select="$num_etape"/>_select<xsl:value-of select="$num_cur"/>
			</xsl:attribute>

			<xsl:if test="$num_cur = 1 ">
				<xsl:attribute name="selected">
					true
				</xsl:attribute>
			</xsl:if>

			G<xsl:value-of select="$num_cur"/>

		</option>

		<xsl:call-template name="generate_option">
			<xsl:with-param name="num_cur"><xsl:value-of select="$num_cur +1"/></xsl:with-param>
			<xsl:with-param name="num_groupe"><xsl:value-of select="$num_groupe"/></xsl:with-param>
			<xsl:with-param name="num_etape"><xsl:value-of select="$num_etape"/></xsl:with-param>
		</xsl:call-template>
	</xsl:if>

</xsl:template>



<xsl:template name="table_ds">
		<xsl:param name="num_etape"></xsl:param>

		<tr >
			<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_<xsl:value-of select="."/></xsl:attribute>

			<td >
				<input type="button"  class="dsButton clickableCC1">
					<xsl:attribute name="id">e<xsl:value-of select="$num_etape"/>_btn_<xsl:value-of select="."/></xsl:attribute>
					<xsl:attribute name="value">
						<xsl:value-of select="."/>
					</xsl:attribute>
				</input>
			</td>
    		<td>
				<select class="typeDs" name="nomDS" size="1" >
					<option selected="true">
						<xsl:value-of select="@type"/>
					</option>
					
				</select>
			</td> 
		</tr>

</xsl:template>



<!-- ############################################################################################## -->

	<xsl:template name="etape2">
		
		<section id="etape2">
	    	
	    		<h1 class="text-center">1ère Session</h1>

	    		<div>

		    		<p class="error" id="e2_error1">Erreur : Contrôle continue et contrôle terminal ne peuvent être les deux à "non".</p>	
		    		<table>
		    			<thead>
		    				<tr>
		    					<td></td>
		    					<td>Oui</td>
		    					<td>Non</td>
		    				</tr>
		    			</thead>
		    			<tbody>
			    			<tr>
			    				<td><label for="radioCC1"> Contrôle continue </label></td>
			    				<xsl:choose>
			    					<xsl:when test="/module/cc_session1">
					    				<td><input type="radio" value="yes" id="radioCC1_y" name="CC1" checked="true"/></td>
					    				<td><input type="radio" value="no" id="radioCC1_n" name="CC1"/></td>
					    			</xsl:when>
					    			<xsl:otherwise>
					    				<td><input type="radio" value="yes" id="radioCC1_y" name="CC1" /></td>
					    				<td><input type="radio" value="no" id="radioCC1_n" name="CC1" checked="true"/></td>
					    			</xsl:otherwise>
					    		</xsl:choose>
					    	</tr>

				    		
				    		<tr>
					    		<td><label for="radioCT1"> Contrôle terminal </label></td>
					    		<xsl:choose>
			    					<xsl:when test="/module/ct_session1">
					    				<td><input type="radio" value="yes" id="radioCT1_y" name="CT1" checked="true"/></td>
					    				<td><input type="radio" value="no" id="radioCT1_n" name="CT1"/></td>
					    			</xsl:when>
					    			<xsl:otherwise>
					    				<td><input type="radio" value="yes" id="radioCT1_y" name="CT1" /></td>
					    				<td><input type="radio" value="no" id="radioCT1_n" name="CT1" checked="true"/></td>
					    			</xsl:otherwise>
					    		</xsl:choose>

					    	</tr>
					    </tbody>	
		    		</table>
		    	</div>

	    		<input class="pull-right btn btn-valider btn-lg" type="button" value="Valider" id="2boutonValider"/>

	    </section>
	</xsl:template>


	<!-- ############################################################################################## -->
	<xsl:template name="etape3">

		<xsl:choose >
			<!-- si il y un controle continu S1 -->
			<xsl:when test="/module/cc_session1">
				<section  id="etape3">
		    	
			    	<h1 class="text-center" >Détail du contrôle continue S1</h1>

			    	<div >
				    	<p class="error" id="e3_error1"></p>
						
						<table >
							<tr>
								<td>nombre de DS</td>
								<td>
									<input id="e3_nbDS"  type="number" min="1" max="20">
										<xsl:attribute name="value">
						    				<xsl:value-of select="count(/module/cc_session1//ds[not(preceding::ds[count(ancestor::cc_session1) = 1]/. = .)])"/>
						    			</xsl:attribute>
									</input>
								</td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e3_tableDS" >
							<xsl:for-each select="/module/cc_session1//ds[not(preceding::ds[count(ancestor::cc_session1) = 1]/. = .)]">
								<xsl:call-template name="table_ds">
									<xsl:with-param name="num_etape">3</xsl:with-param>
								</xsl:call-template>
							</xsl:for-each>
						</table>


						<table class="tableGroupe" id="e3_tableGroupe">
							<xsl:for-each select="(/module/cc_session1/pourcentage) | (/module/cc_session1/moyenne)">
								<xsl:apply-templates select=".">
									<xsl:with-param name="num_groupe">1</xsl:with-param>
									<xsl:with-param name="num_etape">3</xsl:with-param>
								</xsl:apply-templates>
							</xsl:for-each>
						</table>
					
					
						<table class="table_new_groupe" id="e3_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e3_numGroupe">G<xsl:value-of select="count(/module/cc_session1//pourcentage)+count(/module/cc_session1//moyenne)+1"/></td>
								<td id="e3_groupeCreationDisplay"></td>
								<td><input type="button" id="e3_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e3_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
					
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e3_select" name="totalSelect" size="1" >
										<xsl:call-template name="generate_option">
											<xsl:with-param name="num_cur">1</xsl:with-param>
											<xsl:with-param name="num_groupe"><xsl:value-of select="count(/module/cc_session1//pourcentage)+count(/module/cc_session1//moyenne)"/></xsl:with-param>
											<xsl:with-param name="num_etape">3</xsl:with-param>
										</xsl:call-template>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e3_btn_Valider" />


				</section>
			</xsl:when>


			<!-- si il n'y a pas de controle continue S1 -->
			<xsl:otherwise>
				<section  id="etape3">
	    	
			    	<h1 class="text-center" >Détail du contrôle continue S1</h1>

			    	<div >
				    	<p class="error" id="e3_error1"></p>
						
						<table >
							<tr>
								<td>nombre de DS</td>
								<td><input id="e3_nbDS" type="number" value="1" min="1" max="20"/></td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e3_tableDS" >
					    			<tr  id="e3_DS1">
					    				<td >
					    					<input type="button" id="e3_btn_DS1" value="DS1" class="dsButton clickableCC1"/>
					    				</td>
							    		<td>
											<select class="typeDs" name="nomDS" size="1" >
												
												
											</select>
										</td>
							    	</tr>    		
						</table>

						<table class="tableGroupe" id="e3_tableGroupe">
						</table>
					
					
						<table class="table_new_groupe" id="e3_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e3_numGroupe">G1</td>
								<td id="e3_groupeCreationDisplay"></td>
								<td><input type="button" id="e3_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e3_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e3_select" name="totalSelect" size="1" disabled="">
										<option id="e3_SelectInitial">Vous devez créer un groupe</option>

									</select>
								
								</td>

								
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e3_btn_Valider" disabled="true" />

				</section>

			</xsl:otherwise>
		</xsl:choose>
		 
	</xsl:template>


	<!-- ############################################################################################## -->

	<xsl:template name="etape4">

		<xsl:choose>
			<!-- si il y a un controle terminal S1 -->
			<xsl:when test="/module/ct_session1">
				<section id="etape4">
			    	
			    	<h1 class="text-center" >Détail du contrôle terminal S1</h1>

			    	<div >
				    	<p class="error" id="e4_error1"></p>
						
						<table >
							<tr>
								<td>Nombre d'épreuve(s)</td>
								<td>
									<input id="e4_nbDS" type="number"  min="1" max="20">
										<xsl:attribute name="value">
						    				<xsl:value-of select="count(/module/ct_session1//ds[not(preceding::ds[count(ancestor::ct_session1) = 1]/. = .)])"/>
						    			</xsl:attribute>
									</input>
								</td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e4_tableDS" >
					    	<xsl:for-each select="/module/ct_session1//ds[not(preceding::ds[count(ancestor::ct_session1) = 1]/. = .)]">
								<xsl:call-template name="table_ds">
									<xsl:with-param name="num_etape">4</xsl:with-param>
								</xsl:call-template>
							</xsl:for-each>	
						</table>

						<table class="tableGroupe" id="e4_tableGroupe">
							<xsl:for-each select="(/module/ct_session1/pourcentage) | (/module/ct_session1/moyenne)">
								<xsl:apply-templates select=".">
									<xsl:with-param name="num_groupe">1</xsl:with-param>
									<xsl:with-param name="num_etape">4</xsl:with-param>
								</xsl:apply-templates>
							</xsl:for-each>
						</table>
					
					
						<table  class="table_new_groupe" id="e4_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e4_numGroupe">G<xsl:value-of select="count(/module/ct_session1//pourcentage)+count(/module/ct_session1//moyenne)+1"/></td>
								<td id="e4_groupeCreationDisplay"></td>
								<td><input type="button" id="e4_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e4_btn_Creer" value="Créer"/></td>
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e4_select" name="totalSelect" size="1">
										<xsl:call-template name="generate_option">
											<xsl:with-param name="num_cur">1</xsl:with-param>
											<xsl:with-param name="num_groupe"><xsl:value-of select="count(/module/ct_session1//pourcentage)+count(/module/ct_session1//moyenne)"/></xsl:with-param>
											<xsl:with-param name="num_etape">4</xsl:with-param>
										</xsl:call-template>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e4_btn_Valider" />
			    	
			    </section>
			</xsl:when>

			<!-- si il n'y a pas de controle continue S1 -->
			<xsl:otherwise>

				<section id="etape4">
			    	
			    	<h1 class="text-center" >Détail du contrôle terminal S1</h1>

			    	<div >
				    	<p class="error" id="e4_error1"></p>
						
						<table >
							<tr>
								<td>Nombre d'épreuve(s)</td>
								<td><input id="e4_nbDS" type="number" value="1" min="1" max="20"/></td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e4_tableDS" >
					    			<tr  id="e4_DS1">
					    				<td >
					    					<input type="button" id="e4_btn_DS1" value="DS1" class="dsButton clickableCC1"/>
					    				</td>
							    		<td>
											<select class="typeDs" name="nomDS" size="1" >
												
											</select>
										</td>
							    	</tr>    		
						</table>

						<table class="tableGroupe" id="e4_tableGroupe">
						</table>
					
					
						<table  class="table_new_groupe" id="e4_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e4_numGroupe">G1</td>
								<td id="e4_groupeCreationDisplay"></td>
								<td><input type="button" id="e4_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e4_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e4_select" name="totalSelect" size="1" disabled="">
										<option id="e4_SelectInitial">Vous devez créer un groupe</option>

									</select>
								
								</td>

								
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e4_btn_Valider" disabled=""/>
			    	
			    </section>
		 
			</xsl:otherwise>
		</xsl:choose>

		 
	</xsl:template>

		<!-- ############################################################################################## -->


	<xsl:template name="etape5">

		<xsl:choose>

			<!-- si il y a un controle terminal et un controle continue S1 -->
			<xsl:when test="/module/ct_session1 and /module/cc_session1">


				<section id="etape5">
	    	
					<h1 class="text-center" >Détail de la première session</h1>

			    	<div >
				    	<p class="error" id="e5_error1"></p>
						
						<table >
							<tr>
								<td><input type="button" id="e5_btn_CC1" value="Contrôle Continu" class="dsButton clickableCC1"/></td>
					    		<td><input type="button" id="e5_btn_CT1" value="Contrôle Terminal" class="dsButton clickableCC1"/></td>

							</tr>
						</table>
						

						<table class="tableGroupe" id="e5_tableGroupe">
							<xsl:for-each select="(/module/session1/pourcentage) | (/module/session1/moyenne)">
								<xsl:apply-templates select=".">
									<xsl:with-param name="num_groupe">1</xsl:with-param>
									<xsl:with-param name="num_etape">5</xsl:with-param>
								</xsl:apply-templates>
							</xsl:for-each>
						</table>
					
					
						<table  class="table_new_groupe" id="e5_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e5_numGroupe">G<xsl:value-of select="count(/module/session1//pourcentage)+count(/module/session1//moyenne)+1"/></td>
								<td id="e5_groupeCreationDisplay"></td>
								<td><input type="button" id="e5_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e5_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e5_select" name="totalSelect" size="1" >
										<xsl:call-template name="generate_option">
											<xsl:with-param name="num_cur">1</xsl:with-param>
											<xsl:with-param name="num_groupe"><xsl:value-of select="count(/module/session1//pourcentage)+count(/module/session1//moyenne)"/></xsl:with-param>
											<xsl:with-param name="num_etape">5</xsl:with-param>
										</xsl:call-template>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e5_btn_Valider" />
			    	
			    </section>

			</xsl:when>

			<!-- si n'y a qu'il controle continue ou qu'uncontrole terminal S1 -->
			<xsl:otherwise>

				<section id="etape5">
	    	
					<h1 class="text-center" >Détail de la première session</h1>

			    	<div >
				    	<p class="error" id="e5_error1"></p>
						
						<table >
							<tr>
								<td><input type="button" id="e5_btn_CC1" value="Contrôle Continu" class="dsButton clickableCC1"/></td>
					    		<td><input type="button" id="e5_btn_CT1" value="Contrôle Terminal" class="dsButton clickableCC1"/></td>

							</tr>
						</table>
						

						<table class="tableGroupe" id="e5_tableGroupe">
						</table>
					
					
						<table  class="table_new_groupe" id="e5_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e5_numGroupe">G1</td>
								<td id="e5_groupeCreationDisplay"></td>
								<td><input type="button" id="e5_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e5_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e5_select" name="totalSelect" size="1" disabled="">
										<option id="e5_SelectInitial">Vous devez créer un groupe</option>

									</select>
								
								</td>

								
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e5_btn_Valider" disabled=""/>
			    	
			    </section>
			</xsl:otherwise>

		</xsl:choose>	 
	</xsl:template>

<!-- ############################################################################################## -->


	<xsl:template name="etape6">
		<section id="etape6">
	    	
	    	<h1 class="text-center">Session 2</h1>

	    	<div>

		    		<p class="error" id="e6_error1">Erreur : Contrôle continue et contrôle terminal ne peuvent être les deux à "non".</p>	


		    		<table>
		    			<thead>
		    				<tr>
		    					<td></td>
		    					<td>Oui</td>
		    					<td>Non</td>
		    				</tr>
		    			</thead>
		    			<tbody>
			    			<tr>
			    				<td><label for="radioCC2"> Contrôle continue </label></td>
			    				<xsl:choose>
			    					<xsl:when test="/module/cc_session2">
					    				<td><input type="radio" value="yes" id="radioCC2_y" name="CC2" checked="true"/></td>
					    				<td><input type="radio" value="no" id="radioCC2_n" name="CC2"/></td>
					    			</xsl:when>
					    			<xsl:otherwise>
					    				<td><input type="radio" value="yes" id="radioCC2_y" name="CC2" /></td>
					    				<td><input type="radio" value="no" id="radioCC2_n" name="CC2" checked="true"/></td>
					    			</xsl:otherwise>
					    		</xsl:choose>
					    	</tr>

				    		
				    		<tr>
					    		<td><label for="radioCT2"> Contrôle terminal </label></td>
					    		<xsl:choose>
					    			<xsl:when test="/module/ct_session2">
					    				<td><input type="radio" value="yes" id="radioCT2_y" name="CT2" checked="true"/></td>
					    				<td><input type="radio" value="no" id="radioCT2_n" name="CT2"/></td>
					    			</xsl:when>
					    			<xsl:otherwise>
					    				<td><input type="radio" value="yes" id="radioCT2_y" name="CT2" /></td>
					    				<td><input type="radio" value="no" id="radioCT2_n" name="CT2" checked="true"/></td>
					    			</xsl:otherwise>
					    		</xsl:choose>
					    	</tr>
					    </tbody>	
		    		</table>
		    	</div>

	    		<input class="pull-right btn btn-valider btn-lg" type="button" value="Valider" id="6boutonValider"/>

	    </section>
	</xsl:template>


	<!-- ############################################################################################## -->


	<xsl:template name="etape7">

		<xsl:choose>

			<!-- si il y a un controle continue de session 2 -->
			<xsl:when test="/module/cc_session2">
				<section id="etape7">
	    	
			    	<h1 class="text-center">Détail du contrôle continue S2</h1>


			    	<div >
				    	<p class="error" id="e7_error1"></p>
						
						<table >
							<tr>
								<td>nombre de DS</td>
								<td>
									<input id="e7_nbDS" type="number" min="1" max="20">
										<xsl:attribute name="value">
						    				<xsl:value-of select="count(/module/cc_session2//ds[not(preceding::ds[count(ancestor::cc_session2) = 1]/. = .)])"/>
						    			</xsl:attribute>
									</input>
								</td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e7_tableDS" >
					    	<xsl:for-each select="/module/cc_session2//ds[not(preceding::ds[count(ancestor::cc_session2) = 1]/. = .)]">
								<xsl:call-template name="table_ds">
									<xsl:with-param name="num_etape">7</xsl:with-param>
								</xsl:call-template>
							</xsl:for-each>		
						</table>

						<table class="tableGroupe" id="e7_tableGroupe">
							<xsl:for-each select="(/module/cc_session2/pourcentage) | (/module/cc_session2/moyenne)">
								<xsl:apply-templates select=".">
									<xsl:with-param name="num_groupe">1</xsl:with-param>
									<xsl:with-param name="num_etape">7</xsl:with-param>
								</xsl:apply-templates>
							</xsl:for-each>
						</table>
					
					
						<table  class="table_new_groupe" id="e7_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e7_numGroupe">G<xsl:value-of select="count(/module/cc_session2//pourcentage)+count(/module/cc_session2//moyenne)+1"/></td>
								<td id="e7_groupeCreationDisplay"></td>
								<td><input type="button" id="e7_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e7_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>

						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e7_select" name="totalSelect" size="1" >
										<xsl:call-template name="generate_option">
											<xsl:with-param name="num_cur">1</xsl:with-param>
											<xsl:with-param name="num_groupe"><xsl:value-of select="count(/module/cc_session2//pourcentage)+count(/module/cc_session2//moyenne)"/></xsl:with-param>
											<xsl:with-param name="num_etape">7</xsl:with-param>
										</xsl:call-template>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e7_btn_Valider"/>

			    </section>
			</xsl:when>



			<!-- si il n'y a pas de controle continue de session 2 -->
			<xsl:otherwise>

				<section id="etape7">
	    	
			    	<h1 class="text-center">Détail du contrôle continue S2</h1>


			    	<div >
				    	<p class="error" id="e7_error1"></p>
						
						<table >
							<tr>
								<td>nombre de DS</td>
								<td><input id="e7_nbDS" type="number" value="1" min="1" max="20"/></td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e7_tableDS" >
					    			<tr  id="e7_DS1">
					    				<td >
					    					<input type="button" id="e7_btn_DS1" value="DS1" class="dsButton clickableCC1"/>
					    				</td>
							    		<td>
											<select class="typeDs"  name="nomDS" size="1" >
												
											</select>
										</td>
							    	</tr>    		
						</table>

						<table class="tableGroupe" id="e7_tableGroupe">
						</table>
					
					
						<table  class="table_new_groupe" id="e7_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e7_numGroupe">G1</td>
								<td id="e7_groupeCreationDisplay"></td>
								<td><input type="button" id="e7_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e7_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>

						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e7_select" name="totalSelect" size="1" disabled="">
										<option id="e7_SelectInitial">Vous devez créer un groupe</option>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e7_btn_Valider" disabled=""/>

			    </section>
			</xsl:otherwise>

		</xsl:choose>

		
		 
	</xsl:template>
	<!-- ############################################################################################## -->

	<xsl:template name="etape8">

		<xsl:choose>

			<!-- si il y a un controle terminal de session 2 -->
			<xsl:when test="/module/ct_session2">
				<section id="etape8">
	    	
			    	<h1 class="text-center">Détail du contrôle terminal S2</h1>

			    	<div >
				    	<p class="error" id="e8_error1"></p>
						
						<table >
							<tr>
								<td>Nombre d'épreuve(s)</td>
								<td>
									<input id="e8_nbDS" type="number"  min="1" max="20">
										<xsl:attribute name="value">
						    				<xsl:value-of select="count(/module/ct_session2//ds[not(preceding::ds[count(ancestor::ct_session2) = 1]/. = .)])"/>
						    			</xsl:attribute>
									</input>
								</td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e8_tableDS" >
					    	<xsl:for-each select="/module/ct_session2//ds[not(preceding::ds[count(ancestor::ct_session2) = 1]/. = .)]">
								<xsl:call-template name="table_ds">
									<xsl:with-param name="num_etape">8</xsl:with-param>
								</xsl:call-template>
							</xsl:for-each>	
						</table>

						<table class="tableGroupe" id="e8_tableGroupe">
							<xsl:for-each select="(/module/ct_session2/pourcentage) | (/module/ct_session2/moyenne)">
								<xsl:apply-templates select=".">
									<xsl:with-param name="num_groupe">1</xsl:with-param>
									<xsl:with-param name="num_etape">8</xsl:with-param>
								</xsl:apply-templates>
							</xsl:for-each>
						</table>
					
					
						<table  class="table_new_groupe" id="e8_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e8_numGroupe">G<xsl:value-of select="count(/module/ct_session2//pourcentage)+count(/module/ct_session2//moyenne)+1"/></td>
								<td id="e8_groupeCreationDisplay"></td>
								<td><input type="button" id="e8_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e8_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e8_select" name="totalSelect" size="1" >
										<xsl:call-template name="generate_option">
											<xsl:with-param name="num_cur">1</xsl:with-param>
											<xsl:with-param name="num_groupe"><xsl:value-of select="count(/module/ct_session2//pourcentage)+count(/module/ct_session2//moyenne)"/></xsl:with-param>
											<xsl:with-param name="num_etape">8</xsl:with-param>
										</xsl:call-template>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e8_btn_Valider" />

			    </section>
			</xsl:when>

			<!-- si il n'y a pas de controle terminal de session 2 -->
			<xsl:otherwise>
				<section id="etape8">
	    	
			    	<h1 class="text-center">Détail du contrôle terminal S2</h1>

			    	<div >
				    	<p class="error" id="e8_error1"></p>
						
						<table >
							<tr>
								<td>Nombre d'épreuve(s)</td>
								<td><input id="e8_nbDS" type="number" value="1" min="1" max="20"/></td>
							</tr>
						</table>
						
						<table  class="tableDS" id="e8_tableDS" >
			    			<tr  id="e8_DS1">
			    				<td >
			    					<input type="button" id="e8_btn_DS1" value="DS1" class="dsButton clickableCC1"/>
			    				</td>
					    		<td>
									<select class="typeDs"  name="nomDS" size="1" >
										
									</select>
								</td>
					    	</tr>    		
						</table>

						<table class="tableGroupe" id="e8_tableGroupe">
						</table>
					
					
						<table  class="table_new_groupe" id="e8_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e8_numGroupe">G1</td>
								<td id="e8_groupeCreationDisplay"></td>
								<td><input type="button" id="e8_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e8_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e8_select" name="totalSelect" size="1" disabled="">
										<option id="e8_SelectInitial">Vous devez créer un groupe</option>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e8_btn_Valider" disabled=""/>

			    </section>
			</xsl:otherwise>

		</xsl:choose>


	    
		 
	</xsl:template>
	<!-- ############################################################################################## -->

	<xsl:template name="etape9">

		<xsl:choose>
			<xsl:when test="module/ct_session2 and /module/cc_session2">
				<section id="etape9">
	    	
			    	<h1 class="text-center">Détail de la Session 2</h1>

			    	<div >
				    	<p class="error" id="e9_error1"></p>
						
						<table id="e9_table_btn" >
							<tr>
					    		<xsl:if test="/module/cc_session1">
					    			<td id="e9_td_CC1"><input type="button" id="e9_btn_CC1" value="CC1" class="dsButton clickableCC1"/></td>
					    		</xsl:if>
					    		<xsl:if test="/module/ct_session1">
					    			<td id="e9_td_CT1"><input type="button" id="e9_btn_CT1" value="CT1" class="dsButton clickableCC1"/></td>
					    		</xsl:if>

					    		<td id="e9_td_S1"><input type="button" id="e9_btn_S1" value="S1" class="dsButton clickableCC1"/></td>

					    		<xsl:if test="/module/cc_session2">
					    			<td id="e9_td_CC2"><input type="button" id="e9_btn_CC2" value="CC2" class="dsButton clickableCC1"/></td>
					    		</xsl:if>
					    		<xsl:if test="/module/ct_session2">
					    			<td id="e9_td_CT2"><input type="button" id="e9_btn_CT2" value="CT2" class="dsButton clickableCC1"/></td>
					    		</xsl:if>

							</tr>
						</table>
						

						<table class="tableGroupe" id="e9_tableGroupe">
							<xsl:for-each select="(/module/session2/pourcentage) | (/module/session2/moyenne)">
								<xsl:apply-templates select=".">
									<xsl:with-param name="num_groupe">1</xsl:with-param>
									<xsl:with-param name="num_etape">9</xsl:with-param>
								</xsl:apply-templates>
							</xsl:for-each>
						</table>
					
					
						<table  class="table_new_groupe" id="e9_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e9_numGroupe">G<xsl:value-of select="count(/module/session2//pourcentage)+count(/module/session2//moyenne)+1"/></td>
								<td id="e9_groupeCreationDisplay"></td>
								<td><input type="button" id="e9_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e9_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e9_select" name="totalSelect" size="1" >
										<xsl:call-template name="generate_option">
											<xsl:with-param name="num_cur">1</xsl:with-param>
											<xsl:with-param name="num_groupe"><xsl:value-of select="count(/module/session2//pourcentage)+count(/module/session2//moyenne)"/></xsl:with-param>
											<xsl:with-param name="num_etape">9</xsl:with-param>
										</xsl:call-template>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn  btn-valider btn-lg"  type="button" value="Valider" id="e9_btn_Valider" />
			    	

			    	
			    </section>

			</xsl:when>

			<xsl:otherwise>
				<section id="etape9">
	    	
			    	<h1 class="text-center">Détail de la Session 2</h1>

			    	<div >
				    	<p class="error" id="e9_error1"></p>
						
						<table id="e9_table_btn" >
							<tr>
								<!--<td><input type="button" id="e9_btn_CC1" value="Contrôle Continu" class="dsButton clickableCC1"/></td>
					    		<td><input type="button" id="e9_btn_CT1" value="Contrôle Terminal" class="dsButton clickableCC1"/></td>-->
					    		<td id="e9_td_S1"><input type="button" id="e9_btn_S1" value="S1" class="dsButton clickableCC1"/></td>

							</tr>
						</table>
						

						<table class="tableGroupe" id="e9_tableGroupe">
						</table>
					
					
						<table  class="table_new_groupe" id="e9_table_new_groupe">
							<tr>
								<td>Créer un groupe</td>
								<td id="e9_numGroupe">G1</td>
								<td id="e9_groupeCreationDisplay"></td>
								<td><input type="button" id="e9_btn_Annuler" value="Annuler"/></td>
								<td><input type="button" id="e9_btn_Creer" value="Créer"/></td>
								
							</tr>
						</table>
						
						<table>
							<tr>
								<td>total</td>
								<td>
									<select  id="e9_select" name="totalSelect" size="1" disabled="">
										<option id="e9_SelectInitial">Vous devez créer un groupe</option>
									</select>
								</td>
							</tr>
						</table>

					</div>
					
				
					<input class="pull-right btn  btn-valider btn-lg"  type="button" value="Valider" id="e9_btn_Valider" disabled=""/>
			    	

			    	
			    </section>
			</xsl:otherwise>
		</xsl:choose>

		
		 
	</xsl:template>


<!-- ############################################################################################## -->


	<xsl:template name="etape10">
		    <section id="etape10">
	    	
	    	<h1 class="text-center">Validation du module</h1>

	    	<div>
	    		<p class="error" id="e10_error1">Erreur : La note renseignée doit être entre 0 et 20</p>

	    		<table>
	    			<tr>
				    	<td><p>Passe en deuxieme session si note strictement inférieur à </p></td>
				    	<td>
				    		<input type="number"  min="0" max="20" id="e10_note_session2">
				    			<xsl:attribute name="value">
				    				<xsl:value-of select="/module/validation"/>	
				    			</xsl:attribute>
				    		</input>
				    	</td>
				    </tr>
			    </table>


				<input class="pull-right btn btn-valider btn-lg"  type="button" value="Valider" id="e10_btn_Valider" />
			</div>
	    </section>
	</xsl:template>




</xsl:stylesheet>