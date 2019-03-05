<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD2060]  File Transfer Status(파일 전송 현황)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : File Transfer Status(파일 전송 현황)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="File Transfer Status" id="DBRD2060" plugin="datepicker, chart, grid" pageType="link">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">

    <!--SearchArea-->
    <section id="DIV_SRCH2060" class="dashSrch" style="position:absolute; top:0px; left:0; right:0;">
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
    
    <!-- Detail Area -->
    <section id="DIV_TBL" class="dashChrt" style="position:absolute; top:42px; left:0; right:0; bottom:0px">    
        <p style="font:16px Arial;white-space:pre;text-align:center;" id="PGM_NM"></p>
        <!--boxst01-->
        <table class="boxst01" id="DTL_FILE_STT">
            <colgroup>
                <col style="width:" />
                <col style="width:" />
                <col style="width:" />
                <col style="width:" />
            </colgroup>
            <tbody>        
                <tr>                                            
                    <th><cbt:message code="txt.2198" text="Processing" /></th>
                    <th><cbt:message code="txt.1802" text="Success" /></th>
                    <th><cbt:message code="txt.2088" text="Failed" /></th>
                    <th><cbt:message code="txt.2285" text="Wait" /></th>
                </tr>
                <tr>
                    <td><input id="PRCSS"   type="text" value="" data-io="IO" data-option="type:number" readonly="readonly"/></td>
                    <td><input id="SCSS"   type="text" value="" data-io="IO" data-option="type:number" readonly="readonly"/></td>
                    <td><input id="FAIL"    type="text" value="" data-io="IO" data-option="type:number" readonly="readonly"/></td>
                    <td><input id="WAIT"    type="text" value="" data-io="IO" data-option="type:number" readonly="readonly"/></td>
                </tr>                          
            </tbody>
        </table>
        <!--//boxst01-->
    </section>
    <!--//Detail Area -->  
            
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD2060.js"></script>       
        
        <style>
            body{
                background-color: #FFFFFF;
            }
        </style>  
                 
    </jsp:attribute>
</cb:pageWrapper>
