<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD2020] Average Number of CRM Request by Area(지역별/기간별/요일별 평균 CRM 요청건수)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Average Number of CRM Request by Area(지역별/기간별/요일별 평균 CRM 요청건수)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/
-->
</cb:info>

<cb:pageWrapper title="Average Number of CRM Request by Area" id="DBRD2020" plugin="datepicker, chart, grid" pageType="link">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">
   
    <!--SearchArea-->
    <section id="DIV_SRCH2020" class="dashSrch" style="position:absolute; top:0px; left:0; right:0;">
	    <div class="SrchDiv">
	        <table cellspacing="0" class="SrchTBL">
	            <colgroup>
                    <col style="width:40px" />
                    <col style="width:80px;" />
                    <col style="width:80px;" />                 
                    <col style="width:40px;" />
                    <col style="width:252px; min-width:252px" />
                </colgroup>
                <tbody>    
                    <tr>
                        <th scope="row" title=""><cbt:message code="txt.2011" text="Area" /></th>
                        <td><cbt:combo code="" name="AREA_INFO" id="AREA_CD" class="point" codeType="ONE" data-option="event:init;type:area-state;top:ALL;" data-io="IO" style="width: 100%;" /></td>
                        <td><cbt:combo code="" name="AREA_INFO" id="CITY_CD" class="point" codeType="ONE" data-option="event:init;type:area-city;top:ALL;" data-parent="#DIV_SRCH2020 #AREA_CD" data-io="IO" style="width: 100%;" /></td>
                        <th style="padding-left: 10px;" scope="row" title=""><cbt:message code="txt.1623" text="Period" /></th>
                        <td><cb:datepicker id="SRCH_STR_DT"
                                           data-option="type:datepicker;dvalue:today-30d"
                                           data-valid="maxlength:8;"
                                           data-io="IO"
                                           class="point" />
                            <span>-</span>
                            <cb:datepicker id="SRCH_END_DT"
                                           data-option="type:datepicker;dvalue:today"
                                           data-valid="maxlength:8;"
                                           data-io="IO"
                                           class="point" /></td>
	                </tr>
	            </tbody>
	        </table>
	        <cb:button type="button" id="BTN_SRCH" value="" title="Query" class="btn_DD_refresh"><cbt:message code="txt.987" text="Refresh" /></cb:button>
	    </div>
	</section>
    <!--//SearchArea-->
    
    <!-- Chart Area -->
    <section id="DIV_CHRT" class="dashChrt" style="position:absolute; top:34px; left:0; right:0; bottom:0px">
        <div id="chart" style="width:calc(100% - 20px); height:calc(100% - 20px); margin:10px;"></div>
    </section>    
    <!--//Chart Area -->            
        
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD2020.js"></script>    
        
        <style>
            body{
                background-color: #FFFFFF;
            }
        </style>  
                    
    </jsp:attribute>
</cb:pageWrapper>
