<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> 
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!--
 // ***********************************************************************************************
 // Program Name : [DBRD1020] Dashboard Layout Management(대시보드 레아아웃 관리)
 // Creator      : soyounlee@buttle.co.kr
 // Create Date  : 2018.09.06
 // Description  : Dashboard Layout Management(대시보드 레아아웃 관리)
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
<cb:pageWrapper title="Dashboard Layout Management" id="DBRD1020" plugin="grid,datepicker,multicombo">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
        <!--SearchArea-->
        <span class="Srchline"></span>
        <div class="SrchDiv" id="DIV_SCH">
            <table cellspacing="0" class="SrchTBL">
                <colgroup>
                    <col style="width:120px" />
                    <col style="width:" />
                    <col style="width:90px" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row" title=""><cbt:message code="txt.2121" text="Layout Name" /></th>
                        <td><input id="LYOT_NM" type="text" value="" data-name="" data-io="IO" maxlength="100" style="width:100%;"/></td>
                        <td class="btn">
                            <cb:button type="button" id="BTN_SCH" value="" title="Query" class="btn_WF_srch"><cbt:message code="txt.2200" text="Query" /></cb:button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--//SearchArea-->
        
        <!-- Left Section -->
        <section style="position:absolute; top:47px; right: 40%; left:0; bottom:0;">
            <h4><cbt:message code="txt.2049" text="Dashboard layout list" /></h4>
            <!-- Left top grid -->
            <section style="position:relative; height:calc(100% - 156px);">
                <article class="gridArea">
                    <cb:grid style=" position:absolute; top:0; right:0; bottom:0; left:0;" data-option="type:spread">
                        <table id="GRD_LYOT_LIST" class="spread" data-spread="">
                            <thead>
                                <tr>
                                    <cb:grid-column id="LYOT_ID"   width="110px" data-io="IO" data-column="align:center;"><cbt:message code="txt.2120" text="Layout ID" /></cb:grid-column>
                                    <cb:grid-column id="LYOT_NM"   width=""      data-io="IO" data-column="align:left;"><cbt:message code="txt.2121" text="Layout Name" /></cb:grid-column>
                                    <cb:grid-column id="USE_YN_NM" width="80px" data-io="IO" data-column="align:center;"><cbt:message code="txt.2280" text="Use Y/N" /></cb:grid-column>
                                    
                                    <!-- hidden -->
                                    <cb:grid-column id="LYOT_DESC"  data-column="hidden"></cb:grid-column>
                                    <cb:grid-column id="USE_YN"     data-column="hidden"></cb:grid-column>
                                    <!-- //hidden -->
                                </tr>
                            </thead>
                        </table>
                    </cb:grid>
                </article>
            </section>
            <!-- //Left top grid -->
            <!-- //Left top ButtonArea -->
            <!-- Left bottom grid -->
            <section style="position:relative; top:5px">
                <div class="boxst02" id="DIV_DETAIL">
                    <table cellspacing="0">
                        <colgroup>
                            <col style="width:120px" />
                            <col style="width:" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.2121" text="Layout Name" /></th>
                                <td>
                                    <input type="text" id="LYOT_NM" value="" maxlength="100" data-valid="require;" data-io="IO" style="width:100%;"  class="point"/>
                                    <input type="text" id="LYOT_ID" value="" data-io="IO" style="display:none;"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.2280" text="Use Y/N" /></th>
                                <td>
                                    <cbt:combo code="USE_YN" id="USE_YN" data-name="txt.2280:Use Y/N" codeType="ONE" data-option="event:init;" data-valid="require;" data-io="IO" class="point"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" title=""><cbt:message code="txt.2058" text="Description" /></th>
                                <td>
                                    <textarea id="LYOT_DESC" data-io="IO" style="width:100%; height:40px;" maxlength="500" ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <!-- //Left bottom grid -->
            <!-- Left bottom ButtonArea -->
            <section style="position:relative; top:10px;">
                <div class="botmBtn_rig">
                    <cb:button type="button" id="BTN_AUTH"  title="Edit"   class="btn_WF_act"    ><cbt:message code="txt.2013" text="Authority" /></cb:button>
                    <cb:button type="button" id="BTN_NEW"   title="New"    class="btn_WF_refresh"><cbt:message code="txt.1083" text="New"      /></cb:button>
                    <cb:button type="button" id="BTN_SAVE"  title="Save"   class="btn_WF_save"   ><cbt:message code="txt.2214" text="Save" /></cb:button>
                    <cb:button type="button" id="BTN_DEL"   title="Delete" class="btn_WF_del"    ><cbt:message code="txt.2055" text="Delete" /></cb:button>
                </div>
            </section>
            <!-- //Left bottom ButtonArea -->
        </section>
        <!-- //Left Section -->
        
        <!-- Right Section -->
        <section style="position:absolute; top:47px; bottom:0; right: 0; left:calc(60% + 10px);">
            <h4><cbt:message code="txt.2289" text="Widget list" /></h4>
            <section style="position:relative; height:calc(100% - 43px); ">
                <article class="gridArea">
                    <cb:grid style=" position:absolute; top:0; right:0; bottom:0; left:0;" data-option="type:spread">
                        <table id="GRD_WGT_LIST" class="spread" data-spread="">
                            <thead>
                                <tr>
                                    <cb:grid-column id="WGT_ID"  width="100px" data-io="IO" data-column="align:center;"><cbt:message code="txt.2288" text="Widget ID" /></cb:grid-column>
                                    <cb:grid-column id="WGT_NM"  width=""      data-io="IO" data-column="align:left;"><cbt:message code="txt.2290" text="Widget Name" /></cb:grid-column>
                                </tr>
                            </thead>
                        </table>
                    </cb:grid>
                </article>
            </section>
            <!--ButtonArea-->
            <section style="position:relative; top:5px;">
                <div class="botmBtn_rig">
                    <cb:button type="button" id="BTN_EDIT" title="Edit" class="btn_WF_reg" ><cbt:message code="txt.2075" text="Edit" /></cb:button>
                </div>
            </section>
            <!--//ButtonArea-->
        </section>
        <!-- //Right Section -->
        
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD1020.js"></script>
        
    </jsp:attribute>
</cb:pageWrapper>

