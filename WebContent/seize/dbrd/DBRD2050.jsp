<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD2050] Marketing Process Status(마케팅 진행 현황)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Marketing Process Status(마케팅 진행 현황)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="Marketing Process Status" id="DBRD2050" plugin="datepicker, chart, grid" pageType="link">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">
    
    <!--SearchArea-->
    <section id="DIV_SRCH2050" class="dashSrch" style="position:absolute; top:0px; left:0; right:0;">        
	    <div class="SrchDiv">
<!-- 	         <table cellspacing="0" class="SrchTBL"> -->
<!-- 	            <colgroup> -->
<!-- 	                <col style="width:" /> -->
<!-- 	            </colgroup> -->
<!-- 	            <tbody>     -->
<!-- 	                <tr> -->
<!-- 	                    <th></th> -->
<!-- 	                </tr> -->
<!-- 	            </tbody> -->
<!-- 	        </table> -->
	        <cb:button type="button" id="BTN_SRCH" value="" title="Query" class="btn_DD_refresh"><cbt:message code="txt.987" text="Refresh" /></cb:button>
	    </div>
    </section>	    
    
    <!-- Detail Area -->
    <section id="DIV_TBL" class="dashChrt" style="position:absolute; top:42px; left:0; right:0;bottom:0px">        
        <p style="font:16px Arial;white-space:pre;text-align:center;" id="PGM_NM"></p>
        <!--boxst01-->
        <table class="boxst01" id="DTL_MRT_STT">
            <colgroup>
                <col style="width:25%" />
                <col style="width:" />
                <col style="width:" />
                <col style="width:" />
            </colgroup>
            <tbody>
                <tr>                                            
                    <th></th>
                    <th><cbt:message code="txt.1280" text="Yesterday" /><input id="YSTDY" type="hidden" value="" data-io="IO"/></th>
                    <th><cbt:message code="txt.2269" text="Today" /><input id="TODAY" type="hidden" value="" data-io="IO"/></th>
                    <th><cbt:message code="txt.2270" text="Tomorrow" /><input id="TMRRW" type="hidden" value="" data-io="IO"/></th>
                </tr>
                <tr>
                    <th><cbt:message code="txt.2099" text="Greeting" /></th>
                    <td><input id="GT_YSTD"     class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('01', 'yesterday');"  /></td>
                    <td><input id="GT_TD"       class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('01', 'today');" /></td>
                    <td><input id="GT_TMRRW"    class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('01', 'tomorrow');" /></td>
                </tr>
                <tr>
                    <th><cbt:message code="txt.2082" text="Event" /></th>
                    <td><input id="EVNT_YSTD"     class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('02', 'yesterday');" /></td>
                    <td><input id="EVNT_TD"       class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('02', 'today');" /></td>
                    <td><input id="EVNT_TMRRW"    class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('02', 'tomorrow');" /></td>
                </tr>
                <tr>
                    <th><cbt:message code="txt.553" text="Survey" /></th>
                    <td><input id="SURV_YSTD"     class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('03', 'yesterday');"  /></td>
                    <td><input id="SURV_TD"       class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('03', 'today');" /></td>
                    <td><input id="SURV_TMRRW"    class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('03', 'tomorrow');" /></td>
                </tr>
                <tr>
                    <th><cbt:message code="txt.2041" text="Coupon" /></th>
                    <td><input id="CPN_YSTD"     class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('04', 'yesterday');" /></td>
                    <td><input id="CPN_TD"       class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('04', 'today');" /></td>
                    <td><input id="CPN_TMRRW"    class="underline" type="text" value="" data-io="IO" data-option="type:number" readonly="readonly" onclick="fn_move('04', 'tomorrow');" /></td>
                </tr>                                
            </tbody>
        </table>
        <!--//boxst01-->
    </section>
    <!--//Detail Area -->  
            
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD2050.js"></script>   
        
        <style>
		    body{
		        background-color: #FFFFFF;
		    }
		    
		    .underline {
			    text-decoration: underline;
			    cursor: pointer; 
		    }
        </style>     
        
    </jsp:attribute>
</cb:pageWrapper>
