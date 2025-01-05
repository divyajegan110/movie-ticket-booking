document.addEventListener("DOMContentLoaded", () => {
  let selectedSeats = [];
  let movieDetails = {};
  const seatPrice = 180;

  // Seat grid generation
  const generateSeats = () => {
    const seatsContainer = document.getElementById("seats-container");
    seatsContainer.innerHTML = ""; // Clear previous seats

    // Generate 5 rows of 10 seats each
    for (let row = 1; row <= 5; row++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("seat-row");

      for (let col = 1; col <= 10; col++) {
        const seatName = `${String.fromCharCode(64 + row)}${col}`; // Seat name, e.g., A1, A2...
        const seat = document.createElement("div");
        seat.classList.add("seat");

        // Add "sold" or "available" classes
        const isSold = Math.random() < 0.3; // 30% chance the seat is sold
        if (isSold) {
          seat.classList.add("sold");
        } else {
          seat.classList.add("available");
          seat.addEventListener("click", () => toggleSeatSelection(seat, seatName));
        }

        rowElement.appendChild(seat);
      }

      seatsContainer.appendChild(rowElement);
    }
  };

  // Toggle seat selection
  const toggleSeatSelection = (seat, seatName) => {
    if (seat.classList.contains("sold")) return; // Prevent selection of sold seats

    if (seat.classList.contains("available")) {
      // Select the seat
      seat.classList.add("selected");
      seat.classList.remove("available");
      selectedSeats.push(seatName);
    } else {
      // Deselect the seat
      seat.classList.remove("selected");
      seat.classList.add("available");
      selectedSeats = selectedSeats.filter((s) => s !== seatName);
    }

    updateTotalPrice(); // Update total price display
  };

  // Update total price based on selected seats
  const updateTotalPrice = () => {
    const total = selectedSeats.length * seatPrice;
    document.getElementById("total-price").textContent = `Total: ₹${total}`;
  };

  // Handle showtime button click
  const showtimeButtons = document.querySelectorAll(".showtime-btn");
  showtimeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      movieDetails.movie = e.target.dataset.movie || "Not Selected";
      movieDetails.time = e.target.dataset.time || "Not Selected";

      // Hide movie selection page and show seat booking page
      document.getElementById("movie-selection").classList.remove("active");
      document.getElementById("seat-booking").classList.add("active");

      generateSeats(); // Generate the seat grid

      // Set movie and showtime details on the billing page
      document.getElementById("billing-movie-name").textContent = movieDetails.movie;
      document.getElementById("billing-show-time").textContent = movieDetails.time;
    });
  });

  // Back to movie selection page
  document.getElementById("back-to-movie-selection").addEventListener("click", () => {
    document.getElementById("seat-booking").classList.remove("active");
    document.getElementById("movie-selection").classList.add("active");
  });

  // Book tickets
  document.getElementById("book-tickets").addEventListener("click", () => {
    const ticketCount = selectedSeats.length;
    if (ticketCount === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Navigate to the billing page
    document.getElementById("seat-booking").classList.remove("active");
    document.getElementById("billing-page").classList.add("active");

    // Populate billing details
    document.getElementById("billing-ticket-count").textContent = ticketCount;
    document.getElementById("billing-total").textContent = `₹${ticketCount * seatPrice}`;
    document.getElementById("billing-seats").textContent = selectedSeats.join(", ");
  });

  // Back to seat booking page
  document.getElementById("back-to-seat-booking").addEventListener("click", () => {
    document.getElementById("billing-page").classList.remove("active");
    document.getElementById("seat-booking").classList.add("active");
  });

  // Proceed to payment
  document.getElementById("proceed-to-payment").addEventListener("click", () => {
    alert("Payment Gateway Integration Coming Soon!");
    document.getElementById("payment-page").classList.add("active");
    document.getElementById("billing-page").classList.remove("active");
  });

  // Back to billing page
  document.getElementById("back-to-billing").addEventListener("click", () => {
    document.getElementById("payment-page").classList.remove("active");
    document.getElementById("billing-page").classList.add("active");
  });
});
