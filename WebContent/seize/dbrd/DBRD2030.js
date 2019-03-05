 // ***********************************************************************************************
 // Program Name : [DBRD2030] Marketing File Transfer Success Rate by Area(지역별/월별 마케팅파일 전송률)
 // Creator      : hwi@buttle.co.kr
 // Create Date  : 2018. 08. 01
 // Description  : Marketing File Transfer Success Rate by Area(지역별/월별 마케팅파일 전송률)
 // Modify Desc  : 
 // -----------------------------------------------------------------------------------------------
 // Date         | Updater        | Remark
 // -----------------------------------------------------------------------------------------------
 //     
 //        
 // ***********************************************************************************************/

corebase.wrapping("#DBRD2030", function($cbwrap, $cbfind, corebase){
	var nationCd = GV_USR.GBL_NATION_CD || "en-US";
	var dateFormat = kendo.cultures[nationCd].calendars.standard.patterns;

	// document ready
	$cbfind(document).ready(function() {
		fn_init();
		$cbfind("#BTN_SRCH").click(fn_srch);
    	fn_srch();
	});
	
	function fn_init(){
		var dataSource = [];
		$cbfind("#chart").kendoChart({
//			renderAs: "canvas",
//            title: { text: "Marketing File Transfer Success Rate" , color: "#000000" },
            legend: { position: "bottom", margin: { top: -3, bottom:0 } },
            dataSource: { data: dataSource, datatype: "number" },
            seriesDefaults: { type: "area", stack:true, categoryField: "category", opacity: 0.8},
            series:
            	[
            		{ field: "value1", name: 'Success', overlay: { gradient: "none" }, tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}} },
                  	{ field: "value2", name: 'Fail', overlay: { gradient: "none" } , tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}}},
            		//{ field: "value3", name: 'Fail', overlay: { gradient: "none" }, tooltip: {visible: true, background: "#2f3b51", color:"#fff", border:{width:0}} }
            	],
            categoryAxis: { crosshair: {  visible: true  }, field: "category", type: "date", baseUnit: "days", 
            	labels: { format: dateFormat.m            	
//                      , rotation: "auto"
            	}
            },
            valueAxis: { labels: { format: "{0:P}" } },
            seriesClick: function(e) {},
            tooltip: { visible: true, shared: true, categoryFormat:dateFormat.d, format: "{0:P}"},            
            pannable: {
                lock: "y"
            },
            zoomable: {
              mousewheel: {
                lock: "y"
              },
              selection: {
                lock: "y"
              }
            }
        });
	}
	
	fn_srch = function() {
        if(!gfn_validDate($cbfind("#DIV_SRCH2030 #SRCH_STR_DT").cbVal(), $cbfind("#DIV_SRCH2030 #SRCH_END_DT").cbVal(), "Y", "365")) {
            return false;
        }        
        
		var option = {};
		var data   = {};
		var source = {};
		source = corebase.getSource("#DIV_SRCH2030");
		source.PGM_ID = "DBRD2030";
        		
	    data.SELECT_MKT_FILE_SEND_RATE = corebase.Input("execute", "DBRD2030.SELECT_MKT_FILE_SEND_RATE", source); 
		data.SELECT_PGM_NM = corebase.Input("select", "DBRD2010.SELECT_PGM_NM", source); 
		
		option.data = data;

		corebase.ajax(option, function (output, metadata) {  
//	    corebase.procedure(source, "DBRD2030.SELECT_MKT_FILE_SEND_RATE", function(output, metadata) {		
//        corebase.execute(source, "DBRD2030.SELECT_MKT_FILE_SEND_RATE", function(output, metadata) {	    	
			// Set Chart
			var chart = $cbfind("#chart").data("kendoChart");
			var viewList = ["DT", "SCSS", "FAIL"]; //[카테고리명(x축: 날짜),값1(성공율),값2(실패율)]
			var viewColor = []; // Colors
			var chartType = "area"; // Chart type(bar, pie, line)

	        var dataSource  = gfn_dataParse(output.SELECT_MKT_FILE_SEND_RATE.resultList, viewList, viewColor, chartType);
	        
	        chart.setDataSource(dataSource);
	        // Set chart options
	        chart.setOptions({
	        	title: { text: output.SELECT_PGM_NM? output.SELECT_PGM_NM.PGM_NM : "" , color: "#000000" },
	        	transitions: false,
	            seriesColors: [ "rgb(96,177,204)", "rgb(67,174,168)" ],
//	            categoryAxis: [ { field: "category", labels: { rotation: "auto", margin: { top: -5} }, reverse: false} ]
	        });
	        
	        // if output is more than 6 / 31 / 150 / 270 : the label would be skipped 7 / 31 / 62 / 92.
	        var leng = output.SELECT_MKT_FILE_SEND_RATE.resultList.length;
	        if(leng > 7 && leng <= 31) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 7   // Render every 7th label
	        			      , format: dateFormat.m
	        			    }
	        			}
	        	 });
	        } else if(leng > 31 && leng <= 150) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 31  // Render every 31th label
	        			      , format: dateFormat.y 
	        			    }
	        			}
	        	 });
	        } else if(leng > 150 && leng <= 270) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 62 // Render every 62th label
	        			      , format: dateFormat.y 
	        			    }
	        			}
	        	 });
	        } else if(leng > 270) {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 92 // Render every 92th label
	        			      , format: dateFormat.y 
	        			    }
	        			}
	        	 });
	        }else {
	        	 chart.setOptions({
	        		 categoryAxis: {
	        			    labels: {
	        			        step: 0 // Render every label
	        			      , format: dateFormat.m
	        			    }
	        			}
	        	 });
	        }
		});
	}

    // windows resize
    $cbfind(window).resize(function () {
        var chart = $cbfind("#chart").data("kendoChart");
        chart.refresh();
    });
    
});


