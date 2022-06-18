package tomcat;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.Wrapper;
import org.apache.catalina.connector.Connector;
import org.apache.catalina.startup.Tomcat;
import org.apache.coyote.AbstractProtocol;
import org.apache.tomcat.util.threads.TaskQueue;
import org.apache.tomcat.util.threads.TaskThreadFactory;
import org.apache.tomcat.util.threads.ThreadPoolExecutor;

import java.util.concurrent.TimeUnit;

public class TomcatStarter {
    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        tomcat.setBaseDir(System.getProperty("java.io.tmpdir"));
        Context context = tomcat.addContext("", null);

        Connector connector = new Connector();
        connector.setPort(8080);
        @SuppressWarnings("rawtypes") AbstractProtocol protocolHandler = (AbstractProtocol) connector.getProtocolHandler();
        protocolHandler.setExecutor(createExecutor());
        addHelloWorldServlet(context);
        addDisplayFileServlet(context);
        addDataServlet(context);
        addDrawingServlet(context);

        tomcat.setConnector(connector);
        tomcat.start();
        tomcat.getServer().await();
    }

    private static void addHelloWorldServlet(Context context) {
        Wrapper servlet = context.createWrapper();
        servlet.setName("hello-world");
        servlet.setServletClass("tomcat.HelloWorld");

        context.addChild(servlet);
        context.addServletMappingDecoded("/hi", "hello-world");
    }

    private static void addDisplayFileServlet(Context context) {
        Wrapper servlet = context.createWrapper();
        servlet.setName("display-file");
        servlet.setServletClass("tomcat.DisplayFile");

        context.addChild(servlet);
        context.addServletMappingDecoded("/", "display-file");
    }

    private static void addDataServlet(Context context) {
        Wrapper servlet = context.createWrapper();
        servlet.setName("data-servlet");
        servlet.setServletClass("tomcat.DataServlet");

        context.addChild(servlet);
        context.addServletMappingDecoded("/data", "data-servlet");
    }

    private static void addDrawingServlet(Context context) {
        Wrapper servlet = context.createWrapper();
        servlet.setName("drawing-servlet");
        servlet.setServletClass("tomcat.DrawingServlet");

        context.addChild(servlet);
        context.addServletMappingDecoded("/drawing/*", "drawing-servlet");
    }

    private static ThreadPoolExecutor createExecutor() {
        return new ThreadPoolExecutor(3, 5, 60, TimeUnit.SECONDS, new TaskQueue(), new TaskThreadFactory("tomcat", true, 1));
    }
}
