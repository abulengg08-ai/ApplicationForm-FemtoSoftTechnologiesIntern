package backend.service;

import backend.dto.ApplicationRequest;
import backend.entity.Application;
import org.springframework.web.multipart.MultipartFile;

public interface ApplicationService {

    Application saveApplication(ApplicationRequest request,
                                MultipartFile resume);

}