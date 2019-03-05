 // ***********************************************************************************************
 // Program Name : [MRKT5010] Marketing Additional Item Management(마케팅 추가 항목 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 10
 // Description  : Marketing Additional Item Management(마케팅 추가 항목 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#MRKT5010", function($cbwrap, $cbfind, corebase) {
    
    // document ready
    $cbfind(document).ready(function() {
        // Button click
//        $cbfind("#BTN_SRCH").click(fn_srch);
        $cbfind("#BTN_ADD_ROW").click(fn_insertRow);
        $cbfind("#BTN_DEL_ROW").click(fn_removeRow);
        $cbfind("#BTN_SAVE").click(fn_save);
        
        // initialize when search area changed
        $cbfind("#DIV_SRCH #TMNL_TYP_CD").change(fn_srch);
        $cbfind("#DIV_SRCH #MKT_TYP_CD").change(fn_srch);
        fn_srch();
    });
    
    // initialize function
    function fn_init(){
        $cbwrap.cbSpread("#GRD_ITEM_DTL").clear();
    }
    
    // search function
    function fn_srch(){    	
    	fn_init();
		var option = {};
		var data   = {};		
        var source = corebase.getSource("#DIV_SRCH");
        
        corebase.selectList(source, "MRKT5010.SELECT_MKT_ADD_COL", function(output, metadata){
            $cbfind("#GRD_ITEM_DTL").cbBindData(output);
        });
    }
  
    // Insert row function
    function fn_insertRow() {
        var codeData ={};        
        codeData.TMNL_TYP_CD = $cbfind("#DIV_SRCH #TMNL_TYP_CD").cbVal();
        codeData.MKT_TYP_CD = $cbfind("#DIV_SRCH #MKT_TYP_CD").cbVal();

        var $spread = $cbwrap.cbSpread("#GRD_ITEM_DTL");
        var maxRow = $spread.total();
        
        $spread.insertRow(codeData , maxRow);	// insert row with terminal and marketing code
        gfn_setTableRowHeight($cbfind("#GRD_ITEM_DTL"), '28px');
    }
    
    // Delete row function
    function fn_removeRow() {
        
        var row = $cbwrap.cbSpread("#GRD_ITEM_DTL").activeRowIndex();
        if(row > -1) {
        	$cbwrap.cbSpread("#GRD_ITEM_DTL").removeRow(row);
        } else {
            CBMsg.error(cb.locMessage("msg.207", "There is no selected item."));
            return;
        }
        gfn_setTableRowHeight($cbfind("#GRD_ITEM_DTL"), '28px');
    }

    // duplication check function
    function findDuplicates(array) {
	  var arrayLength = array.length, i, j, result;
	  dance:
	  for (i = 1; i < arrayLength; i++) {
    	  for (j = 0; j < i; j++) {
		      if (array[i].PHYS_NM == array[j].PHYS_NM) {
		        result = i;
		        break dance;
		      }
    	  }
	  }
	  return result;
    }

    // Save function
    function fn_save(){
	    var sourceForInsert = {};
	    sourceForInsert = corebase.getSource($cbwrap.cbSpread("#GRD_ITEM_DTL").getAll());
		var regex = /^[a-zA-Z0-9_]+$/; // or /^\w+$/ as mentioned

	    for(var i =0; i < sourceForInsert.length; i++ ){
		    if(CBData.isEmpty(sourceForInsert[i].PHYS_NM)) {	// field name blank check
		        CBMsg.error(cb.locMessage("msg.2296", "You must enter field name."));
		        $cbwrap.cbSpread("#GRD_ITEM_DTL").select(1, i);	 
		        return false;
		        break;
		    }
			if (!regex.test(sourceForInsert[i].PHYS_NM)) {
				CBMsg.error(cb.locMessage("msg.1848", "Unacceptable character(s). Please check your input and try again."));
				$cbwrap.cbSpread("#GRD_ITEM_DTL").select(1, i);	
				return false;
			}
//		    if(sourceForInsert[i].PHYS_NM.length > 15){	    	// field name length check
//		        CBMsg.error(cb.locMessage("msg.2248", "The field name cannot be longer than 15 characters."));
//		        $cbwrap.cbSpread("#GRD_ITEM_DTL").select(1,i);	 
//		        return false;
//		        break;
//		    }
//		    if(sourceForInsert[i].SCRN_DISP_NM.length > 10){	// display name length check
//		        CBMsg.error(cb.locMessage("msg.2247", "The display name cannot be longer than 10 characters."));
//		        $cbwrap.cbSpread("#GRD_ITEM_DTL").select(1,i);	 
//		        return false;
//		        break;
//		    }
//		    if(sourceForInsert[i].BASE_VLU.length > 10){		// default name length check
//		        CBMsg.error(cb.locMessage("msg.2246", "The default name cannot be longer than 10 characters."));
//		        $cbwrap.cbSpread("#GRD_ITEM_DTL").select(1,i);	 
//		        return false;
//		        break;
//		    }
	    }
	    
	    // field name duplicate check
	    var dupl = findDuplicates(sourceForInsert);
	    if(!CBData.isEmpty(dupl)) {
	        CBMsg.error(cb.locMessage("msg.2295", "You entered duplicate field name."));
	        $cbwrap.cbSpread("#GRD_ITEM_DTL").select(1,dupl);	        
	        return false;
	    } 
    	
        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
            return;
            }    
        
        var options = {};
        var data = {};       
		var source = {};
		source.TMNL_TYP_CD = $cbfind("#DIV_SRCH #TMNL_TYP_CD").cbVal();
		source.MKT_TYP_CD = $cbfind("#DIV_SRCH #MKT_TYP_CD").cbVal();
		
        data.DELETE		= corebase.Input("delete", "MRKT5010.DELETE_MKT_ADD_COL", source);
        data.GREETING   = corebase.Input("insert", "MRKT5010.INSERT_MKT_ADD_COL", sourceForInsert);	        

        options.data = data;
        corebase.ajax(options, function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
            fn_srch();
        });
    }       
});
