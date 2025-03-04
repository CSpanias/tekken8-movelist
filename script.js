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

// Sorting Function (generic for both tables)
function sortTable(n) {
    // Determine which table is being sorted
    let table = document.getElementById("movelist") || document.getElementById("punishments-table");
    let tableBodyId = table === document.getElementById("movelist") ? "movelist-body" : "punishments-body";

    // Get the current sorting order
    let ascending = table.getAttribute("data-sort") !== "asc";

    // Sort the moves
    let moves = [...window.movelist]; // Use the globally stored movelist
    moves.sort((a, b) => {
        let valA = Object.values(a)[n];
        let valB = Object.values(b)[n];

        // Handle case where valA or valB is undefined or not a number
        if (isNaN(valA)) valA = valA || ''; // Fallback to empty string
        if (isNaN(valB)) valB = valB || ''; // Fallback to empty string

        return isNaN(valA) ? valA.localeCompare(valB) * (ascending ? 1 : -1) : (valA - valB) * (ascending ? 1 : -1);
    });

    // Display the sorted moves
    displayMoves(moves, tableBodyId);

    // Toggle sorting order
    table.setAttribute("data-sort", ascending ? "asc" : "desc");
}
