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
        AbstractProtocol protocolHandler = (AbstractProtocol) connector.getProtocolHandler();
        protocolHandler.setExecutor(createExecutor());
        addHelloWorldServlet(context);
        addDisplayHTMLfileServlet(context);

        tomcat.setConnector(connector);
        tomcat.start();
        tomcat.getServer().await();
    }

    private static void addHelloWorldServlet(Context context) {
        Wrapper servlet = context.createWrapper();
        servlet.setName("hello-world");
        servlet.setServletClass("HelloWorld");

        context.addChild(servlet);
        context.addServletMappingDecoded("/hi", "hello-world");
    }

    private static void addDisplayHTMLfileServlet(Context context) {
        Wrapper servlet = context.createWrapper();
        servlet.setName("display-HTML-file");
        servlet.setServletClass("DisplayHTMLfile");

        context.addChild(servlet);
        context.addServletMappingDecoded("/First.html", "display-HTML-file");
    }

    private static ThreadPoolExecutor createExecutor() {
        return new ThreadPoolExecutor(3, 5, 60, TimeUnit.SECONDS, new TaskQueue(), new TaskThreadFactory("tomcat", true, 1));
    }
}
