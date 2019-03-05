 // ***********************************************************************************************
 // Program Name : [DBRD2070] Transferred File Payload of Today by Marketing(금일 전체/마케팅별 파일 전송 payload)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Transferred File Payload of Today by Marketing(금일 전체/마케팅별 파일 전송 payload)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2070", function($cbwrap, $cbfind, corebase){

	// document ready
	$cbfind(document).ready(function() {
		fn_srch();
		$cbfind("#BTN_SRCH").click(fn_srch);
	}); 
	
	fn_srch = function() {
		var option = {};
		var data   = {};
		var source = {};
		source.PGM_ID = "DBRD2070";
		
		data.SELECT_PYLD_TTL = corebase.Input("select", "DBRD2070.SELECT_PYLD_TTL", source); // Search Weekly Call Total
		data.SELECT_PYLD_DTL = corebase.Input("selectList", "DBRD2070.SELECT_PYLD_DTL", source); // Search Weekly Call Detail  
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {
			$cbfind("#DTL_PYLD_TTL").cbBindData(output.SELECT_PYLD_TTL);
			$cbfind("#GRD_PYLD_DTL").cbBindData(output.SELECT_PYLD_DTL);	
			$cbfind("#PGM_NM").cbVal(output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "");
	    });
	}    
});


