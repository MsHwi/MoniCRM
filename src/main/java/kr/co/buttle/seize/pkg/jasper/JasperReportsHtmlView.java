package kr.co.buttle.seize.pkg.jasper;

import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView;

public class JasperReportsHtmlView extends AbstractJasperReportsSingleFormatView {

    public JasperReportsHtmlView() {
        setContentType("text/html");
    }

	@SuppressWarnings({ "deprecation", "rawtypes" })
	@Override
    protected net.sf.jasperreports.engine.JRExporter createExporter() {
        return new net.sf.jasperreports.engine.export.HtmlExporter();
    }

    @Override
    protected boolean useWriter() {
        return false;
    }

}
