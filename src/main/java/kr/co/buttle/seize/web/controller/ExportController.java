package kr.co.buttle.seize.web.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kr.co.buttle.corebase.core.util.StringUtil;
import kr.co.buttle.corebase.web.dto.InputDto;
import kr.co.buttle.corebase.web.dto.OutputDto;
import kr.co.buttle.corebase.web.dto.domain.Input;
import kr.co.buttle.corebase.web.dto.domain.Output;
import kr.co.buttle.corebase.web.exception.CBException;
import kr.co.buttle.corebase.web.service.CommonService;
import kr.co.buttle.corebase.web.session.SessionUtil;
import kr.co.buttle.seize.pkg.excel.CBXlsView;
import kr.co.buttle.seize.pkg.i18n.LocaleManager;
import kr.co.buttle.seize.pkg.jasper.JasperReportsUtil;
import kr.co.buttle.seize.pkg.spread.Header;
import kr.co.buttle.seize.pkg.spread.Spread;
import kr.co.buttle.seize.pkg.spread.SpreadUtil;
import kr.co.buttle.seize.pkg.util.ExportUtil;
import kr.co.buttle.seize.pkg.util.MapResourceBundle;

@Controller
public class ExportController {
	protected CommonService service;

	public void setService(CommonService service) {
		this.service = service;
	}
	
	@RequestMapping("/exportReport.do")
	public ModelAndView exportReport(@RequestBody InputDto inputDto) {
		List<Input> inputs = inputDto.getInput();
		
		if (inputs.size() == 0) {
			throw new CBException("NO_INPUTS");
		}
		
		Input input = inputs.get(inputs.size() - 1);
		Map<String, Object> header = (Map<String, Object>) input.getHeader();
		Map<String, Object> exportParam = (Map<String, Object>) header.get("exportParam");
		List<Header> headers = SpreadUtil.convertMapToHeader((List<Map>) exportParam.get("headers"));
		String viewName = (String) exportParam.get("programId");
		String fileName = (String) exportParam.get("fileName");
		String format = (String) exportParam.get("format");
		String locale = (String) SessionUtil.getAttribute("locale");
		
		if (StringUtils.isEmpty(format)) {
			format = JasperReportsUtil.JR_FORMAT_PDF;
		}
		
		OutputDto outputDto = service.transaction(inputDto);
		
		Output output = outputDto.getOutput().get(input.getResultname());
		
		Map<String, Object> parameters = exportParam;
		parameters.put("REPORT_LOCALE", Locale.forLanguageTag(locale));
		parameters.put("REPORT_RESOURCE_BUNDLE", new MapResourceBundle(LocaleManager.getInstance().getMsgMap(locale)));
		
		return JasperReportsUtil.render(
				viewName,
				parameters,
				convertDataFormat((List<?>) output.getResult(), headers),
				fileName,
				format);
	}
	
	@RequestMapping("/exportExcel.do")
	public ModelAndView exportExcel(@RequestBody InputDto inputDto) {
		List<Input> inputs = inputDto.getInput();
		
		if (inputs.size() == 0) {
			throw new CBException("NO_INPUTS");
		}
		
		Input input = inputs.get(inputs.size() - 1);
		Map<String, Object> header = (Map<String, Object>) input.getHeader();
		Map<String, Object> exportParam = (Map<String, Object>) header.get("exportParam");
		String fileName = (String) exportParam.get("fileName");
		String title = (String) exportParam.get("title");
		//String format = (String) exportParam.get("format");
		String detail = (String) exportParam.get("detail");
		List<Header> headers = SpreadUtil.convertMapToHeader((List<Map>) exportParam.get("headers"));
		
		OutputDto outputDto = service.transaction(inputDto);
		
		Output output = outputDto.getOutput().get(input.getResultname());
		
		Spread spread = new Spread(title, detail, headers, convertDataFormat((List<?>) output.getResult(), headers));
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("fileName", fileName);
		model.put("spread", spread);
		
        return new ModelAndView(new CBXlsView(), model);
	}
	
	protected List<?> convertDataFormat(List<?> dataList, List<Header> header) {
		Locale locale = Locale.forLanguageTag((String) SessionUtil.getAttributeByUserInfo("GBL_NATION_CD"));
		
		// 그리드에서 포맷 적용할 컬럼 검색 (type, format로 구분)
		for (Header field : header) {
			String type = field.getType(),
				   format = field.getFormat();
			// 포맷 적용할 컬럼 변환하여 적용
			if (!StringUtil.isNull(type) && !StringUtil.isNull(format)) {
				String fieldName = field.getField();
				for (Object data : dataList) {
					Map map = (Map) data;
					Object value = map.get(fieldName);
					if (value != null) {
						try {
							// 포맷 변환하여 데이터 변경 (등록된 Type이 없으면 기존 데이터 그대로 사용)
							map.put(fieldName, ExportUtil.setFormat(value, type, format, locale));
						} catch (ParseException e) {
							// 데이터 포맷 변환 실패시 처리 없음.(기존 데이터 그대로 사용)
						}
					}
				}
			}
		}
		
		return dataList;
	}
}
