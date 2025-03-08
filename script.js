// Display Moves in Table
function displayMoves(moves, tableBodyId) {
    let tbody = document.getElementById(tableBodyId);
    if (!tbody) {
        console.error("Table body not found:", tableBodyId);
        return;
    }
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
            <td>${move.Character || ''}</td> <!-- Display Character -->
        </tr>`;
        tbody.innerHTML += row;
    });
}

function sortTable(n) {
    let th = event.target; // Detect the clicked column header
    let table = th.closest("table"); // Find the nearest table

    if (!table) {
        console.error("No table found for sorting.");
        return;
    }

    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(tbody.getElementsByTagName("tr"));

    let ascending = table.getAttribute("data-sort") !== "asc";

    rows.sort((a, b) => {
        let valA = a.getElementsByTagName("td")[n].textContent.trim();
        let valB = b.getElementsByTagName("td")[n].textContent.trim();

        // Handle numeric sorting
        if (!isNaN(valA) && !isNaN(valB)) {
            return (ascending ? 1 : -1) * (parseFloat(valA) - parseFloat(valB));
        } else {
            // Handle string sorting
            return (ascending ? 1 : -1) * valA.localeCompare(valB);
        }
    });

    // Clear the table body
    tbody.innerHTML = "";

    // Append sorted rows back to the table
    rows.forEach(row => tbody.appendChild(row));

    // Toggle sorting order
    table.setAttribute("data-sort", ascending ? "asc" : "desc");
}

function filterTable() {
    let searchInput = document.getElementById("searchBox").value.toLowerCase();
    let columnIndex = document.getElementById("columnSelect").value;

    let table = document.querySelector("table"); // Auto-detects the table
    if (!table) {
        console.error("No table found on this page.");
        return;
    }

    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");

    for (let row of rows) {
        let cell = row.getElementsByTagName("td")[columnIndex]; // Get selected column
        if (cell) {
            let cellText = cell.textContent.toLowerCase();
            row.style.display = cellText.includes(searchInput) ? "" : "none"; // Hide/show row
        }
    }
}
