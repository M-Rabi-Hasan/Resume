"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2pdf_js_1 = require("html2pdf.js");
window.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-builder-form");
    var resumeContent = document.getElementById("resume-content");
    // Function to make an element editable
    var makeEditable = function (element, placeholder) {
        element.setAttribute("contenteditable", "true");
        element.classList.add("editable");
        element.setAttribute("title", "Click to edit your ".concat(placeholder));
    };
    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page
        // Capture user inputs
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var school = document.getElementById("school").value;
        var degree = document.getElementById("degree").value;
        var gradYear = document.getElementById("gradYear").value;
        var jobTitle = document.getElementById("jobTitle").value;
        var company = document.getElementById("company").value;
        var jobDescription = document.getElementById("jobDescription").value;
        var skills = document.getElementById("skills").value;
        var username = document.getElementById("username").value;
        // Generate the resume content with editable elements
        resumeContent.innerHTML = "\n            <h3 id=\"editable-name\">".concat(name, "</h3>\n            <p><strong>Email:</strong> <span id=\"editable-email\">").concat(email, "</span></p>\n            <h4>Education</h4>\n            <p id=\"editable-education\">").concat(degree, ", ").concat(school, ", ").concat(gradYear, "</p>\n            <h4>Work Experience</h4>\n            <p><strong id=\"editable-jobTitle\">").concat(jobTitle, "</strong> at <span id=\"editable-company\">").concat(company, "</span></p>\n            <p id=\"editable-jobDescription\">").concat(jobDescription, "</p>\n            <h4>Skills</h4>\n            <p id=\"editable-skills\">").concat(skills.split(",").map(function (skill) { return skill.trim(); }).join(", "), "</p>\n        ");
        // Save the resume data in localStorage using username as key
        var resumeData = {
            name: name,
            email: email,
            school: school,
            degree: degree,
            gradYear: gradYear,
            jobTitle: jobTitle,
            company: company,
            jobDescription: jobDescription,
            skills: skills,
        };
        localStorage.setItem("resume_".concat(username), JSON.stringify(resumeData));
        // Create the unique URL
        var uniqueUrl = "".concat(window.location.origin, "/resume.html?user=").concat(username);
        // Display the shareable link
        alert("Your resume has been created! Share it here: ".concat(uniqueUrl));
        // Optionally, redirect to a view page (resume.html) if you create one
        window.location.href = "resume.html?user=".concat(username);
        // Make certain elements editable
        makeEditable(document.getElementById("editable-name"), "name");
        makeEditable(document.getElementById("editable-email"), "email");
        makeEditable(document.getElementById("editable-education"), "education");
        makeEditable(document.getElementById("editable-jobTitle"), "job title");
        makeEditable(document.getElementById("editable-company"), "company");
        makeEditable(document.getElementById("editable-jobDescription"), "job description");
        makeEditable(document.getElementById("editable-skills"), "skills");
    });
    // Add download PDF functionality
    var downloadButton = document.getElementById("download-pdf");
    downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener("click", function () {
        var resumeContent = document.getElementById("resume-content");
        var opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        if (resumeContent) {
            (0, html2pdf_js_1.default)().from(resumeContent).set(opt).save();
        }
    });
});
