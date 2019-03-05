<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [CSYS4010] Password Policy Setting
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 09
 // Description  : Password Policy Setting(비밀번호 정책 설정)
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
<cb:pageWrapper title="Password Policy Setting" id="CSYS4010" plugin="grid" pageType="popup">

    <jsp:attribute name="headWrapper" />
    <jsp:attribute name="bodyWrapper">
            
        <!--ContentsArea-->
            <table id="DTL_CD" class="boxst01">
                <colgroup>
                    <col  style="width:200px" />
                    <col  style="width:"     />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row" title="" class="issue"><cbt:message code="txt.1837" text="Password Expiration" /></th>
                        <td>
                            <cbt:combo code="selectList:CSYS4010.SELECT_PW_UPD_CYC_CD" codeType="one" id="PW_UPD_CYC_CD" style="width: 100%;" data-io="IO"  class="point" />                            
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" title="" class="issue"><cbt:message code="txt.1838" text="Max invalid login attempts" /></th>
                        <td>
                            <cbt:combo code="selectList:CSYS4010.SELECT_PW_ERR_TCNT_CD" codeType="one" id="PW_ERR_TCNT_CD" style="width: 100%;" data-io="IO"  class="point" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" title="" class="issue"><cbt:message code="txt.1839" text="Check IP Address" /></th>
                        <td>
                            <cbt:combo code="USE_YN" codeType="one" id="IP_CHCK_YN" style="width: 100%;" data-io="IO"  class="point" />
                        </td>
                    </tr>
                    <tr>
                        <th><cbt:message code="txt.1840" text="Password Min Length" /></th>
                        <td>
                            <input id="PW_MAX_LEN" name="text" type="text" value="" data-option="type:number;" style="width: 40%" data-io="IO" maxlength="3"/>
                            <cbt:message code="txt.2029" text="characters" />
                        </td>
                    </tr>
                    <tr>
                        <th><cbt:message code="txt.2148" text="Password Check Level" /></th>
                        <td>
                            <input type="checkbox" data-io="IO" id="PW_CHCK_NUM" class="i_check" style="width:12px;"/>&nbsp;<cbt:message code="txt.1841" text="Digit" /></br>
                            <input type="checkbox" data-io="IO" id="PW_CHCK_ALPH" class="i_check" style="width:12px;"/>&nbsp;<cbt:message code="txt.1842" text="Alphanumeric character" /></br>
                            <input type="checkbox" data-io="IO" id="PW_CHCK_LRG_CHR" class="i_check" style="width:12px;"/>&nbsp;<cbt:message code="txt.1843" text="Uppercase letter" /></br>
                            <input type="checkbox" data-io="IO" id="PW_CHCK_SML_CHR" class="i_check" style="width:12px;"/>&nbsp;<cbt:message code="txt.1844" text="Lowercase letter" /></br>
                            <input type="checkbox" data-io="IO" id="PW_CHCK_SPE_CHR" class="i_check" style="width:12px;"/>&nbsp;<cbt:message code="txt.1845" text="Non-alphanumeric character" />
                        </td>
                    </tr>
                </tbody>
            </table>
        <!--//ContentsArea-->
        
        <!--Button Area-->
        <section style="position:relative; top:6px; right: 0; left:0;" id="DIV_DTLS_BTN">
            <div class="botmBtn_rig">                
                <cb:button type="button" id="BTN_SAVE" value="" title="Save"  class="btn_WF_save"><cbt:message code="txt.2214" text="Save" /></cb:button>
            </div>
        </section>
        <!--//Button Area-->  
    
        <script type="text/javascript" src="${pageContext.request.contextPath}/seize/csys/CSYS4010.js"></script>
        
    </jsp:attribute>
</cb:pageWrapper>
