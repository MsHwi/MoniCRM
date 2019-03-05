<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [MRKT6010] Marketing Template Item Management(마케팅 템플릿 항목 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 11
 // Description  : Marketing Template Item Management(마케팅 템플릿 항목 관리)
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
<cb:pageWrapper title="Marketing Template Item Management" id="MRKT6010" plugin="grid" pageType="popup">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
<!--        <span class="Srchline"></span>       -->
            
        <!--GridArea-->
        <section style="position:absolute; top:0px; right:0; left:0; bottom:89px;">
            <h4><cbt:message code="txt.2099" text="Greeting" />
                <div>
                    <cb:button type="button" id="BTN_ADD_ROW" value="" class="btn_WF_ico_plus m0_top"  title="Add"  ></cb:button>
                    <cb:button type="button" id="BTN_DEL_ROW" value="" class="btn_WF_ico_minus m0_top" title="Delete"></cb:button>
                </div>
            </h4>
            <!--Grid-->
            <article class="gridArea">
                <cb:grid style="position:absolute; top:19px; bottom:0; width:100%;" data-option="type:spread">
                    <table id="GRD_GRT_TMPL" class="spread" data-spread="operationmode:1;rownum:0;">
                        <thead>
                            <tr>
                                <cb:grid-column id="STR_TM"  width="120px"  data-column="align:center;sort:false;type:time;"><cbt:message code="txt.2097" text="From" /></cb:grid-column>
                                <cb:grid-column id="END_TM"  width="120px"  data-column="align:center;sort:false;type:time;"><cbt:message code="txt.2268" text="To" /></cb:grid-column>
                                <cb:grid-column id="CTT"     width=""       data-column="maxlength:200;align:left;sort:false;"><cbt:message code="txt.2244" text="Text" /></cb:grid-column>
                                
                                <!-- hidden -->
                                <cb:grid-column id="TMPL_ITEM" data-column="hidden"></cb:grid-column>                     
                            </tr>
                        </thead>
                    </table>
                </cb:grid>
            </article>
            <!--//Grid-->
        </section>
        <!--//GridArea-->
        
        <section style="position:absolute; right: 0; left: 0; bottom:31px; ">    
            <div class="" id="DIV_BD_AREA">             
                <h4><cbt:message code="txt.2020" text="Birthday" /></h4>        
                <input id="CTT" name="text" type="text" value="" data-io="IO" style="width:100%;" maxlength="200" />
                <input id="TMPL_ITEM" name="text" type="hidden" value="" data-io="IO" />                    
            </div> 
        </section>
        
        <!--Bottom button Area-->
        <section style="position:absolute; bottom:0px; right: 0; left:0;">
            <div class="botmBtn_rig">
                <cb:button type="button" id="BTN_SAVE" value="" title="save" class="btn_WF_save" ><cbt:message code="txt.2214" text="Save" /></cb:button>
            </div>
        </section>
        <!--//Bottom button Area-->
     
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/mrkt/MRKT6010.js"></script>
    
    </jsp:attribute>
</cb:pageWrapper>
