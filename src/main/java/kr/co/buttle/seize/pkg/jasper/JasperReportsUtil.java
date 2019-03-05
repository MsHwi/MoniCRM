package kr.co.buttle.seize.pkg.jasper;

import java.util.Collection;
import java.util.Map;

import org.springframework.web.servlet.ModelAndView;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public final class JasperReportsUtil {

    public static final String KEY_DATA = "data";
    public static final String KEY_FORMAT = CBJasperReportsMultiFormatView.DEFAULT_FORMAT_KEY;
    public static final String KEY_FILE_NAME = CBJasperReportsMultiFormatView.DEFAULT_FILE_NAME_KEY;

    public static final String JR_FORMAT_CSV = CBJasperReportsMultiFormatView.JR_FORMAT_CSV;
    public static final String JR_FORMAT_HTML = CBJasperReportsMultiFormatView.JR_FORMAT_HTML;
    public static final String JR_FORMAT_PDF = CBJasperReportsMultiFormatView.JR_FORMAT_PDF;
    public static final String JR_FORMAT_XLS = CBJasperReportsMultiFormatView.JR_FORMAT_XLS;
    public static final String JR_FORMAT_XLSX = CBJasperReportsMultiFormatView.JR_FORMAT_XLSX;
    public static final String JR_FORMAT_DOCX = CBJasperReportsMultiFormatView.JR_FORMAT_DOCX;

    public static final String DEFAULT_ROOT_PATH = "reports/";

    private JasperReportsUtil() {
    }

    @SuppressWarnings("rawtypes")
    public static JRDataSource convertReportData(Object value) throws IllegalArgumentException {
        if (value instanceof JRDataSource) {
            return (JRDataSource) value;
        } else if (value instanceof Collection) {
            return new JRBeanCollectionDataSource((Collection) value);
        } else if (value instanceof Object[]) {
            return new JRBeanArrayDataSource((Object[]) value);
        } else {
            Object[] array = new Object[1];
            array[0] = value;
            return new JRBeanArrayDataSource(array);
        }
    }

    public static ModelAndView render(String viewName, Map<String, ?> parameter, Object reportData, String fileName,
            String format) {
        return render(DEFAULT_ROOT_PATH, viewName, parameter, reportData, fileName, format);
    }

    public static ModelAndView render(String rootPath, String viewName, Map<String, ?> parameter, Object reportData,
            String fileName, String format) {
        if (!rootPath.endsWith("/")) {
            rootPath += "/";
        }

        ModelAndView mav = new ModelAndView(rootPath + viewName, parameter);
        mav.addObject(KEY_FILE_NAME, fileName);
        mav.addObject(KEY_FORMAT, format);
//        mav.addObject(KEY_DATA, convertReportData(reportData));

        return mav;
    }

}
