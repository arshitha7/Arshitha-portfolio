// Smooth scrolling for navbar links
// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Contact Form Submission with AJAX
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Disable the submit button to prevent multiple submissions
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Collect form data
    const formData = new FormData(form);

    try {
      // Send the form data to Formspree
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      // Check if the submission was successful
      if (response.ok) {
        status.innerHTML = 'Boom! Message sent. I’ll be in touch soon!'; // Success message
        status.style.color = '#00bcd4'; // Green color for success
        form.reset(); // Clear the form
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      status.innerHTML = 'Oops! Something went wrong. Please try again.'; // Error message
      status.style.color = '#ff6f61'; // Red color for error
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}