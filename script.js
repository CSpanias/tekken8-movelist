// Load Movelist Data
document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Store regular moves globally
            window.movelist = data.regularMoves;

            // Display regular moves in the first table
            displayMoves(data.regularMoves, "movelist-body");

            // Display while standing punishments in the second table
            displayMoves(data.whileStandingPunishments, "while-standing-body");
        });
});

// Display Moves in Table
function displayMoves(moves, tableBodyId) {
    let tbody = document.getElementById(tableBodyId);
    tbody.innerHTML = ""; // Clear table before inserting

    moves.forEach(move => {
        // Use default empty string if any data is missing
        let row = `<tr>
            <td>${move.name || ''}</td>
            <td>${move.input || ''}</td>
            <td>${move.damage || ''}</td>
            <td>${move.startup || ''}</td>
            <td>${move.hitLevel || ''}</td>
            <td>${move.onBlock || ''}</td>
            <td>${move.onHit || ''}</td>
            <td>${move.Feature || ''}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Sorting Function (only for regular moves)
function sortTable(n) {
    let moves = [...window.movelist];
    let ascending = document.getElementById("movelist").getAttribute("data-sort") !== "asc";

    moves.sort((a, b) => {
        let valA = Object.values(a)[n];
        let valB = Object.values(b)[n];

        // Handle case where valA or valB is undefined or not a number
        if (isNaN(valA)) valA = valA || ''; // Fallback to empty string
        if (isNaN(valB)) valB = valB || ''; // Fallback to empty string

        return isNaN(valA) ? valA.localeCompare(valB) * (ascending ? 1 : -1) : (valA - valB) * (ascending ? 1 : -1);
    });

    displayMoves(moves, "movelist-body");
    document.getElementById("movelist").setAttribute("data-sort", ascending ? "asc" : "desc");
}

// Search Moves (only for regular moves)
function searchMoves() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    let filteredMoves = window.movelist.filter(move => 
        move.name.toLowerCase().includes(searchInput) || move.input.toLowerCase().includes(searchInput)
    );
    displayMoves(filteredMoves, "movelist-body");
}
