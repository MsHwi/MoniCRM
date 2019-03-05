<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> 
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD1030] Dashboard Layout Editing
 // Creator      : soyounlee@buttle.co.kr
 // Create Date  : 2018. 09. 05
 // Description  : Dashboard Layout Editing
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>
<cb:pageWrapper title="Dashboard Layout Editing" id="DBRD1030">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">
        <!-- top button section -->
        <section style="top:0">
            <div class="botmBtn_rig">
                <cb:button type="button" id="BTN_ADD_ROW" title="Add Row"  class="btn_WF_act"    ><cbt:message code="txt.2004" text="Add Row" /></cb:button>
                <cb:button type="button" id="BTN_RST_ROW" title="Reset"    class="btn_WF_refresh"><cbt:message code="txt.2208" text="Reset" /></cb:button>
            </div>
        </section>
        <!-- //top button section -->
        
        <!-- Widget section -->
        <section id="SEC_DASH_WGT" style="position:absolute; top:30px; left:0; right:0; bottom:32px;">
            
        </section>
        <!--//Widget section -->
        
        <!-- bottom button section -->
        <section style="position:absolute; right:0; bottom:0;">
            <cb:button type="button" id="BTN_VIEW_WGT" title="Preview" class="btn_WF_act"  ><cbt:message code="txt.2193" text="Preview" /></cb:button>
            <cb:button type="button" id="BTN_SAVE"     title="Save"    class="btn_WF_save" ><cbt:message code="txt.2214" text="Save" /></cb:button>
        </section>
        <!-- //bottom button section -->
        
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD1030.js"></script>
        
        <style>
            .k-splitter .k-ghost-splitbar-horizontal,
            .k-splitter .k-splitbar-horizontal
            {
                width: 10px;
                border: 0;
                background-color:#edf1f5 !important;
            }
            
            .k-ghost-splitbar-vertical,
            .k-splitbar-vertical
            {
                height: 10px;
                border: 0;
                background-color:#edf1f5 !important;
            }
            
            .k-splitter {
                border:0;
                background-color:#edf1f5 !important;
            }
            .k-splitbar-horizontal .k-icon {
                left:23%;
            }
            
            .k-splitbar-vertical .k-icon {
                top:23%;
            }
            
            .k-splitter .k-pane {
               background-color:#ffffff;
               border-radius:5px;
            }
        </style>
    </jsp:attribute>
</cb:pageWrapper>


