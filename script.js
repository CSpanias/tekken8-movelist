// Load Movelist Data
document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            window.movelist = data; // Store data globally
            displayMoves(data);
        });
});

// Display Moves in Table
function displayMoves(moves) {
    let tbody = document.getElementById("movelist-body");
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
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Sorting Function
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

    displayMoves(moves);
    document.getElementById("movelist").setAttribute("data-sort", ascending ? "asc" : "desc");
}

// Search Moves
function searchMoves() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    let filteredMoves = window.movelist.filter(move => 
        move.name.toLowerCase().includes(searchInput) || move.input.toLowerCase().includes(searchInput)
    );
    displayMoves(filteredMoves);
}
