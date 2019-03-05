package kr.co.buttle.seize.pkg.jasper;

import org.springframework.web.servlet.view.jasperreports.AbstractJasperReportsSingleFormatView;

public class JasperReportsDocxView extends AbstractJasperReportsSingleFormatView {

    public JasperReportsDocxView() {
        setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    }

    @SuppressWarnings({ "deprecation", "rawtypes" })
	@Override
    protected net.sf.jasperreports.engine.JRExporter createExporter() {
        return new net.sf.jasperreports.engine.export.ooxml.JRDocxExporter();
    }

    @Override
    protected boolean useWriter() {
        return false;
    }

}
