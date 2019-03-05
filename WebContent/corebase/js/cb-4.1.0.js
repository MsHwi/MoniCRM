/*
 * ==============================================================================================
 * BUTTLE., Software License, Version 1.0
 * 
 * 
 * Copyright (c) 1998-2013 BUTTLE., BUTTLE * All rights reserved.
 * 
 * DON'T COPY OR REDISTRIBUTE THIS SOURCE CODE WITHOUT PERMISSION. THIS SOFTWARE
 * IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT
 * NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL BUTTLE OR ITS
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * ==============================================================================================
 * 
 * For more information on this product, please see http://www.buttle.co.kr
 * 
 */

var CoreBase = function () {
	this.classId = "corebase";
};

/**
 * [System class] 구조화된 메시지를 생성하고, 표시합니다.
 * 
 * @constructor
 * @version 4.0.0.0
 * @author noart@buttle.co.kr
 * @since CoreBase X
 * @since 2010.08.03
 */

// ----------------------------------------------------------------------
// TODOLIST !!!!
// ----------------------------------------------------------------------
// TODO 2012. 4. 19. Administrator 향후 툴이 변경될 경우 class 대체 필요함. 
// ----------------------------------------------------------------------
// abstract class로 생성한다.
// 라이브러리 함수의 접근을 이런 방식으로만, 이클립스에서 지원한다.
// ----------------------------------------------------------------------
// TODO 중요한 오류의 경우에는 파일로 저장하거나, 서버로 전송 고민.
// ----------------------------------------------------------------------
// TODO corebase 파일에 포함시키는 것을 고민한다.
function CoreBaseMsg (option) {
	this.classId = "corebase.Message";
    
	/**
	 * 메시지 문장을 생성하여 출력합니다.
	 * 
	 * @public
	 * @arguments 
	 * @returns
	 * @example <code>
	 * CBMsg.out(cb.locMessage("code", "output message")); <br>
	 * CBMsg.out ( e ); // exception 객체 출력 시 <br>
	 * CBMsg.out ( -2100 ); // 메시지코드를 통한 메시지 출력 시 <br>
	 * CBMsg.out ( -2102, {COLUMN_NAME : '지역'}); // 메시지 코드를 통한 메시지 출력에서 내용 변경하기 <br>
	 * </code>
	 */
	this.out = function () {
		var msg = corebase.parseArgs (arguments);
		window.alert ( msg);
		return msg;
	};
    

	/**
	 * 오버라이드 함수
	 * 프로그레스를 표시할 지 여부를 설정하는 함수
	 * 
	 * @override
	 * @param {boolean} status (true : on / false : off)
	 */
	this.progress = function (status) {};

	/**
	 * debug mode에서만 메시지를 출력한다.
	 * 
	 * @public
	 * @see config.xml
	 * @arguments 
	 * @returns
	 * @example <code>
	 * CBMsg.out(cb.locMessage("code", "output message")); <br>
	 * CBMsg.debug( e ); // exception 객체 출력 시
	 * CBMsg.debug( -2100 ); // 메시지코드를 통한 메시지 출력 시
	 * CBMsg.debug( -2102, {COLUMN_NAME : '지역'}); // 메시지 코드를 통한 메시지 출력에서 내용 변경하기
	 * </code>
	 */
	this.debug = function  () {
		var msg = corebase.parseArgs(arguments);
		window.alert ( msg);
		return msg;
	};
    
	/**
	 * 오류발생 시 사용한다.<br>
	 * 오류가 발생한 후 발생한 오류를 log에 기록하고 메시지로 출력한다.<br>
	 * 시스템 오류시에만 사용하게 될 것이므로, private 처리.<br>
	 * CBConfig.log.error 를 참조하여 TRUE일 경우에만 로그로 기록한다.<br>
	 * 
	 * 
	 * @public
	 * @see config.xml
	 * @arguments 
	 * @returns
	 * @example <code>
	 * CBMsg.error(cb.locMessage("code", "error message"));
	 * CBMsg.error( e ); // exception 객체 출력 시
	 * CBMsg.error( -2100 ); // 메시지코드를 통한 메시지 출력 시
	 * CBMsg.error( -2102, {COLUMN_NAME : '지역'}); // 메시지 코드를 통한 메시지 출력에서 내용 변경하기
	 * </code>
	 * @returns
	 */
	this.error = function () {
		var msg = corebase.parseArgs(arguments);
		window.alert ( msg);
		CBLogger.error( msg );
		return msg;
	};
    
	this.info = function() {
		var msg = corebase.parseArgs(arguments);
		window.alert ( msg);
		CBLogger.error( msg );
		return msg;
	};
    
	/**
	 * 조회 오류 메시지
	 */
	this.errsch = function () {
		var msg = corebase.parseArgs(arguments)
		  , errmsg = cb.locMessage("msg.343", "An error occurred when inquiring.");
		errmsg = msg.length > 0 ? msg + '\r\n' + errmsg : errmsg;
		CBMsg.error(errmsg);
	};
	
	/**
	 * 조회 데이터건이 없을시
	 */
	this.nodata = function () {
		var msg = corebase.parseArgs(arguments)
		  , errmsg = cb.locMessage("msg.341", "No data was found.");
		errmsg = msg.length > 0 ? msg + '\r\n' + errmsg : errmsg;
		CBMsg.error(errmsg);
	};
	
	/**
	 * 저장 오류시
	 */
	this.errsav = function () {
		var msg = corebase.parseArgs(arguments)
		  , errmsg = cb.locMessage("msg.308", "Error occurred when saving.");
		errmsg = msg.length > 0 ? msg + '\r\n' + errmsg : errmsg;
		CBMsg.error(errmsg);
	};

	/**
	 * 삭제 오류시
	 */
	this.errdel = function () {
		var msg = corebase.parseArgs(arguments)
		 , errmsg = cb.locMessage("msg.169", "An error occurred when deleting.");
		errmsg = msg.length > 0 ? msg + '\r\n' + errmsg : errmsg;
		CBMsg.error(errmsg);
	};
	
	/**
	 * 조회 오류시
	 */
	this.errqry = function () {
		var msg = corebase.parseArgs(arguments)
		  , errmsg = cb.locMessage("msg.368", "Error occurred during processing.");
		errmsg = msg.length > 0 ? msg + '\r\n' + errmsg : errmsg;
		CBMsg.error(errmsg);
	};

	this.message = function() {
		return corebase.parseArgs(arguments);
	};
};







/**
 * 로그를 기록한다.
 * 
 * @see CBConfig.log
 * @class
 */
function CoreBaseLogger (context) {
    
	this.context = (context || location.pathname); 
	this.classId = "corebase.Logger";
	
	this.debug = function () {
		return writeLog (corebase.parseArgs ( arguments), "log", this.context);
	};
	
	this.info = function () {
		return writeLog (corebase.parseArgs ( arguments), "info", this.context);
	};
	
	this.error = function () {
		return writeLog (corebase.parseArgs ( arguments), "error", this.context);
	};
	
	this.warn = function () {
		return writeLog (corebase.parseArgs ( arguments), "warn", this.context);
	};
	
	this.isDebugEnabled = function () {
		return chkLevel("log", this.context);
	};
	
	this.isInfoEnabled = function () {
		return chkLevel("info", this.context);
	};
	
	this.isErrorEnabled = function () {
		return chkLevel("error", this.context);
	};
	
	this.isWarnEnabled = function () {
		return chkLevel("warn", this.context);
	};
    
	var logModes  = {}; 
	var logLevels = {};
	
	// 로그형식 (파일, 콘솔)을 반환한다.
	function getMode (context) {
	    
		var logMode = logModes [context];
		
		if (typeof (logMode) == "undefined") {
            
			if ( typeof (CBConfig.logger) == "undefined"|| typeof (CBConfig.logger[ context ]) == "undefined") {
				logMode = false;
			    
			} else {
				logMode = CBConfig.logger[ context ].mode;
			}
			logModes[context] = logMode;
		}
        
		return logMode;
	}
    
	// 로그를 기록한다.
	function writeLog(logString, CBLogger, context) {
        
		var basePath = "";
		
		if (basePath == "") {
			if (typeof (CBConfig.logger) == "undefined") {
				basePath = "C:\\PrimeWare\\";
			} else {
				basePath = CBConfig.logger.defaultWriteLogPath || "C:\\PrimeWare\\";
			}
		}
        
		var datepath = corebase.toTimeString ( new Date() );
		var headStr =  corebase.getFullDateString ( new Date(), "ms");
		
		var mode = getMode ();

		if (mode == "file") {

			var yyyymmdd = datepath.substr(0,8);
			
			var path = basePath + yyyymmdd+"\\"+ mode;
			
			var dir = path.substr(0,path.lastIndexOf("\\"));
			
			var filename = path.substr(path.lastIndexOf("\\"));
			if (filename.length > 0 && filename.substr(0,1) == "\\")
				filename = filename.substr(1);
			
			if (filename == "")
				filename = dir + "\\\\" + yyyymmdd + ".log";
			else if (filename.lastIndexOf(".") >= 0)
				filename = dir + "\\\\" + filename.substr(0,filename.lastIndexOf(".")) + yyyymmdd + filename.substr(filename.lastIndexOf("."));
			else{
			    dir = dir + "\\\\" + filename + "\\\\";
			    filename = dir + "\\\\" + yyyymmdd + ".log";
			};

		} else if (mode == "console") {
		    
		} else {
		    
		}
        
		if (typeof(console) != "undefined" && console != null) {
			if (typeof(console[CBLogger]) != "undefined") {
			console[CBLogger] (headStr + " [" + context + "]" + logString);
			
			} else {
				console.log (headStr + " [" + context + "|" + CBLogger+ "]" + logString);
			}
		}
        
		return logString;
	};

	// 로그레벨을 반환한다.
	function chkLevel (level, context) {
		var final_loglevel = ["log", "info", "warn", "error"];
		var logLevel = logLevels [level];

		if (typeof (logLevel) == "undefined") {

			if (typeof(CBConfig.logger[ context ]) == "undefined") {
				logLevels [level] = false;
			    return false;
			}
	        
			var idx = $.inArray(level, final_loglevel);
			if (idx == -1) {
				logLevel = false;
			} else {
				logLevel = idx >= $.inArray(CBConfig.logger[ context ].level.toLowerCase(), final_loglevel);
			}
			logLevels[level] = logLevel;
		}
		return logLevel;
	}
};    

;
(function() {
    
    /**
     * instance에서 상위객체를 확인하면서 대상 객체를 반환한다.
     * 
     * @param {String} root
     * @returns
     */
    function scanRoot (root) {
        try {
            if (CB.nemp ( parent[root])) {
                return parent[root];
            }
    
            // mdi로 호출한 경우
            if (CB.nemp (window.top[root])) {
                return window.top[root];
            }
    
            // 대화상자로 호출한 경우, api를 정상으로 호출하면, 발생할 수 없는 항목 (parent = frame template)
            /*
            if (CB.nemp (parent.dialogArguments) && CB.nemp (parent.dialogArguments[root])) {
                return parent.dialogArguments[root];
            }
            */
            
            // prime.portal 함수를 정상으로 사용하여 popup한 경우
            if (CB.nemp (parent.opener) && CB.nemp (parent.opener[root])) {
                return parent.opener[root];
            }

            // window.open으로 호출한 경우, api를 정상으로 호출하면, 발생할 수 없는 항목. (parent = frame template)
            if (CB.nemp (window.opener) && CB.nemp(window.opener[root])) {
                return window.opener[root];
            }
            
        } catch(e) {
            return {isError:true};
        }

        return {isError:true};
        
    };
    
    
    
    /******************************************************************************
     * corebase core 
     ******************************************************************************/
    
    /**
     * emp내장함수
     * 
     * @param  args - 확인대상 배열
     * @returns {Boolean} null or undefined 여부 
     */
    function emp_1_2(obj) {
        if (obj == null || typeof (obj) == "undefined" ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * emp내장함수
     * 
     * @param {Array} args - 확인대상 배열
     * @returns {Boolean} null or undefined 여부 
     */
    function emp_1(args) {
        if (args.length == 0 ) {
            return true;
        }

        for( var i = 0; i < args.length; i++ ) {
            if (emp_1_2(args[i]) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * 전달받는 parameter가 null, undefined, 인 경우인지 확인하여 결과를 반환한다. parameter로 전달된 정보
     * 중 하나라도 true이면 true이다.
     * 
     * @see _emp
     * @param {...} -
     *        복수의 parameter를 수신할 수 있음
     * @returns {Boolean} - null or undefined
     */
    function isEmpty() {
        return emp_1(arguments);
    }

    /**
     * 전달받는 parameter가 null, undefined 가 아닌지 확인하여 결과를 반환한다. parameter로 전달된 정보가
     * 모두 true일 경우 true이면 true이다.
     * 
     * @see _emp
     * @param {...} -
     *        복수의 parameter를 수신할 수 있음
     * @returns {boolean} - !null & !undefined
     */
    function isNotEmpty() {
        return !emp_1(arguments);
    }

    /**
     * 전달받은 parameter를 배열로 변경한다.
     * 
     * @param {Iterator} -
     *        배열로 변환할 정보
     * @returns {Array}
     */
    function makeArray(iterable) {
        if (!iterable )
            return [];
        var results = [];
        for( var i = 0, length = iterable.length; i < length; i++ ) {
            results.push(iterable[i]);
        }
        return results;
    }
    ;

    // ----------------------------------------------------------------------
    // prototype함수 지정 
    // ----------------------------------------------------------------------
    ;
    (function() {

        // 확장된 브라우져에서는 bind를 포함하고 있으므로, 구현할 필요없다.
        if (typeof (Function.prototype.bind) == "undefined") {

            Function.prototype.bind = function() {
                var method = this;
                var args = makeArray(arguments);
                var object = args.shift();

                return function() {
                    return method.apply(object, args.concat(makeArray(arguments)));
                };
            };
        }
    })();

    /**
     * 병렬실행을 위한 callback setTimeout함수를 통해 통시실행이 가능하도록 구성한 함수
     * 
     * @param {Function}
     *        callback - 동시에 실행될 함수
     * @returns {void}
     */
    function ppp(callback) {
        window.setTimeout(function() {
            callback();
        }, 0);
    }

    /**
     * 오늘날짜를 반환한다. 실제 실행프로젝트에서는 오버라이드하여 데이터베이스 시간을 조회하도록 수정한다.
     * 
     * @returns {String} - 오늘날짜 8자리
     */
    function today() {
        return CBDate.toTimeString().substring(0, 8);
    }
    
    function todayYM() {
        return CBDate.toTimeString().substring(0, 6);
    }
    
    function todayY() {
        return CBDate.toTimeString().substring(0, 4);
    }
    
    function todayFull() {
        return CBDate.toTimeString();
    }

    function dateformat(type) {
    	
    	if (type == "today") {
    		return window.kendo.cultures.current.calendar.patterns.d;
    	} else if (type == "todayym") {
    		return window.kendo.cultures.current.calendar.patterns.y;
        	/*var locale = window.kendo.cultures.current.name.substring(0, 3);
        	var df = "yyyy-MM";
        	if (locale == "ko-") {
        		df = "yyyy-MM";
    		} else if (locale == "ja-") {
    			df = "yyyy/MM";
    		} else if (locale == "zh-") { 
    			df = "yyyy/M";
    		} else if (locale == "th-") { 
    			df = "M/yyyy";
    		} else {
    			df = "MM/yyyy";
    		}
        	return df;*/
    	} else if (type == "todayy") {
    		return "yyyy";
    	} else if (type == "todayfull") {
    		return window.kendo.cultures.current.calendar.patterns.G;
    	}
    	
    	return "";
    }
    
    /**
     * 입력받은 문자열을 날짜형식으로 반환합니다.
     * 
     * @since version 4.0.0.0
     * @param {Date}
     *        date - 변환대상 날짜객체
     * @returns {String} 변환된 문자열
     * 
     */
    function toTimeString(date) {
        if (date == null || isEmpty(date) || isEmpty(date.getFullYear) ) {
            date = new Date();
        }

        var year  = date.getFullYear();
        var month = date.getMonth() + 1;
        var day   = date.getDate();
        var hour  = date.getHours();
        var min   = date.getMinutes();
        var sec   = date.getSeconds();

        return "" + year + ((month < 10) ? "0" : "") + month + ((day < 10) ? "0" : "") + day + ((hour < 10) ? "0" : "") + hour + ((min < 10) ? "0" : "") + min + ((sec < 10) ? "0" : "") + sec;
    }

    /**
     * 입력받은 날짜형식 데이터를 문자열로 전체 날짜 문자열로 반환합니다.
     * 
     * @param {Date}
     *        src (OPTIONAL) 반환받을 대상 날짜 (default new Date)
     * @param {String}
     *        mode (OPTIONAL) - 1/1000 초 포함여부
     *        <li> ms - 포함
     * @returns {String} 전체날짜열로 반환
     * @example <code>
     *   var src = new Date();
     *   var out = corebase.util.getFullDateString ( src );
     *   // out := 1974.09.20 12:41:13
     *
     *   var out = corebase.util.getFullDateString ( src );
     *   // out := 1974.09.20 12:41:13
     *   
     *   var out = corebase.util.getFullDateString ();
     *   // out := 1974.09.20 12:41:13
     *   
     *   var out = corebase.util.getFullDateString ( null, "ms");
     *   // out := 1974.09.20 12:41:13.211
     *   
     * </code>
     */
    function getFullDateString (src, mode) {
        if (!src || !src.getFullYear ) {
            src = new Date();
        }
        
        var sdate = toTimeString(src);
        if (mode != null && mode.toLowerCase() == "ms" ) {
            return sdate + src.getMilliseconds().toString();
        }
        return sdate;
    };

    
    
    /**
     * 전달받은 parameter를 디버그용 문자열로 치환하여 반환한다.
     * 
     * @param {Array} 문자열로 변경하기 위한 데이터 배열 arguments 직접 치환
     * @returns {String} stringify 된 문자열
     */
    function parseArgs(args) {

        var output = new Array();
        
        for( var i = 0; i < args.length; i++ ) {
            if (typeof (args[i]) == "object" ) {
                try {
                    output.push(JSON.stringify(args[i]));
                } catch( e ) {
                    output.push("[Error JSON.stringify] " + args[i]);
                    // throw e;
                }
            } else {
                output.push(args[i]);
            }
        }
        return output.join("\r\n");
    }

    
    
    function locMessage(code, text) {
        var message = "";

        if(isEmpty(CBLocale)) message = "" || "";
        else message = CBLocale[code] || text;
        
        return message;
    }
    
    
    function confirm(msg) {
        return window.confirm(msg);
    }
    
    

    /******************************************************************************
     * ajax 
     ******************************************************************************/

    var SINGLE_RESULT = "SINGLE_RESULT";

    /**
     * 
     */
    var ajaxstorage = {};
    
    /**
     * 서버와 통신 전 호출되는 함수
     * @param {String} trancode - ajax 고유코드
     * @param  options - 실행옵션을 가진 object 변수
     */
    function beforeStart (trancode, showProgress, PDv) {
        
//        if (PDv != false && parent != this && parent.CB && parent != top) {
//            parent.CB.beforeStart(trancode, options);
//            return;
//        }
        
        /**
         * override처리하여 메시지로 표시하거나, status처리할 수 있다.
         * @see CBMsg.out
         */

        // 옵션이 true인 경우에만 처리한다.
        // 코드 조회등의 경우에는 상태표시를 false로 처리하도록 한다.
        if (showProgress) {
            ajaxstorage[trancode] = 1;
            CBMsg.progress(true);
        }
    };

    
    function getFilename () {
        
        var href = location.pathname; 
        if (href.indexOf("\\") > -1) {
            href = href.split("\\");
            return href[href.length-1];
        } else if (href == "") {
            return "corebase";
        }
        return href;
    }
    

    CoreBaseMsg.prototype.showProgress = function (trancode) {
        trancode = trancode || getFilename();
        beforeStart (trancode, true, false);
    };

    CoreBaseMsg.prototype.hideProgress = function (trancode) {
        trancode = trancode || getFilename();
        beforeCallback (trancode, true, false);
    };

    /**
     * 서버와 통신이 완료된 후 호출되는 함수
     * @param {String} trancode - ajax 고유코드
     */
    function beforeCallback (trancode, options, PDv) {
//        if (PDv != false && parent != this && parent.CB && parent != top) {
//            parent.CB.beforeCallback(trancode, options);
//            return;
//        }
        
        if (isEmpty(ajaxstorage[trancode])) {
            return;
        }

//        ajaxstorage[trancode] = null;
        delete ajaxstorage[trancode];
        
        if (CBData.isEmpty(ajaxstorage)) {
            CBMsg.progress(false);
        }
    };
    

    /**
     * 서버에서 처리가 완료된 후 결과를 parsing하는 함수
     * 
     * corebase.parseHostResult 함수를 호출하여 customize한다.
     * @see corebase.parseHostResult
     */
    function parseResult (output, metadata) {
        
        var methods = CBConfig.methods[ metadata.method];
        
        // 모든 상황에서 에러가 발생하지 않음으로 처리한다.
        metadata.isError = false;
        
        // host 처리결과 callback 구성
        if (methods && methods.host) {
            
            // TODO @customize corebase.parseHostResult - customize 호스트처리결과
            if ($.isFunction(corebase.parseHostResult)) {
                return {level:1,text:corebase.parseHostResult (metadata) || cb.locMessage("msg.332", "Successfully processed.")};
            } else {
                return {level:2,text:cb.locMessage("msg.332", "Successfully processed.")};
            }
        }
        
        // 조회거래의 결과를 반환한 경우 : resultCount 필드가 있다.
        var resultCount = metadata.resultCount;
        if (isNotEmpty(resultCount)) {
            // 조회된 결과가 있는 경우 : 숫자가 아닌 경우 - 0과 같다.
            if (resultCount == 0) {
                return {level:7,text:cb.locMessage("msg.342", "Data is not found.")};
            }else if (resultCount > 0 ) {
            	return {level:6,text:cb.locMessage("msg.340", "Query Completed.")};
            } else {
                return {level:8,text:cb.locMessage("msg.340", "Query Completed.")}; 
            }
        }
        
        // 처리에 대한 결과를 반환한 경우 : transactionCount 필드가 있다.
        var transactionCount = metadata.transactionCount;
        if (isNotEmpty(transactionCount)) {
            // 조회된 결과가 있는 경우 : 숫자가 아닌 경우 - 0과 같다.
            if (transactionCount == 0) {
                return {level:4,text:cb.locMessage("msg.369", "No results processed.")};
            }else if (transactionCount > 0 ) {
                //return {level:3,text:"정상적으로 처리되었습니다. [" + transactionCount +"]"}; 
            	return {level:3,text:cb.locMessage("msg.332", "Successfully processed.")};
            } else {
                return {level:5,text:cb.locMessage("msg.332", "Successfully processed.")};
            }
        }
        return {leve:9, text:""};
    }
    
    
    /**
     * 서버로 전송할 독립객체를 생성하여 반환한다.
     * 
     * @param {String} method - 서버에서 실행할 함수명
     * @param {String} statement - 서버가 실행할 모듈명
     * @param {Object} source - 서버로 전송할 데이터
     * @param {Object} header - 서버로 전송할 부가정보
     * @returns
     */
    function makeInput (method, statement, source, header, mapper) {
        return {
            // 서버에서 실행하는 실제 method는 method object의 name을 사용한다.
            "classId"   : "CBAgent",
            "method"    : method,
            "mapper"    : mapper,
            "statement" : statement,
            "source"    : source || {},
            "header"    : header || {}
        };
    };

    function processDetail(detail) {
        if (detail instanceof Array) {
            detail = detail.join("\n");
        }
        
        return detail;
    }
	    
    /**
     * input정보를 배열로 변환하여 resultname 명칭을 포함하여 set을 생성합니다.
     * server에서는 각각의 resultname 단위의 statement와 source를 통해 실행되므로, 각 단위에 맞도록 형식을 변환한다.
     * 거래의 수가 2건이상이며, 처리 거래 (insert, update, delete)가 포함된 경우 trasaction action을 사용한다.
     * 
     * @see CBConfig.methods
     * @param inputs
     * @param data
     * @param method
     * @param statement
     * @param header
     * @returns 합계하여 transaction여부를 결정한다.
     */
    function createInput(inputs, data, method, statement, header) {
        if (isEmpty (data)) {
            data = {};
        }

        // ---------------------------------------------------------------------
        // 데이터가 makeInput을 통해 생성된 경우
        // : 단일 거래에서는 trasaction을 사용하지 않는다.
        // ---------------------------------------------------------------------
        if (isNotEmpty (data.classId)) {
            data.resultname  = SINGLE_RESULT;
            data.transaction = false;
            inputs.push(data);
            return 0;
        }

        // ---------------------------------------------------------------------
        // 복수의 데이터를 전달하는 경우에는 항목을 makeInput으로 구성한다.
        // : transaction 여부를 결정한다.
        // ---------------------------------------------------------------------
        var transactionCount = 0;
        
        // temp input
        var tinput = null;
        var source = null;
        var mapper = null;
        
        // 다건 거래시 resultname 사전순으로 거래 순서 정렬
        // (object key로는 순서 보장이 되지않아 key 사전순으로 순서를 정함)
        var resultnames = Object.keys(data);
//        resultnames.sort();
        for (var i = 0, length = resultnames.length; i < length; i++) {
        //for (var resultname in data) {
            var resultname = resultnames[i];
            tinput = data [resultname];
            
            source = tinput.source;

            // 전달받으 정보에 classId가 없을 경우 : makeInput이 아닌 경우
            if ( isNotEmpty (tinput.classId)) {
                method    = tinput.method    || method;
                if (typeof(CBConfig.methods [ method ])=="undefined") {
                    return {isError:true, errorMessage: "(" + method + ")" + cb.locMessage("msg.390", "This function is not supported by the COREBASE.") + "\r\n" + cb.locMessage("msg.448", "Check the environment configuration file(config.js).")};
                }
                statement = tinput.statement || statement || tinput[method];
                
                var omethod = parseMethod (method);
                // host로 전송하는 거래에만 header를 사용한다.
                if (omethod.host) {
                    
                    if (CB.nemp(data.header)) {
                        header = data.header;
                    } else {
                        header = $.extend({}, tinput.header, header);
                        if ($.isFunction(CB.getHostHeader)) {
                            // 일괄로 한꺼번에 실행되는 경우 
                            header = CB.getHostHeader ( header);
                        }
                    }
                }
                else if (tinput.header) {
                    header = tinput.header;
                }
                // host로 전송하는 경우가 아니라면, header를 전송하지 않는다.
                else {
                    header = null;
                }
                
                // 전송정보가 배열인 경우 : extend하지 않고 slice하여 memory누수를 막는다.
                // TODO object를 직접 점유하는 경우 memory 반환이 느리다.
                if ($.isArray(source)) {
                    source = source.slice(0);
                }
                
                // 전송정보가 배열이 아닌 경우 : extend하여 memory 누수를 막는다.
                else {
                    // 전송할 정보를 생성한다.
                    source = getSource(source);
                    if (source.isError) {
                        return source;
                    }
                    source = source || tinput;
                }

                delete tinput.method;
                delete tinput.statement;
                delete tinput.source;
                

            	if (header && header.exportParam) {
            		var exportParam = header.exportParam,
        	    		target = exportParam.target,
        	            cbSpread = target,
        	            spread = target.getSpread(),
        	            sortOrder = cbSpread.sortOrder(),
        	            headers = cbSpread.getHeaders();
            		
            		exportParam.title = gfn_getValidFileName(exportParam.title);
            		exportParam.fileName = gfn_getValidFileName(exportParam.fileName);
            		exportParam.detail = processDetail(exportParam.detail);
            		exportParam.headers = headers;
            		
            		delete exportParam.target;
            		
            		source.SORT_ORDER = sortOrder;
            	}

            	mapper = tinput.mapper || omethod.mapper || CBConfig.mapper.defaultMapper;
            	
                tinput = makeInput ( method, statement, source, header, mapper);
                transactionCount += (CBConfig.methods [ method ].tran || 0);
            }
            tinput["resultname"] = resultname;
            inputs.push(tinput);
        }
        
        return transactionCount;
    }
     
    
    var agents = {};
    
    agents.agent = {
    	success: function (options, response) {
    		// ---------------------------------------------------------------------
            // 전체 거래에 대한 오류처리 : 서버접속장애 등에 대한 처리
            // ---------------------------------------------------------------------
            if (isEmpty (response.head)) {
            	var msg = cb.locMessage("msg.196", "The specified message has not been sent to the server.") + "\r\n" +  cb.locMessage("msg.198", "Check the server's running status.");
                CBMsg.error(msg);
                return;
            }

            // 시스템에서 발생한 중요한 장애에 대한 오류처리
            if (response.head.responseLevel == "ERROR") {

            	// session에 대하 오류처리
            	if (response.head.responseTitle == "SESSION_001") {

                    if (!GV_TOP.PriKernel.isLogin) {
                        return;
                    }
                    
                    GV_TOP.PriKernel.isLogin = false;
                    
                    CBMsg.error(cb.locMessage("msg.101", "Logged out."));
                    
                    //GV_TOP.location.reload();
                    
                    if (true) {
                    	GV_TOP.window.close();
            		}
            		
            		var location = GV_TOP.window.location.href;
            		GV_TOP.window.location.href = location.split("?")[0];
                    
                    //return corebase.sessionExpire(response.head);
                    return;
                }
                
                var message = cb.locMessage("msg.367", "Failure occurred during processing.") + "\r\n" + cb.locMessage("msg.300", "Please run again after a while.") + "\r\n" + cb.locMessage("msg.128", "If the problem recurs, contact your administrator.");
                return CBMsg.error(getRespTimeFromLocale(response.head.responseTime), message, response.head.responseTitle);// , response.head.responseDetail);
            }

            var result   = null;
            var metadata = null;

            
            // ---------------------------------------------------------------------
            // 각 단위에 대한 오류처리
            // ---------------------------------------------------------------------
            // 조회된 정보가 단건이 경우 처리
            if (response.head.responseCount == 1) {
                
                // 단건의 경우 이름이 고정되어 있다.
                if (CB.emp(response.output[SINGLE_RESULT])) {
                    var id = (function () {
                        for(var id in response.output) {
                            return id;
                        }
                    })();
                    
                    metadata  = {};
                    result    = {};
                    
                    // output에서 결과항목을 반환하여 metadata를 구성한다.
                    metadata[id] = response.output[id].metadata;
                    result[id] = response.output[id];
                } else {
                    
                    result   = response.output[SINGLE_RESULT];
                    
                    // output에서 결과항목을 반환하여 metadata를 구성한다.
                    metadata = result.metadata;
                    
                    // 반환값 설정
                    result   = result.result;
                    
                    if (options.wait) {
                        CBMsg.out (getRespTimeFromLocale(response.head.responseTime), parseResult (result, metadata).text);
                    }
                }
            }
            
            // 조회가 복합건으로 전달된 경우에 처리
            else {

                metadata  = {};
                result    = {};

                var output    = null;
//                var messageo  = {};
//                var messages  = [];

                var hmessage  = {level:10,text:""};
                for(var id in response.output) {
                    output = response.output[id];
                    
                    var message = parseResult (output, output.metadata);
                    
                    // 동일한 메시지가 있을 경우에는 표시하지 않는다.
                    if (message.level < hmessage.level) {
                        hmessage = message;            
                    }
                    
                    metadata[id] = output.metadata;
                    if ($.isArray(output.result)) {
                        result[id] = output.result.slice(0);
                    } else {
                        result[id] = output.result;
                    }
//                    output.result = null;
                }
                
                if (options.wait) {
                    CBMsg.out (getRespTimeFromLocale(response.head.responseTime), hmessage.text);
                }
            }

            /**
             * 모든거래에 대하여 callback을 호출한다.
             * 오류/비오류 상황에 모두 callback을 호출하도록 한다.
             */
            // @customize corebase.fireAfter - 처리가 완료된 후 콜백전 처리
            if ($.isFunction(corebase.fireAfter)) {
                if (corebase.fireAfter (options, result, metadata)) {
                    return;
                };
            }
            
            /**
             * 모든거래에 대하여 callback을 호출한다.
             * 오류/비오류 상황에 모두 callback을 호출하도록 한다.
             */

            if ($.isFunction(options.success)) {
                options.success (result, metadata);    
            }
//            result = null;
//            metadata = null;
    	},
    	
    	error: function (options, response) {
    		
    		var msgSvrErr = cb.locMessage("msg.197", "Failure occurred while communicating with the server.");
        	var msgSvrDown = cb.locMessage("msg.194", "Server shutdown or network error.");
        	var msgRetry = cb.locMessage("msg.300", "Please run again after a while.");
        	var msgRespCode = cb.locMessage("txt.1179", "Response Code");
        	var msgCallAdmin = cb.locMessage("msg.128", "If the problem recurs, contact your administrator.");
        	
            // bad request는 무시한다.
            if (response.status == "400" ) {
                try {
                    var string = getFullDateString (new Date(), "ms") + " " + cb.locMessage("txt.988", "Check Server Error") + " : " + CBLogger.debug(response ) + "\r\n";
                    
                    //CBExtUtil.write("c:\\Hfcd_" + today() + "_" + GV_PGM.PGM_ID+".log", string, "append");
                    try {
                        //CBExtUtil.write("c:\\Hfcd_" + today() + "_" + GV_PGM.PGM_ID+".log", escape(CBLogger.debug(options))+"\r\n", "append");
                    } catch(e) {
                    }
                } catch(e) {
                }
                
                if (isNaN (options.errorRetry)) {
                    options.errorRetry = 0;
                }
                
                if (options.errorRetry <= 5 ) {
                    options.errorRetry++;
                    window.setTimeout( function () {
                        ajax(options, callback);
                    }, 100);
                } else {
                    CBMsg.error(msgSvrErr + "\r\n" + msgSvrDown + "\r\n" + msgRetry + "\r\n\r\n" + msgRespCode + "["+response.status+"] " + response.statusText);
                }
                return;
            }
            
            if ($.isFunction(options.error)) {
                options.error(response);
            } else {
            	
//            	console.log("commonError 1095");
            	
            	if (response.status == 0) {
            		// 속도문제로 인한 오류는 예외
            		//CBMsg.error(msgSvrErr + "\r\n" + msgSvrDown + "\r\n" + msgRetry + "\r\n\r\n" + msgRespCode + "["+response.status+"] " + response.statusText);
            	}
            	else {
            		CBMsg.error(msgSvrErr + "\r\n" + msgSvrDown + "\r\n" + msgCallAdmin + "\r\n\r\n" + msgRespCode + "["+response.status+"] " + response.statusText);
            	}
            	
                try {
                    var string = getFullDateString (new Date(), "ms") + " " + cb.locMessage("txt.988", "Check Server Error") + " : "+ CBLogger.debug(response ) + "\r\n";
                } catch(e) {
                    throw e;
                }
            }
            
            CBLogger.debug(cb.locMessage("txt.988", "Check Server Error") + " : ", response );
    	},
    	
    	complete: function (options, response) {
    		beforeCallback(options.trancode, options.wait , options.PDv );
    	},
    	
    	transfer: function (options, head, input, success, error, complete) {
    		
    		
    		return $.ajax({
                type     : options.type || "POST",
                url      : options.actionUrl,
                cache    : false,
                data     : JSON.stringify({ "head":head, "input":input }),
                async    : options.async,
                contentType:"application/json; charset=utf-8",
                dataType : "json",
                success  : success,
                error    : error,
                complete : complete
            });
    	}
    };
    
    agents.download = {
    	success: function(options, response, status, xhr) {
    		var filename = "";
	        var disposition = xhr.getResponseHeader('Content-Disposition');
	        
	        // 2018.10.26 김상휘 '|| disposition.indexOf('inline') !== -1)' 부분 추가.
	        if (disposition && (disposition.indexOf('attachment') !== -1 || disposition.indexOf('inline') !== -1)) {
	            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	            var matches = filenameRegex.exec(disposition);
	            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
	        }
	        var type = xhr.getResponseHeader('Content-Type');

	        var blob = typeof File === 'function'
	            ? new File([response], filename, { type: type })
	            : new Blob([response], { type: type });
	            
	        // 2018.10.26 김상휘  '&& disposition.indexOf('attachment') !== -1)' 부분 추가
	        if (typeof window.navigator.msSaveBlob !== 'undefined' && disposition.indexOf('attachment') !== -1) {
	            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
	            window.navigator.msSaveBlob(blob, filename);
	        } else {
	            var URL = window.URL || window.webkitURL;
	            var downloadUrl = URL.createObjectURL(blob);

	            // 2018.10.26 김상휘 원래는 if (filename) 이었으나 if (disposition.indexOf('attachment') !== -1)로 변경
	            if (disposition.indexOf('attachment') !== -1) {
	                // use HTML5 a[download] attribute to specify filename
	                var a = document.createElement("a");
	                // safari doesn't support this yet
	                if (typeof a.download === 'undefined') {
	                    window.location = downloadUrl;
	                } else {
	                    a.href = downloadUrl;
	                    a.download = filename;
	                    document.body.appendChild(a);
	                    a.click();
	                }               
	                
	            // 2018.10.26 김상휘 JaperReport를 PDF.JS 랜더링 할 수 있도록 추가                
	            } else if ($("#pdf_viewer").length) {		            
	            	// send pdf data to pdf_viewer as buffer, not url
	            	var pdfjsframe = document.getElementById('pdf_viewer');
	            	pdfjsframe.contentWindow.PDFViewerApplication.setTitleUsingUrl('/'+filename);
	            	pdfjsframe.contentWindow.PDFViewerApplication.open(response);            		
            	} else {
	                window.location = downloadUrl;     
	            }
	            
	            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 10); // cleanup
	        }
    	},
    	
    	transfer: function(options, head, input, success, error, complete) {
    		var xhr = new XMLHttpRequest();
    		xhr.open(options.type || "POST", options.actionUrl, true);
    		xhr.responseType = "arraybuffer";
    		xhr.onload = function () {
    			var contentType = this.getResponseHeader('Content-Type');
    		    if (this.status === 200 && contentType.indexOf("application/json") === -1) {
    		    	success(this.response, this.status, xhr);
    		    } else {
    		    	error(this);
    		    }
    		    
    		    complete(this);
    		};
    		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    		xhr.send(JSON.stringify({ "head":head, "input":input }));
    		return;
    		$.fileDownload(options.actionUrl, {
            	httpMethod: "POST",
        		data: JSON.stringify({ "head":head, "input":input }),
        		successCallback: function(url) {
                	success(url);
                	complete(url);
                },
                failCallback: function(url) {
                	console.log(arguments);
                	error(url);
                	complete(url);
                }
            });
    	}
    };
    
    agents.print = {
        	success: function(options, response, status, xhr) {
        		if (response && response.head) {
        			// 전문 에러 처리
        			var message = cb.locMessage("msg.367", "Failure occurred during processing.") + "\r\n" + cb.locMessage("msg.300", "Please run again after a while.") + "\r\n" + cb.locMessage("msg.128", "If the problem recurs, contact your administrator.");
                    return CBMsg.error(getRespTimeFromLocale(response.head.responseTime), message, response.head.responseTitle);// , response.head.responseDetail);
        		}
        	},
        	transfer: function(options, head, input, success, error, complete) {
        		return $.ajax({
                    type     : options.type || "POST",
                    url      : options.actionUrl,
                    cache    : false,
                    data     : JSON.stringify({ "head":head, "input":input }),
                    async    : true,
                    contentType : "application/json; charset=utf-8",
                    //dataType : "json",
                    success  : success,
                    error    : error,
                    complete : complete
                });
        	}
        };
    
    agents.downloadshow = {
    	success: function(options, response, status, xhr) {
    		var filename = "";
	        var disposition = xhr.getResponseHeader('Content-Disposition');
	        if (disposition && disposition.indexOf('attachment') !== -1) {
	            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	            var matches = filenameRegex.exec(disposition);
	            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
	        }
	        var type = xhr.getResponseHeader('Content-Type');

	        var blob = typeof File === 'function'
	            ? new File([response], filename, { type: type })
	            : new Blob([response], { type: type });
	        if (typeof window.navigator.msSaveBlob !== 'undefined') {
	            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
	            window.navigator.msSaveBlob(blob, filename);
	        } else {
	            var URL = window.URL || window.webkitURL;
	            var downloadUrl = URL.createObjectURL(blob);

	            // 팝업화면을 열어 다운로드 받은 파일을 바로 보여줌.
	            window.open(downloadUrl, filename,  "width=700, height=800, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );

	            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
	        }
    	},
    	
    	transfer: function(options, head, input, success, error, complete) {
    		var xhr = new XMLHttpRequest();
    		xhr.open(options.type || "POST", options.actionUrl, true);
    		xhr.responseType = "arraybuffer";
    		xhr.onload = function () {
    			var contentType = this.getResponseHeader('Content-Type');
    		    if (this.status === 200 && contentType.indexOf("application/json") === -1) {
    		    	success(this.response, this.status, xhr);
    		    } else {
    		    	error(this);
    		    }
    		    
    		    complete(this);
    		};
    		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    		xhr.send(JSON.stringify({ "head":head, "input":input }));
    		return;
    		$.fileDownload(options.actionUrl, {
            	httpMethod: "POST",
        		data: JSON.stringify({ "head":head, "input":input }),
        		successCallback: function(url) {
                	success(url);
                	complete(url);
                },
                failCallback: function(url) {
                	console.log(arguments);
                	error(url);
                	complete(url);
                }
            });
    	}
    };

    /**
     * 대상서버와 통신합니다.
     * 
     * @param  options - 서버로 전송할 정보
     * <ul>
     * <li> options.methos - 서버에서 실행할 함수명
     * <li> options.statement - 서버가 실행할 statemt (database에서는 ibatis id, host에서는 전문id)
     * <li> options.source - 서버로 전송할 데이터
     * <li> options.data - 복합거래일 경우 input의 배열이 전달된다. (@see makeInput)
     * <li> options.callback - 서버에서 처리되고 난 결과 콜백.
     * 함수의 callback parameter 대신 사용하는 경우에 options에 설정하여 호출합니다.  
     * </ul>
     * @param {Function} callback - 전송 후 처리할 callback 함수
     * parameter로 output, metadata 를 반환합니다.<br>
     * output에는 서버로 호출하고 난 결과 (select 일 경우 result) 가 반환됩니다.<br>
     * metadata에는 쿼리의 부가정보가 반환됩니다.<br>
     * 
     * <ul>
     * <li> select, selectList - metadata.resultCount : 조회건수
     * <li> update, delete - metadata.updateCount : 처리건수 반환
     * <li> host - customize
     * </ul>
     * 
     * <code>
     
     var options = {};
     
     options.method = "selectList";
     options.statement = "COMM.selectCommonCode";
     options.source    = {LRG_CD:"A00001"};

     corebase.ajax (options, function (output, metadata) {
     
     });
     * </code>
     */
    function ajax (options, callback) {
        
        if (CB.emp(options)) {
        	var msg = cb.locMessage("msg.429", "Required item not sent.") + "\r\n" + cb.locMessage("msg.297", "Invalid use.") + "\r\n"; 
            CBMsg.error(msg, "corebase.ajax(options, callback);");
            return;
        }
        /***********************************************************************************
         * 서버와 통신을 실행한다.
         * option으로 전달된 정보가 requestDelegate에서 수신한 파일이 아니라면
         * requestDelegate에서 전달받는 경우에는 _request가 true이다.
         * 데이터소스의 완성, method정립, statement의 정립 후 ajax을 실행하도록 한다.
         ***********************************************************************************/
        if (!options._request) {
            if ($.inArray( $.type(options.source), ["string", "object"]) > -1) {
                return requestDelegate (options, options.method, options.statement, callback);
            }
        }

        
        options.wait = isEmpty(options.wait)? true : typeof(options.wait) == "boolean"? options.wait : options.wait != "false";


        /**
         * 현재 ajax의 갯수 증가를 위하여 사용한다.
         */
        corebase.ajaxcount = isNaN(corebase.ajaxcount)? 1 : corebase.ajaxcount++;
        
        
        // 전체 거래를 분류하는 기본 단위의 거래코드
        options.trancode = toTimeString () + (corebase.ajaxcount);
        
        // ---------------------------------------------------------------------
        // callback 지정
        // ---------------------------------------------------------------------
        options.callback = $.isFunction(callback)? callback : options.callback;
        var dataType   = options.dataType || "json";
        var method     = options.method;
        var data       = new Array();
        
        // ---------------------------------------------------------------------
        // 트랜젝션에서 사용하는 공통 데이터 ()
        // ---------------------------------------------------------------------

        if (CB.nemp(options.data.source)) {
            $.extend(options.data.source , GV_TRAN);
            if ($.isArray(options.data.source )) {
                for(var i = 0 ; i < options.data.source.length; i++) {
                    $.extend(options.data.source[i] , GV_TRAN);
                }
            }
        }else{
            var rstData = options.data;
            for (var key in rstData) {
                if (CB.nemp(eval("options.data." + key).source)) {
                            $.extend(eval("options.data." + key).source , GV_TRAN);
                    if ($.isArray(eval("options.data." + key).source)) {
                        for(var i = 0 ; i < eval("options.data." + key).source.length; i++) {
                            $.extend(eval("options.data." + key).source[i] , GV_TRAN);
                        }
                    }
                }
            }
        }
        
        //CBMsg.debug(options.data);

    
        // ---------------------------------------------------------------------
        // transaction c o u n t 를 확인한다.
        // 서버의 위치와 처리방법을 분기한다.
        // ---------------------------------------------------------------------
        var tranCount  = createInput(data, options.data || {}, method, options.statement, options.header);
        if (tranCount.isError ) {
//            CBMsg.error(cb.locMessage("msg.226", "Send information is invalid.") + "\r\n", tranCount.errorMessage);            
            CBMsg.error(tranCount.errorMessage);
            return;
        }
        if (data.length <= 0) {
            CBMsg.error(cb.locMessage("msg.320", "Information is incorrect or unsupported.") + "\r\n" + cb.locMessage("msg.82", "Please check again."), options);
            return null; 
        }

        // ---------------------------------------------------------------------
        // method정보를 통해서 서버를 분기하도록 한다.
        // ---------------------------------------------------------------------
        var methodInfo = CBConfig.methods [ method ] || {};
        
        var action  = CBConfig.actions [methodInfo.action || CBConfig.actions.initial];
        
        var agent = agents[methodInfo.agent || "agent"] || {};
        var commonAgent = agents.agent;
        
        var success = agent.success || commonAgent.success;
        var error = agent.error || commonAgent.error;
        var complete = agent.complete || commonAgent.complete;
        var transfer = agent.transfer || commonAgent.transfer;
        
        // ---------------------------------------------------------------------
        // 서버의 url완성
        // transaction의 수가 1개 이상인 경우 transaction url을 사용하도록 한다. 
        // ---------------------------------------------------------------------
        if (tranCount > 1) {
            options.actionUrl = CBConfig.contextPath + action["transaction"];
        } else {
        	options.actionUrl = CBConfig.contextPath + action["action"];
        }
        
        // ---------------------------------------------------------------------
        // 콜백 지정
        // ---------------------------------------------------------------------
        ;(function (callback) {
            
            if (isEmpty (callback)) {
                return;
            }
            
            if ($.isFunction( callback)) {
                options.success = options.callback;
                return;
            }
            
            if ($.isFunction( callback.success)) {
                options.success = options.callback.success; 
            }

            if ($.isFunction( callback.error)) {
                options.error = callback.error;
            }
            
        })(options.callback);
        
        /**
         * 성공 콜백함수
         * 
         * @param response
         * @returns
         */
        function commonSuccess (response, status, xhr) {
        	success(options, response, status, xhr);
        }
        
        /**
         * 시스템에서 발생한 중요한 오류에 대한 callback 처리
         * 
         * @param response
         */
        function commonError(response) {
        	error(options, response);
        } 
        
        /**
         * 기본 콜백
         * 서버와 통신 후 반드시 발생하는 기본콜백
         * 처리완료되었음을 단위프로그램 또는 호출자에게 반환한다.
         * @param response
         */
        function commonComplete(response) {
        	complete(options, response);
        }
        
        var head = {};

        /*
        head.CLIENT_IP = CB.emp(GV_USR)? ""  : GV_USR.IP_NO;
        head.USR_ID    = CB.emp(GV_USR)? "." : GV_USR.GBL_USR_ID;
        head.EN_JUNO   = CB.emp(GV_CST)? "." : GV_CST.EN_JUNO;
        head.JUNO      = CB.emp(GV_CST) || CB.emp(GV_CST.JUNO)? "." : GV_CST.JUNO.substr(0,7);
        */
        //head = GV_USR;
        head.USR_ID      = GV_USR.USR_ID;
        head.GBL_PGM_ID  = CB.emp(GV_PGM)? location.href : GV_PGM.PGM_ID;
        head.SESSION_KEY = CB.emp(GV_USR)? "." : GV_USR.USR_ID;

        
        beforeStart (options.trancode, options.wait, options.PDv);
        
        /**
         * 2014.08.13
         * 비동기 거래 여부
         */
        if (typeof(options.async) != "boolean") {
            options.async = true;
        }
        
//        var jsonData = JSON.stringify();
        
        return transfer(options, head, data, commonSuccess, commonError, commonComplete);
    };
    
    function forward(options, callback) {

        if (CB.emp(options)) {
            CBMsg.error(cb.locMessage("msg.429", "Required item not sent.") + "\r\n" + cb.locMessage("msg.297", "Invalid use.") + "\r\n", "corebase.forward(options, callback);");
            return;
        }
        
        options.wait = isEmpty(options.wait)? true : typeof(options.wait) == "boolean"? options.wait : options.wait != "false";
        
        /**
         * 현재 ajax의 갯수 증가를 위하여 사용한다.
         */
        corebase.ajaxcount = isNaN(corebase.ajaxcount)? 1 : corebase.ajaxcount++;
        
        
        // 전체 거래를 분류하는 기본 단위의 거래코드
        var trancode = toTimeString () + (corebase.ajaxcount);
        
        
        /**
         * 기본 콜백
         * 서버와 통신 후 반드시 발생하는 기본콜백
         * 처리완료되었음을 단위프로그램 또는 호출자에게 반환한다.
         * @param response
         */
        function commonComplete() {
            beforeCallback(trancode, options.wait , options.PDv );
        }
        
        /**
         * 시스템에서 발생한 중요한 오류에 대한 callback 처리
         * 
         * @param response
         */
        function commonError(response) {
        	console.log("commonError 1434");

        	var msgSvrErr = cb.locMessage("msg.197", "Failure occurred while communicating with the server.");
        	var msgSvrDown = cb.locMessage("msg.194", "Server shutdown or network error.");
        	var msgRetry = cb.locMessage("msg.300", "Please run again after a while.");
        	var msgRespCode = cb.locMessage("txt.1179", "Response Code");
        	var msgCallAdmin = cb.locMessage("msg.128", "If the problem recurs, contact your administrator.");

        	// 속도 문제는 무시
        	if (response.status == "0") {
        		return;
        	}
            // bad request는 무시한다.
            if (response.status == "400") {
                CBMsg.error(msgSvrErr + "\r\n" + msgSvrDown + "\r\n" + msgRetry + "\r\n["+response.status+"] " + response.statusText);
                return;
            }
            
            if ($.isFunction(options.error)) {
                options.error(response);
            } else {
                CBMsg.error(msgSvrErr + "\r\n" + msgRetry + "\r\n" + msgCallAdmin);
            }
            
        } 
        
        /**
         * 성공 콜백함수
         * 
         * @param response
         * @returns
         */
        function commonSuccess (response) {
            /**
             * 모든거래에 대하여 callback을 호출한다.
             * 오류/비오류 상황에 모두 callback을 호출하도록 한다.
             */
            if ($.isFunction(options.success)) {
                options.success (response);    
            }
            
        }
        // ---------------------------------------------------------------------
        // callback 지정
        // ---------------------------------------------------------------------
        options.callback = $.isFunction(callback)? callback : options.callback;
        var dataType   = options.dataType || "json";
        var method     = options.method;
        var data       = new Array();
        
        // ---------------------------------------------------------------------
        // transaction c o u n t 를 확인한다.
        // 서버의 위치와 처리방법을 분기한다.
        // ---------------------------------------------------------------------
        var tranCount  = createInput(data, options.data || {}, method, options.statement, options.header);
        if (tranCount.isError ) {
//            CBMsg.error(cb.locMessage("msg.226", "Send information is invalid.") + "\r\n", tranCount.errorMessage);            
            CBMsg.error(tranCount.errorMessage);
            return;
        }
        if (data.length <= 0) {
            CBMsg.error(cb.locMessage("msg.320", "Information is incorrect or unsupported.") + "\r\n" + cb.locMessage("msg.82", "Please check again."), options);
            return null; 
        }

        // ---------------------------------------------------------------------
        // method정보를 통해서 서버를 분기하도록 한다.
        // ---------------------------------------------------------------------
        var methodInfo = CBConfig.methods [ method ];
        
        var actionUrl  = CBConfig.actions ['forward'];
        if (isNotEmpty(methodInfo)) {
            actionUrl  = isNotEmpty ( methodInfo.action )? CBConfig.actions [methodInfo.action] : actionUrl;// || ;
        }
        
        // ---------------------------------------------------------------------
        // 서버의 url완성
        // transaction의 수가 1개 이상인 경우 transaction url을 사용하도록 한다. 
        // ---------------------------------------------------------------------
        if (tranCount > 1) {
            actionUrl = CBConfig.contextPath + actionUrl["transaction"];
        } else {
            actionUrl = CBConfig.contextPath + actionUrl["action"];
        }
        
        // ---------------------------------------------------------------------
        // 콜백 지정
        // ---------------------------------------------------------------------
        ;(function (callback) {
            
            if (isEmpty (callback)) {
                return;
            }
            
            if ($.isFunction( callback)) {
                options.success = options.callback;
                return;
            }
            
            if ($.isFunction( callback.success)) {
                options.success = options.callback.success; 
            }

            if ($.isFunction( callback.error)) {
                options.error = callback.error;
            }
            
        })(options.callback);
        
        
        var head = {};
        head.USR_ID      = GV_USR.USR_ID;
        head.GBL_PGM_ID  = CB.emp(GV_PGM)? location.href : GV_PGM.PGM_ID;
        head.SESSION_KEY = CB.emp(GV_USR)? "." : GV_USR.USR_ID;
        
        beforeStart (trancode, options.wait, options.PDv);
        
        /**
         * 2014.08.13
         * 비동기 거래 여부
         */
        if (typeof(options.async) != "boolean") {
            options.async = true;
        }

        return $.ajax({
            type     : options.type || "POST",
            url      : actionUrl,
            cache    : false,
            //data     : Base64.encode(JSON.stringify({"head":head, "input":data})),
            data     : JSON.stringify({"head":head, "input":data, "forward":options.forward}),
            //async    : options.async || true,
            async    : options.async,
            contentType:"text/html; charset=utf-8",
            //dataType : "json",
            error    : options.error || commonError,
            success  : commonSuccess,
            complete : commonComplete
        });
    }
    
    
    /**
     * 일반함수에서 호출하여 처리되도록 연결된 함수<br>
     * select, selectList 등 ajax외에 직관적으로 사용할 수 있도록 구성된 함수에서 직접 연결합니다.<br>
     * 
     * @param  options - 전송할 정보
     * @param {String} pmethod - 서버에서 실행할 함수 servlet method
     * @param {String} statement - 서버가 실행할 statemt ibatis query id
     * @param {Function} callback - 서버에서 실행이 완료된 후 처리할 callback 함수
     * @returns
     */
    function requestDelegate (options, pmethod, statement, callback) {
        if (typeof(options) == "undefined" || options == null) {
            statement = pmethod;
            options = {};
        }
        
        // corebase.select(function () {}) 의  형식으로 호출된 경우 처리
        if ($.isFunction(options)) {
            callback = options;
            options = {};
            options.callback = callback;
            statement = pmethod;
        }
        
        // corebase.select (statement, callback) 으로 호출한 경우
        if (typeof(options) == "string" && $.isFunction(statement)) {
            
            var tstatement = options;
            var tcallback  = statement;

            statement = tstatement;
            callback  = tcallback;
            
            options = {};
        }
        
        // 전달받은 method를 분석한다.
        var omethod = parseMethod (pmethod) || parseMethod (options);
        
        if (isEmpty (omethod)) {
            options._request = true;
            return ajax(options );
        
        } else if (!omethod.agent ) {
            CBMsg.error(cb.locMessage("msg.195", "Not a function that can be sent to a server, or is not a specified function."));
            return;
        }

        options.callback = (options.callback) || ($.isFunction(pmethod)? pmethod : ($.isFunction(statement)? statement : ($.isFunction(callback)? callback : options.callback)));
        
        // 실제 메소드의 아이디를 통해 statement를 추출한다.
        statement = statement || options.statement || options [omethod.id];
        if (isEmpty (statement)) {
            CBMsg.debug(cb.locMessage("msg.199", "Service id not sent."), options );
            return;
        }
        
        var source = getSource (options);
        if (source.isError ) {
//            CBMsg.error(cb.locMessage("msg.288", "Please check input information."), source.errorMessage);
            CBMsg.error(source.errorMessage);
            return;
        }
        
        callback  = callback  || options.callback;
        
        var header = options.header;
        if (omethod.host) {
            // @customize 호스트전송전문을 가져오는 부분은 커스토마이즈한다.
            if ($.isFunction(CB.getHostHeader)) {
                header = CB.getHostHeader (options.header);
            }
        } else if (options.header) {
            header = options.header;
        } else {
            header = null;
        }

        var mapper = omethod.mapper || CBConfig.mapper.defaultMapper;

        // 20131106 init 일괄로드
        // 화면 로드를 위한 이벤트에서 호출된 경우에는 data를 반환하여 일괄처리하도록 한다.
        if (options.isInit) {
            return makeInput (omethod.name, statement, source, header, mapper);
        }
        
        return ajax ({
            // 서버에서 실행하는 실제 method는 method object의 name을 사용한다.
            "data"     : makeInput (omethod.name, statement, source, header, mapper),
            "callback" : callback,
            "_request" : true,
            "async"    : options.async,
            "method"   : omethod.id,
            "wait"     : options.wait,
            "eventdata": options
        });
    };

    
    

    /******************************************************************************
     * data option 
     * @auther data option
     ******************************************************************************/
    
    /**
     * html에 생성된 이벤트 객체를 분석하여 자동 이벤트 함수로 연결한다.
     * data-option="event:click,change, .." 의 이벤트속성을 분석한다.
     * data-click, data-change등 상세속성이 정의되어야 한다.
     * 
     * 사용할 수 있는 이벤트의 종류는 CBConfig.methods에 명세되어있다.
     * 
     * @see CBConfig.methods
     * @param {jQuery} $elem
     * @param  option
     */
    function parseEventData ($elem, option) {
//        if (CBLogger.isDebugEnabled()) {
//            CBLogger.debug("자동이벤트 연결 시작");
//        }
        
        function _ped ( ename ) {
            if (isEmpty($elem.data(ename))) {
                return;
            }

            var eoption = parseData ($elem, ename);
            
            option.ename = ename;
            
            // init에 대하여는 이벤트 실행한다.
            if (ename == "init") {
                
                var method = 'selectList';
                if (eoption.comcode) { method = 'comcode'; }
                
                fireOption ($elem, $.extend({method:method}, option , eoption), true);
                
            } else {
                
                // 실제 이벤트를 연결한다.
                // edata - trigger 로 호출하는 경우 전달된 parameter이다.
                $elem.bind(ename, function (eobj, edata) {
                    fireOption ($elem, $.extend({}, option , eoption, {called:edata, origin:$elem}));
                });

                
                // ----------------------------------------------------------------------
                // 2013.09.02 기능확장
                // eoption에 event combine이 있다면 같은 이벤트를 동시에 연결하도록 한다.
                // ----------------------------------------------------------------------
                if (isNotEmpty(eoption.ecombine)) {
                    var $ecombine = [];
                    
                    try {
                        $ecombine = $(eoption.ecombine);
                    } catch(e) {
                        CBMsg.error(cb.locMessage("msg.129", "Unable to find the controls to bind.") + "\r\n" + e, eoption.ecombine);
                        return;
                    }
                    
                    if ($ecombine.length == 0) {
                        CBMsg.error(cb.locMessage("msg.129", "Unable to find the controls to bind.") + "\r\n", eoption.ecombine);
                        return;
                    }
                    
                    option.origin = $elem;

                    // 실제 이벤트를 연결한다.
                    // edata - trigger 로 호출하는 경우 전달된 parameter이다.
                    $ecombine.bind(ename, function (eobj, edata) {
                        fireOption ($ecombine, $.extend({}, option , eoption, {called:edata, origin:$elem}));
                    });
                }
            }
        };

        // 속성이 없는 경우 종료한다.
        if (isEmpty ( option.event)) {
//            if (CBLogger.isDebugEnabled()) {
//                CBLogger.debug("자동이벤트 연결 대상 없음");
//            }
            return;
        }
        
        
        // 다중이벤트가 구성되었을 경우를 위한 분기
        var eventList = (option.event.indexOf(", ")==-1)? [option.event] : option.event.split(", ");
        for(var i=0;i<eventList.length;i++) {
            _ped (eventList[i]);
        }

//        if (CBLogger.isDebugEnabled()) {
//            CBLogger.debug("자동이벤트 연결 완료");
//        }
        
    };

    
    
    
    
    
    /**
     * fire를 재실행한다.
     * 
     * @jquery $.cbRefire
     * 
     * @param {jQuery} $elem - fire대상 element
     * @param {String} ename - 실행할 event
     * @param  option
     */
    function refire($elem, ename, option) {
        var eoption = parseData ($elem, ename);
        option = isEmpty(option)? {} : option;
        option.ename = ename;
        
        // init에 대하여는 이벤트 실행한다.
        fireOption ($elem, $.extend({}, option , eoption, {origin:$elem}));
    };
    
    
    /**
     * bind하여 구성된 함수를 실행한다.
     * tag에 option으로 구성한 함수를 자동실행 하도록 구성한 함수이다.
     * 
     * @see CBConfig.methods
     * 
     * @private
     * @param $elem
     * @param option
     * @returns
     */
    function fireOption($elem, option, isInit) {

        var eoption = $.extend({}, option);
        
        function autoCallback ($telem, option, output, metadata) {
            option = $.extend (eoption, option);
            
            // @customize corebase.firedOption 처리결과 callback
            if ($.isFunction(corebase.firedOption)) {

                if (corebase.firedOption(output, option, $elem, metadata)) {
                    return;
                }
            }
            
            
            var $target = (isNotEmpty(option.target)? $(option.target) : $telem);
            
            bindData ($target, output, option);
        };
        
        // evet선언된 data가 있다면.. 정의하라..
        var method = parseMethod (option);
        if (isEmpty (method)) {
            CBMsg.error(cb.locMessage("msg.254", "The function to execute was not specified, or used the wrong name."), option);
            return;
        }
        
        var cache = option.cache;

        // 캐시사용여부 설정.
        if (isNotEmpty (cache)) {
            var resource = sessionStorage.getItem (cache);
            if (!CBData.isEmpty (resource)) {

                var elist = JSON.parse (resource);
                if ($.isArray(elist)) {
                    autoCallback ($elem, option, elist, {});
                    return;
                };
            }
        }
        
        // 서버로 전송하는 함수가 아닌 내부에서 처리하는 함수일 경우
        if (!method.agent) {
            // @customize - corebase.fireBefore 함수처리 전 처리분기
            if ($.isFunction(corebase.fireBefore) && corebase.fireBefore(option, $elem)) {
                return;
            }
            
            // 함수를 실행하는 경우에는 name으로 처리한다.
            return corebase[method.name] (option, $elem);
        }
        
        
        // 전달할 변수를 지정함.
        option.source = (isNotEmpty(option.comcode))? getCodeSource (option.comcode) : option.source;
        
        // 쿼리 id설정 (지정된 쿼리아이디 (statement), method에 해당하는 쿼리id, 공통코드일 경우 고정된 쿼리아이디 사용)
        // option에서 statement를 가져오는 경우에는 id로 처리한다.
        var statement = (isNotEmpty(option.comcode))? CBConfig.CODE_STATEMENT : null;
        
        // 코드를 조회하는 경우에는 wait를 사용하지 않는다.
        if (statement == CBConfig.CODE_STATEMENT) {
            option.wait = false;
        } 

        option.isInit = isInit;
        // init으로 호출된 경우라면 한꺼번에 호출하도록 데이터를 분기한다.
        // @customize - corebase.fireBefore 함수처리 전 처리분기
        if ($.isFunction(corebase.fireBefore) && corebase.fireBefore(option, $elem)) {
            return;
        }
        
        if (option.isInit) {
            corebase.fireResource = corebase.fireResource || [];
            // 일반함수에서 호출하여 처리되도록 연결된 함수
            corebase.fireResource.push ({elem :$elem, data:requestDelegate (option, method.id, statement), option:option});
            
        } else {
            // 일반함수에서 호출하여 처리되도록 연결된 함수
            requestDelegate (option, method.id, statement, function (output, metadata) {
                if (isNotEmpty (cache) && method.cache && isNotEmpty(output)) {
                    sessionStorage.setItem (cache, JSON.stringify (output));
                }
                
                return autoCallback  ($elem, option, output, metadata);
            });
        }
    };

    
    
    
    
    
    /**
     * corebase에 method를 추가하여 기능을 확장한다.
     * 스크립트에서 실행하는 함수를 생성한다.
     * fireOption에서 사용하는 함수는 생성하지 않는다.
     * 거래전용 함수만 생성한다.
     * 
     * 
     */
    function extendActionMethods () {

    	var _createMethod = function (id) {
            return function (option, statement, callback) {
                return requestDelegate (option, id, statement, callback);
            };
        };
        
        /**
         * 서버의 기능함수를 corebase에 복사한다.
         */
//        $.extend ( corebase, (function () {
//            var methods = {};
            var method  = null;
            for(var id in CBConfig.methods) {
            	
            	method = CBConfig.methods[id];
            	
                if (isEmpty(corebase[id])) {
                    corebase [ id ] = _createMethod (id);
                }
            };
//            return methods;
            
//        })());
    };

    

    /**
     * 전달받은 data를 parsing한다.
     * 데이터 field의 문자열을 object로 변환하여 반환한다.
     * 
     * ★★★
     * 
     * @param {jQuery} $obj - 대상 object 
     * @param {String} field - parsing하려는 data field
     * @returns  - parsing 된 object
     */
    function parseData ($obj, field) {
        if (isEmpty (field) || isEmpty ($obj.data(field))) {
            return {};
        }
        
        return makeObjectData ( $obj.data(field) );
/*        
        var option = $obj.data(field +"-parsed");
        if (isEmpty (option)) {
            option = makeObjectData ( $obj.data(field) );
            $obj.data(field +"-parsed", option);
        }
        return option;
*/        
    };

    
    /**
     * 문자열을 구분하여 key/ value로 만들어 반환한다.
     * 
     * @param {String} data - parsing 대상 문자열
     * @returns  - 문자열을 조합하여 구성된 문자열 옵션
     */
    function makeObjectData (data) {

        var option = {};
        if (isEmpty (data)) {
            return option;
        }

        var arrOption = (""+data).split(";");
        if (arrOption.length > 0) {
            var name, value;
            for(var i=0;i<arrOption.length;i++) {
                var cidx = arrOption[i].indexOf(":");
                if (cidx > -1) {
                    name  = arrOption[i].substring(0, cidx);
                    value = arrOption[i].substring(cidx+1);
                } else {
                    name  = arrOption[i];
                    value = true; 
                }
                
                if (name != "") {
                    option[name] = value;
                }
            }
        }
        return option;
    }; 
    
    /**
     * 전달받은 대상에서 field를 초기화한다.
     * 데이터 field가 변경된 경우 초기화한 후 다시 설정한다.
     * 
     * @param {jQuery} $obj - 대상 object
     * @param {String} field - parsing 대상 필드명
     */
    function resetData($obj, field) {
        if (isEmpty (field)) {
            return {};
        }
        $obj.removeData(field +"-parsed");
    };
    
    
    
    
    
    
    
    
    /**
     * javascript에 구성된 데이터(JS.으로 시작)를 반환한다.
     * 
     * @param value
     * @returns
     */
    function jsVal (value) {
        
        // JS.으로 시작되는 경우 처리함.
        try {
            var pp = eval(value.replace("JS.", ""));
            if (CBData.isEmpty (pp)) {
                return "";
            } else {
                return pp;
            } 
        } catch(e) {
            return {isError:true, errorMessage:CBLogger.error("JS.value["+value+"] error ", ""+e)};
        }
    };
    
    function parseSource(target, option) {
         
        var skipvalid = option.skipvalid;
        
        // 문자열로 전달된 경우 parsing하여 object생성
        function pp ( p ) {
            
            // -----------------------------------------------------------------------------
            // javascript 데이터를 설정
            // -----------------------------------------------------------------------------
            if (p.indexOf("JS.") == 0) {
                return jsVal(p);
            }
            
            // -----------------------------------------------------------------------------
            // spread 또는 하위의 정보를 전송하는 경우
            // spread의 함수를 호출하는 경우
            // #SPREAD.row, #SPREAD.all #SPREAD.chk 형식으로 전달했는 경우
            // -----------------------------------------------------------------------------
            if (p.indexOf(".") > 0) {
                var pparam = p.split(".");
                var optrow = pparam[pparam.length-1]; // row option 위치는 항상 마지막
                
                // 그리드인 경우에는 옵션이 있는 경우에만 유효하다.
                if (pparam.length >= 2 && !CBData.isEmpty(pparam[pparam.length-2]) && $.inArray(optrow.toLowerCase(), ["row", "all", "chk"]) >= 0) {
                    var $p = $(pparam[pparam.length-2]);
                    if ($p.length != 0 && $p.hasClass("cbui-spread")) {
                        switch (optrow.toLowerCase()) {
                            case "row":
                                return CBSpread.getRowObject($p[0], option.row, true);
                            case "all":
                                return CBSpread.getAllList($p[0], null, true);
                            case "chk":
                                return CBSpread.getCheckedRowList($p[0], pparam[2], null, true);
                            default:
                                
                            return {isError:true, errorMessage:CBLogger.error(" " + cb.locMessage("msg.296", "Invalid multI-data call options") + " : " + optrow, p)};
                        }
                    }
                }
            }
            
            // -----------------------------------------------------------------------------
            // 전달받은 정보를 select
            // -----------------------------------------------------------------------------
            var $p = $(p);
            if ($p.length == 0) {
                return {isError:true, errorMessage:CBLogger.error(cb.locMessage("msg.318", "Transfer data is not specified.") + "\r\n", p)};
            }
            
            // -----------------------------------------------------------------------------
            // 자동벨리데이션을 처리하지 않는 것이 아니라면 valid check 호출 
            // -----------------------------------------------------------------------------
            if (!skipvalid) {
                // 단독일 경우 단독의 validation을 체크하여 반환한다.
                var io = $p.data("io")+"";
                
                // 값이 단독일 경우 require 체크한다.
                if (io.indexOf("I") > -1) {

                    var require = $p.data("valid");
                    if (isEmpty(require) || require.indexOf("require") == -1) {
                        $p.data("valid", "require");
                        
                        // 데이터를 다시 설정한 경우에는 초기화한다.
                        resetData ($p, "valid");
                    }
                    
                    var result = isValidElem($p);
                    $p.data("valid", require);
                    
                    // 데이터를 다시 설정한 경우에는 초기화한다.
                    resetData ($p, "valid");
                    if (require == null) {
                        $p.removeData("valid");
                        $p.removeAttr("valid");
                    }
                    
                    if (result.isError) {
                        return result;
                    }
                } else {
                    // $p에서 validation을 체크한다.
                    var result = isValid ($p);
                    if (result.isError) {
                        return result;
                    }
                }
            }
            
            return makeSource ($p);
        }
        
        
        var output = {};
        // 여러개의 소스가 넘어오는 경우
        
        if (target.indexOf(", ") > -1) {
            var arrsource = target.split(", ");
            var results  = null;
            var isError  = false;
            var messages = [];
            
            for(var i=0;i<arrsource.length;i++) {
                results = pp ($.trim(arrsource[i]));

                if (results.isError ) {
                    isError = true;
                    messages.push (results.errorMessage);
                } else {
                    output = $.extend( output, results);
                }
            }
            
            // 오류메시지를 하나의 컨트롤에 통합하여 반환한다.
            if (isError) {
                return {isError:true, errorMessage:messages.join("\r\n")};
            } else {
                return output;
            }
        } else {
            return pp (target);
        }
    }

    
    
    function processParseSource (option, skipvalid) {
        if (CB.emp(option)) {
            return {};
        }
        
        // option이 source로 동작하는 경우의 처리
        if (typeof(option) == "string") {
            return parseSource(option, {skipvalid:skipvalid});
        }

        // jQuery object가 전달된 경우
        else if (option instanceof jQuery) {
            var output = isValid (option);
            if (output.isError) {
                return output;
            }
            return makeSource (option);
        }

        // object일 경우
        else if (typeof(option) == "object") {
            // source가 없는 경우 object단독이 source이다.
            if (isEmpty(option.source)) {
                return option;
            }
            
            // option.source가 문자일 경우
            else if (typeof(option.source) == "string") {
                option.skipvalid = skipvalid;
                return parseSource(option.source, option);
            }
            
            // object.source가 object라면 object를 전송한다.
            else if (typeof(option.source) == "object") {
                return option.source;
            }
        }
        else {
            return {isError:true, errorMessage:CBLogger.error(cb.locMessage("msg.93", "This is a format that can not be converted to data."), option)};
        }
    }

    
    
    /**
     * 전달받은 parameter를 object를 생성한다.
     * 서버로 전송하거나, 객체가 데이터 전달할 정보로 생성한다.
     * 데이터 생성 시 자동으로 validation을 체크한다.
     * data-valid 사용
     * 
     * {skipvalid true시 validation체크하지 않는다.}
     * 
     * corebase.getSource("#dataid");
     * corebase.getSource({source:#dataid});
     * 
     * @param option
     * @param {boolean} skipvalid - 
     * @returns
     */
    function getSource() {
    	
        // option이 전달되지 않은 경우 validation
        if (arguments.length == 0) {
            return {};
        } 

        var options = [];
        var skipvalid = false; 

        for (var i=0;i<arguments.length;i++) {
            if (typeof(arguments[i]) == "boolean") {
                skipvalid = arguments[i];
            } else {
                if (CB.nemp(arguments[i]) && CB.nemp(arguments[i].skipvalid)) {
                    skipvalid = arguments[i].skipvalid;
                }
                options.push (arguments[i]);
            }
        }

        var results  = null;
        var messages = [];
        var output = {};
        var isError = false;
        
        for(var i=0;i<options.length;i++) {
            
            results = processParseSource (options[i], skipvalid);

            if (results.isError ) {
                isError = true;
               	messages.push (getErrMsgMultiLang(results.errorMessage));
            } else {
                
                if ($.isArray(results)) {
                    if (options.length > 1) {
                        output[options[i]] = results;
                    } else {
                        output = results;
                    }
                } else {
                    output = $.extend( output, results);
                } 
            }
        }
        
        // 오류메시지를 하나의 컨트롤에 통합하여 반환한다.
        if (isError) {
        	if (messages.length > 0 && messages[0].indexOf(cb.locMessage("msg.288", "Please check input information.")) < 0) {
        		messages[0] = cb.locMessage("msg.288", "Please check input information.") + "\r\n" + messages[0];
        	}
        	
        	return {isError:true, errorMessage:messages.join("\r\n")};
        } else {
            return output;
        }
    };

    
	
	
	// source에 데이터를 넣는다.
	function addData ($elem, source){
		var _field = $elem.attr("data-field") || $elem.attr("id");
		if( _field){
			source[_field] = cbval($elem) || "";
		} 
	}
	
	/**
	 * 하위정보에서 데이터를 추출하는 내장함수.
	 * @param {jQuery} $selector
	 * @returns {object} 
	 */
	function ms ( $source ){

		// 전송할 정보 지정
		var source = {};
		
		// 자신이 전송항목으로 지정되었다면 데이터를 추출하여 전송한다.
		if( $source.is("[data-io*='I']")){
			addData ($source, source);
			
		} else {
			$source.find("[data-io*='I']").each ( function (index, obj){
				addData ($(this), source);
			});
		}
		return source; 
	}

    /**
     * 서버로 전송할 정보를 생성한다.
     * 실제로 생설할 selector를 기반으로 데이터를 생성한다.
     * 
     * @param elem
     * @returns
     */
    function makeSource(elem) {
//        if (CBLogger.isInfoEnabled()) {
//            CBLogger.info("전송데이터 생성 시작");
//        }
        
        /**
         * 하위정보에서 데이터를 추출하는 내장함수.
         * @param {jQuery} $selector
         * @returns {object} 
         */
    	/* 2018-02-22 noart source생성 시 id가 아닌 data-field에서도 받을 수 있도록 기능 수정
    	 *
        function ms ( $source ) {

            // 전송할 정보 지정
            var source = {};
            
            // source에 데이터를 넣는다.
            function addData ($elem) {
                source[$elem[0].id] = cbval($elem) || "";
            }
            
            // 자신이 전송항목으로 지정되었다면 데이터를 추출하여 전송한다.
            if ($source.is("[id][data-io*='I']")) {
                addData ($source);
                
            } else {
                $source.find("[id][data-io*='I']").each ( function (index, obj) {
                    addData ($(this));
                });
            }
            return source; 
        }
        */
        // ---------------------------------------------------------
        // 수신한 parameter가 jQuery 인 경우 : 직접하위 데이터 반환
        // ---------------------------------------------------------
        if (elem instanceof jQuery ) {
            if (elem.length > 1) {
                var output = {};
                $.each(elem, function () {
                    output  = $.extend (output, ms($(this)));
//                    if (CBLogger.isDebugEnabled()) {
//                        CBLogger.debug("다중 jquery 전송 데이터 추출", output, this);
//                    }
                });

                return output;
            } else {
//                if (CBLogger.isDebugEnabled()) {
//                    CBLogger.debug("단독 jquery 전송 데이터 추출");
//                }

                return ms(elem);
            }
        }
        
        // ---------------------------------------------------------
        // 수신한 parameter가 문자열인 경우 : select하여 데이터 반환
        // ---------------------------------------------------------
        if (typeof(elem) == "string") {
//            if (CBLogger.isDebugEnabled()) {
//                CBLogger.debug("문자열 데이터 생성 시작 ");
//            }

            return ms($(elem));
        }

        // ---------------------------------------------------------
        // 수신한 parameter가 object인 경우 selector를 직접반환
        // ---------------------------------------------------------
        if (typeof(elem) == "object") {
//            if (CBLogger.isDebugEnabled()) {
//                CBLogger.debug("object 데이터 생성 시작 ");
//            }
            return elem;
        }
        
        CBMsg.error(cb.locMessage("msg.133", "Value that can not occur or is incorrect."), elem);

        return null;
    };


    
    
    
    
    /**
     * 컨트롤에 초기값을 설정한다.
     * TODO private 함수 지정 가능여부 확인
     * 
     * @param - 대상 컨트롤
     * @value - 초기값
     * @type  - 컨트롤의 타입
     */
    function dvalue ($elem, value, type) {
        if ($elem.length==0 || isEmpty(value)) {
            return;
        }

        if (type == "multicombo") {
        	var arr = value.split(",");
        	cbval($elem, arr);
        	return;
        }
        
        if (type == "editcombo") {
        	var arr = value.split(",");
        	cbval($elem, arr);
        	return;
        }
        
        // 숫자의 경우 데이터를 설정한다.
        if (!isNaN(value)) {
            cbval($elem, value);
            return;
        }

        if (value.indexOf("'") == 0 && value.lastIndexOf("'") == (value.length-1)) {
            cbval($elem, value.replace(/'/gi, ""));
            return;
        }

        if (value.indexOf("JS.") == 0) {
            var out = jsVal (value);
            if (!out.isError ) {
                cbval($elem, out);
            } else {
                CBMsg.error($elem.attr("name") + " " + cb.locMessage("msg.371", "Initial value setting error") + "(js)", out.errorMessage);
            }
            return;
        }
        

        if (value.toLowerCase() == "today") {
            //cbval($elem, CBDate.formatDate( today(), 'yyyy-mm-dd') );
            cbval($elem, CBDate.formatDate(today(), dateformat(value.toLowerCase())));
            return;
        }
        
        //2014-01-03 날짜형식 추가(yyyymm)
        if (value.toLowerCase() == "todayym") {
            //cbval($elem, CBDate.formatDate( today(), 'yyyy-mm') );
        	cbval($elem, CBDate.formatDate(today(), dateformat(value.toLowerCase())));
            return;
        }
        
        //2016-08-30
        if (value.toLowerCase() == "todayy") {
            //cbval($elem, CBDate.formatDate( today(), 'yyyy') );
            cbval($elem, CBDate.formatDate(today(), dateformat(value.toLowerCase())));
            return;
        }
        
        if (value.toLowerCase() == "todayfull") {
            cbval($elem, CBDate.formatDate(todayFull(), dateformat(value.toLowerCase())));
            return;
        }

        var $valueObj = $(value);
        if ($valueObj.length > 0) {
            cbval($elem, cbval($valueObj));
            return;
        }

        ;if ((function (value) {
            
            if (!(type == 'date' || type == 'datepicker' || type == 'dateYM' || type == 'datepickerYM' || type == 'datepickerY' || type == "datetimepicker")) {
                return false;
            }
            
            var valDv = value.split(/\-|\+|\:/);
            
            var dval   = valDv[0]
              , option = valDv[1]
              , sign   = value.match(/\-|\+/)[0]
            ;
            
            sign = sign && sign.length > 0 > 0 ? sign[0] : "";        // 2015.08.05  
            
            var val = "", format = "";
            if (dval == "today") {
               	//val = today();   format = 'yyyy-mm-dd';
            	val = today(); format = dateformat(dval);
            }
            else if (dval.toLowerCase() == "todayym") {
        		//val = todayYM(); format = 'yyyy-mm';
        		val = todayYM(); format = dateformat(dval);
            }
            else if (dval.toLowerCase() == "todayy") {
                //val = todayY();  format = 'yyyy';
                val = todayY();  format = dateformat(dval);
            }
            else if (dval.toLowerCase() == "todayfull") {
                val = todayFull(); format = dateformat(dval);
            }
            
            
            if (valDv.length > 2 ) {//value.test(/\:/)
                if (valDv[2] == "fd") {
                    val = val.replace(/([0-9]{4,4})([0-9]{2,2})([0-9]*)/, "$1$201");
                }
                else if (valDv[2] == "fm") {
                    val = val.replace(/([0-9]{4,4})([0-9]{2,2})([0-9]*)/, "$101$3");
                }
                else if (valDv[2] == "fmd") {
                    val = val.replace(/([0-9]{4,4})([0-9]{2,2})([0-9]*)/, "$10101");
                }
            }
            
            
            var rtnDate = CBDate.dateAdd (option.match(/yyyy|m|d/)[0], parseInt(sign + option.match(/[-+0-9]*/)[0]), val, format);
            cbval($elem, rtnDate);
            
            return true;
        })(value)) {
            return;
        }
        
        cbval($elem, value);
    };
    
    
    
    
    /**
     * 대상 컨트롤을 초기화한다.
     * 
     * @param $target
     * @returns {corebase}
     */
    function clearData ($target, options) {
        
        if ($target.hasClass("cbui-spread")) {
            $target.cbSpread().clear();
            return;
        }
        
        if ($target.hasClass("cb-fileupload")) {
            $target.cbFileUpload("clear");
            return;
        }
        
        if ($target.hasClass("cb-editor")) {
            $target.cbEditor().text("");
            return;
        }
        
        if ($target.hasClass("cb-datepicker")) {
        	$target.cbVal(CBDate.formatDate(today(), dateformat("today")));
            return;
        }
        
        if ($target.hasClass("cb-datetimepicker")) {
        	$target.cbVal(CBDate.formatDate(todayFull(), dateformat("todayFull")));
            return;
        }
        
        if ($target.hasClass("cb-multicombo")) {
        	$target.cbMultiCombo().clear();
        	return;
        }
        
        if ($target.hasClass("cb-editcombo")) {
        	$target.cbEditCombo().clear();
        	return;
        }
        
        if ($target.hasClass("cb-numerictext")) {
        	$target.cbVal("");
        	return;
        }

        if (!$target.is("[data-io*='O']")) {
            $target.find("[data-io*='O']").each(function() {
                clearData ($(this), options);
            });
            return $target;
        }
        
        var useDvalue = false;
        if (typeof(options) == "boolean") {
            useDvalue = options;
        }

        var extList = null;
         
        if (typeof(options) == "object") {

            if ($.isArray(options)) {
                extList = options;

            } else {
                useDvalue = (typeof(options.dvalue) == "boolean")? options.dvalue : false;
                
                extList = options.extList;
            }
        }
        
        // 제외 리스트 처리
        if ($.inArray ($target[0].id, extList) > -1) {
            return;
        }
        
        if (useDvalue) {
            var option = $target.cbParseData ("option");
            if (isNotEmpty(option.dvalue)) {
                dvalue ($target, option.dvalue, option.type);
                return;
            }
        }

        switch(($target[0].tagName || "").toLowerCase()) {
            
            case "select":
                //$target[0].selectedIndex = -1;
                $target[0].selectedIndex = 0;    // SELECT-BOX: 처음
                return this;
            
            case "input":
                if ($.inArray($target.attr("type"), ["radio", "checkbox"]) > -1) {
                    $target.prop("checked", false);
                    return this;
                }
                
                cbval ($target, "");
                return this;
            
            default:
                cbval ($target, "");
        }
        return $target;
    };
    
    function bindData ($target, data, option) {
        if ($target.length ==0) {
            return this;
        }
        var target  = $target[0];
        
        option = (option || {});

        // 값이 없을 경우 초기화 실행
        if (CB.emp (data)) {
            return clearData ($target);
        }

        // 배열이라면...
        if ($.isArray(data)) {

            // select에 배열로 데이터가 전달된 경우라면 데이터를 초기화한다.
            if (target.tagName.toLowerCase() == "select") {
                option = ( isEmpty (option))? parseData ($target, "option") : option;
                option.dvalue = $target.attr("dvalue") || option.dvalue;
                return CBCombo.setComboOptions ($target, data, option.top, option.code, option.text, option.showcode, option.dvalue);
                // TODO SELECT초기화 실행
            }
   
            // 2017.11.07 ADD BISNT(for multicombo)
            if (target.tagName.toLowerCase() == "input") {
                option = ( isEmpty (option))? parseData ($target, "option") : option;
                option.dvalue = $target.attr("dvalue") || option.dvalue;
                option.multi = $target.attr("multi") || option.multi; 
                if (option.multi) {
                	return CBCombo.setComboOptions ($target, data, option.top, option.code, option.text, option.showcode, option.dvalue, null, option.multi);
                }
            }
            
            /*if ($target.hasClass("cb-editcombo")) {
                option = ( isEmpty (option))? parse ($target, "option") : option;
                option.dvalue =$target.attr("dvalue") || option.dvalue;
                
                return CBEditCombo.setComboOptions ($target, data, option.top, option.code, option.text, option.showcode, option.dvalue);
            }        2015.08.05  */
            
            // 스프레드라면 배열로 전달한다.
            if ($target.hasClass("cbui-spread")) {
                //오른쪽 스크롤바 영역이 헤더에 생기지 않는 경우가 발생하여 처리 
                //데이터를 바인딩 할때 무조건 처리한다.
                //KendoGrid안에 넣을 경우 너무 많은 액세스를 하기때문에 이곳에 처리.
                $(".k-grid-header").css("padding-right", "");
                // 스프레드의 콤보를 설정하는 경우 분기
                if (option.type == "combo") {
                    return $target.cbSpread().setCombo (option, data);
                }
                return $target.cbSpread().setObject(data);
            }
            
            if ($target.hasClass("cb-fileupload")) {
                return $selector.cbFileUpload('data', data);
            }    // 2015.08.05  
            return $target.cbBindData(data[0]);
        }

        // 스프레드인 경우 row데이터를 그대로 설정한다.
        if ($target.hasClass("cbui-spread")) {
            
            if ($.isArray (data.grid) ) {
                return CBSpread.setObj($target[0], data.grid, null, option.targetrow);
            }

            /*var grid = $target[0];
            var mapColumns = grid.mapColumns;
            if (CB.emp(mapColumns)) {
                return;
            }
            
            var colCount = 0;
            var colMatch = 0;
            ;(function () {
                for(var id in data) {
                    colCount++;
                    if (CB.nemp (mapColumns[id])) {
                        colMatch++;
                    }
                }
            })();
            
            if (colMatch >= 2) {*/
                return $target.cbSpread().setRowObject(data, option.targetrow);
            /*}
            return;        2015.08.05      */
        }
        
        
        // 대상이 bind 정보가 아니라면 데이터를 다시 전달한다.
        
        if (!$target.is("[data-io*='O']")) {
            for(var id in data) {
                if (id !="") {
                    $target.find( "#" + id + "[data-io*='O']").each(function () {
                        $(this).cbVal (data[id]);
                    });
                }
            }
            return;
        }
        // 하위 정보가 존재하지 않는다면 종료한다.
        if (isEmpty (data[target.id]) || isEmpty(target.id)) {
//            if (CBLogger.isWarnEnabled()) {
//                CBLogger.warn ("조회된 정보에서 컨트롤에 해당하는 정보가 없으므로, 종료한다. " + target.tagName + " : " + target.id + " = " + target.className, data);
//            }
            // 가장 최초의 정보만 컨트롤에 설정한다.
            return;
        }

        $target.cbVal( data[target.id]);
    };


    // multicombo checked 항목 무조건 가져오는 함수
    function cbvalChecked ($selector) {
    	
    	if ($selector.length == 0) {
    		return $selector;
    	}
        
        if ($selector.hasClass("cb-multicombo")) {
        	return $selector.cbMultiCombo().cbValChecked();
        }
    	
        return $selector;
    };
    
    
    function cbval ($selector, value) {
        
        var oelem, tagName, mask, type;
        
        // 전달하는 값이 없는 경우
        if (isEmpty(value)) {
            if ($selector.length == 0) {
                return;
            }

            if ($selector.hasClass("cb-mask")) {
                return $selector.cbMask();
            }
            
            
            if ($selector.hasClass("cb-datamask")) {
                return $selector.cbDataMask();
            }
            
			if ($selector.hasClass("cb-datepicker")) {
			            	
                return $selector.cbDatepicker().val();
            }
			
			if ($selector.hasClass("cb-datetimepicker")) {
            	
                return $selector.cbDateTimePicker().val();
            }
			
			if ($selector.hasClass("cb-timepicker")) {
				
			    return $selector.cbTimePicker().val();
			}
            
            if ($selector.hasClass("cb-editor")) {
                return $selector.cbEditor().html();
            }
            
            if ($selector.hasClass("cb-multicombo")) {
            	return $selector.cbMultiCombo().val();
            }
            
            if ($selector.hasClass("cb-editcombo")) {
            	return $selector.cbEditCombo().val();
            }
            
            if ($selector.hasClass("cb-numerictext")) {
            	return CBData.isEmpty($selector.cbNumericText().val()) ? "" : $selector.cbNumericText().val().toString();
            }

            oelem = $selector[0];
            tagName = oelem.tagName.toLowerCase();
        
            if (tagName == "select" || tagName == "textarea") {
                return oelem.value;
            }
            
            if (tagName == "object") {
                return;
            }

            if (tagName == "input") {
                if (typeof(oelem.value)=="undefined") {
                    return "";
                }
                switch((type||"").toLowerCase()) {
                    case "radio":
                        return $("input#"+$selector.attr("id") +":checked").val();
                    case "checkbox":
                        return oelem.checked? oelem.value : "";
                    default:
                    	// trim adding
                    	if (typeof oelem.value === "string" || oelem.value instanceof String) {
                    		return oelem.value.trim();
                    	}
                    		
                    	return oelem.value;
                }
            } else {
                return $selector.text();
            }
        
        } else {
            
            if ($selector.length == 0) {
                return $selector;
            }
            
            if ($selector.hasClass("cb-datamask")) {
                return $selector.cbDataMask(value);
            }
            
            if ($selector.hasClass("cb-mask")) {
                return $selector.cbMask(value);
            }
            
            if ($selector.hasClass("cb-datepicker")) {
				var option = parseData ($selector, "option");
				
				// formatDate에서 다국어형식 및 포맷변경
				if (option.type == "datepicker") {
					return $selector.cbDatepicker().val(value);
				}
				if (option.type == "datepickerYM") {
					return $selector.cbDatepicker().val(value);
				}
				if (option.type == "datepickerY") {
					return $selector.cbDatepicker().val(value);
				}
				
        		return $selector.cbDatepicker().val(value);        /*2015.09.01 return $selector.cbDatepicker(); val값 못가져오는것 수정*/
            }
            
            if ($selector.hasClass("cb-datetimepicker")) {
            	return $selector.cbDateTimePicker().val(value);
            }

            if ($selector.hasClass("cb-editor")) {
                return $selector.cbEditor().html(value);
            }
            
            if ($selector.hasClass("cb-multicombo")) {
            	return $selector.cbMultiCombo().val(value);
            }
            
            if ($selector.hasClass("cb-editcombo")) {
            	return $selector.cbEditCombo().val(value);
            }

            if ($selector.hasClass("cb-timepicker")) {
            	return $selector.cbTimePicker().val(value);
            }
            
            if ($selector.hasClass("cb-numerictext")) {
            	return $selector.cbNumericText().val(value);
            }
            
            $selector.removeClass("error");

            oelem = $selector[0];
            tagName = oelem.tagName.toLowerCase();

            if (tagName == "select" || tagName == "textarea") {
            	
                oelem.value = value;
                
                // 콤보박스에 코드가 없을 경우 명칭이 동일하면 해당 항목 설정
//            	if (tagName == "select" && (isEmpty(oelem.value) || oelem.value == "")) {
//            		var exist = false;
//        	        for (var eidx=0; eidx<oelem.length; eidx++) {
//        	        	var eobj = oelem[eidx];
//    	            	if (eobj.text == value) {
//    	            		exist = true;
//    	            		oelem.selectedIndex = eidx;
//    	            	}
//        	        }
//        	        
//        	        // 만일 명칭이 동일한게 하나도 없을 경우에는 추가
//        	        if (!exist) {
//	        	        $(oelem).append('<option value="' + value +'" selected="selected">' + value + '</option>');
//	        	        console.log(oelem);
//        	        }
//            	}
                return $selector;
            }
            
            if (tagName == "object") {
                return $selector;
            }

            if (tagName == "input") {
            	
                type = $selector.attr("type");

                if (isEmpty(type) || isEmpty($selector.attr("id"))) {
                	
                	// multicombo 일경우에는 input박스에 값을 넣지 않도록 함.(CBMultiCombo에서 처리)
                	if (CB.nemp(oelem.getAttribute("data-option")) && 
                				oelem.getAttribute("data-option").toLowerCase().search("multi:true") >= 0) {
                		return $selector;
                	}
                	
                	oelem.value = value;
                    return $selector;
                }
                
                switch (type.toLowerCase()) {
                    case "radio":
                        $("input#"+$selector.attr("id") +"[value='" + value +"']").prop("checked", true);
                        break;
                    case "checkbox":
                        oelem.checked = !CBData.isEmpty (value);
                        break;
                    default:
                        oelem.value = value;
                        break;
                }
            } else {
                try {
                    $selector.text(value);
                } catch(e) {}
            }
            return $selector;
        }
    };
    
    
    function cbtext ($selector) {
        
        var oelem, tagName, mask, type;
        
        if ($selector.length == 0) {
            return;
        }

        if ($selector.hasClass("cb-mask")) {
            return $selector.cbMask();
        }
        
        if ($selector.hasClass("cb-datamask")) {
            return $selector.cbDataMask();
        }
        
        if ($selector.hasClass("cb-datepicker")) {
            return $selector.cbDatepicker().text();
        }
        
        if ($selector.hasClass("cb-datetimepicker")) {
            return $selector.cbDateTimePicker().text();
        }
        
        if ($selector.hasClass("cb-timepicker")) {
            return $selector.cbTimePicker().text();
        }
        
        if ($selector.hasClass("cb-editor")) {
            return $selector.cbEditor().html();
        }
        
        if ($selector.hasClass("cb-multicombo")) {
            return $selector.cbMultiCombo().text();
        }

        if ($selector.hasClass("cb-editcombo")) {
            return $selector.cbEditCombo().text();
        }
        
        if ($selector.hasClass("cb-numerictext")) {
        	return $selector.cbNumericText().text();
        }
        
        oelem = $selector[0];
        tagName = oelem.tagName.toLowerCase();
    
        if (tagName == "select") {
        	return $("#" + oelem.id + " option:selected").text(); 
        }
        
        if (tagName == "textarea") {
            return oelem.value;
        }
        
        if (tagName == "object") {
            return "";
        }

        if (tagName == "input") {
            if (typeof(oelem.value) == "undefined") {
                return "";
            }
            
            switch((type||"").toLowerCase()) {
                case "radio":
                    return $("input#"+$selector.attr("id") +":checked").text();
                case "checkbox":
                    return oelem.checked? oelem.value : "";
                default:
                    return oelem.value;
            }
        } else {
            return $selector.text();
        }
    }
    
    function parseMethod (option) {
        var methodobj = {};
        var id = (function (mobj) {
            if (typeof(option) == "string") {
                $.extend(mobj, CBConfig.methods [option]);
                return option;
            }
            
            if (typeof(option) == "object") {

                if (typeof(option.method) == "string") {
                    $.extend(mobj, CBConfig.methods [option.method]);
                    return option.method;
                }

                for(var id in CBConfig.methods) {
                    if (isNotEmpty(option[id])) {
                        $.extend(mobj, CBConfig.methods[id]);
                        return id;
                    }
                }
            }
            return null;
            
        })(methodobj);
        
        if (id != null) {
            methodobj.id = id;
            return methodobj;
        } else {
            return null;
        }
    };

    
    
    
    function getCodeSource (code) {
        if (code.indexOf(", ") == -1) {
            return {"LRGCLAS_CD" : code};
        }

        var codes = code.split(", ");
        var codecond = {};
        codecond.LRGCLAS_CD = codes[0];
        for(var i=1;i<codes.length;i++) {
            codecond["CODE_DV" + i] = codes[i];
        }
        
        return codecond;
    };

    
    /**
     * 화면을 실행한다.
     * 화면실행은 오버라이드 함수이다. 
     * TODO @customize 
     */
    function open (option, $elem) {};

    
    /**
     * object를 복사하여 object의 내용을 대상 컨트롤에 bind한다.
     * 
     * @param  option - data-option에 구성된 option정보
     * @param {jQuery} $elem  - 대상 element
     */
    function copy(option, $elem) {
        
        if (isEmpty(option) || isEmpty(option.source) || isEmpty(option.target)) {
            CBMsg.error(cb.locMessage("msg.294", " Incorrectly configured options. Unable to run data copying.") + "\r\n" + JSON.stringify(option));
            return;
        }
        
        var source = getSource(option, true);
        if (source.isError ) {
            CBMsg.error(cb.locMessage("msg.92", "Data copy destination information does not exist or is invalid.") + "\r\n", option.source);
            return;
        }

        var $target = $(option.target);
        if ($target.length == 0) {
            CBMsg.error(cb.locMessage("msg.149", "The location to copy is not specified, or incorrect information.") + "\r\n" + option.target);
            return;
        }
        $target.cbBindData( source , option);
        if ($.isFunction(corebase.firedOption)) {
            if (corebase.firedOption(source, option, $elem, null)) {
                return;
            }
        }
    };

    
    function importExcel (options) {
        if (isEmpty(options.importExcel)) {
            CBMsg.error(cb.locMessage("msg.108", " No target specified to load."));
            return;
        }
        
        var $tgtobj = $(options.importExcel);
        if ($tgtobj.length == 0) {
            CBMsg.error(cb.locMessage("msg.108", " No target specified to load."));
            return;
        }
        
        // object 라면 스프레드로 동작한다.
        if ( $tgtobj[0].tagName == "OBJECT") {
            return $tgtobj.cbSpread().importExcel (options);
        } else {
            CBMsg.error(cb.locMessage("msg.107", "The target to load is not the spread."));
        }
    }

    function save (options, $elem) {
        if (isEmpty(options.save)) {
            CBMsg.error(cb.locMessage("msg.314", "No information to save is specified."));
            return;
        }
        
        var $tgtobj = $(options.save);
        if ($tgtobj.length == 0) {
            CBMsg.error(cb.locMessage("msg.314", "No information to save is specified."));
            return;
        }
        
        // object 라면 스프레드로 동작한다.
        if ( $tgtobj[0].tagName == "OBJECT") {
            return $tgtobj.cbSpread().save (options);
        } else {
            CBMsg.error(cb.locMessage("msg.313", "The information to save is not the spread."));
            
        }
    };


    
    /**
     * [data-option]data-event에 구성된 내용으로 트리거를 실행한다.<br>
     * 트리거는 data-option="event:click" data-click="etrigger:#대상컨트롤"
     * 대상컨트롤에 지정된 정보를 이용하여 이벤트를 실행하도록 한다.<br>
     * 
     * etrigger:#대상컨트롤 로 구성된 경우 대상컨트롤에서 발생하는 이벤트 
     * 
     * @param option
     * @param $elem
     */
    function etrigger (option, $elem) {
        if (isEmpty(option.etrigger)) {
            CBMsg.error(cb.locMessage("msg.409", "Trigger configuration is invalid.") + "\r\n" + option);
            return;
        }
        
        var $srcobj = $(option.etrigger);
        if ($srcobj.length == 0 || $srcobj.data(option.event) == null) {
            CBMsg.error(cb.locMessage("msg.409", "Trigger configuration is invalid.") + "\r\n" + option);
            return;
        }

        option.origin = $elem;
        $srcobj.trigger( option.event, option);
        
        
        if ($.isFunction(corebase.firedOption)) {
            if (corebase.firedOption({}, option, $elem, null)) {
                return;
            }
        }
    };

    
    /**
     * 컨트롤의 데이터 적정성을 확인하여 반환한다.
     * 
     * @param $elem - 대상 컨트롤
     * @return  - 오류여부
     */
    function isValidElem ($elem) {
     
        var valid   = parseData ($elem, "valid");
        var option  = parseData ($elem, "option");//  , parseData ($elem, "valid"));
        var error   = new Array();
        var value   = cbval($elem);
        
        if (isEmpty(valid.maxlength) && isNotEmpty ($elem.attr("maxlength"))) {
            valid.maxlength = $elem.attr("maxlength");
        }
        
        // multicombo는 빈배열, 값있는배열, null로 구분하여 null일 경우 필수항목 처리
        if ($elem.hasClass("cb-multicombo")) {
        	if (isNotEmpty(valid.require) && value == null) {
           		error.push ( cb.locMessage("txt.1531", " Required"));
            }
        }else if ($elem.hasClass("cb-editcombo")) {
        	if (isNotEmpty(valid.require) && value == null) {
           		error.push ( cb.locMessage("txt.1531", " Required"));
            }
        }else if($elem.hasClass("cb-timepicker")) {
        	if (isNotEmpty(valid.require) && value == null) {
           		error.push ( cb.locMessage("txt.1531", " Required"));
            }
        }else if($elem.hasClass("cb-numerictext")) {
        	if (isNotEmpty(valid.require) && value == null) {
           		error.push ( cb.locMessage("txt.1531", " Required"));
            }
        }
        else {
            // 필수항목 체크 (검증)
            if (isNotEmpty(valid.require) && CBData.isEmpty (value)) {
                error.push ( cb.locMessage("txt.1531", " Required"));
            }
        }
        
        // 최대길이 체크 (검증)
        if (isNotEmpty (valid.maxlength)) {
            if (option.type == "number") {
                if (CBData.isMaxLengthNumeric (value, valid.maxlength)) {
                    error.push ( cb.locMessage("txt.1408", "Max length") + "("+valid.maxlength+")");
                }
            } else {
                if (CBData.isMaxLength (value, valid.maxlength)) {
                    error.push ( cb.locMessage("txt.1408", "Max length") + "("+valid.maxlength+")");
                }
            }
        }
        
        // 최소길이 체크 (검증)
        if (isNotEmpty (valid.minlength)) {
            if (option.type == "number") {
                if (CBData.isMinLengthNumeric (value, valid.minlength)) {
                    error.push ( cb.locMessage("txt.1411", "Min length") + "("+valid.minlength+")");
                }
            } else {
                if (CBData.isMinLength (value, valid.minlength)) {
                    error.push ( cb.locMessage("txt.1411", "Min length") + "("+valid.minlength+")");
                }
            }
        }

        // 범위 체크 : 최소 (검증)
        if (isNotEmpty (valid.minvalue)) {
            var ovalue = valid.minvalue;
            if (!isNaN (ovalue) && CBData.greaterThan (value, ovalue)) {
                error.push ( cb.locMessage("txt.1410", "Min value") + "("+ovalue+")");
            }
        }
                
        // 범위 체크 : 최대 (검증)
        if (isNotEmpty (valid.maxvalue)) {
            var ovalue = valid.maxvalue;
            if (!isNaN (ovalue) && CBData.lessThan (value, ovalue)) {
                error.push ( cb.locMessage("txt.1407", "Max value") + "("+ovalue+")");
            }            
        }
        
        // 필수선택 : checkbox
        if (isNotEmpty(valid.check) ) {
            if (!$elem.is(":checked") ) {
                error.push( cb.locMessage("txt.1530", "Required selection"));
            }
        }

        // 컨트롤 두값의 차이
        if (isNotEmpty (option.compare)) {

            var result = (function (compare) {
                if (CBData.isEmpty (value)) {
                    return;
                }
                
                var mp = compare.indexOf("-");
                var pp = compare.indexOf("+");
                
                if (mp == -1 && pp == -1) {
                    mp = compare.length;
                    pp = compare.length;
//                    return "비교항목 체크 오류입니다.\r\n비교대상 항목이 정의되지 않았거나, 잘못된 이름입니다. (" + compare +")";
                }
                
                var pareElem = compare.substring(0, Math.min(((mp==-1)? compare.length : mp), ((pp==-1)? compare.length : pp)));
                if ($(pareElem).length == 0) {
                    return cb.locMessage("msg.153", "Compare item check error.") + "\r\n" + cb.locMessage("msg.152", "The comparison target item is not defined or invalid.") + "(" + pareElem +")";
                }

                // 두항목 모두 없으면 확인하지 않는다.
                if (CBData.isEmpty (pareValue) && CBData.isEmpty (value)) {
                    return;
                }
                
                var pareValue = cbval($(pareElem));

                if (CBData.isEmpty (pareValue) || isNaN(pareValue)) {
                    return cb.locMessage("msg.151", "Have not entered a value to compare.") + "(" + $(pareElem).attr("name")+")";
                }

                if (CBData.isEmpty (value)) {
                    return cb.locMessage("msg.287", "No input value");
                }
                
                if (option.type == "date" || option.type == "dateYM"
                 || option.type == "datepicker" || option.type == "datepickerYM" || option.type == "datepickerY" || option.type == "datetimepicker"
                 || option.type == "timeHM") {
                    if (parseInt(pareValue,10) > parseInt(value,10)) {
                        return cb.locMessage("msg.239", "Start value greater than end value");
                    }
                }

                if (mp == pp && pp == compare.length) {
                    return;
                }

                var min = "";
                if (mp > -1) {
                    min = compare.substring(mp, (pp > mp)? pp : compare.length);
                }

                var max = "";
                if (pp > -1) {
                    max = compare.substring(pp, (mp > pp)? mp : compare.length);
                }

                var maxVal = parseInt(max, 10);
                var minVal = parseInt(min, 10);

                if (option.type == "date" || option.type == "datepicker") {
                    
                    var termDv = {"yyyy":cb.locMessage("txt.707", "Year"), "m":cb.locMessage("txt.566", "Month"), "d":cb.locMessage("txt.1208", "days")};
                    
                    if (!CBDate.isDate (value) || !CBDate.isDate (pareValue)) {
                        return;
                    }
                    
                    var errmessage = [];
                    
                    if (mp > -1) {
                        min = min.replace( ""+minVal, "").replace(/\+|\-/gi, "");
                        min = "yyyymds".indexOf(min) == -1? "d" : min;

                        minVal = (minVal < 0)? minVal * -1 : minVal;

                        var term = CBDate.dateAdd (min, minVal, pareValue, dateformat("today"));
                        if (term > value) {
                            errmessage.push( cb.locMessage("txt.1412", "Less than minimum") + "(" + minVal +termDv[min]+ ":" + CBDate.formatDate (term, dateformat("today"))+ " " + cb.locMessage("txt.1196", "After") + ")");
                        }
                    }

                    if (pp > -1) {
                        max = max.replace( ""+maxVal, "").replace(/\+|\-/gi, "");
                        max = "yyyymds".indexOf(max) == -1? "d" : max;
                        
                        var term = CBDate.dateAdd (max, maxVal, pareValue, dateformat("today"));

                        if (term < value) {
                            errmessage.push( cb.locMessage("txt.1409", "Exceeded maximum value") + "(" + maxVal +termDv[max]+ ":" + CBDate.formatDate (term, dateformat("today"))+ " " + cb.locMessage("txt.1193", "Previous") + ")");
                        }
                    }
                    
                    if (errmessage.length > 0) {
                        return errmessage.join("\r\n");
                    }

                } else if (option.type == "number") {
                    var term = parseInt(value,10) - parseInt(pareValue,10);
                    if (pp > -1) {
                        if (maxVal < term) {
                            return cb.locMessage("txt.1412", "Less than minimum") + "(" + cb.locMessage("txt.1565", "Now") + ":" + term + ", " + cb.locMessage("txt.668", "Criteria") + ":" + maxVal + ")";
                        }
                    }
                    
                    if (mp > -1) {
                        if (minVal > term) {
                            return cb.locMessage("txt.1409", "Exceeded maximum value") + "(" + cb.locMessage("txt.1565", "Now") + ":" + term + ", " + cb.locMessage("txt.668", "Criteria") + ":" + minVal + ")";
                        }
                    }
                }
                
            })(option.compare);
            
            if (!CBData.isEmpty(result)) {
                error.push (result);
            }
        }
        
        // 정상 데이터확인
        if (isNotEmpty (option.type)) {
            var result = ( (function (type) {
                if (CBData.isEmpty (value)) {
                    return;
                }

                switch(type) {
                    case "ssn"        :
                        if (!CBData.isSsn (value)) {
                            return cb.locMessage("msg.350", "Registration number format");
                        }
                        return;
                    case "date"       :
                        if (value.length < 8) {
                            return cb.locMessage("txt.697", "Date format");
                        }
                    case "dateYM"       :
                        if (!CBData.isDate (value)) {
                            return cb.locMessage("txt.697", "Date format");
                        }
                        return;
                    case "dateY"       :
                        if (value.length < 4 || !isFinite(value)) {
                            return cb.locMessage("txt.697", "Date format");
                        }
                        return;
                    case "datepicker"       :
                        if (value.length < 8) {
                            return cb.locMessage("txt.697", "Date format");
                        }
                    case "datepickerYM"       :
                        if (!CBData.isDate (value)) {
                            return cb.locMessage("txt.697", "Date format");
                        }
                        return;
                    case "datepickerY"       :
                        if (value.length < 4 || !isFinite(value)) {
                            return cb.locMessage("txt.697", "Date format");
                        }
                        return;
                    case "datetimepicker"    :
                        if (value.length < 14) {
                            return cb.lockMessage("txt.697", "Date format");
                        }
                        return;
                    case "datetime"   :
                        if (!CBData.isDate (value)) {
                            return cb.locMessage("txt.696", "Datetime format");
                        }
                        return;
                    case "yearmonth"  :
                        if (!CBData.isDate (value)) {
                            return cb.locMessage("txt.708", "Year/Month format");
                        }
                        return;
                    case "monthdate"  :
                        if (!CBData.isDate ("2012"+value)) {
                            return cb.locMessage("txt.1166", "Month/Days format");
                        }
                        return;
                    case "time"       :
                        if (!CBData.isDate ("19010101" + value)) {
                            return cb.locMessage("txt.1078", "Time format");
                        }
                        return;
                    case "timeHM"       :
                        if (!CBData.isDate ("19010101" + value + "00")) {
                            return cb.locMessage("txt.1078", "Time format");
                        }
                        return;
                    case "zip"        :
                    case "phone"      :
                    case "biznum"     :
                    case "number"     :
                        if (!CBData.isNumber (value)) {
                            return cb.locMessage("msg.233", "Only numbers");
                        }
                        return;
                    case "notkor"     :
                        if (!CBData.entryString (value, "[^A-Za-z0-9]")) {
                            return cb.locMessage("msg.259", "Only English / Number / Space can be entered");
                        }
                        break;
                        
                }
                
            })(option.type));
            
            if (!CBData.isEmpty(result)) {
                error.push (result);
            }
        }
         
        
        if (error.length > 0) {
            $elem.removeClass("error").addClass("error").one("change", function () {
                $elem.removeClass("error");
            });
            
            var elemname = $elem.data("data-name") ? cb.locMessage("", $elem.data("data-name")) : ($elem.data("name") ? cb.locMessage("", $elem.data("name")) : $elem[0].id);
            
            try {
            	$elem.focus();
            } catch (e) {}
            
            return {isError:true, errorMessage:" - " + elemname + " : " + error.join(", ") };
        } else {
            $elem.removeClass("error");
            return {isError:false, errorMessage:""};
        }
    };

    
    /**
     * http reponse header의 시간을 locale에 따라 변환하여 반환 처리
     * 
     * @param respTime
     * @returns changeTime
     */
    function getRespTimeFromLocale(respTime) {
    	
    	var arr = respTime.split(" ");
    	if (arr.length > 0) {
    		arr[0] = CBDate.formatDate(arr[0].replace(/-/gi, ""), dateformat("today"));
    	}
    	
    	return arr.join(" ");
    };
    
    /**
     * 오류 메시지 다국어 처리 함수
     * tag에 구성된 data-valid로 채킹된 데이터중 공통 메시지 처리를 위한 다국어 처리
     * 
     * @param msg
     * @returns msg 다국어 변환된
     */
    function getErrMsgMultiLang(errorMessage) {
    	
    	// validation 처리시 메시지 박스 다국어 처리
    	var errMsg = "";
    	var arrErr = errorMessage.split("\r\n");
    	
    	for (var i=0; i<arrErr.length; i++) {
        	// - msg.1111:Test:Required
    		var msg = "";
        	var arrMsg = arrErr[i].split(":");
        	
        	if (arrMsg.length == 1 && arrMsg[0].trim() == "") {
        		return errorMessage;
        	}
        	
        	if (arrMsg.length > 1) {
        		var arrCode = arrMsg[0].split("-");
        		if (arrCode.length > 1 ) {
        			msg = cb.locMessage(arrCode[1].trim(), arrMsg.length > 1 ? arrMsg[1].trim() : "");	
        		} else {
        			msg = arrCode[1].trim();
        		}
        		
        		if (arrMsg.length == 2) {
        			msg = arrCode[1].trim();
        		}

            	msg = "- " + msg + " : " + (arrMsg.length > 2 ? arrMsg[2].trim() : arrMsg.length > 1 ? arrMsg[1].trim() : "");
        	}
        	
        	errMsg = errMsg + msg + "\r\n";
    	}
    	
    	return errMsg;
    };

    
    /**
     * 데이터의 정합성을 확인한다.
     * tag에 구성된 data-valid를 확인하여 validation을 확인하고 오류사항을반환한다.
     * 
     * @param $elem
     * @returns
     */
    function isValid ($elem) {

        if ($elem.is("[id]") && isNotEmpty($elem.data("io")) && $elem.data("io").indexOf("I") > -1) {
            return isValidElem($elem);
        }

        var isError  = false;
        var messages = [];
        
        var elems = $elem.find("[id][data-io*='I']").get();
        $.each(elems.reverse(), function (eidx, eobj) {
            
            var $velem = $(this);
            var result = isValidElem($velem);
            if (result.isError) {
                isError = true;
                messages.push ( result.errorMessage);
            }
        });

        return {isError:isError, errorMessage:messages.join("\r\n")};
    };
    
    
    function destory () {
//        corebase.firedOption = null;
//        corebase.fireBefore = null;
//        for(var id in CBConfig.methods) {
//            corebase [id] = null;
//        }
//        CBLogger = null;
//       CBMsg = null;
    };
    
    
    function setCookie(id, value, expires) {
        
        expires = parseInt((CB.emp(expires)? 7 : expires),10);
        
        var date = new Date();
        
        date = new Date(date.getFullYear(),date.getMonth(),date.getDate()+expires);
        document.cookie = id+"=" + escape(value) + "; expires=" + date.toGMTString();
    }

    
    function getCookie(sName) {
        var aCookie = document.cookie.split("; ");
        for( var i = 0; i < aCookie.length; i++ ) {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0] )
                return isNotEmpty(aCrumb[1])? unescape(aCrumb[1]) : "";
        }
        return "";
    }
    
    
    //----------------------------------------------------------------------------------------//
    
    CoreBase.prototype.locMessage = locMessage;
    
    CoreBase.prototype.confirm = confirm;
    
    CoreBase.prototype.setCookie = setCookie;

    
    CoreBase.prototype.getCookie = getCookie;

    /**
     * 
     * 프그래스 바 중앙 처리를 위하여 추가 (20140925)
     */
    CoreBase.prototype.beforeStart = beforeStart;
    CoreBase.prototype.beforeCallback = beforeCallback;

    
    /**
     * 전달받은 parameter를 배열로 변경한다.
     * 
     * @param {Iterator} -
     *        배열로 변환할 정보
     * @returns {Array}
     */
    CoreBase.prototype.makeArray = makeArray;

    /**
     * 전달받는 parameter가 null, undefined, 인 경우인지 확인하여 결과를 반환한다. parameter로 전달된 정보
     * 중 하나라도 true이면 true이다.
     * 
     * @see emp()
     * @param {...} -
     *        복수의 parameter를 수신할 수 있음
     * @returns {Boolean} - null or undefined
     */
    CoreBase.prototype.emp = isEmpty;
    CoreBase.prototype.isEmpty = isEmpty;

    /**
     * 전달받는 parameter가 null, undefined 가 아닌지 확인하여 결과를 반환한다. parameter로 전달된 정보가
     * 모두 true일 경우 true이면 true이다.
     * 
     * @see _emp
     * @param {...} -
     *        복수의 parameter를 수신할 수 있음
     * @returns {Boolean} - !null & !undefined
     */
    CoreBase.prototype.isNotEmpty = isNotEmpty;

    /**
     * 전달받는 parameter가 null, undefined 가 아닌지 확인하여 결과를 반환한다. parameter로 전달된 정보가
     * 모두 true일 경우 true이면 true이다.
     * 
     * @see _emp
     * @param {...} -
     *        복수의 parameter를 수신할 수 있음
     * @returns {Boolean} - !null & !undefined
     */
    CoreBase.prototype.nemp = isNotEmpty;

    /**
     * 병렬실행을 위한 callback setTimeout함수를 통해 통시실행이 가능하도록 구성한 함수
     * 
     * @param {Function}
     *        callback - 동시에 실행될 함수
     * @returns {void}
     */
    CoreBase.prototype.ppp = ppp;

    /**
     * 오늘날짜를 반환한다. 실제 실행프로젝트에서는 오버라이드하여 데이터베이스 시간을 조회하도록 수정한다.
     * 
     * @returns {String} - 오늘날짜 8자리
     */
    CoreBase.prototype.today = today;

    /**
     * 오늘년월를 반환한다. 실제 실행프로젝트에서는 오버라이드하여 데이터베이스 시간을 조회하도록 수정한다.
     * 
     * @returns {String} - 오늘년월 6자리
     */    
    CoreBase.prototype.todayYM = todayYM;
    
    /**
     * 오늘년월를 반환한다. 실제 실행프로젝트에서는 오버라이드하여 데이터베이스 시간을 조회하도록 수정한다.
     * 
     * @returns {String} - 오늘년월 6자리
     */    
    CoreBase.prototype.todayY = todayY;

    /**
     * 오늘년월일시분초를 반환한다. 실제 실행프로젝트에서는 오버라이드하여 데이터베이스 시간을 조회하도록 수정한다.
     * 
     * @returns {String} - 오늘년월일시분초 14자리
     */
    CoreBase.prototype.todayFull = todayFull;
    
    /**
     * 날짜(다국어) 타입을 반환한다. 
     * 
     * @returns {String} - 국가별 날짜 타입
     */    
    CoreBase.prototype.dateformat = dateformat;
    
    /**
     * 입력받은 문자열을 날짜형식으로 반환합니다.
     * 
     * @since version 4.0.0.0
     * @param {Date}
     *        date - 변환대상 날짜객체
     * @returns {String} 변환된 문자열
     * 
     */
    CoreBase.prototype.toTimeString = toTimeString;


    /**
     * 입력받은 날짜형식 데이터를 문자열로 전체 날짜 문자열로 반환합니다.
     * 
     * @param {Date}
     *        src (OPTIONAL) 반환받을 대상 날짜 (default new Date)
     * @param {String}
     *        mode (OPTIONAL) - 1/1000 초 포함여부
     *        <li> ms - 포함
     * @returns {String} 전체날짜열로 반환
     * @example <code>
     *   var src = new Date();
     *   var out = corebase.util.getFullDateString ( src );
     *   // out := 1974.09.20 12:41:13
     *
     *   var out = corebase.util.getFullDateString ( src );
     *   // out := 1974.09.20 12:41:13
     *   
     *   var out = corebase.util.getFullDateString ();
     *   // out := 1974.09.20 12:41:13
     *   
     *   var out = corebase.util.getFullDateString ( null, "ms");
     *   // out := 1974.09.20 12:41:13.211
     *   
     * </code>
     */
    CoreBase.prototype.getFullDateString = getFullDateString;
    
    
    /**
     * 전달받은 parameter를 디버그용 문자열로 치환하여 반환한다.
     * 
     * @param {Array} 문자열로 변경하기 위한 데이터 배열 arguments 직접 치환
     * @returns {String} stringify 된 문자열
     */
    CoreBase.prototype.parseArgs = parseArgs;
    
    
    
    /**
     * 대상서버와 통신합니다.
     * 
     * @param  options - 서버로 전송할 정보
     * <ul>
     * <li> options.methos - 서버에서 실행할 함수명
     * <li> options.statement - 서버가 실행할 statemt (database에서는 ibatis id, host에서는 전문id)
     * <li> options.source - 서버로 전송할 데이터
     * <li> options.data - 복합거래일 경우 input의 배열이 전달된다. (@see makeInput)
     * <li> options.callback - 서버에서 처리되고 난 결과 콜백.
     * 함수의 callback parameter 대신 사용하는 경우에 options에 설정하여 호출합니다.  
     * </ul>
     * @param {Function} callback - 전송 후 처리할 callback 함수
     * parameter로 output, metadata 를 반환합니다.<br>
     * output에는 서버로 호출하고 난 결과 (select 일 경우 result) 가 반환됩니다.<br>
     * metadata에는 쿼리의 부가정보가 반환됩니다.<br>
     * 
     * <ul>
     * <li> select, selectList - metadata.resultCount : 조회건수
     * <li> update, delete - metadata.updateCount : 처리건수 반환
     * <li> host - customize
     * </ul>
     * 
     * <code>
     
     var options = {};
     
     options.method = "selectList";
     options.statement = "COMM.selectCommonCode";
     options.source    = {LRG_CD:"A00001"};

     corebase.ajax (options, function (output, metadata) {
     
     });
     * </code>
     */
    CoreBase.prototype.ajax = ajax;
    
    CoreBase.prototype.forward = forward;

    
    /**
     * 일반함수에서 호출하여 처리되도록 연결된 함수<br>
     * select, selectList 등 ajax외에 직관적으로 사용할 수 있도록 구성된 함수에서 직접 연결합니다.<br>
     * 
     * @param  options - 전송할 정보
     * @param {String} pmethod - 서버에서 실행할 함수 servlet method
     * @param {String} statement - 서버가 실행할 statemt ibatis query id
     * @param {Function} callback - 서버에서 실행이 완료된 후 처리할 callback 함수
     * @returns
     */
    CoreBase.prototype.requestDelegate = requestDelegate;
    
    CoreBase.prototype.etrigger  = etrigger;
    
    CoreBase.prototype.getSource = getSource;
    
    CoreBase.prototype.resetData = resetData;
    
    CoreBase.prototype.parseData = parseData;
    
    CoreBase.prototype.makeObjectData = makeObjectData;
    
    CoreBase.prototype.fireOption = fireOption;
    
    CoreBase.prototype.refire = refire;
    
    /**
     * html에 생성된 이벤트 객체를 분석하여 자동 이벤트 함수로 연결한다.
     * data-option="event:click,change, .." 의 이벤트속성을 분석한다.
     * data-click, data-change등 상세속성이 정의되어야 한다.
     * 
     * 사용할 수 있는 이벤트의 종류는 CBConfig.methods에 명세되어있다.
     * 
     * @see CBConfig.methods
     * @param $elem
     * @param option
     */
    CoreBase.prototype.parseEventData = parseEventData;
    
    
    CoreBase.prototype.scanRoot = scanRoot;
    
    /**
     * 
     */
    CoreBase.prototype.extendActionMethods = extendActionMethods;
    
    CoreBase.prototype.makeSource = makeSource;
    
    CoreBase.prototype.dvalue = dvalue;
    
    CoreBase.prototype.clearData = clearData;
    
    CoreBase.prototype.bindData = bindData;
    
    CoreBase.prototype.cbval = cbval;
    
    CoreBase.prototype.cbvalChecked = cbvalChecked;
    
    CoreBase.prototype.parseMethod = parseMethod;
    
    CoreBase.prototype.getCodeSource = getCodeSource;
    
    CoreBase.prototype.open = open;
    
    CoreBase.prototype.copy = copy;
    
    CoreBase.prototype.save = save;
    
    CoreBase.prototype.importExcel = importExcel;
    
    CoreBase.prototype.isValidElem = isValidElem;

    CoreBase.prototype.isValid = isValid;

    CoreBase.prototype.reload  = function () {};

    CoreBase.prototype.setFocus = function () {
        $(window).trigger("focus");
    };

    /**
     * 서버로 전송할 전송정보를 생성한다.<br>
     * 기본 거래를 구성하는 dto형식으로 생성한다.<br>
     * 
     * 1. 복합거래의 경우 프로그램에서 생성하여 corebase.ajax 로 호출한다.
     * 2. 단독거래, 일반 옵션을 사용하는 경우에는 corebase.ajax에서 생성한다.
     * 
     * @param {String} method
     * @param {String} statement
     * @param {Object} source
     * @param {Object} header
     * @returns {Object} - "classId", "method", "statement", "source", "header"
     */
    CoreBase.prototype.Input = function (method, statement, source, header){
    	var omethod = CBConfig.methods[method];
    	return makeInput(omethod.name, statement, source, header, (omethod.mapper || CBConfig.mapper.defaultMethod));
    }
    
    CoreBase.prototype.destory = destory;
    
    // 세션이 종료되었을 경우 처리
    /*CoreBase.prototype.sessionExpire = function (responseHead) {
        CBMsg.error(responseHead.responseTime, "세션이 올바르지 않거나, 잘못된 로그인입니다.");
    }*/
    
    /**
     * jquery에 설정하기 위한 class
     */
    $.fn.cbClearOData = function (options) {
        clearData ($(this), options);
        return this;
    };

    $.fn.cbBindData = function (data, option) {
        bindData ($(this), data, option);
        return this;
    };

    $.fn.cbVal = function (value) {
        return cbval ($(this), value);
    };
    
    $.fn.cbValChecked = function () {
    	return cbvalChecked ($(this));
    }

    $.fn.cbDVal = function (value) {
        var $elem = $(this);
        return dvalue ($elem, value, ($elem.data("option") || {}).type);
    };

    $.fn.cbParseData = function (field) {
        return parseData ($(this), field);
    };

    $.fn.cbParseDataValid = function () {
        return parseData ($(this), "valid");
    };

    $.fn.cbParseSpreadColumn = function () {
        return parseData ($(this), "column");
    };

    $.fn.cbParseSpread = function () {
        return parseData ($(this), "spread");
    };

    $.fn.cbParseDataOption = function () {
        return parseData ($(this), "option");
    };

    $.fn.cbMakeSource = function () {
        return makeSource (this);
    };

    $.fn.cbRefire = function (ename, option) {
        return refire ($(this), ename, option);
    };

    $.fn.cbText = function () {
    	return cbtext ($(this));
    };
    
    $.fn.cbIsValid = function () {
        var valid = isValid($(this));
        if (valid.isError) {
            return cb.locMessage("msg.330", "No information or incorrect information.") + "\r\n" + valid.errorMessage;
        }
        return "";
    };

    $.fn.cbElemDisable = function (flag, isDisable) {
        $(this).each (function () {
            var $elem = $(this);
            if ($elem.length == 0) {
                return;
            }
            flag = isEmpty (flag)? true : flag;
            
            if ($elem.hasClass("cb-datepicker")) {
                $elem.cbDatepicker().disable(flag);
                return;
            }
            
            if ($elem.hasClass("cb-datetimepicker")) {
                $elem.cbDateTimePicker().disable(flag);
                return;
            }
            
            if ($elem.hasClass("cb-multicombo")) {
                $elem.cbMultiCombo().disable(flag);
                return;
            }
            
            if ($elem.hasClass("cb-editcombo")) {
            	$elem.cbEditCombo().disable(flag);
            }
            
            if ($elem.hasClass("cb-timepicker")) {
            	$elem.cbTimePicker().disable(flag);
                return;
            }
            
            if ($elem.hasClass("cb-numerictext")) {
                $elem.cbNumericText().disable(flag);
                return;
            }
            
            if (isDisable) {
            
                if ($elem.prop("disabled") == flag) {
                    return;
                }
                $elem.prop("disabled", (flag == true));
                
                $elem[0].enabled = !(flag == true);
                
                $elem[0].disabled = (flag == true);
                
                if (flag) {
                    $elem.removeClass("off on").addClass ("off");
                } else {
                    $elem.removeClass("off on").addClass ("on");
                }
                
                
                $elem.children("*").each(function() {
                    $(this).cbElemDisable(flag, isDisable);
                });
            }else{
                //disabled 생상표시로 분기처리하여 사용.
                //disable 처리를 하지 않고 readonly로 변환.
                //2015-10-01 JIW
                if ($elem[0].tagName == "BUTTON") {
                    
                    if (flag) {
                        $elem.attr("disabled", "disabled");
                    } else {
                        $elem.removeAttr("disabled");
                    }
                    $elem.cbElemDisable(flag, true);
                }else if ($elem[0].tagName == "INPUT" 
                            || $elem[0].tagName == "TEXTAREA" 
                            || $elem[0].tagName == "SELECT") {
                    if (flag) {
                        $elem.removeAttr("disabled");
                        $elem.attr("readOnly", "readOnly");
                        $elem.addClass("readOnly");
                        
                        /*
                        $elem.focusin(function() {
                            this.blur();
                        });
                        */
                        if ($elem.has("option")) {
                            $elem.on("focusin", function() {
                                try {
                                    if (!$elem[0].options_temp) {
                                        var oOpt = $elem[0].options;
                                        var oTemp = new Array();
                                        for(var i=0;i<oOpt.length; i++) {
                                            oTemp.push({"CODE":oOpt[i].value, "TEXT":oOpt[i].text});
                                        }
                                        $elem[0].options_temp = oTemp;
                                    }
                                    $elem.children("option").not(":selected").remove();
                                } catch(e) {}
                            }).on("focusout", function() {
                                if ($elem[0].options_temp) {
                                    var oOpt   = $elem[0].options_temp;
                                    var sValue = $elem.val();
                                    $elem.children("option").remove();
                                    for(var i=0;i<oOpt.length; i++) {
                                        if (sValue == oOpt[i].CODE) {
                                            $elem.append("<option value='"+ oOpt[i].CODE+"' selected>"+oOpt[i].TEXT+"</option>");
                                        }else{
                                            $elem.append("<option value="+ oOpt[i].CODE+">"+oOpt[i].TEXT+"</option>");
                                        }
                                    }
                                }
                            });
                        };
                        //$elem.focus(function() {this.blur()});
                    }else{
                        $elem.removeAttr("readOnly");
                        $elem.removeClass("readOnly");
                        
                        if ($elem.has("option")) {
                            $elem.unbind("focusin").unbind("focusout");
                            
                            /*
                            $elem[0].options = $elem[0].options_temp;
                            
                            if ($elem[0].options_temp) {
                                var oOpt   = $elem[0].options_temp;
                                var sValue = $elem.cbVal();
                                $elem.children("option").remove();
                                for(var i=0;i<oOpt.length; i++) {
                                    if (sValue == oOpt[i].CODE) {
                                        $elem.append("<option value="+ oOpt[i].CODE+" selected>"+oOpt[i].TEXT+"</option>");
                                    }else{
                                        $elem.append("<option value="+ oOpt[i].CODE+">"+oOpt[i].TEXT+"</option>");
                                    }
                                }
                            }
                            */
                        };
                        
                        //$elem.children("option").removeAttr("disabled").css("color", "red");
                    }
                    if ($elem[0].shadow) {
                        $elem[0].shadow.css("background-color", $elem.css("background-color"));
                    }
                }else{
                    $elem.find("input, textarea, select").each(function() {
                        $(this).cbElemDisable(flag, isDisable);
                        /*
                        if (flag) {
                            $(this).removeAttr("disabled");
                            $(this).attr("readOnly", "readOnly");
                            $(this).addClass("readOnly");
                            
                            //$(this).children("option").attr("disabled", "disabled");
                        }else{
                            $(this).removeAttr("readOnly");
                            $(this).removeClass("readOnly");
                            
                            //$(this).children("option").removeAttr("disabled");
                        }
                        */
                    });
                    
                    $elem.find("button").each(function() {
                        if (flag) {
                            $elem.addClass ("disable");
                        } else {
                            $elem.removeClass("disable");
                        }
                        $(this).cbElemDisable(flag, true);
                    });
                }
            }

        });
    };
    
    
    /**
     * init으로 선언된 컨트롤묶음 fireResource를 처리합니다.
     * @see PrimeWare-3.5.0
     * @see Spread-plugin-1.0.2.js 
     */
    CoreBase.prototype.executeFireResource = function () {
        if (corebase.fireResource == null || typeof(corebase.fireResource) == "undefined") {
            if ($.isFunction(corebase.firedInit)) {
                corebase.firedInit ();
            }
            return;
        }
        
        if (corebase.fireResource.length > 0) {
            var options  = {data:{}};
            var resource = {};
            
            options.wait  = false;

            $.each(corebase.fireResource, function (i, iobj) {
                options.data[ "fireResourceKeys_" + i] = iobj.data;
                resource    [ "fireResourceKeys_" + i] = iobj;
            });
            
            corebase.ajax(options , function (output, metadata) {
                $.each(output, function (id, data) {

                    if ($.isFunction(corebase.firedOption)) {
                        if (corebase.firedOption(data.result || data , resource[id].option, resource[id].elem, metadata)) {
                            return true;
                        }
                    }
                    resource[id].elem.cbBindData(data.result || data, resource[id].option);
                    resource[id] = null;
                    delete resource[id];
                });
                
                if ($.isFunction(corebase.firedInit)) {
                    corebase.firedInit ();
                }
            });
        } else {
            if ($.isFunction(corebase.firedInit)) {
                corebase.firedInit ();
            }
        }
        corebase.fireResource = null;
    };
    
    /**
     * generated uid
     * @returns
     */
    CoreBase.prototype.guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
    
    /**
     * replaceXss
     * @returns
     */
    CoreBase.prototype.replaceXss = function(text) {
        
        if (!text) {
            return "";
        }
        
        
        return text.replace(/<([\/ ]*script[ ]*)>/gi, '&lt;$1&gt;');
    };
    
})();

;(function (){
	

	;(function (){

		$.fn.cbwrap = function (){
			return $.fn;
		}
		
		$.cbwrap = function (){
			return $;
		}
		
		$.cbfind = function (context){
			return function (selector){
				return $(selector, context)
			}
		}
		
		$.fn.cbfind = function (){
			var $this = $(this);
			return function (selector){
				return $(selector);
			};
		}
		
		$.corebase = function (){
			return corebase;
		}
		
	})();
	
	CoreBase.prototype.wrapping = function (context, callback){
		return callback ($, $.cbfind(context), corebase);
	}
	
})();


/*******************************************************************************
 * @class
 * @since 2012
 * @auth www.buttle.co.kr
 * @version 4.0.0.0
 ******************************************************************************/
var corebase = new CoreBase();



/**
 * @class
 * @see corebase
 */
var CB = corebase;
var cb = corebase;


//--------------------------------------------------------------------------------
//메세지 관리자를 생성한다.
//--------------------------------------------------------------------------------
var CBMsg = new CoreBaseMsg();


//--------------------------------------------------------------------------------
//로거를 생성하여 기본로거로 만든다.
//--------------------------------------------------------------------------------
var CBLogger = new CoreBaseLogger("system");


;(function () {
    
    
    // 부가정보에 엑세스하기 위하여 변수를 선언한다.
    // status 메시지 표시줄
    // caption 제목표시줄
    var container = {
        status   : '#statusText' ,
        caption  : '#caption'    ,
        progress : '#statusImage'
    };

    /**
     * 제목표시줄에 내용을 표시한다.
     * @param src 표시할 제목
     */
    function setCaption (src) {
        window.title = src;
        var $caption = $(container.caption);
        if ($caption.length == 0) {
            return;
        }
        $caption.text (src);
    };

    var statusTimeout = -1;
    
    /**
     * 작업 표시줄에 메시지를 표시한다.
     * @param src  - 표시할 내용
     * @param leve - 표시의 방법
     */
    function setStatus (src, level) {
        if (CBData.isEmpty(src)) {
            return;
        }

        window.clearTimeout ( statusTimeout );

        var $status = $(container.status);
        if ($status.length == 0) {
            return;
        }
        
        $status.text (src).removeClass("error alert").addClass(level);
    };
    
    
    
    /**
     * 작업 중 프로그레스를 컨트롤 한다.
     * @param status 프로그레스 상태 on / off
     */
    function progress (status) {
        var $progress = $(container.progress);
        if ($progress.length == 0) {
            return;
        }
        
        if ($progress.hasClass(status)) {
            return;
        }
        $progress.removeClass("on off").addClass(status);
    }

    
    function toggleBlock (flag, hideblock, text) {
        
        if (document.readyState != "complete") {
            return;
        }
        
        var $focus = $(":focus");
        if ($focus.length > 0 && CB.emp(document.oldFocus)) {
            document.oldFocus = $focus;
        }
        
        if (flag) {
            
            function center (tgt) {
                
                var x = ($(window).width ()/2) - (tgt.width()  /2);
                var y = ($(window).height()/2) - (tgt.height() /2);

                tgt.css("top",parseInt(y)).css("left", parseInt(x));//,offset({left:x, top:parseInt(y)});
                
                return tgt;
            }
            
            var arr = [];

            // 2017.10.13 이전(기본패키지용)
//            arr.push("<div id='new_wrap' style='position:absolute; width:89px; height:89px;margin:0px;padding:0px;border:none;'>              ");
//            arr.push("<img src='" + CBConfig.contextPath + "/seize/resource/images/common/loading.gif' alt='로딩중입니다.' style='position:absolute;top:8px;left:19px;'/> ");

            // 29017.10.13 코웨이용 로딩이미지로 변경
            arr.push("<div id='new_wrap' style='position:absolute; width:140px; height:100px;margin:0px;padding:0px;border:none;'>              ");
            arr.push("<img src='" + CBConfig.contextPath + "/seize/resource/images/common/loading.gif' alt='loading...' style='position:absolute;top:0px;left:0px;'/> ");
            //arr.push("<img src='" + CBConfig.contextPath + "/seize/resource/images/common/loading_bg.png' alt='로딩중입니다.'/>                                           ");
            arr.push("</div>                                                                                                                   ");
            
            var html = $(arr.join(""));

            $.blockUI({
                title:null, 
                message:center(html),
                css:{top:top, left:0, width:'100%', padding:"0px", border:"0px", margin:"0px",cursor:"normal"},
                fadeIn:0,
                timeout:0,
                overlayCSS: { backgroundColor: '#999', opacity:0, cursor:"normal"}
            }); 
            
        }
        
        else {
            $.unblockUI ({
                fadeOut : 0
            });
        }
        
        return;
        
        
        var $container    = $("#__blockContainer");
        var $messageFrame = $("#__blockMessage");
        
        if ($container.length == 0) {

            $container = $('<div id="__blockContainer" style="padding:0px;margin:0px;z-index:999991;display:none;position:absolute;left:0;top:0;width:100%;height:100%;border:none;background-color:transparent"></div>').appendTo($("body"));
            $('<div id="__block" style="z-index:99992;border:none;padding:0px;margin:0px;position:absolute;width:100%;height:100%;top:0;left:0;background-color:#fff;background-color:transparent"></div>').css('opacity', '0').appendTo($container);
    
            $messageFrame = $('<iframe id="__blockMessage" frameborder="0" style="position:absolute;width:330px;height:90px;border:0;margin:0px;padding:0px;background:transparent;border:none; "></iframe>').appendTo($container);
    
            var blockDocument = $messageFrame.contents()[0];
            blockDocument.open(); 
            blockDocument.write ( "<!DOCTYPE html><html><body style='width:330px; height:90px; overflow:hidden; margin:0px;padding:0px;background:transparent;border:none;'><div id='new_wrap' style='width:330px; height:90px;margin:0px;padding:0px;border:none;'><img src='" + CBConfig.contextPath + "/seize/resource/images/common/loading.gif' alt='로딩중입니다.' style='position:absolute;top:8px;left:19px;'/><img src='" + CBConfig.contextPath + "/seize/resource/images/common/loading_bg.png' alt='로딩중입니다.'/></div></body></html>");
            blockDocument.close();
            center ($messageFrame);
        }
    
        if (flag) {
            //text = text || "처리 중 입니다.";
            //$messageFrame.contents().find("#message").text (text);
        }
        
        if (flag) {
            if (hideblock) {
                $("#__block").css("display", "none");
            } else {
                $("#__block").css("display", "");
            }
            center($messageFrame);
            
            $container.css("display", "");
        } else {
            $container.css("display", "none");
            if (CB.nemp(document.oldFocus)) {
                try {
                    if ($(":focus") != document.oldFocus) {
                        document.oldFocus.focus();
                    }
                } catch(e) {
                } finally {
                    document.oldFocus = null;
                }
            }
        }
        
    }
    
    CBMsg.out = function () {
        setStatus (corebase.parseArgs (arguments), "normal");
    };

    CBMsg.error = function () {
        var message = corebase.parseArgs (arguments);
        setStatus (message, "error");
        window.alert( message);
    };

    CBMsg.errorValid = function (source) {
        CBMsg.error(cb.locMessage("msg.226", "Send information is invalid.") + "\r\n", source.errorMessage);            
    };
    
    CBMsg.progress = function (status) {
        if (status) {
            progress ("on");
            toggleBlock (true);
            $("object.cbui-spread").each(function () {
                this.enabled = false;
            });
        } else {
            $("object.cbui-spread").each(function () {
                this.enabled = true;
            });
            progress ("off");
            toggleBlock (false);
        }
    };
    
    CBMsg.setCaption = setCaption;
    
    corebase.toggleBlock = toggleBlock;
    
    
}) ();


;(function (){

	$.fn.cbwrap = function (){
		return $.fn;
	}
	
	$.cbwrap = function (){
		return $;
	}
	
	$.cbfind = function (context){
		return function (selector){
			return $(selector, context)
		}
	}
	
	$.fn.cbfind = function (){
		var $this = $(this);
		return function (selector){
			return $(selector);
		};
	}
	
	$.corebase = function (){
		return corebase;
	}
	
})();
