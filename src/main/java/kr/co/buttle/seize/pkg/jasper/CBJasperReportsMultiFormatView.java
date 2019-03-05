package kr.co.buttle.seize.pkg.jasper;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsCsvView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsXlsView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsXlsxView;

import net.sf.jasperreports.engine.JasperPrint;

public class CBJasperReportsMultiFormatView extends JasperReportsMultiFormatView {

    public static final String DEFAULT_FILE_NAME_KEY = "fileName";

    public static final String JR_FORMAT_CSV = "csv";
    public static final String JR_FORMAT_HTML = "html";
    public static final String JR_FORMAT_PDF = "pdf";
    public static final String JR_FORMAT_XLS = "xls";
    public static final String JR_FORMAT_XLSX = "xlsx";
    public static final String JR_FORMAT_DOCX = "docx";

    public CBJasperReportsMultiFormatView() {
        Map<String, Class<? extends AbstractJasperReportsView>> formatMappings = new HashMap<String, Class<? extends AbstractJasperReportsView>>(
                4);
        formatMappings.put(JR_FORMAT_CSV, JasperReportsCsvView.class);
        formatMappings.put(JR_FORMAT_HTML, JasperReportsHtmlView.class);
        formatMappings.put(JR_FORMAT_PDF, JasperReportsPdfView.class);
        formatMappings.put(JR_FORMAT_XLS, JasperReportsXlsView.class);
        formatMappings.put(JR_FORMAT_XLSX, JasperReportsXlsxView.class);
        formatMappings.put(JR_FORMAT_DOCX, JasperReportsDocxView.class);
        this.setFormatMappings(formatMappings);
    }

    @Override
    protected void renderReport(JasperPrint populatedReport, Map<String, Object> model, HttpServletResponse response)
            throws Exception {
        String fileName = (String) model.get(DEFAULT_FILE_NAME_KEY);
        String format = (String) model.get(DEFAULT_FORMAT_KEY);
        
        // 2018.10.26 김상휘
        // Jasper Report 를 PDF.JS로 랜더링하기 위하여 파일포멧이 pdf일 경우 inline으로 변경
        if (format.equals("pdf")) {
            response.setHeader("Content-Disposition", "inline; filename=" + fileName + "." + format);
        } else {
        	response.setHeader("Content-Disposition", "attachment; filename=" + fileName + "." + format);
        }
        response.setHeader("Content-Transfer-Encoding", "binary");

        super.renderReport(populatedReport, model, response);
    }

}
