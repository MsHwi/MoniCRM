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

corebase.wrapping ("#CSYS4010", function ($cbwrap, $cbfind, corebase) {
	
	// document ready
	$cbfind(document).ready(function() {
		$cbfind("#BTN_SAVE").click(fn_save);
		fn_srch();
	});
	
	// search function for existing password policy
	function fn_srch(){
		var source = {};
	    corebase.select( source, "CSYS4010.SELECT_PW_PLCY", function (output, metadata){
		    if(metadata.resultCount > 0){
		    	$cbfind("#DTL_CD").cbBindData(output);
		    
			    //check boxes setting
		        if(output.PW_CHCK_NUM == "Y") $cbfind("input:checkbox[id='PW_CHCK_NUM']").prop("checked", true);
		        else $cbfind("input:checkbox[id='PW_CHCK_NUM']").prop("checked", false);
		        if(output.PW_CHCK_ALPH == "Y") $cbfind("input:checkbox[id='PW_CHCK_ALPH']").prop("checked", true);
		        else $cbfind("input:checkbox[id='PW_CHCK_ALPH']").prop("checked", false);
		        if(output.PW_CHCK_LRG_CHR == "Y") $cbfind("input:checkbox[id='PW_CHCK_LRG_CHR']").prop("checked", true);
		        else $cbfind("input:checkbox[id='PW_CHCK_LRG_CHR']").prop("checked", false);
		        if(output.PW_CHCK_SML_CHR == "Y") $cbfind("input:checkbox[id='PW_CHCK_SML_CHR']").prop("checked", true);
		        else $cbfind("input:checkbox[id='PW_CHCK_SML_CHR']").prop("checked", false);
		        if(output.PW_CHCK_SPE_CHR == "Y") $cbfind("input:checkbox[id='PW_CHCK_SPE_CHR']").prop("checked", true);
		        else $cbfind("input:checkbox[id='PW_CHCK_SPE_CHR']").prop("checked", false);
		    }
	    });
	}
	
	// save function to update password policy
	function fn_save(){
        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
            return;
        }
        
        var options = {};
        var data = {};       
		var source = {};
	    source = corebase.getSource("#DTL_CD");
	    
	    // transform check box values to DB store 
	    source.PW_CHCK_NUM = $cbfind("input:checkbox[id='PW_CHCK_NUM']").is(":checked")?"Y":"N";
	    source.PW_CHCK_ALPH = $cbfind("input:checkbox[id='PW_CHCK_ALPH']").is(":checked")?"Y":"N";
	    source.PW_CHCK_LRG_CHR = $cbfind("input:checkbox[id='PW_CHCK_LRG_CHR']").is(":checked")?"Y":"N";
	    source.PW_CHCK_SML_CHR = $cbfind("input:checkbox[id='PW_CHCK_SML_CHR']").is(":checked")?"Y":"N";
	    source.PW_CHCK_SPE_CHR = $cbfind("input:checkbox[id='PW_CHCK_SPE_CHR']").is(":checked")?"Y":"N";
		
        data.DELETE = corebase.Input("delete", "CSYS4010.DELETE_PW_PLCY", {});
        data.INSERT = corebase.Input("insert", "CSYS4010.INSERT_PW_PLCY", source);	        

        options.data = data;
        corebase.ajax(options, function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
        });
	}	
});
