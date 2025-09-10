(() => {
  // --- DATA ---
  const internships = [
    {
      title: "Frontend Developer Intern",
      company: "Web Innovators Inc.",
      location: "Remote",
      skills: ["html", "css", "javascript", "react"],
      logo: "https://placehold.co/100x100/6366f1/ffffff?text=WI",
    },
    {
      title: "Backend Engineer Intern",
      company: "Data Solutions Ltd.",
      location: "New York, NY",
      skills: ["python", "django", "sql"],
      logo: "https://placehold.co/100x100/ec4899/ffffff?text=DS",
    },
    {
      title: "Full-Stack Intern",
      company: "CodeGenius",
      location: "San Francisco, CA",
      skills: ["python", "javascript", "html", "css", "react", "sql"],
      logo: "https://placehold.co/100x100/f59e0b/ffffff?text=CG",
    },
    {
      title: "Software Development Intern (C++)",
      company: "High-Frequency Systems",
      location: "Chicago, IL",
      skills: ["cpp", "linux"],
      logo: "https://placehold.co/100x100/10b981/ffffff?text=HFS",
    },
    {
      title: "Game Development Intern",
      company: "PixelPlay Games",
      location: "Austin, TX",
      skills: ["csharp", "unity"],
      logo: "https://placehold.co/100x100/8b5cf6/ffffff?text=PPG",
    },
    {
      title: "Web Design Intern",
      company: "Creative Minds",
      location: "Remote",
      skills: ["html", "css", "figma"],
      logo: "https://placehold.co/100x100/3b82f6/ffffff?text=CM",
    },
    {
      title: ".NET Developer Intern",
      company: "Enterprise Software Co.",
      location: "Boston, MA",
      skills: ["csharp", ".net", "sql"],
      logo: "https://placehold.co/100x100/ef4444/ffffff?text=ESC",
    },
    {
      title: "Data Science Intern",
      company: "Analytics Forward",
      location: "Remote",
      skills: ["python", "pandas", "sql"],
      logo: "https://placehold.co/100x100/22c55e/ffffff?text=AF",
    },
  ];

  // --- DOM ELEMENTS ---
  const skillsFilterContainer = document.getElementById("skills-filter");
  const internshipListingsContainer = document.getElementById("internship-listings");
  const noResultsContainer = document.getElementById("no-results");

  // --- STATE ---
  const selectedSkills = new Set();

  // --- UTILITY FUNCTIONS ---
  const getFormattedSkillName = (skill) => {
    const skillNameMap = {
      cpp: "C++",
      csharp: "C#",
      ".net": ".NET",
      html: "HTML",
      css: "CSS",
    };
    return skillNameMap[skill] || skill.charAt(0).toUpperCase() + skill.slice(1);
  };

  const getAllSkills = (internshipData) => {
    const allSkills = new Set();
    internshipData.forEach((internship) => {
      internship.skills.forEach((skill) => allSkills.add(skill));
    });
    return [...allSkills].sort();
  };

  // --- RENDER FUNCTIONS ---
  const renderSkillsFilters = () => {
    const uniqueSkills = getAllSkills(internships);
    skillsFilterContainer.innerHTML = uniqueSkills
      .map(
        (skill) => `
          <label for="${skill}" class="flex items-center cursor-pointer hover:text-indigo-600 transition-colors">
            <input type="checkbox" id="${skill}" name="skill" value="${skill}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <span class="ml-3 text-gray-700">${getFormattedSkillName(skill)}</span>
          </label>
        `
      )
      .join("");
  };

  const renderInternships = () => {
    internshipListingsContainer.innerHTML = internships
      .map(
        (internship, index) => `
          <div id="internship-${index}" class="internship-card bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div class="flex items-center mb-4">
              <img src="${internship.logo}" alt="${internship.company} logo" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900">${internship.title}</h3>
                <p class="text-gray-600">${internship.company}</p>
                <p class="text-sm text-gray-500 mt-1">${internship.location}</p>
              </div>
            </div>
            <div class="mt-auto pt-4 border-t border-gray-200">
              <h4 class="font-semibold text-sm mb-2">Required Skills:</h4>
              <div class="flex flex-wrap gap-2">
                ${internship.skills
                  .map(
                    (skill) =>
                      `<span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">${getFormattedSkillName(
                        skill
                      )}</span>`
                  )
                  .join("")}
              </div>
            </div>
          </div>
        `
      )
      .join("");
  };

  // --- FILTERING LOGIC ---
  const applyFilters = () => {
    let visibleCount = 0;
    // Get all rendered cards from the DOM once for efficiency
    const internshipCards = document.querySelectorAll(".internship-card");

    internshipCards.forEach((card, index) => {
      const internshipData = internships[index];
      const hasAllSelectedSkills = [...selectedSkills].every((skill) =>
        internshipData.skills.includes(skill)
      );

      if (hasAllSelectedSkills) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    noResultsContainer.classList.toggle("hidden", visibleCount > 0);
  };

  // --- EVENT LISTENERS ---
  const handleFilterChange = (event) => {
    // Ensure the event target is a skill checkbox
    if (event.target.name !== "skill") return;

    const skill = event.target.value;
    if (event.target.checked) {
      selectedSkills.add(skill);
    } else {
      selectedSkills.delete(skill);
    }
    
    applyFilters();
  };

  // --- INITIALIZATION ---
  const initializeApp = () => {
    // Attach event listener using event delegation
    skillsFilterContainer.addEventListener("change", handleFilterChange);
    
    // Initial render of the page content
    renderSkillsFilters();
    renderInternships();
  };

  // Run the app once the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", initializeApp);
})();