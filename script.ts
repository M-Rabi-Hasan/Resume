import html2pdf from 'html2pdf.js';

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-builder-form") as HTMLFormElement;
    const resumeContent = document.getElementById("resume-content") as HTMLDivElement;

    const makeEditable = (element: HTMLElement, placeholder: string) => {
        element.setAttribute("contenteditable", "true");
        element.classList.add("editable");
        element.setAttribute("title", `Click to edit your ${placeholder}`);
    };

    form.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const school = (document.getElementById("school") as HTMLInputElement).value;
        const degree = (document.getElementById("degree") as HTMLInputElement).value;
        const gradYear = (document.getElementById("gradYear") as HTMLInputElement).value;
        const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement).value;
        const company = (document.getElementById("company") as HTMLInputElement).value;
        const jobDescription = (document.getElementById("jobDescription") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
        const username = (document.getElementById("username") as HTMLInputElement).value;

        resumeContent.innerHTML = `
            <h3 id="editable-name">${name}</h3>
            <p><strong>Email:</strong> <span id="editable-email">${email}</span></p>
            <h4>Education</h4>
            <p id="editable-education">${degree}, ${school}, ${gradYear}</p>
            <h4>Work Experience</h4>
            <p><strong id="editable-jobTitle">${jobTitle}</strong> at <span id="editable-company">${company}</span></p>
            <p id="editable-jobDescription">${jobDescription}</p>
            <h4>Skills</h4>
            <p id="editable-skills">${skills.split(",").map(skill => skill.trim()).join(", ")}</p>
        `;

        localStorage.setItem(`resume_${username}`, JSON.stringify({ name, email, school, degree, gradYear, jobTitle, company, jobDescription, skills }));

        const uniqueUrl = `${window.location.origin}/resume.html?user=${username}`;
        alert(`Your resume has been created! Share it here: ${uniqueUrl}`);
        window.location.href = `resume.html?user=${username}`;

        makeEditable(document.getElementById("editable-name") as HTMLElement, "name");
        makeEditable(document.getElementById("editable-email") as HTMLElement, "email");
        makeEditable(document.getElementById("editable-education") as HTMLElement, "education");
        makeEditable(document.getElementById("editable-jobTitle") as HTMLElement, "job title");
        makeEditable(document.getElementById("editable-company") as HTMLElement, "company");
        makeEditable(document.getElementById("editable-jobDescription") as HTMLElement, "job description");
        makeEditable(document.getElementById("editable-skills") as HTMLElement, "skills");
    });

    const downloadButton = document.getElementById("download-pdf");
    downloadButton?.addEventListener("click", () => {
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        if (resumeContent) {
            html2pdf().from(resumeContent).set(opt).save();
        }
    });
});
