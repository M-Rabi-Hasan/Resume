document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const resumeContent = document.getElementById('resume-content');
    const downloadBtn = document.getElementById('download-pdf');
    const copyLinkBtn = document.getElementById('copy-link');
    
    // Load saved form data from localStorage
    const savedData = JSON.parse(localStorage.getItem('resumeData'));
    if (savedData) {
        document.getElementById('name').value = savedData.name || '';
        document.getElementById('email').value = savedData.email || '';
        document.getElementById('degree').value = savedData.degree || '';
        document.getElementById('school').value = savedData.school || '';
        document.getElementById('gradYear').value = savedData.gradYear || '';
        document.getElementById('jobTitle').value = savedData.jobTitle || '';
        document.getElementById('company').value = savedData.company || '';
        document.getElementById('jobDescription').value = savedData.jobDescription || '';
        document.getElementById('skills').value = savedData.skills || '';
    }

    // Function to show validation messages
    function showValidationError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        input.parentNode.appendChild(errorElement);
    }

    // Remove validation messages
    function clearValidationMessages() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
    }

    // Save form data to localStorage on input change
    form.addEventListener('input', function() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            degree: document.getElementById('degree').value,
            school: document.getElementById('school').value,
            gradYear: document.getElementById('gradYear').value,
            jobTitle: document.getElementById('jobTitle').value,
            company: document.getElementById('company').value,
            jobDescription: document.getElementById('jobDescription').value,
            skills: document.getElementById('skills').value
        };
        localStorage.setItem('resumeData', JSON.stringify(formData));
    });

    // Event listener for form submission to generate the resume
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from reloading the page
        clearValidationMessages(); // Clear previous error messages

        // Get values from the form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const degree = document.getElementById('degree').value;
        const school = document.getElementById('school').value;
        const gradYear = document.getElementById('gradYear').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const company = document.getElementById('company').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const skills = document.getElementById('skills').value.split(','); // Split skills by comma

        // Simple form validation
        let valid = true;
        if (!email.includes('@')) {
            showValidationError(document.getElementById('email'), 'Please enter a valid email.');
            valid = false;
        }
        const currentYear = new Date().getFullYear();
        if (gradYear > currentYear) {
            showValidationError(document.getElementById('gradYear'), 'Graduation year cannot be in the future.');
            valid = false;
        }
        if (!valid) return;

        // Generate resume HTML content
        const resumeHTML = `
            <h2>${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>School:</strong> ${school} (${gradYear})</p>
            <p><strong>Job Title:</strong> ${jobTitle}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Job Description:</strong> ${jobDescription}</p>
            <p><strong>Skills:</strong> ${skills.map(skill => `<span>${skill.trim()}</span>`).join(', ')}</p>
        `;

        // Inject the generated content into the resume section
        resumeContent.innerHTML = resumeHTML;
    });

    // Event listener for downloading the resume as a PDF
    downloadBtn.addEventListener('click', function() {
        const element = document.getElementById('resume-content');
        
        // Use html2pdf to generate and save the PDF
        html2pdf().from(element).set({
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save();
    });

    // Event listener to copy link with query parameters
    copyLinkBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const url = new URL(window.location.href);

        // Append form data to URL as query parameters
        url.searchParams.set('name', name);
        url.searchParams.set('jobTitle', jobTitle);

        // Copy the updated URL
        navigator.clipboard.writeText(url.toString()).then(function() {
            alert('Link with resume data copied to clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    });

    // On page load, check if URL has query parameters and fill the form
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    const jobTitleParam = urlParams.get('jobTitle');

    if (nameParam && jobTitleParam) {
        document.getElementById('name').value = nameParam;
        document.getElementById('jobTitle').value = jobTitleParam;
    }
});
