 // ***********************************************************************************************
 // Program Name : [MRKT3030] Marketing File Transfer Setting(마케팅 파일 전송 설정)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 10
 // Description  : Marketing File Transfer Setting(마케팅 파일 전송 설정)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#MRKT3030", function($cbwrap, $cbfind, corebase) {
	
	// corebase reload
	corebase.reload = function(obj) {
		if (!CB.emp(obj)) {
			fn_init(obj); // Initialize
		}
	};

	var parent = GV_PGM.source;
	var MKT_NO = parent.MKT_NO;
	var TGT_CD = parent.TGT_CD;
	var JOB_PROC_CD = parent.JOB_PROC_CD;
	var ORG_JOB_ID  = parent.ORG_JOB_ID ;
	var FILE_ID = parent.FILE_ID;
	var MKT_LIST = parent.MKT_LIST;
	var IP_ADDR = parent.IP_ADDR;
	
	var DS_TMNL_SET_LIST = [];
	var $upload = null;
	var RUN_DV;
	var JOB_CHECK = false;

    // document ready
    $cbfind(document).ready(function() {
        
    	var descStr = "Job type"+":";
    	if( !CBData.isEmpty(TGT_CD) ){
    		var name = getTGT_NM();
    		descStr = descStr + name;
    	}
    	
    	$upload = $cbwrap.cbUploader("#FILE_UPLOAD");
    	
    	// Button click
        $cbfind("#BTN_SAVE").click(fn_checkData);
        
        $cbfind("input[name='RDO_OPER_SEL']").change(fn_changeOperRdo);
        
        var today = new Date();
        
        $cbfind("#RSV_DTM").data("kendoDateTimePicker").min(today);
        
        $cbfind("#RSV_DTM").data("kendoDateTimePicker").value(today);
        $cbfind("#RSV_DTM").cbElemDisable(true);
        $cbfind("#GRD_DTL").cbClearOData();
        
        if(JOB_PROC_CD == "I" && !CBData.isEmpty(MKT_LIST)){
        	RUN_DV = "M"; //multi 
        	descStr = descStr+"("+MKT_LIST.length+")";
        }else{
        	RUN_DV = "S"; //single
        }
        
        
        if(CBData.isEmpty(MKT_NO) && CBData.isEmpty(ORG_JOB_ID) && RUN_DV == "S"){
    		
        	JOB_CHECK = true;
        	$cbfind("#tab_area").show();
    	}else{
    		$cbfind("#grid_area").css("bottom","89px");
    		$cbfind("#schd_area").css("bottom","31px");
    		$cbfind("#tab_area").hide();
    		
    		$cbfind("#JOB_DESC").html(descStr);
    	}
        
        $cbfind("#CUR_ROOT_PATH").cbElemDisable(true);
        $cbfind("#DIV_CUR_VER").cbElemDisable(true);
        
        $cbfind("#NEW_VER_1,#NEW_VER_2,#NEW_VER_3,#NEW_VER_4").focus(function(){
        	$(this).select();
        });
		
        $upload.clearAll();
        fn_srch();
        
        
        
    });
	 
    // search function
    function fn_srch(){    	
		
    	var options = {};
		var data = {};
        var source = {};
        
        source.MKT_NO = MKT_NO;
        
        if(!CBData.isEmpty(MKT_NO)){
        	data.SELECT_MKT_FILE = corebase.Input("select","MRKT3030.SELECT_MKT_FILE",source);
        	data.SELECT_TMNL_SET_LIST = corebase.Input("selectList","MRKT3030.SELECT_SET_LIST",{MKT_NO:MKT_NO,DATA_DV:"T_TMNL_INFO"});
        	
        }else{
        	
        	data.SELECT_CUR_ROOT_PATH = corebase.Input("select","MRKT3030.SELECT_CUR_ROOT_PATH",{});
        	data.SELECT_CUR_APP_VER = corebase.Input("select","MRKT3030.SELECT_CUR_APP_VER",{});
        }
        
        data.SELECT_MKT_PENDING_LIST = corebase.Input("selectList","MRKT3030.SELECT_MKT_PENDING_LIST",source);
        
		options.async = true;
		options.data = data;
		
		corebase.ajax(options, function(output, metadata) {
			
			$cbfind("#GRD_DTL").cbBindData(output.SELECT_MKT_PENDING_LIST);
			
			if(!CBData.isEmpty(MKT_NO)){
				FILE_ID = output.SELECT_MKT_FILE.FILE_ID;
				
				for(var i=0 ; i<output.SELECT_TMNL_SET_LIST.length ; i++){
					DS_TMNL_SET_LIST.push(output.SELECT_TMNL_SET_LIST[i].SET_ID);
				}
			}else{
				
				$cbfind("#CUR_ROOT_PATH").cbVal(output.SELECT_CUR_ROOT_PATH.BSVL);
				var cur_app_ver = output.SELECT_CUR_APP_VER.BSVL.split(".");
				if(cur_app_ver.length >=4 ){
					$cbfind("#CUR_VER_1").cbVal(cur_app_ver[0]);
					$cbfind("#CUR_VER_2").cbVal(cur_app_ver[1]);
					$cbfind("#CUR_VER_3").cbVal(cur_app_ver[2]);
					$cbfind("#CUR_VER_4").cbVal(cur_app_ver[3]);
					
				}
				
			}
			
		});
    }
    
    function fn_checkData(){
    	
    	var oprtCd = $cbfind("input[name=RDO_OPER_SEL]:checked").cbVal(); // Operation
    	if(oprtCd == "S"  && CBData.isEmpty($cbfind("#RSV_DTM").cbVal()) ){
    		
    		CBMsg.error(cb.locMessage("msg.2168", "Please enter the schedule time"));
    		$cbfind("#RSV_DTM").focus();
    		return;
    	}
    	
    	// Not complete job check
    	if(JOB_CHECK == true){
    		
    		var count = getNotCmpCount();
    		if(count > 0){
    			CBMsg.error(cb.locMessage("msg.2213", "Root path and Agent version can be changed only if all JOB are completed."));
    			return;
    		}
    		
    	}
    	
    	if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
			return;
		}
    	
    	if(CBData.isEmpty(TGT_CD)){
			
    		var tabIdx = $cbfind("#DIV_TRSC_TAB").tabs("option", "active");
			if(tabIdx == 0){ //change root path
				
				if(CBData.isEmpty($cbfind("#NEW_ROOT_PATH").cbVal())){
					CBMsg.error(cb.locMessage("msg.2167", "Please enter the root folder."));
					$cbfind("#NEW_ROOT_PATH").focus();
					return;
				}
				
				fn_save("CD"); //change root path
				
			}else if(tabIdx == 1){

				if($cbwrap.cbUploader("#FILE_UPLOAD").fileLength() < 1){
					
					CBMsg.error(cb.locMessage("msg.2192", "Please upload attachments."));
					return;
					
				}else if(
						
						CBData.isEmpty($cbfind("#NEW_VER_1").cbVal()) ||
						CBData.isEmpty($cbfind("#NEW_VER_2").cbVal()) ||
						CBData.isEmpty($cbfind("#NEW_VER_3").cbVal()) ||
						CBData.isEmpty($cbfind("#NEW_VER_4").cbVal()) 
						
						){
					
					CBMsg.error(cb.locMessage("msg.2164", "Please enter the full agent version."));
					
				}else{
					
					var check = corebase.getSource("#DIV_NEW_VER");
					
					if(check.isError) {
			            return CBMsg.error(check.errorMessage);
			        }
					
					$upload.upload(function(obj) {
						
						if (obj.isError) {
			                return CBMsg.errsav();
			            }
						
						corebase.select({}, "DATA3020.SELECT_GET_FILE_ID", function(output, metadata) {
						    if(CBData.isEmpty(output.FILE_ID)) {
						        CBMsg.error(cb.locMessage("msg.2092", "File information does not exist."));
						        return;
						    }
						    
						    var source = {};
						    source.FILE_ID = output.FILE_ID;
						    FILE_ID = source.FILE_ID;
						    
						    source.APND_FILE = obj.result[0].name;
						    source.APND_FILE_PHYS_NM = obj.result[0].realname;
						    source.APND_FILE_SZ = obj.result[0].size;
						    
						    var options = {};
						    var data    = {};
						    
						    data.INSERT_FILE_INFO = corebase.Input("insert","DATA3020.INSERT_FILE_INFO", source);
						    options.data = data;
						    
						    corebase.ajax(options, function(output, metadata){ 
						    	fn_save("UP"); //update program
						    });
						});
						
					});
					
				}
			}
		}else{
			
			fn_save(TGT_CD); //file download , remove marketing file...
		}
    	
    }
    
    function fn_save(targetCode){
    	
    	
    	var source = {};
    	var options = {};
		var data = {};
    	
		var oprtCd = $cbfind("input[name=RDO_OPER_SEL]:checked").cbVal(); // Operation
		
    	
    	
    	if(RUN_DV == "M"){
    		
    		var sourceList = new Array();
			$cbwrap.each(MKT_LIST, function(idx, data) {
		    	
				var obj = {};
		        
				obj.MKT_NO       = data;
				obj.JOB_METH_CD	 = oprtCd;
				obj.JOB_PROC_CD	 = JOB_PROC_CD;
				obj.JOB_TGT_PROC_CD = TGT_CD;
				obj.TRMS_PROC_ST_CD = 'N';
				obj.IP_ADDR	 = IP_ADDR;
				sourceList.push(obj);
		    });
			
			corebase.insert(sourceList, "MRKT3030.INSERT_TRMS_BY_TMNL", function(output, metadata) {
				
				CBMsg.error(cb.locMessage("msg.306", "Save completed."));
				
				var rtnValue = "Y";
    			corebase.closeWindow(rtnValue);
			});
			
    		
    	}else{
    		
    		source.RSV_DTM = $cbfind("#RSV_DTM").cbVal();
        	source.JOB_METH_CD = oprtCd;
    		
    		if(CBData.isEmpty(MKT_NO)){
        		source.MKT_NO = "";
        	}else{
        		source.MKT_NO = MKT_NO;
        	}
        	
        	source.JOB_TGT_PROC_CD = targetCode;
        	source.JOB_PROC_CD = JOB_PROC_CD;
        	source.TRMS_PROC_ST_CD = "N"; //Not ready
        	
        	   	
        	
    		data.getKey = corebase.Input("select","MRKT3030.SELECT_SET_JOB_ID",{});
    		options.async = false;
    		options.data = data;

    		corebase.ajax(options, function(output, metadata) {
    			source.JOB_ID = output.getKey.result.JOB_ID;
    			
    		});
        	
    		options = {};
    		data = {};
    		
    		if(targetCode == "RM"){
    			
    			data.EMPTY_MKT_FILE = corebase.Input("update","MRKT3030.EMPTY_MKT_FILE",source);
    			
    			//Publish 
    	    	corebase.publish({}, "MARKETING", function(output, metadata) {
    	    		
    	    	});
    			
    		}else if(targetCode == "FD"){
    			
    			if(!CBData.isEmpty(FILE_ID)){
    				
    	    		source.FILE_ID = FILE_ID;
    			}
    			
        	}else if(targetCode == "CD"){
        		
        		source.BSVL = $cbfind("#NEW_ROOT_PATH").cbVal();
        		source.BASC_DV_CD = "ROOT_PATH";
        		data.UPDATE_BSVL_INFO = corebase.Input("update","MRKT3030.UPDATE_BSVL_INFO",source);
        		
        	}else if(targetCode == "UP"){
        		
        		source.BSVL = $cbfind("#NEW_VER_1").cbVal()+"."+$cbfind("#NEW_VER_2").cbVal()+"."+$cbfind("#NEW_VER_3").cbVal()+"."+$cbfind("#NEW_VER_4").cbVal();
        		source.BASC_DV_CD = "APP_VER";
        		data.UPDATE_BSVL_INFO = corebase.Input("update","MRKT3030.UPDATE_BSVL_INFO",source);
        		
        		if(!CBData.isEmpty(FILE_ID)){
        			
        			source.FILE_ID = FILE_ID;
        			
    			}
        	}
    		
    		console.log(source);
    		data.SAVE_INS_MRKT_INFO = corebase.Input("insert","MRKT3030.INSERT_TRMS_MGNT",source);
    		
    		
    		if(CBData.isEmpty(ORG_JOB_ID)){
    			
    			var source2 = {};
    			console.log(DS_TMNL_SET_LIST);
    			source2.SET_ID = DS_TMNL_SET_LIST;
    			source2.JOB_ID = source.JOB_ID;
    			source2.MKT_NO = source.MKT_NO;
    			data.INSERT_TMNL_LIST = corebase.Input("insertDynamic","MRKT3030.INSERT_TMNL_LIST",source2);
    			
    		}else{
    			
    			source.ORG_JOB_ID = ORG_JOB_ID;
    			data.INSERT_RETRY_TMNL_LIST = corebase.Input("insert","MRKT3030.INSERT_RETRY_TMNL_LIST",source);
    			
    		}
    		
    		
    		
    		options.async = true;
    		options.data = data;
    		
    		corebase.ajax(options, function(output, metadata) {
    			
    			var rtnValue = "Y";
    			if(JOB_PROC_CD == "A"){
    				
    				if (cb.confirm(cb.locMessage("msg.2215", "Save completed.Whether jump to marketing transmission management page?"))) {
    					rtnValue = "Z";
    				}
    				
    			}else{
    				CBMsg.error(cb.locMessage("msg.306", "Save completed."));
    			}
    			
    			corebase.closeWindow(rtnValue);
    		});
        	
        	
    		
    	}
    	
    	
    }
    
    // Operation radio button change event
    function fn_changeOperRdo() {
        var OperVal = $cbfind("input[name=RDO_OPER_SEL]:checked").cbVal();
        var bRsv = true;
        if(OperVal == "S") bRsv = false;
        $cbfind("#RSV_DTM").cbElemDisable(bRsv);
    }
    
    function getTGT_NM(){
    	
    	var options = {};
		var data = {};
		
		data.SELECT_TGT_PROC_NM = corebase.Input("select","MRKT3030.SELECT_TGT_PROC_NM",{"TGT_CD":TGT_CD});
		options.async = false;
		options.data = data;
		
		var returnVal = "";
		corebase.ajax(options, function(output, metadata) {
			
			returnVal =  output.SELECT_TGT_PROC_NM.result.TGT_NM;
			
		});
		return returnVal;
    }
    
    function getNotCmpCount(){
    	
    	var options = {};
		var data = {};
		
		data.SELECT_NOT_CMP_CNT = corebase.Input("select","MRKT3030.SELECT_NOT_CMP_CNT",{});
		options.async = false;
		options.data = data;
		
		var returnVal = 0;
		corebase.ajax(options, function(output, metadata) {
			
			returnVal =  output.SELECT_NOT_CMP_CNT.result.CNT;
			
		});
		
		if(CBData.isEmpty(returnVal)){
			returnVal = 0;
		}else{
			returnVal = parseInt(returnVal);
		}
		
		return returnVal;
    }
    
});
