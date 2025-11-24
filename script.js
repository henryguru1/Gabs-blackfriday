// Function to calculate the next Black Friday
function getNextBlackFriday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Find the fourth Thursday of November (Thanksgiving)
    const november = new Date(currentYear, 10, 1); // Month 10 = November
    let thursdayCount = 0;
    let thanksgiving;
    
    for (let day = 1; day <= 30; day++) {
        const date = new Date(currentYear, 10, day);
        if (date.getDay() === 4) { // Thursday
            thursdayCount++;
            if (thursdayCount === 4) {
                thanksgiving = date;
                break;
            }
        }
    }
    
    // Black Friday is the day after Thanksgiving
    const blackFriday = new Date(thanksgiving);
    blackFriday.setDate(thanksgiving.getDate() + 1);
    blackFriday.setHours(0, 0, 0, 0); // Set to midnight
    
    // If Black Friday has passed this year, get next year's
    if (now > blackFriday) {
        return getNextBlackFridayByYear(currentYear + 1);
    }
    
    return blackFriday;
}

// Helper function to get Black Friday for a specific year
function getNextBlackFridayByYear(year) {
    const november = new Date(year, 10, 1);
    let thursdayCount = 0;
    let thanksgiving;
    
    for (let day = 1; day <= 30; day++) {
        const date = new Date(year, 10, day);
        if (date.getDay() === 4) {
            thursdayCount++;
            if (thursdayCount === 4) {
                thanksgiving = date;
                break;
            }
        }
    }
    
    const blackFriday = new Date(thanksgiving);
    blackFriday.setDate(thanksgiving.getDate() + 1);
    blackFriday.setHours(0, 0, 0, 0);
    
    return blackFriday;
}

// Function to update the countdown display
function updateCountdown() {
    const now = new Date();
    const blackFriday = getNextBlackFriday();
    const diff = blackFriday - now;

    // Check if Black Friday has arrived
    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('message').textContent = 'BLACK FRIDAY IS HERE! 🎉';
        return;
    }

    // Calculate time remaining
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update the display with padded values
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Initialize countdown immediately
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);