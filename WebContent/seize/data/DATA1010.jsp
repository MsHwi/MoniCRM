<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [DATA1010] Item Code Management
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 06
 // Description  : Item Code Management(항목코드 관리)
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
<cb:pageWrapper title="Item Code Management(항목코드 관리)" id="DATA1010" plugin="grid,numerictext">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
        <!--LeftArea-->
        <section style="position:absolute; top:0px; left:0; bottom:0; width:50%;" id="LRGCLAS_AREA">
            <!--SearchArea-->
            <span class="Srchline"></span>
            <div class="SrchDiv" id="DIV_SRCH">
                <table cellspacing="0" class="SrchTBL">
                    <colgroup>
                        <col style="width: 60px;">
                        <col>
                        <col style="width: 60px;">
                        <col>
                        <col style="width: 70px;">
                        <col>
                        <col style="width: 90px;">
                    </colgroup>
                    <tbody> 
                        <tr>
                            <th scope="row" title=""><cbt:message code="txt.741" text="Code(L)" /></th>
                            <td>
                                <input type="text" id="ITEM_LRGCLAS_CD" data-io="I" style="ime-mode:inactive;" maxlength="30" />
                            </td>
                            <th scope="row" title=""><cbt:message code="txt.2134" text="Name" /></th>
                            <td>
                                <input type="text" id="ITEM_LRGCLAS_NM" data-io="I" maxlength="200" />
                            </td>
                            <th scope="row" title=""><cbt:message code="txt.2280" text="Use Y/N" /></th>
                            <td>
                            <cbt:combo code="USE_YN" codeType="all" id="USE_YN" style="width: 100%; text-align:left;" data-option="event:init;top:ALL;" data-io="IO" data-name="txt.2280:Use Y/N"/>
                            </td>
                            <td class="btn"><cb:button type="button" id="BTN_SCH" value="" title="Query" class="btn_WF_srch"><cbt:message code="txt.2200" text="Query" /></cb:button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--//SearchArea-->
    
            <!--gridArea-->
            <section style="position:absolute; top:50px; right: 0; left:0; bottom:164px;"> 
                <article class="gridArea">
                    <cb:grid style="position:absolute; top:0; bottom:0; width:100%;" data-option="type:spread">
                        <table id="GRD_LRGCLAS" style="height:100%;" class="spread" data-spread="operationmode:3;pagesize:10;">
                            <thead>
                                <tr>
                                    <cb:grid-column id="ITEM_LRGCLAS_CD"    width="130px"   data-column="align:center;"><cbt:message code="txt.741" text="Code(L)" /></cb:grid-column>
                                    <cb:grid-column id="ITEM_LRGCLAS_NM"    width="*"       data-column="align:left;"  ><cbt:message code="txt.2134" text="Name" /></cb:grid-column>
                                    <cb:grid-column id="SRT_SEQ"            width="90px"    data-column="align:center;type:number;"><cbt:message code="txt.1311" text="Sort Order" /></cb:grid-column>
                                    <cb:grid-column id="USE_YN"             width="80px"    data-column="align:center;"><cbt:message code="txt.2280" text="Use Y/N" /></cb:grid-column>
                                    <cb:grid-column id="CD_SEL"             width="90px"    data-column="align:center;type:button;buttontext:Select;sort:false;"><cbt:message code="txt.741" text="Code(L)" /></cb:grid-column>
                                    
                                    <!-- hidden -->
                                    <cb:grid-column id="MEMO"                              data-column="hidden"     ><cbt:message code="txt.783" text="Memo" /></cb:grid-column>
                                </tr>
                            </thead>
                        </table>
                    </cb:grid>
                </article>
            </section>
            <!--//gridArea-->
    
            <!--Code(L) ManagementArea-->
            <section style="position:absolute; right: 0; left:0; bottom:31px;">
                <h4><cbt:message code="txt.742" text="Code(L) Mang." />
                <!--boxst02-->
                <div class="boxst02" id="DIV_DTL">
                    <table cellspacing="0">
                        <colgroup>
                            <col style="width:90px" />
                            <col style="width:25%" />
                            <col style="width:100px" />
                            <col style="width:" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.741" text="Code(L)" /></th>
                                <td><input id="ITEM_LRGCLAS_CD" type="text" data-io="IO" data-name="txt.741:Code(L)"    data-valid="require;" style="width: 100%; ime-mode:disabled;" maxlength="30" class="point"/></td>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.1444" text="Code Name" /></th>
                                <td><input id="ITEM_LRGCLAS_NM" type="text" data-io="IO" data-name="txt.1444:Code Name" data-valid="require;" style="width: 100%;" maxlength="200" class="point"/></td>
                            </tr>
                            <tr>
                                <th scope="row" title=""><cbt:message code="txt.1311" text="Sort Order" /></th>
                                <td><cb:numerictext id="SRT_SEQ" data-option="type:numericText;" min="0" max="99999" style="width:100%;" data-io="IO" /></td>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.2280" text="Use Y/N" /></th>
                                <td><cbt:combo code="USE_YN" codeType="one" id="USE_YN" style="width: 100%; text-align:left;" data-io="IO" data-name="txt.2280:Use Y/N" data-valid="require;" class="point" /></td>
                            </tr>
                            <tr>
                                <th scope="row" title=""><cbt:message code="txt.783" text="Memo" /></th>
                                <td colspan="3"><textarea id="MEMO" data-io="IO" data-name="txt.783:Memo" cols="1" rows="2" style="width:100%; height:40px;" maxlength="1000"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--//boxst02-->
            </section>
    
            <!--ButtonArea-->
            <section style="position:absolute; bottom:0px; right: 0; left:0;">
                <div class="botmBtn_rig">
                    <cb:button type="button" id="BTN_NEW_CODE" title="New" class="btn_WF_refresh" data-atht="W"><cbt:message code="txt.1083" text="New" /></cb:button>
                    <cb:button type="button" id="BTN_SAVE"    title="Save" class="btn_WF_save"  data-atht="W" ><cbt:message code="txt.2214" text="Save" /></cb:button>
<%--                     <cb:button type="button" id="BTN_DEL"    title="Delete" class="btn_WF_del"  data-atht="W" ><cbt:message code="txt.2055" text="Delete" /></cb:button> --%>
                </div>
            </section>
            <!--//ButtonArea-->
        </section>
        <!--//LeftArea-->
        
        <!--RightArea-->
        <section style="position:absolute; top:0px; right:0; bottom:0; width:49.2%;" id="SMLCLAS_AREA">
            <!--SearchArea-->
            <span class="Srchline"></span>
            <div class="SrchDiv" id="DIV_SRCH">
                <table cellspacing="0" class="SrchTBL">
                    <colgroup>
                        <col style="width: 60px;">
                        <col>
                        <col style="width: 60px;">
                        <col>
                        <col style="width: 70px;">
                        <col>
                        <col style="width: 90px;">
                    </colgroup>
                    <tbody> 
                        <tr>
                            <th scope="row" title="" ><cbt:message code="txt.1033" text="Code(S)" /></th>
                            <td>                                
                                <input id="ITEM_LRGCLAS_CD"  type="hidden"   data-io="IO" data-name="txt.741:Code(L)" />
                                <input id="ITEM_SMLCLAS_CD"  type="text"     data-io="I"  data-name="txt.1033:Code(S)" style="ime-mode:inactive;" maxlength="30" />
                            </td>
                            <th scope="row" title=""><cbt:message code="txt.2134" text="Name" /></th>
                            <td><input id="ITEM_SMLCLAS_NM" type="text" data-io="I" data-name="txt.2134:Name" maxlength="200"></td>
                            <th scope="row" title=""><cbt:message code="txt.2280" text="Use Y/N" /></th>
                            <td>
                            <cbt:combo code="USE_YN" codeType="all" id="USE_YN" data-option="event:init;top:ALL;" style="width: 100%; text-align:left;" data-io="IO" data-name="txt.2280:Use Y/N"/>
                            </td>
                            <td class="btn"><cb:button type="button" id="BTN_SCH" value="" title="Query" class="btn_WF_srch"><cbt:message code="txt.2200" text="Query" /></cb:button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--//SearchArea-->
            
            <!--GridArea-->
            <section style="position:absolute; top:50px; right: 0; left:0; bottom:187px;">
                <article class="gridArea">
                    <cb:grid style="position:absolute; top:0; bottom:0; width:100%;" data-option="type:spread">
                        <table id="GRD_SMLCLAS" class="spread" style="height:100%;" data-spread="operationmode:3;pagesize:10;">
                            <thead>
                                <tr>
                                    <cb:grid-column id="ITEM_SMLCLAS_CD" width="120px"  data-column="align:center;"><cbt:message code="txt.1033" text="Code(S)" /></cb:grid-column>
                                    <cb:grid-column id="ITEM_SMLCLAS_NM" width="*"      data-column="align:left;"  ><cbt:message code="txt.2134" text="Name" /></cb:grid-column>
                                    <cb:grid-column id="SRT_SEQ"         width="90px"   data-column="align:center;type:number;"><cbt:message code="txt.1311" text="Sort Order" /></cb:grid-column>
                                    <cb:grid-column id="USE_YN"          width="80px"   data-column="align:center;"><cbt:message code="txt.2280" text="Use Y/N" /></cb:grid-column>
                                    
                                    <!-- hidden -->
                                    <cb:grid-column id="ITEM_LRGCLAS_CD" data-column="hidden;"><cbt:message code="txt.741" text="Code(L)" /></cb:grid-column>
                                    <cb:grid-column id="MEMO"            data-column="hidden;"><cbt:message code="txt.783" text="Memo" /></cb:grid-column>
                                    <cb:grid-column id="HGRK_LRGCLAS_CD" data-column="hidden;"><cbt:message code="txt.978" text="Parent Code(L)" /></cb:grid-column>
                                    <cb:grid-column id="HGRK_SMLCLAS_CD" data-column="hidden;"><cbt:message code="txt.981" text="Parent Code(S)" /></cb:grid-column>                                    
                                </tr>
                            </thead>
                        </table>
                    </cb:grid>
                </article>
            </section>
            <!--//GridArea-->
           
            <!--Code(S) ManagementArea-->
            <section style="position:absolute; right: 0; left:0; bottom:31px;">
                <h4><cbt:message code="txt.1030" text="Code(S) Mang." /></h4>
                <!--boxst02-->
                <div class="boxst02" id="DIV_DTL">
                    <table cellspacing="0">
                        <colgroup>
                            <col style="width:97px" />
                            <col style="width:25%" />
                            <col style="width:100px" />
                            <col style="width:" />
                        </colgroup>
                        <tbody>
                        
                            <tr>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.1033" text="Code(S)" /></th>
                                <td>
                                    <input id="ITEM_LRGCLAS_CD" type="hidden" data-io="IO" data-name="txt.741:Code(L)"  data-valid="require;" style="width:100%; ime-mode:disabled;" maxlength="30" />
                                    <input id="ITEM_SMLCLAS_CD" type="text"   data-io="IO" data-name="txt.1033:Code(S)" data-valid="require;" style="width:100%; ime-mode:disabled;" maxlength="30" class="point"/>
                                </td>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.1444" text="Code Name" /></th>
                                <td><input id="ITEM_SMLCLAS_NM" type="text" data-io="IO" data-name="txt.1444:Code Name" data-valid="require;" style="width:100%;" maxlength="200" class="point"/></td>
                            </tr>
                            <tr>
                                <th scope="row" title=""><cbt:message code="txt.1311" text="Sort Order" /></th>
                                <td><cb:numerictext id="SRT_SEQ" data-option="type:numericText;" min="0" max="99999" style="width:100%;" data-io="IO" /></td>
                                <th scope="row" title="" class="issue"><cbt:message code="txt.2280" text="Use Y/N" /></th>
                                <td><cbt:combo code="USE_YN" codeType="one" id="USE_YN" style="width: 100%; text-align:left;" data-io="IO" data-name="txt.2280:Use Y/N" data-valid="require;" class="point" /></td>
                            </tr>
                            <tr>
                                <th scope="row" title=""><cbt:message code="txt.978" text="Parent Code(L)" /></th>
                                <td><input id="HGRK_LRGCLAS_CD" type="text" data-io="IO" data-name="txt.978:Parent Code(L)" style="width: 100%; ime-mode:disabled;" maxlength="30" /></td>
                                <th scope="row" title=""><cbt:message code="txt.981" text="Parent Code(S)" /></th>
                                <td><input id="HGRK_SMLCLAS_CD" type="text" data-io="IO" data-name="txt.981:Parent Code(S)" style="width: 100%; ime-mode:disabled;" maxlength="30" /></td>
                            </tr>                          
                            <tr>
                                <th scope="row" title=""><cbt:message code="txt.783" text="Memo" /></th>
                                <td colspan="3"><textarea id="MEMO" data-io="IO" data-name="txt.783:Memo" cols="1" rows="2" style="width:100%; height:40px;" maxlength="1000"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--//boxst02-->
            </section>
            <!--//Code(S) ManagementArea-->
    
            <!--ButtonArea-->
            <section style="position:absolute; bottom:0px; right: 0; left:0;">
                <div class="botmBtn_rig">
                    <cb:button type="button" id="BTN_NEW_CODE" title="New"      class="btn_WF_refresh" data-atht="W"><cbt:message code="txt.1083" text="New" /></cb:button>
                    <cb:button type="button" id="BTN_SAVE"     title="Save"     class="btn_WF_save"    data-atht="W"><cbt:message code="txt.2214" text="Save" /></cb:button>
<%--                     <cb:button type="button" id="BTN_DEL"    title="Delete" class="btn_WF_del"  data-atht="W" ><cbt:message code="txt.2055" text="Delete" /></cb:button> --%>
                </div>
            </section>
            <!--//ButtonArea-->
        </section>
        <!--//RightArea-->
    
    
        <script type="text/javascript">
        </script>
        
        <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/data/DATA1010.js"></script>
        
    </jsp:attribute>
</cb:pageWrapper>
