 // ***********************************************************************************************
 // Program Name : [DBRD2060] File Transfer Status(파일 전송 현황)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : File Transfer Status(파일 전송 현황)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2060", function($cbwrap, $cbfind, corebase){

	// document ready
	$cbfind(document).ready(function() {
		fn_srch();
		$cbfind("#BTN_SRCH").click(fn_srch);
	});
	
	fn_srch = function() {		
		var option = {};
		var data   = {};
		var source = {};
		source.PGM_ID = "DBRD2060";
        		
	    data.SELECT_FILE_SEND_STT = corebase.Input("select", "DBRD2060.SELECT_FILE_SEND_STT", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {
			$cbfind("#DTL_FILE_STT").cbBindData(output.SELECT_FILE_SEND_STT);
			$cbfind("#PGM_NM").cbVal(output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "");
		});
	}    
});


