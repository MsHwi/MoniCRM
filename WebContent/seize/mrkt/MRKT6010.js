 // ***********************************************************************************************
 // Program Name : [MRKT6010] Marketing Template Item Management(마케팅 템플릿 항목 관리)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 07. 10
 // Description  : Marketing Template Item Management(마케팅 템플릿 항목 관리)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //     
 // ***********************************************************************************************/

corebase.wrapping("#MRKT6010", function($cbwrap, $cbfind, corebase) {
    
	var tmplItemForGreeting = 'Greeting';
	var tmplItemForBirthday = 'Birthday';
	
    // document ready
    $cbfind(document).ready(function() {
        // Button click
        $cbfind("#BTN_ADD_ROW").click(fn_insertRow);
        $cbfind("#BTN_DEL_ROW").click(fn_removeRow);
        $cbfind("#BTN_SAVE").click(fn_save);
        
        fn_setColComboList();
        fn_init();        
    });

	// Initialize Function
	function fn_init() {
        $cbwrap.cbSpread("#GRD_GRT_TMPL").clear();
		$cbfind("#DIV_BD_AREA").cbClearOData();
        fn_srch();
	}   
	 
    // search function
    function fn_srch(){    	
		var option = {};
        var source = {};

		source.TMPL_ITEM = tmplItemForGreeting;
	    corebase.selectList(source, "MRKT6010.SELECT_MKT_TMPL", function(output, metadata){	    	
	        $cbfind("#GRD_GRT_TMPL").cbBindData(output);    
	    });
	
		source.TMPL_ITEM = tmplItemForBirthday;
	    corebase.select(source, "MRKT6010.SELECT_MKT_TMPL", function(output, metadata){
	        $cbfind("#DIV_BD_AREA").cbBindData(output);   
	        $cbfind("#DIV_BD_AREA #TMPL_ITEM").cbVal(tmplItemForBirthday);
	    });		
    }
  
    // Insert row function
    function fn_insertRow() {
        var tmplItemData ={};        
        tmplItemData.TMPL_ITEM = tmplItemForGreeting;

        var $spread = $cbwrap.cbSpread("#GRD_GRT_TMPL");
        var maxRow = $spread.total();
        
        $spread.insertRow(tmplItemData , maxRow);	// insert row with terminal and marketing code
        gfn_setTableRowHeight($cbfind("#GRD_GRT_TMPL"), '28px');
    }
    
    // Delete row function
    function fn_removeRow() {
        
        var row = $cbwrap.cbSpread("#GRD_GRT_TMPL").activeRowIndex();
        if(row > -1) {
        	$cbwrap.cbSpread("#GRD_GRT_TMPL").removeRow(row);
        } else {
            CBMsg.error(cb.locMessage("msg.2302", "You should select a row to delete."));
            return;
        }
        gfn_setTableRowHeight($cbfind("#GRD_GRT_TMPL"), '28px');
    }

    // Set Filter grid combo list
    function fn_setColComboList() {
        var columns = $cbwrap.cbSpread("#GRD_GRT_TMPL").options().columns;  
    	columns[0].editor = function (container, options) {
    	    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="{0:h:mm tt}'+'"/>')
    	            .appendTo(container)
    	            .kendoTimePicker({});    	    
    	    }	
    	columns[1].editor = function (container, options) {
    	    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="{0:h:mm tt}'+'"/>')
    	            .appendTo(container)
    	            .kendoTimePicker({open: function(){ // set minimun time as start time
    	            	var startTime;
    	            	if (typeof options.model.STR_TM === 'object'){
    	            		startTime = new Date(options.model.STR_TM);	    	            		
    	            	} else {
    	            		startTime = new Date(0,0,0, options.model.STR_TM.substr(0,2), options.model.STR_TM.substr(2,2), 0);
    	            	}	
    	            	startTime.setMinutes(startTime.getMinutes() + this.options.interval);
	            		this.min(startTime);			
    	            }
	            });
    	    }	
    	$cbwrap.cbSpread("#GRD_GRT_TMPL").options({ columns : columns });
        }

    // Save function
    function fn_save(){
	    var source  = {};
	    var sourceForGrt = {};
	    var sourceForBd = {};    
	    
	    sourceForGrt = corebase.getSource($cbwrap.cbSpread("#GRD_GRT_TMPL").getAll());	    
	    
	    for(var i =0; i < sourceForGrt.length; i++ ){	    	
		    // change time data as same 4 digits as the db format 
	    	if(sourceForGrt[i].STR_TM.length != 6){
	    		sourceForGrt[i].STR_TM = fn_changeTimeFormat(sourceForGrt[i].STR_TM);
	    	}
	    	if(sourceForGrt[i].END_TM.length != 6){
	    		sourceForGrt[i].END_TM = fn_changeTimeFormat(sourceForGrt[i].END_TM);
	    	}	    	
	    	// greeting start time blank check
	    	if(!sourceForGrt[i].STR_TM.length|| sourceForGrt[i].STR_TM == "NaNNaN00"){		
		        CBMsg.error(cb.locMessage("msg.2299", "You must enter the start time."));
		        $cbwrap.cbSpread("#GRD_GRT_TMPL").select(0,i);	 
		        return false;
		        break;
		    } // greeting end time blank check
		    if(!sourceForGrt[i].END_TM.length || sourceForGrt[i].END_TM == "NaNNaN00"){		
		        CBMsg.error(cb.locMessage("msg.2298", "You must enter the end time."));
		        $cbwrap.cbSpread("#GRD_GRT_TMPL").select(1,i);	 
		        return false;
		        break;
		    } // greeting content blank check
		    if(!sourceForGrt[i].CTT.length){		
		        CBMsg.error(cb.locMessage("msg.2297", "You must enter the content."));
		        $cbwrap.cbSpread("#GRD_GRT_TMPL").select(2,i);	 
		        return false;
		        break;
		    } // greeting content length check
		    if(sourceForGrt[i].CTT.length > 200){		
		        CBMsg.error(cb.locMessage("msg.2245", "The content cannot be longer than 200 characters."));
		        $cbwrap.cbSpread("#GRD_GRT_TMPL").select(2,i);	 
		        return false;
		        break;
		    }       
		      // greeting time validation check
		    if(sourceForGrt[i].STR_TM == sourceForGrt[i].END_TM){		
	        CBMsg.error(cb.locMessage("msg.2255", "The start time cannot be same as the end time."));
	        $cbwrap.cbSpread("#GRD_GRT_TMPL").select(2,i);	 
	        return false;
	        break;
		    } // greeting time validation check
		    if(sourceForGrt[i].STR_TM > sourceForGrt[i].END_TM){		
		        CBMsg.error(cb.locMessage("msg.2254", "The start time cannot be bigger than end time.") 
		        		+ '\n' + cb.locMessage("msg.2301", "You must split it into 2 based on midnight(12 A.M)."));
		        $cbwrap.cbSpread("#GRD_GRT_TMPL").select(2,i);	 
		        return false;
		        break;
		    }
	    }    
	    
	    sourceForBd = corebase.getSource("#DIV_BD_AREA");
	    // birthday content length check
	    if(sourceForBd.CTT.length > 200){		
	        CBMsg.error(cb.locMessage("msg.2245", "The content cannot be longer than 200 characters."));
			$cbfind("#DIV_BD_AREA #CTT").focus(); 
	        return false;
	    }
	    
        if (!cb.confirm(cb.locMessage("msg.2071", "Do you want to save?"))) {
            return;
            }
        
        var options = {};
        var data = {};
        
        data.DELETE		= corebase.Input("delete", "MRKT6010.DELETE_MKT_TMPL", source);
        data.GREETING   = corebase.Input("insert", "MRKT6010.INSERT_MKT_TMPL", sourceForGrt);			
        data.BIRTHDAY 	= corebase.Input("insert", "MRKT6010.INSERT_MKT_TMPL", sourceForBd);	
        
        options.data = data;
        corebase.ajax(options, function(output, metadata) {
            CBMsg.error(cb.locMessage("msg.306", "Save completed."));
            fn_init();
        });        
    }
    
    // transform Date object into 'HHmm00' String
    function fn_changeTimeFormat(date){
    	var d = new Date(date);
    	var hour = "" + d.getHours();    	
    	var minute = "" + d.getMinutes(); 
    	
    	if (hour.length == 1) {
			hour = "0" + hour; 
		}
    	if (minute.length == 1) { 
    		minute = "0" + minute; 
    	}
    	return hour + minute + '00'; // '00'(second) for grid type:time format
    }
});
