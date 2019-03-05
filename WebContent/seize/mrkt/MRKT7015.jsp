<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [MRKT7015] Marketing Additional Item Management(마케팅 추가 항목 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 10
 // Description  : Marketing Additional Item Management(마케팅 추가 항목 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/
-->
</cb:info>

<% // Plugins : grid,tab,datepicker,treeview - Use Keyword + "," %>
<cb:pageWrapper title="Marketing Transmission Status" id="MRKT7015" plugin="grid" pageType="popup">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
	    <!--SearchArea-->
        <section style="position:absolute; top:0px; right:0; left:0; bottom:31px;">
		    <span class="Srchline"></span>
		    <div class="SrchDiv" id="DIV_SRCH">
		        <table cellspacing="0" class="SrchTBL">
		            <colgroup>
	                    <col style="width:120px" />
	                    <col style="width:40%" />
	                    <col style="width:120px" />
	                    <col style="width:30%" />
	                    <col style="width:10px" />
	                </colgroup>
	                <tbody>
	                    <tr>
	                        <th scope="row" title=""><cbt:message code="txt.2114" text="Job Target" /></th>
	                        <td><input id="JOB_TGT_PROC" type="text" style="width: 100%;" data-io="O" data-name="" readonly/></td> 
	                        <th scope="row" title=""><cbt:message code="txt.2217" text="Schedule" /></th>                      
	                        <td><input id="RSV_DTM" type="text" style="width: 100%;" data-io="O" data-name="" data-option="type:datetime;" readonly/></td>
	                    </tr>                    
                        <tr>
                            <th scope="row" title=""><cbt:message code="txt.2125" text="Marketing Name" /></th>
                            <td><input id="MKT_NM" type="text" style="width: 100%;" data-io="O" data-name="" readonly/></td> 
                            <th scope="row" title=""><cbt:message code="txt.2126" text="Marketing No." /></th>                      
                            <td><input id="MKT_NO" type="text" style="width: 100%;" data-io="O" data-name="" readonly/></td>
                        </tr>
                        <tr>
                            <th scope="row" title=""><cbt:message code="txt.2197" text="Proceed" /></th>                      
                            <td><input id="PROC_CNT" type="text" style="width: 100%;text-align:right;" data-io="O" data-name="" readonly/></td>
                            <th scope="row" title=""><cbt:message code="txt.2205" text="Remains" /></th>
                            <td><input id="NRDY_CNT" type="text" style="width: 100%;" data-io="O" data-name="" data-option="type:number;" readonly/></td> 
                        </tr>                    
                        <tr>
                            <th scope="row" title=""><cbt:message code="txt.2232" text="Start time" /></th>                      
                            <td><input id="STR_DTM" type="text" style="width: 100%;text-align:right;" data-io="O" data-name="" data-option="type:datetime;" readonly/></td>
                            <th scope="row" title=""><cbt:message code="txt.2079" text="End time" /></th>
                            <td><input id="END_DTM" type="text" style="width: 100%;" data-io="O" data-name="" data-option="type:datetime;" readonly/></td> 
                        </tr>                    
	                </tbody>
		        </table>
		    </div>
	    </section>
	    <!--//SearchArea-->
	        
	    <!--GridArea-->
	    <section style="position:absolute; top:115px; right:0; left:0; bottom:0px;">
	        <!--Grid-->
	        <article class="gridArea">
	            <cb:grid style="position:absolute; top:0; bottom:0; width:100%;" data-option="type:spread">
	                <table id="GRD_TRMS_STAT" class="spread" data-spread="operationmode:2;rownum:0;">
	                    <thead>
	                        <tr>
	                            <cb:grid-column id="PROC_SRVR_NO" width="20%"  data-column="align:center;"><cbt:message code="txt.2225" text="Server Instance" /></cb:grid-column>
<%-- 	                            <cb:grid-column id="NOTREADY"   width="10%"  data-column="align:right;type:number;"><cbt:message code="txt.2139" text="Not ready" /></cb:grid-column> --%>
	                            <cb:grid-column id="WAIT"       width="10%"  data-column="align:right;type:number;"><cbt:message code="txt.2285" text="Wait" /></cb:grid-column>
	                            <cb:grid-column id="PROCESS"    width="10%"  data-column="align:right;type:number;"><cbt:message code="txt.2198" text="Processing" /></cb:grid-column>
	                            <cb:grid-column id="COMPLETE"   width="10%"  data-column="align:right;type:number;"><cbt:message code="txt.2038" text="Complete" /></cb:grid-column>
	                            <cb:grid-column id="FAIL"       width="10%"  data-column="align:right;type:number;"><cbt:message code="txt.2086" text="Fail" /></cb:grid-column>
                                <cb:grid-column id="ERROR"      width="10%"  data-column="align:right;"><cbt:message code="txt.2080" text="Error" /></cb:grid-column>	                        </tr>
	                    </thead>
	                </table>
	            </cb:grid>
	        </article>
	        <!--//Grid-->
	    </section>
        <!--//GridArea-->
     
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/mrkt/MRKT7015.js"></script>
    
    </jsp:attribute>
</cb:pageWrapper>
