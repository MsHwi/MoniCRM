<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DBRD1021] Dashboard Authority Management(대시보드 권한 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 09. 06
 // Description  : Dashboard Authority Management(대시보드 권한 관리)
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
<cb:pageWrapper title="Dashboard Authority Management" id="DBRD1021" plugin="grid" pageType="layerPop">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
    
        <!--SearchArea-->
        <section style="position:absolute; top:0px; right:0; left:0; bottom:31px;">
            <span class="Srchline"></span>
            <div class="SrchDiv" id="DIV_SRCH">
                <table cellspacing="0" class="SrchTBL">
                    <colgroup>
                        <col style="width:100px" />
                        <col style="width:30%" />
                        <col style="width:" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row" title="" class="issue"><cbt:message code="txt.2013" text="Authority" /></th>
                            <td><cbt:combo code="USR_GRP_ATHT" id="USR_GRP_ATHT" class="point" codeType="ONE" data-option="event:init;" data-parent="" data-io="IO" style="width: 100%;" /></td>
                            <input type="hidden" id="GRP_ATHT" name="GRP_ATHT" maxlength="20" data-io="IO" readonly="readonly"/>
                            <td class="btn"> 
                                <button type="button" id="BTN_SRCH" value="" title="Query" class="btn_WF_srch"><cbt:message code="txt.2200" text="Query" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <!--//SearchArea-->
            
        <!--GridArea-->
        <section style="position:absolute; top:46px; right:0; left:0; bottom:31px;">
            <!--Left Grid-->
            <section style="position:absolute; top:0px; left:0; bottom:0; width:45%;">
                <h4><cbt:message code="txt.2007" text="Allowable layout list" /></h4>
                <article class="gridArea">
                    <cb:grid style="position:absolute; top:19px; left:0; bottom:0; right:0;" data-option="type:spread">
                        <table id="GRD_LEFT" class="spread" data-spread="operationmode:3;rownum:0;">
                            <thead>
                                <tr>
                                    <cb:grid-column id="LYOT_ID"  width="30%"  data-column="align:center;"><cbt:message code="txt.2120" text="Layout ID" /></cb:grid-column>
                                    <cb:grid-column id="LYOT_NM"  width="70%"  data-column="align:left;"><cbt:message code="txt.2121" text="Layout Name" /></cb:grid-column>
                                </tr>
                            </thead>
                        </table>
                    </cb:grid>
                </article>
            </section>
            <!--//Grid-->
            
            <!--ArrowButton-->
            <section style="position:absolute; top:calc(50% - 70px); right:45%; left:45%; text-align:center;">
                <cb:button type="button" id="BTN_LEFT" value="" title="Previous" class="btn_WF_ico_Gprev"></cb:button>
                <cb:button type="button" id="BTN_RIGHT" value="" title="Next" class="m_min2_lef btn_WF_ico_Gnext"></cb:button>
            </section>
            <!--//ArrowButton-->
            
            <!--Right Grid-->
            <section style="position:absolute; top:0px; right:0; bottom:0; width:45%;">
                <h4><cbt:message code="msg.2014" text="Authorized layout list by role" /></h4>
                <article class="gridArea">
                    <cb:grid style="position:absolute; top:19px; right:0; bottom:0; left:0;" data-option="type:spread">
                        <table id="GRD_RIGHT" class="spread" data-spread="operationmode:3;rownum:0;">
                            <thead>
                                <tr>
                                    <cb:grid-column id="LYOT_ID"  width="30%"  data-column="align:center;"><cbt:message code="txt.2120" text="Layout ID" /></cb:grid-column>
                                    <cb:grid-column id="LYOT_NM"  width="70%"  data-column="align:left;"><cbt:message code="txt.2121" text="Layout Name" /></cb:grid-column>
                                </tr>
                            </thead>
                        </table>
                    </cb:grid>
                </article>
            </section>
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
        
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD1021.js"></script>
    
    </jsp:attribute>
</cb:pageWrapper>
