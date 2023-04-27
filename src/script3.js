// Wait for the page to finish loading before running any JavaScript
window.addEventListener("load", function() {

    const artistImage = document.getElementById('artist-image');

artistImage.addEventListener('click', () => {
  artistImage.classList.toggle('zoomed');
});
    // Get references to HTML elements
    const ratingForm = document.getElementById("rating-form");
    const ratingTable = document.getElementById("rating-table");
    const countdownTimer = document.getElementById("countdown-timer");

    // Add event listener to rating form submit button
    function submitRating() {
      // Get input values from rating form
    const username = document.getElementById("username-input").value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const review = document.getElementById("review-input").value;
      // Create new row in rating table with input values
    const newRow = ratingTable.insertRow();
    const nameCell = newRow.insertCell(0);
    const ratingCell = newRow.insertCell(1);    
    const reviewCell = newRow.insertCell(2);
    nameCell.innerHTML = username;
    ratingCell.innerHTML = rating;
    reviewCell.innerHTML = review;

    newRow.style.backgroundColor = "white";
  newRow.style.color = "black";
  newRow.style.fontWeight = "bold";
      // Reset rating form
    ratingForm.reset();
    }
    ratingForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent page from reloading
      submitRating();
    });

    // Set countdown timer to album release date
    const releaseDate = new Date("2023-06-01T00:00:00Z");
    
        function updateCountdown() {
      const now = new Date();
      const diff = releaseDate - now;
      if (diff < 0) {
        countdownTimer.textContent = "Album released!";
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        countdownTimer.style.color = "antiquewhite";
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

// Fetch and display ratings from external API
    fetch("https://example.com/api/ratings")
      .then(response => response.json())
      .then(data => {
        data.forEach(rating => {
          const newRow = ratingTable.insertRow(-1);
          const nameCell = newRow.insertCell(0);
          const ratingCell = newRow.insertCell(1);
          const reviewCell = newRow.insertCell(2);
          nameCell.textContent = rating.username;
          ratingCell.textContent = rating.rating;
          reviewCell.textContent = rating.review;
        });
      })
      .catch(error => {
        console.error(error);
      });

  });


let ind1 = 0;
window.onload = function () {
    var trig = document.getElementById("typing-effect");
const text="ARMAAN MALIK";
    function type1() {
        trig.innerHTML += text.charAt(ind1);
        ind1++;
        setTimeout(type1, 200);
    }
    type1();
}