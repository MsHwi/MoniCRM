<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [MRKT5010] Marketing Additional Item Management(마케팅 추가 항목 관리)
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
<cb:pageWrapper title="Marketing Additional Item Management" id="MRKT5010" plugin="grid">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
	    <!--SearchArea-->
        <section style="position:absolute; top:0px; right:0; left:0; bottom:31px;">
		    <span class="Srchline"></span>
		    <div class="SrchDiv" id="DIV_SRCH">
		        <table cellspacing="0" class="SrchTBL">
		            <colgroup>
	                    <col style="width:120px" />
	                    <col style="width:30%" />
	                    <col style="width:120px" />
	                    <col style="width:30%" />
	                    <col style="width:10px" />
	                </colgroup>
	                <tbody>
	                    <tr>
	                        <th scope="row" title="" class="issue"><cbt:message code="txt.2243" text="Terminal Type" /></th>
	                        <td><cbt:combo code="TMNL_TYP_CD" id="TMNL_TYP_CD" class="point" codeType="ONE" data-option="event:init;" data-parent="" data-io="IO" style="width: 100%;" /></td> 
	                        <th scope="row" title="" class="issue"><cbt:message code="txt.775" text="Marketing Type" /></th>                      
	                        <td><cbt:combo code="MKT_TYP_CD" id="MKT_TYP_CD" class="point" codeType="ONE" data-option="event:init;" data-parent="" data-io="IO" style="width: 100%;" /></td>
	                        <td class="btn"> 
	<%--                             <button type="button" id="BTN_SRCH" value="" title="Query" class="btn_WF_srch"><cbt:message code="txt.2200" text="Query" /></button> --%>
	                        </td>
	                    </tr>                    
	                </tbody>
		        </table>
		    </div>
	    </section>
	    <!--//SearchArea-->
	        
	    <!--GridArea-->
	    <section style="position:absolute; top:46px; right:0; left:0; bottom:31px;">
	        <h4>
	            <cbt:message code="txt.2124" text="Marketing Additional Item" />
	            <div>
	                <cb:button type="button" id="BTN_ADD_ROW" value="" class="btn_WF_ico_plus m0_top"  title="Add"  ></cb:button>
	                <cb:button type="button" id="BTN_DEL_ROW" value="" class="btn_WF_ico_minus m0_top" title="Delete"></cb:button>
	            </div>
	        </h4>
	        <!--Grid-->
	        <article class="gridArea">
	            <cb:grid style="position:absolute; top:19px; bottom:0; width:100%;" data-option="type:spread">
	                <table id="GRD_ITEM_DTL" class="spread" data-spread="operationmode:1;rownum:0;">
	                    <thead>
	                        <tr>
	                            <cb:grid-column id="SCRN_DISP_NM"  width="30%"  data-column="maxlength:30;align:left;sort:false;"><cbt:message code="txt.2060" text="Display Name" /></cb:grid-column>
	                            <cb:grid-column id="PHYS_NM"       width="40%"  data-column="maxlength:20;align:left;sort:false;"><cbt:message code="txt.2089" text="Field name" /></cb:grid-column>
	                            <cb:grid-column id="BASE_VLU"      width="30%"  data-column="maxlength:100;align:left;sort:false;"><cbt:message code="txt.2053" text="Default name" /></cb:grid-column>
	                            
	                            <!-- hidden -->
                                <cb:grid-column id="TMNL_TYP_CD" data-column="hidden"></cb:grid-column>
                                <cb:grid-column id="MKT_TYP_CD"  data-column="hidden"></cb:grid-column>	                            
	                        </tr>
	                    </thead>
	                </table>
	            </cb:grid>
	        </article>
	        <!--//Grid-->
	    </section>
        <!--//GridArea-->
	    
	    <!--Bottom button Area-->
	    <section style="position:absolute; bottom:0px; right: 0; left:0;">
	        <div class="botmBtn_rig">
	            <cb:button type="button" id="BTN_SAVE" value="" title="save" class="btn_WF_save" ><cbt:message code="txt.2214" text="Save" /></cb:button>
	        </div>
	    </section>
	    <!--//Bottom button Area-->
     
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/mrkt/MRKT5010.js"></script>
    
    </jsp:attribute>
</cb:pageWrapper>
