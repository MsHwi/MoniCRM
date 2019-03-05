<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD1040] Dashboard
 // Creator      : soyounlee@buttle.co.kr
 // Create Date  : 2018. 09. 05
 // Description  : Dashboard
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="Dashboard" id="DBRD1040" >

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">
        <!-- Top section -->
        <section id="SEC_DBRD_SRCH" style="position:relative; margin-bottom:8px; display:none;">
            <cbt:combo code="selectList:DBRD1040.SELECT_LYOT_LIST" id="LYOT_ID" class="point" codeType="ONE" data-option="event:init;" data-io="IO" style="width: 200px;" /></td>
            <cb:button type="button" id="BTN_SAVE" title="Save"  class="btn_WF_save"                                          ><cbt:message code="txt.2214" text="Save" /></cb:button>
            <cb:button type="button" id="BTN_SRCH" title="Query" class="btn_WF_srch"    style="position:absolute; right:63px;"><cbt:message code="txt.2200" text="Query" /></cb:button>
            <cb:button type="button" id="BTN_RFSH" title="Reset" class="btn_WF_refresh" style="position:absolute; right:0;"   ><cbt:message code="txt.2208" text="Reset" /></cb:button>
        </section>
        
        <section id="SEC_DBRD_CLSE" style="position:relative; margin-bottom:8px; display:none;">
            <cb:button type="button" id="BTN_CLOSE" title="Close" class="btn_WF_del" ><cbt:message code="txt.722" text="Close" /></cb:button>
        </section>
        <!-- //Top section -->
        <!-- Bottom section(Viewer) -->
        <section id="SEC_DASH_WGT" class="dashboard" style="position:relative; width:100%; height:100%">
        </section>
        <!-- //Bottom section(Viewer) -->
        
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD1040.js"></script>
        
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
            
            .k-splitbar-vertical.k-splitbar-draggable-vertical .k-i-arrow-60-up {
                top:-2px;
            }
            
            .k-splitbar-vertical.k-splitbar-draggable-vertical .k-i-arrow-60-down {
                top:-2px;
                margin-left:17px !important;
            }
            
            .k-splitbar-horizontal.k-splitbar-draggable-horizontal .k-i-arrow-60-right {
                margin-top:8px !important;
            }
            
            .k-splitter .k-pane {
                border-radius:5px;
            }
        </style>
    </jsp:attribute>
    
</cb:pageWrapper>
