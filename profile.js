document.addEventListener('DOMContentLoaded', () => {
  const skillsTextarea = document.getElementById('skills');
  const suggestionsContainer = document.getElementById('suggestions-container');

  const suggestedSkills = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB',
    'Project Management', 'Data Analysis', 'Machine Learning', 'UI/UX Design',
    'Marketing', 'Communication', 'Leadership', 'Problem Solving',
    'Team Collaboration', 'Agile', 'Scrum', 'Git', 'AWS', 'Docker'
  ];

  // Function to render suggestion buttons
  const renderSuggestions = () => {
    suggestionsContainer.innerHTML = suggestedSkills.map(skill =>
      `<button type="button" class="suggestion-tag">${skill}</button>`
    ).join('');
  };

  // Function to handle click on a suggestion
  const handleSuggestionClick = (event) => {
    if (!event.target.classList.contains('suggestion-tag')) {
      return; // Exit if the click was not on a suggestion button
    }

    const clickedSkill = event.target.textContent;
    const currentSkills = skillsTextarea.value
      .split(',')
      .map(s => s.trim())
      .filter(s => s); // Filter out empty strings

    // Add skill only if it's not already in the list
    if (!currentSkills.includes(clickedSkill)) {
      if (skillsTextarea.value.trim() === '') {
        skillsTextarea.value = clickedSkill;
      } else {
        skillsTextarea.value += `, ${clickedSkill}`;
      }
      skillsTextarea.focus();
    }
  };

  // Initial setup
  renderSuggestions();
  suggestionsContainer.addEventListener('click', handleSuggestionClick);
});
