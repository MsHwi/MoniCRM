<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD2100] List of ATM without Connection for a Period(접속이상 ATM 목록)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : AList of ATM without Connection for a Period(접속이상 ATM 목록)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="List of ATM without Connection for a Period" id="DBRD2100" plugin="datepicker, chart, grid" pageType="link">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">

    <!--SearchArea-->
    <section id="DIV_SRCH2100" class="dashSrch" style="position:absolute; top:0px; left:0; right:0;">
        <div class="SrchDiv">
	        <!--table cellspacing="0" class="SrchTBL">
	            <colgroup>
	                <col style="width:" />
	            </colgroup>
	            <tbody>    
	                <tr>
	                    <th></th>  
	                </tr>
	            </tbody>
	        </table-->
	        <cb:button type="button" id="BTN_SRCH" value="" title="Query" class="btn_DD_refresh"><cbt:message code="txt.987" text="Refresh" /></cb:button>
	    </div>
    </section>
    
    <!-- Grid Area -->
    <section id="DIV_GRD" class="dashChrt" style="position:absolute; top:42px; left:0; right:0; bottom:0px;">
        <p style="font:16px Arial;white-space:pre;text-align:center;" id="PGM_NM"></p>
        <article class="gridArea">
            <cb:grid style=" position:absolute; top:29px; bottom:5px; width:100%;" data-option="type:spread">
                <table id="GRD_ATM" class="spread" data-spread="operationmode:3;pagesize:20;rownum:0;">
                    <thead>
                        <tr>
                            <cb:grid-column id="TMNL_NO"     width="30%"    data-io="IO" data-column="align:left;"><cbt:message code="txt.2240" text="Terminal No" /></cb:grid-column>
                            <cb:grid-column id="IP_ADDR"     width="30%"    data-io="IO" data-column="align:center;"><cbt:message code="txt.2109" text="IP Address" /></cb:grid-column>
                            <cb:grid-column id="LST_USE_DTM" width="40%"    data-io="IO" data-column="align:center;type:datetime;"><cbt:message code="txt.2118" text="Last connected date" /></cb:grid-column>                           
                        </tr>
                    </thead>
                </table>
            </cb:grid>
        </article>
    </section>
    <!--//Grid Area -->  
            
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD2100.js"></script>  
        
        <style>
            body{
                background-color: #FFFFFF;
            }
        </style>          
              
    </jsp:attribute>
</cb:pageWrapper>
