<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="cb" tagdir="/WEB-INF/tags/corebase" %>
<%@ taglib prefix="cbt" uri="http://cbt.buttle.co.kr" %>
<cb:info>
<!-- 
 // ***********************************************************************************************
 // Program Name : [MRKT3030] Marketing File Transfer Setting(마케팅 파일 전송 설정)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 30
 // Description  : Marketing File Transfer Setting(마케팅 파일 전송 설정)
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
<cb:pageWrapper title=" Marketing File Transfer Setting" id="MRKT3030" plugin="grid, datetimepicker" pageType="popup">

    <jsp:attribute name="headWrapper"></jsp:attribute>
    <jsp:attribute name="bodyWrapper">
    
<!--        <span class="Srchline"></span>       -->
            
        <!--GridArea-->
        <section id="grid_area" style="position:absolute; top:0px; right:0; left:0; bottom:183px;">
            <h4>> <cbt:message code="msg.2287" text="When should this work start?" /><span id="JOB_DESC"></span></h4>
            <!--Grid-->
            <article class="gridArea">
                <cb:grid style="position:absolute; top:19px; bottom:0; width:100%;" data-option="type:spread">
                    <table id="GRD_DTL" class="spread" data-spread="operationmode:3;">
                        <thead>
                            <tr>
                                <cb:grid-column id="JOB_TGT_PROC"      width="160px"   data-column="align:center;"><cbt:message code="txt.2115" text="Job target process" /></cb:grid-column>
                                <cb:grid-column id="MKT_NM"         width="*"       data-column="align:left;"><cbt:message code="txt.2125" text="Marketing Name" /></cb:grid-column>
                                <cb:grid-column id="RSV_DTM"        width="150px"   data-column="align:center;type:datetime;"><cbt:message code="txt.2052" text="Datetime" /></cb:grid-column>
                                <cb:grid-column id="ALL_TGT_NCNT"   width="100px"   data-column="align:right;type:number;"><cbt:message code="txt.2238" text="Target Cnt" /></cb:grid-column>
                                <cb:grid-column id="REG_ID"         width="150px"   data-column="align:left;"><cbt:message code="txt.2281" text="User Name" /></cb:grid-column>
                                
                                <!-- hidden -->
                                <cb:grid-column id="JOB_ID" data-column="hidden"></cb:grid-column>
                                <cb:grid-column id="MKT_NO" data-column="hidden"></cb:grid-column>  
                                <cb:grid-column id="JOB_METH_CD" data-column="hidden"></cb:grid-column>
                                <cb:grid-column id="JOB_TGT_PROC_CD" data-column="hidden"></cb:grid-column>
                            </tr>
                        </thead>
                    </table>
                </cb:grid>
            </article>
            <!--//Grid-->
        </section>
        <!--//GridArea-->
        
        <section id="schd_area" style="position:absolute; right: 0; left: 0; bottom:137px; ">
        	<div class="boxst02" id="DIV_INFO">
		        <table cellspacing="0">
		            <colgroup>
		                <col style="width:120px" />
		                <col style="width:" />
		            </colgroup>
		            <tbody>
		                <tr>
		                    <th scope="row"><cbt:message code="txt.2144" text="Operation" /></th>
		                    <td>
		                        <div class="item inline">
		                            <input name="RDO_OPER_SEL" type="radio" id="RDO_IMDT" value="I" class="i_radio" checked="checked"/><label for="RDO_IMDT"><cbt:message code="txt.2103" text="Immediate" /></label>
		                            <input name="RDO_OPER_SEL" type="radio" id="RDO_SCHD" value="S" class="i_radio"                  /><label for="RDO_SCHD"><cbt:message code="txt.2217" text="Schedule" /></label>
		                        </div>
		                        <cb:datetimepicker id="RSV_DTM" data-option="type:datetimepicker;" data-valid="maxlength:14;" style="width:260px;" data-io="IO" />
		                    </td>
		                </tr>
		            </tbody>
		        </table>
	        </div>
        </section>
        
	    <!--TabArea-->
	    <section id="tab_area" style="position:absolute; right:0; bottom:31px; left:0; height:100px; display:none" >
	        <article class="tab_group_list tabs_2dept">
	            <div id="DIV_TRSC_TAB" data-option="type:tabs">
	                <ul>
	                    <li id="LI_ORDR_INFO" ><a href="#tab-no1"><cbt:message code="txt.2028" text="Change Root Path" /></a></li>
	                    <li id="LI_TAG_LIST" ><a href="#tab-no2"><cbt:message code="txt.2006" text="Agent Update" /></a></li>
	                </ul>
	                <article style="position:absolute; top:24px; bottom:0; width:100%; overflow:auto;"><!-- class="tab_cont"  -->
	                    <div id="tab-no1">
	                    	<div class="boxst02" id="" style="position:absolute; top:0; bottom:0;">
					            <table cellspacing="0">
					                <colgroup>
					                    <col style="width:120px" />
					                    <col style="width:" />
					                </colgroup>
					                <tbody>
					                    <tr>
					                        <th scope="row" title="" rowspan="2"><cbt:message code="txt.2212" text="Root Folder" /></th>
					                        <td><cbt:message code="txt.2044" text="Current" /> <input type="text" id="CUR_ROOT_PATH" data-name="Current Root Folder" value="" maxlength="" data-io="IO" style="width:calc(100% - 50px); margin:2px;" ime-mode:disabled;" maxlength="300" disabled/></td>
					                    </tr>
					                    <tr>
					                        <td><cbt:message code="txt.2027" text="Change" /> <input type="text" id="NEW_ROOT_PATH" data-name="New Root Folder" value="" maxlength="" data-io="IO" style="width:calc(100% - 50px); margin:2px;" ime-mode:disabled;"/></td>				                    
					                    </tr>
					                </tbody>
					            </table>
					        </div>                 
	                    </div>
	                    
	                    <div id="tab-no2">
	                    	<div class="boxst02" id="" style="position:absolute; top:0; bottom:0;">
					            <table cellspacing="0">
					                <colgroup>
					                    <col style="width:120px" />
					                    <col style="width:" />
					                </colgroup>
					                <tbody>
					                    <tr>
					                        <th scope="row" title="" rowspan="2"><cbt:message code="txt.2006" text="Agent Update" /></th>
					                        <td style="position:relative;">
					                        	<div class="filebox" style="width:calc(100% - 120px); text-align:right;">
					                        		<cbt:message code="txt.2046" text="Current Version" />
					                        	</div>
					                        	<div id="DIV_CUR_VER" style="position:absolute; top:3px; right:0;" >
					                                <input type="text" id="CUR_VER_1" data-name="txt.2046:Current Version" value="" maxlength="" data-io="IO" style="width:25px; ime-mode:disabled;" maxlength="1" disabled/>
						                        	<input type="text" id="CUR_VER_2" data-name="txt.2046:Current Version" value="" maxlength="" data-io="IO" style="width:25px; ime-mode:disabled;" maxlength="1" disabled/>
						                        	<input type="text" id="CUR_VER_3" data-name="txt.2046:Current Version" value="" maxlength="" data-io="IO" style="width:25px; ime-mode:disabled;" maxlength="1" disabled/>
						                        	<input type="text" id="CUR_VER_4" data-name="txt.2046:Current Version" value="" maxlength="" data-io="IO" style="width:25px; ime-mode:disabled;" maxlength="1" disabled/>
						                        </div>
					                        </td>
					                    </tr>
					                    <tr>
					                        <td style="position:relative;">
					                        	<div class="filebox" style="width:calc(100% - 120px);">
				                                    <table class="boxst_file">
				                                        <colgroup>
				                                            <col style="width:100%" />
				                                            <col style="width:26px" />
				                                        </colgroup>
				                                        <tbody id="kendoUploadView">
				                                        </tbody>
				                                    </table>
				                                    <label for="FILE_UPLOAD" id="BTN_SEL_FILE"><span><cbt:message code="txt.2222" text="Select file" /></span></label>
				                                    <input type="file" id="FILE_UPLOAD" data-option="type:uploader;" data-upload="view:#kendoUploadView;dropZone:.boxst_file;fileCnt:1;ext:exe|zip;progress:true;" >
				                                </div>
				                                <div id="DIV_NEW_VER" style="position:absolute; top:3px; right:0;">
					                                <input type="text" id="NEW_VER_1" class="point" data-name="New Version" value="" maxlength="1" data-io="IO" data-valid="require" style="width:25px; ime-mode:disabled;" />
						                        	<input type="text" id="NEW_VER_2" class="point" data-name="New Version" value="" maxlength="1" data-io="IO" data-valid="require" style="width:25px; ime-mode:disabled;" />
						                        	<input type="text" id="NEW_VER_3" class="point" data-name="New Version" value="" maxlength="1" data-io="IO" data-valid="require" style="width:25px; ime-mode:disabled;" />
						                        	<input type="text" id="NEW_VER_4" class="point" data-name="New Version" value="" maxlength="1" data-io="IO" data-valid="require" style="width:25px; ime-mode:disabled;" />
						                        </div>
					                        </td>				                    
					                    </tr>
					                </tbody>
					            </table>
					        </div>
	                    </div>
	                </article>
	            </div>
	        </article>
	    </section>
	    <!--//TabArea-->
        
        <!--Bottom button Area-->
        <section style="position:absolute; bottom:0px; right: 0; left:0;">
            <div class="botmBtn_rig">
                <cb:button type="button" id="BTN_SAVE" value="" title="save" class="btn_WF_save" ><cbt:message code="txt.2214" text="Save" /></cb:button>
            </div>
        </section>
        <!--//Bottom button Area-->
     
    <script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/seize/mrkt/MRKT3030.js"></script>
    
    </jsp:attribute>
</cb:pageWrapper>
