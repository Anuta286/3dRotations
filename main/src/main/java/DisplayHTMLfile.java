import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class DisplayHTMLfile extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream("First.html"))) {
            inputStream.transferTo(resp.getOutputStream());
        }
        System.out.println("HTML file" + req.getRequestURI());
    }
}