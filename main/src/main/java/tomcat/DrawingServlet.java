package tomcat;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

@SuppressWarnings("unused")
public class DrawingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        FileReader fr = new FileReader("text.txt");
        Scanner scan = new Scanner(fr);
        StringBuilder result = new StringBuilder();
        while (scan.hasNextLine()) {
             result.append(scan.nextLine());
        }
        fr.close();
        resp.getOutputStream().write(result.toString().getBytes(StandardCharsets.UTF_8));
    }
}
