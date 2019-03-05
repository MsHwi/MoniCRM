<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> 
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!--
 // ***********************************************************************************************
 // Program Name : [DBRD1010] Dashboard Widget Management
 // Creator      : BISNT
 // Create Date  : 2018. 07. 03
 // Description  : Dashboard Widget Management
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
<cb:pageWrapper title="Dashboard Widget Management" id="DBRD1010" plugin="grid,datepicker,multicombo">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
        <!--SearchArea-->
        <span class="Srchline"></span>
        <div class="SrchDiv" id="DIV_SCH">
            <table cellspacing="0" class="SrchTBL">
                <colgroup>
                    <col style="width:120px" />
                    <col style="width:" />
                    <col style="width:120px" />
                    <col style="width:" />
                    <col style="width:90px" />
                </colgroup>
                <tbody> 
                    <tr>
                        <th scope="row" title=""><cbt:message code="txt.2065" text="Division" /></th>
                        <td><cbt:combo code="WGT_DV" id="WGT_DV" codeType="multi" data-option="event:init;" data-name="txt.2065:Division" data-io="IO" style="width:100%;" /></td>
                        <th scope="row" title=""><cbt:message code="txt.2290" text="Widget Name" /></th>
                        <td><input id="WGT_NM" type="text" value="" data-name="" maxlength="100" data-io="IO" style="width:100%;"/></td>
                        <td class="btn">
                            <cb:button type="button" id="BTN_SCH" value="" title="Query" class="btn_WF_srch"><cbt:message code="txt.2200" text="Query" /></cb:button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--//SearchArea-->
        
        <!--GridArea-->
        <section style="position:absolute; top:47px; right: 0%; left:0; bottom:130px;">
            <!--Grid-->
            <article class="gridArea">
                <cb:grid style=" position:absolute; top:0px; bottom:0; width:100%;" data-option="type:spread">
                    <table id="GRD_WGT_LIST" class="spread" data-spread="">
                        <thead>
                            <tr>
                                <cb:grid-column id="WGT_DV_NM"  width="90px"   data-io="IO" data-column="align:center;"                                         ><cbt:message code="txt.2065" text="Division"    /></cb:grid-column>
                                <cb:grid-column id="WGT_ID"     width="100px"  data-io="IO" data-column="align:center;"                                         ><cbt:message code="txt.2288" text="Widget ID"   /></cb:grid-column>
                                <cb:grid-column id="WGT_NM"     width=""       data-io="IO" data-column="align:left;"                                           ><cbt:message code="txt.2290" text="Widget Name" /></cb:grid-column>
                                <cb:grid-column id="USE_YN_NM"  width="80px"   data-io="IO" data-column="align:center;"                                         ><cbt:message code="txt.2280" text="Use Y/N"     /></cb:grid-column>
                                <cb:grid-column id="SEL_WGT"    width="90px"                data-column="align:center;type:button;buttontext:Select;sort:false;"><cbt:message code="txt.2221" text="Select"      /></cb:grid-column>
                                
                                <!-- hidden -->
                                <cb:grid-column id="WGT_DV"   data-column="hidden"></cb:grid-column>
                                <cb:grid-column id="WGT_PATH" data-column="hidden"></cb:grid-column>
                                <cb:grid-column id="WGT_DESC" data-column="hidden"></cb:grid-column>
                                <cb:grid-column id="USE_YN"   data-column="hidden"></cb:grid-column>
                                <!-- //hidden -->
                            </tr>
                        </thead>
                    </table>
                </cb:grid>
            </article>
            <!--//Grid-->
        </section>
        <!--//GridArea-->
        
        <!--FormArea-->
        <section style="position:absolute; bottom:31px; right: 0; left:0;">
            <div class="boxst02" id="GRD_DTL_INFO">
                <table>
                    <colgroup>
                        <col style="width:120px" />
                        <col style="width:" />
                        <col style="width:120px" />
                        <col style="width:" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row" title="" class="issue"><cbt:message code="txt.2288" text="Widget ID" /></th>
                            <td>
                                <input type="text" id="WGT_ID" data-name="" value="" maxlength="10" data-io="IO" style="width:100%;" class="point"/>
                            </td>
                            <th scope="row" title="" class="issue"><cbt:message code="txt.2291" text="Widget route" /></th>
                            <td>
                                <input type="text" id="WGT_PATH" data-name="" value="" maxlength="100" data-io="IO" style="width:100%;" class="point"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" title="" class="issue"><cbt:message code="txt.2065" text="Division" /></th>
                            <td>
                                <cbt:combo code="WGT_DV" id="WGT_DV" data-name="" codeType="SEL" data-option="event:init;" data-parent="" data-valid="require;" data-io="IO" style="width:100%;" class="point"/>
                            </td>
                            <th scope="row" title="" class="issue"><cbt:message code="txt.2290" text="Widget Name" /></th>
                            <td>
                                <input type="text" id="WGT_NM" data-name="" data-io="IO" maxlength="100" data-valid="maxlength:50;" value="" class="point" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" title="" class="issue"><cbt:message code="txt.2280" text="Use Y/N" /></th>
                            <td>
                                <cbt:combo code="USE_YN" id="USE_YN" data-name="txt.2280:Use Y/N" codeType="ONE" data-option="event:init;" data-parent="" data-valid="require;" data-io="IO" class="point"/>
                            </td>
                            <th scope="row" title=""><cbt:message code="txt.2058" text="Description" /></th>
                            <td>
                                <input type="text" id="WGT_DESC" data-name="" data-io="IO" maxlength="500" data-valid="maxlength:500;" value="" />
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </section>
        <!--//FormArea-->
        
        <!--ButtonArea-->
        <section style="position:absolute; bottom:0; right: 0; left:50.4%;">
            <div class="botmBtn_rig">
                <cb:button type="button" id="BTN_PREVIEW" title="Preview" class="btn_WF_act" data-atht="W"><cbt:message code="txt.2193" text="Preview" /></cb:button>
                <cb:button type="button" id="BTN_NEW"     title="New"     class="btn_WF_refresh"          ><cbt:message code="txt.1083" text="New"     /></cb:button>
                <cb:button type="button" id="BTN_SAVE"    title="Save"    class="btn_WF_save"             ><cbt:message code="txt.2214" text="Save"    /></cb:button>
                <cb:button type="button" id="BTN_DEL"     title="Delete"  class="btn_WF_del"              ><cbt:message code="txt.2055" text="Delete"  /></cb:button>
            </div>
        </section>
        <!--//ButtonArea-->
        
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/dbrd/DBRD1010.js"></script>
        
    </jsp:attribute>
</cb:pageWrapper>

