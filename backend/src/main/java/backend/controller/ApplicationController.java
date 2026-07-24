package backend.controller;

import backend.dto.ApplicationRequest;
import backend.entity.Application;
import backend.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Application submitApplication(
            @Valid @ModelAttribute ApplicationRequest request,
            @RequestParam("resume") MultipartFile resume) {

        return applicationService.saveApplication(request, resume);
    }
}