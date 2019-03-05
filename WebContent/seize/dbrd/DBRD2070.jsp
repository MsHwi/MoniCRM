<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD2070] Transferred File Payload of Today by Marketing(금일 전체/마케팅별 파일 전송 payload)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Transferred File Payload of Today by Marketing(금일 전체/마케팅별 파일 전송 payload)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="Transferred File Payload of Today by Marketing" id="DBRD2070" plugin="datepicker, chart, grid" pageType="link">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">

    <!--SearchArea-->
    <section id="DIV_SRCH2070" class="dashSrch" style="position:absolute; top:0px; left:0; right:0; bottom:0;">
	    <div class="SrchDiv">
	        <!-- table cellspacing="0" class="SrchTBL">
	            <colgroup>
	                <col style="width:" />
	            </colgroup>
	            <tbody>    
	                <tr>
	                    <th></th> 
	                </tr>
	            </tbody>
	        </table -->
	        <cb:button type="button" id="BTN_SRCH" value="" title="Query" class="btn_DD_refresh"><cbt:message code="txt.987" text="Refresh" /></cb:button>
	    </div>
    </section>	    
    
    <!-- Total Area -->
    <section id="DIV_TOT" class="dashChrt" style="position:absolute; top:42px; left:0; right:0; bottom:0px">
        <p style="font:16px Arial;white-space:pre;text-align:center;" id="PGM_NM"></p>
        <!--boxst01-->
        <table class="boxst01" id="DTL_PYLD_TTL">
            <colgroup>
                <col style="width:60%" />   
                <col style="width:40%" />
            </colgroup>     
            <tbody>            
                <tr>                                            
                    <th><cbt:message code="txt.2272" text="Total" /></th>
                    <td><input id="PYLD_TTL" type="text" value="" data-io="IO" style="text-align: right;" readonly="readonly"/></td>
               </tr>            
        </table>
    </section>    
    <!--//Total Area -->    
    
    <!-- Grid Area -->
    <section id="DIV_TBL" class="dashChrt" style="position:absolute; top:98px; left:0; right:0; bottom:0px;">
        <article class="gridArea">
            <cb:grid style=" position:absolute; top:0px; bottom:30px; width:100%;" data-option="type:spread">
                <table id="GRD_PYLD_DTL" class="spread" data-spread="operationmode:3;rownum:0;scrollable;">
                    <thead>
                        <tr>
                            <cb:grid-column id="MKT_NM"  width="60%"    data-io="IO" data-column="align:left;"><cbt:message code="txt.2125" text="Marketing Name" /></cb:grid-column>
                            <cb:grid-column id="PYLD"    width="40%"    data-io="IO" data-column="align:right;"><cbt:message code="txt.2149" text="Payload" /></cb:grid-column>                           
                        </tr>
                    </thead>
                </table>
            </cb:grid>
        </article>
    </section>
    <!--//Grid Area -->  
            
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD2070.js"></script> 
        
        <style>
            body{
                background-color: #FFFFFF;
            }
        </style>          
               
    </jsp:attribute>
</cb:pageWrapper>
