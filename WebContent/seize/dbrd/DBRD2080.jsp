<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD2080] List of Marketing Beginning(월별 예정 마케팅 목록)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : List of Marketing Beginning(월별 예정 마케팅 목록)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="List of Marketing Beginning" id="DBRD2080" plugin="datepicker, chart, grid" pageType="link">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">

    <!--SearchArea-->
    <section id="DIV_SRCH2080" class="dashSrch" style="position:absolute; top:0px; left:0; right:0;">
	    <div class="SrchDiv">
	        <table cellspacing="0" class="SrchTBL">
	            <colgroup>
	                <col style="width:50px" />
	                <col style="width:100px" />
	            </colgroup>
	            <tbody>    
	                <tr>
	                    <th scope="row" title="" class="issue"><cbt:message code="txt.1623" text="Period" /></th>
                        <td><cbt:combo code="PRD_CD" id="PRD_CD" class="point" codeType="ONE" data-option="event:init;" data-parent="" data-io="IO" style="width: 100%;" /></td>
                    </tr>    
	            </tbody>
	        </table>
	        <cb:button type="button" id="BTN_SRCH" value="" title="Query" class="btn_DD_refresh"><cbt:message code="txt.987" text="Refresh" /></cb:button>
	    </div>
    </section>	    
    
    <!-- Grid Area -->
    <section id="DIV_GRD" class="dashChrt" style="position:absolute; top:42px; left:0; right:0; bottom:0px;">
        <p style="font:16px Arial;white-space:pre;text-align:center;" id="PGM_NM"></p>
        <article class="gridArea">
            <cb:grid style=" position:absolute; top:29px; left:0; right:0; bottom:5px; " data-option="type:spread">
                <table id="GRD_MKT" class="spread" data-spread="operationmode:3;rownum:0;pagesize:20;">
                    <thead>
                        <tr>
                            <cb:grid-column id="MKT_NM"  width="60%"    data-io="IO" data-column="align:left;"><cbt:message code="txt.2125" text="Marketing Name" /></cb:grid-column>
                            <cb:grid-column id="MKT_STR_DTM"  width="40%"    data-io="IO" data-column="align:center;type:datetime;"><cbt:message code="txt.2231" text="Start Datetime" /></cb:grid-column>                           
                        </tr>
                    </thead>
                </table>
            </cb:grid>
        </article>
    </section>
    <!--//Grid Area -->  
            
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD2080.js"></script>      
        
        <style>
            body{
                background-color: #FFFFFF;
            }
        </style>          
          
    </jsp:attribute>
</cb:pageWrapper>
