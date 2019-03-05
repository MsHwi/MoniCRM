<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [RPRT1010] Marketing file sending result list
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 27
 // Description  : Marketing file sending result list
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<%// Plugins : grid,tab,datepicker,treeview - Use Keyword + "," %>
<cb:pageWrapper title="Marketing file sending result list" id="RPRT1010" plugin="datepicker, grid, multicombo" pageType="">
    
    <jsp:attribute name="headWrapper">
    </jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    <!--SearchArea-->
    <span class="Srchline"></span>
    <div class="SrchDiv" id="DIV_SRCH">
        <table cellspacing="0" class="SrchTBL">
            <colgroup>
                <col style="width:150px" />
                <col style="width:" />
                <col style="width:150px" />
                <col style="width:" />
                <col style="width:85px" />
            </colgroup>
            <tbody>	
            	 <tr>
                    <th scope="row" title="" class="issue"><cbt:message code="txt.1623" text="Period" /></th>
                    <td>
                        <cb:datepicker id="SRCH_STR_DT"
                                       data-option="type:datepicker;dvalue:today-7d"
                                       data-valid="maxlength:8;"
                                       data-io="IO"
                                       class="point"
                                        />
                        <span>-</span>
                        <cb:datepicker id="SRCH_END_DT"
                                       data-option="type:datepicker;dvalue:today"
                                       data-valid="maxlength:8;"
                                       data-io="IO"
                                       class="point"
                                       />
                        <div class="item inline">
                            <input name="SRCH_RD_DT" type="radio" value="W" id="c3" class="i_radio" checked="checked"/> <label for="c3"><cbt:message code="txt.1222" text="Week" /></label>
                            <input name="SRCH_RD_DT" type="radio" value="M" id="c4" class="i_radio" /> <label for="c4"><cbt:message code="txt.1406" text="Month" /></label>
                        </div>
                    </td>
                    <th scope="row" title=""><cbt:message code="txt.775" text="Marketing Type" /></th>
                    <td><cbt:combo code="MKT_TYP_CD" id="MKT_TYP_CD" codeType="multi" data-name="txt.775:Marketing Type" data-option="event:init;top:ALL" data-io="IO" style="width:100%;" /></td>
                    <td class="btn" rowspan="2">
                        <cb:button type="button" id="BTN_SRCH"  value="" class="btn_WF_srch"  title="Query" ><cbt:message code="txt.2200" text="Query" /></cb:button>
                    </td>                    
                </tr>
                <tr>                                	 
                    <th scope="row" title=""><cbt:message code="txt.2126" text="Marketing No." /></th>
                    <td><input id="MKT_NO" type="number" style="width:100%; text-align: right;" value="" data-io="IO" oninput="this.value=this.value.slice(0,this.maxLength)" maxlength="20"/></td>
                    <th scope="row" title=""><cbt:message code="txt.2125" text="Marketing Name" /></th>
                    <td><input id="MKT_NM" type="text" value="" data-name=""  data-io="IO" style="width:100%;" maxlength="100"/></td>                    
                </tr>
            </tbody>
        </table>
    </div>
    <!--//SearchArea-->
    
   <!--GridArea-->
    <section style="position:absolute; top:70px; right:0; height:183px; left:0;">
        <!--Grid-->
        <article class="gridArea">
            <cb:grid style=" position:absolute; top:0; bottom:0; width:100%;" data-option="type:spread">
                <table id="GRD_MKT" class="spread" data-spread="operationmode:3;pagesize:20;">
                    <thead>
                        <tr>
                            <cb:grid-column id="MKT_NO"     width="200px"    data-io="IO" data-column="align:center;"><cbt:message code="txt.2126" text="Marketing No." /></cb:grid-column>
                            <cb:grid-column id="MKT_NM"     width="300px"    data-io="IO" data-column="align:left;"><cbt:message code="txt.2134" text="Name" /></cb:grid-column>
                            <cb:grid-column id="MEMO"       width="300px"    data-io="IO" data-column="align:left;"><cbt:message code="txt.2058" text="Description" /></cb:grid-column>
                            <cb:grid-column id="MKT_TYP_NM" width="100px"    data-io="IO" data-column="align:center;"><cbt:message code="txt.2129" text="Marketing type" /></cb:grid-column>
                            <cb:grid-column id="MKT_STR_DT" width="150px"    data-io="IO" data-column="align:center;type:date"><cbt:message code="txt.2097" text="From" /></cb:grid-column>
                            <cb:grid-column id="MKT_END_DT" width="150px"    data-io="IO" data-column="align:center;type:date"><cbt:message code="txt.2268" text="To" /></cb:grid-column>
                        </tr>
                    </thead>
                </table>
            </cb:grid>
        </article>
    </section>
    <!--//GridArea-->
    
    <!--ButtonArea-->
    <section style="position:absolute; right:0; top:247px; left:0; height:30px;">
        <div class="botmBtn_rig">
              <cb:button type="button" id="BTN_EXCEL" value="" class="btn_WF_excel" title="Excel"><cbt:message code="txt.1118" text="Excel" /></cb:button>
              <cb:button type="button" id="BTN_PDF"   value="" class="btn_WF_pdf"   title="PDF" hidden="hidden"><cbt:message code="txt.1658" text="PDF" /></cb:button>
        </div>
    </section>
    <!--//ButtonArea-->
    
    <!-- PDFArea -->
    <section style="position:absolute; right:0; top:277px; left:0; bottom:0;">
        <div style="position:absolute; right:0; top:0; left:0; bottom:0;">
            <iframe id="pdf_viewer" src="${pageContext.request.contextPath}/corebase/lib/pdfjs/web/viewer.html" frameborder="0" style="overflow:hidden;height:100%;width:100%;"></iframe>
        </div>
    </section>
    <!--//PDFArea -->
    
    <script type="text/javascript">
    </script>    

    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/rprt/RPRT1010.js"></script>
    </jsp:attribute>
</cb:pageWrapper>
