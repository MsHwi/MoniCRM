<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [RPRT1050] File sending count and file size
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 27
 // Description  : File sending count and file size
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
<cb:pageWrapper title="File sending count and file size" id="RPRT1050" plugin="grid, datepicker" pageType="">

    <jsp:attribute name="headWrapper"></jsp:attribute>
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
                <col style="width:129px" />
            </colgroup>
            <tbody> 
                 <tr>
                    <th scope="row" title="" class="issue"><cbt:message code="txt.2127" text="Marketing Period" /></th>
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
                    <td></td>        
                    <td></td>    
                    <td class="btn">
                        <div class="botmBtn_rig">
                              <cb:button type="button" id="BTN_EXCEL" value="" class="btn_WF_excel" title="Excel"><cbt:message code="txt.1118" text="Excel" /></cb:button>
                              <cb:button type="button" id="BTN_PDF"   value="" class="btn_WF_pdf"   title="PDF" hidden="hidden"><cbt:message code="txt.1658" text="PDF" /></cb:button>
                        </div>                        
                    </td>                                                                    
                </tr>
            </tbody>
        </table>
    </div>
    <!--//SearchArea-->
    
    <!-- GridArea -->
    <section style="display:none">
    <!-- Grid -->
        <article class="gridArea">
            <cb:grid data-option="type:spread">
                <table id="GRD_RPT" class="spread" data-spread="operationmode:3;pagesize:20;">
                    <thead>
                        <tr>
                           <cb:grid-column id="CDT_TM"     width="90px"    data-column="align:center;"><cbt:message code="txt.2199" text="Processing Time" /></cb:grid-column>
                        </tr>
                    </thead>
                </table>
            </cb:grid>
        </article>
    </section>
    <!--//GridArea-->
    
    <!-- PDFArea -->
    <section style="position:absolute; right:0; top:48px; left:0; bottom:0;">
        <div style="position:absolute; right:0; top:0; left:0; bottom:0;">
            <iframe id="pdf_viewer" src="${pageContext.request.contextPath}/corebase/lib/pdfjs/web/viewer.html" frameborder="0" style="overflow:hidden;height:100%;width:100%;"></iframe>
        </div>
    </section>
    <!--//PDFArea -->
    
    <script type="text/javascript">
    </script>
    
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/rprt/RPRT1050.js"></script>
    </jsp:attribute>
</cb:pageWrapper>
