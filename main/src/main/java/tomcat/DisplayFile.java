package tomcat;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;

@SuppressWarnings("unused")
public class DisplayFile extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        File file = Paths.get("src/main/static", req.getRequestURI().substring(1)).toFile();
        if(!file.exists()) {
            resp.setStatus(404);
            return;
        }
        try (BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream(file))) {
            inputStream.transferTo(resp.getOutputStream());
        }
        System.out.println("File" + req.getRequestURI());
    }
}