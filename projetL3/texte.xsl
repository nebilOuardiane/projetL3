<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>



	<!-- ########################################################################################## -->

	<xsl:template match="/module/session1">
		<ul>
			<li>La Session 1 est composé de : <br/></li>
			<xsl:call-template name="make-tree"></xsl:call-template>
			
		</ul>
		
		
	</xsl:template>


	<!-- ########################################################################################## -->

	<xsl:template match="pourcentage">
		
			<li>un Pourcentage qui contient : <br/>	
			
			<xsl:for-each select='(pourcentage)|(moyenne)|(ds)'>
			
				<ul><xsl:call-template name="switch"></xsl:call-template></ul>
			
			</xsl:for-each>

			</li>
	</xsl:template>



	<!-- ########################################################################################## -->


	<xsl:template match="moyenne">
		
			 <li>une Moyenne qui est composé de : <br/>
			
				<xsl:for-each select='(pourcentage)|(moyenne)|(ds)'>

					<ul><xsl:call-template name="switch"></xsl:call-template></ul>

				</xsl:for-each>
			</li>	

	</xsl:template>


	<!-- ########################################################################################## -->

	<xsl:template match="ds">
	
		 <li>
		<xsl:value-of select="."/> 
		<xsl:if test="./@type">
			de type <xsl:value-of select="./@type"/> 
		 </xsl:if>  
		 
		   
		   <xsl:if test=" name(..) = 'pourcentage'">
				 qui comptera <xsl:value-of select="./@p"/> % 
			</xsl:if>
			
		</li>
			
		
	</xsl:template>

	<!-- ########################################################################################## -->

	<xsl:template name="switch">
	
		
			<xsl:choose>		
				<xsl:when test='../moyenne'>
					<xsl:apply-templates select="."/>
				</xsl:when>
			
				<xsl:when test='../pourcentage'>
					<xsl:apply-templates select="."/>
				</xsl:when>

				<xsl:when test='../ds'>
					<xsl:apply-templates select="."/>
				</xsl:when>

			</xsl:choose>
		
		
	</xsl:template>

	<!-- ########################################################################################## -->

	<xsl:template name="make-tree">
		<ul>
			<li>
				<xsl:choose>
					
					<xsl:when test='moyenne'>
					
							<xsl:choose>
							<xsl:when test='count(moyenne/child::*) = 1 or number(moyenne/@nb_meilleur)=1'>
								-le Max de : 
							</xsl:when>

							<xsl:when test='count(moyenne/child::*) = number(moyenne/@nb_meilleur)'>
								-une Moyenne qui elle meme est composé de : <br/>
							</xsl:when>

							<xsl:otherwise>
								-moyenne des <xsl:value-of select="moyenne/@nb_meilleur"/> meilleurs de :<br/>
							</xsl:otherwise>
						</xsl:choose>
					
					
	
							
							
							<ul>
								<xsl:for-each select='(moyenne/pourcentage)|(moyenne/moyenne)|(moyenne/ds)'>

									<xsl:call-template name="switch"></xsl:call-template>

								</xsl:for-each>
							</ul>
							
					</xsl:when>

					<xsl:when test='pourcentage'>
					
						-un Pourcentage qui lui meme est composé de : <br/>	
							<ul>
								<xsl:for-each select='(pourcentage/pourcentage)|(pourcentage/moyenne)|(pourcentage/ds)'>

									<xsl:call-template name="switch"></xsl:call-template>

								</xsl:for-each>
							</ul>	
					</xsl:when>

				</xsl:choose>
			</li>
		</ul>
	</xsl:template>

	<!-- ########################################################################################## -->



	<xsl:template match="/module/validation">
	</xsl:template>

	<xsl:template match="/module/cc_session1">
		<ul>
			<li>
			Contrôle Continue Session 1 est composé de : <br/>
			<xsl:call-template name="make-tree"></xsl:call-template>
			</li>

		</ul>
	</xsl:template>


	<xsl:template match="/module/ct_session1">
			<ul>
				<li>
				Contrôle Terminal Session 1 est composé de :<br/>
				<xsl:call-template name="make-tree"></xsl:call-template>
				</li>
			</ul>
	</xsl:template>

	<xsl:template match="/module/cc_session2">
		<ul>
			<li>
			Contrôle Continue Session 2 est composé de :<br/>
			<xsl:call-template name="make-tree"></xsl:call-template>
			</li>
		</ul>
	</xsl:template>

	<xsl:template match="/module/ct_session2">
		<ul>
			<li>
			Contrôle Terminal Session 2 est composé de :<br/>
			<xsl:call-template name="make-tree"></xsl:call-template>
			</li>
		</ul>
	</xsl:template>

	<xsl:template match="/module/session2">

		<ul>
			<li>
			La Session 2 est composé de :<br/>
			<xsl:call-template name="make-tree"></xsl:call-template>
			</li>
		</ul>

	</xsl:template>
</xsl:stylesheet>