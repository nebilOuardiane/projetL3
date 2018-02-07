<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>



	<!-- ########################################################################################## -->

	<xsl:template match="/module/session1">
		<div class="tree">
			<ul>
				<li>
					<a href="#" class="elem_base">Session 1</a>

					<xsl:call-template name="make-tree"></xsl:call-template>
				</li>

			</ul>
		</div>
		
		
	</xsl:template>


	<!-- ########################################################################################## -->

	<xsl:template match="pourcentage">
		<li>

			<xsl:if test=" name(..) = 'pourcentage'">
				<div class="elem_in_pourcentage_before"><xsl:value-of select="./@p"/></div>
			</xsl:if>

			<a href="#" class="elem_operation">Pourcentage</a>
			<ul>
				<xsl:for-each select='(pourcentage)|(moyenne)|(ds)'>
					
					<xsl:call-template name="switch"></xsl:call-template>

				</xsl:for-each>

			</ul>
		</li>
	</xsl:template>



	<!-- ########################################################################################## -->


	<xsl:template match="moyenne">
		<li>

			<xsl:if test=" name(..) = 'pourcentage'">
				<div class="elem_in_pourcentage_before"><xsl:value-of select="./@p"/></div>
			</xsl:if>

			
			<a href="#" class="elem_operation">
				<xsl:choose>
					<xsl:when test='count(./child::*) = 1 or number(./@nb_meilleur)=1'>
						Max
					</xsl:when>

					<xsl:when test='count(./child::*) = number(./@nb_meilleur)'>
						Moyenne
					</xsl:when>

					<xsl:otherwise>
						Moyenne des <xsl:value-of select="./@nb_meilleur"/> meilleurs
					</xsl:otherwise>
				</xsl:choose>
			</a>

			<ul>
				<xsl:for-each select='(pourcentage)|(moyenne)|(ds)'>

					<xsl:call-template name="switch"></xsl:call-template>

				</xsl:for-each>

			</ul>
		</li>
	</xsl:template>


	<!-- ########################################################################################## -->

	<xsl:template match="ds">
		<li>
		
			<xsl:if test=" name(..) = 'pourcentage'">
				<div class="elem_in_pourcentage_before"><xsl:value-of select="./@p"/></div>
			</xsl:if>

			<a href="#" class="elem_ds"><xsl:value-of select="."/><br/><xsl:value-of select="./@type"/></a>
		</li>
	</xsl:template>

	<!-- ########################################################################################## -->

	<xsl:template name="switch">
		<xsl:choose>	
			<!-- <xsl:when test='../moyenne'> -->
			<xsl:when test=" name(.) = 'moyenne'">
				<xsl:apply-templates select="."/>
			</xsl:when>
		
			<!-- <xsl:when test='../pourcentage'> -->
			<xsl:when test=" name(.) = 'pourcentage'">
				<xsl:apply-templates select="."/>
			</xsl:when>

			<!-- <xsl:when test='../ds'> -->
			<xsl:when test=" name(.) = 'ds'">
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

							<a href="#" class="elem_operation">
								<xsl:choose>
									<xsl:when test='count(moyenne/child::*) = 1 or number(moyenne/@nb_meilleur)=1'>
										Max
									</xsl:when>

									<xsl:when test='count(moyenne/child::*) = number(moyenne/@nb_meilleur)'>
										Moyenne
									</xsl:when>

									<xsl:otherwise>
										Moyenne des <xsl:value-of select="moyenne/@nb_meilleur"/> meilleurs
									</xsl:otherwise>
								</xsl:choose>
							</a>

							<ul>
								<xsl:for-each select='(moyenne/pourcentage)|(moyenne/moyenne)|(moyenne/ds)'>

									<xsl:call-template name="switch"></xsl:call-template>

								</xsl:for-each>

							</ul>
					</xsl:when>

					<xsl:when test='pourcentage'>
						<a href="#" class="elem_operation">Pourcentage</a>
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
		<div class="tree">
			<ul>
				<li>
					<a href="#" class="elem_base">Contrôle Continue<br/>Session 1</a>

					<xsl:call-template name="make-tree"></xsl:call-template>
				</li>

			</ul>
		</div>
	</xsl:template>


	<xsl:template match="/module/ct_session1">
		<div class="tree">
			<ul>
				<li>
					<a href="#" class="elem_base">Contrôle Terminal<br/>Session 1</a>

					<xsl:call-template name="make-tree"></xsl:call-template>
				</li>

			</ul>
		</div>
	</xsl:template>

	<xsl:template match="/module/cc_session2">
		<div class="tree">
			<ul>
				<li>
					<a href="#" class="elem_base">Contrôle Continue<br/>Session 2</a>

					<xsl:call-template name="make-tree"></xsl:call-template>
				</li>

			</ul>
		</div>
	</xsl:template>


	<xsl:template match="/module/ct_session2">
		<div class="tree">
			<ul>
				<li>
					<a href="#" class="elem_base">Contrôle Terminal<br/>Session 2</a>

					<xsl:call-template name="make-tree"></xsl:call-template>
				</li>

			</ul>
		</div>
	</xsl:template>

	<xsl:template match="/module/session2">
		<div class="tree">
			<ul>
				<li>
					<a href="#" class="elem_base">Session 2</a>
					
					<xsl:call-template name="make-tree"></xsl:call-template>
				</li>

			</ul>
		</div>
		
		
	</xsl:template>


</xsl:stylesheet>