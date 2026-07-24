package backend.service.impl;

import backend.dto.ApplicationRequest;
import backend.entity.Application;
import backend.repository.ApplicationRepository;
import backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    private final String UPLOAD_DIR = "uploads/";

    @Override
    public Application saveApplication(ApplicationRequest request,
                                       MultipartFile resume) {

        try {

            // Create uploads folder if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique file name
            String fileName = UUID.randomUUID() + "_" + resume.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(resume.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            Application application = Application.builder()
                    .fullName(request.getFullName())
                    .email(request.getEmail())
                    .phone(request.getPhone())
                    .collegeName(request.getCollegeName())
                    .domain(request.getDomain())
                    .message(request.getMessage())
                    .resumePath(fileName)
                    .createdAt(LocalDateTime.now())
                    .build();

            return applicationRepository.save(application);

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload resume.");
        }
    }
}