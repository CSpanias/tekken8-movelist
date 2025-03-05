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

// Sorting Function
function sortTable(n) {
    let table = document.getElementById("movelist") || document.getElementById("punishments-table") || document.getElementById("rank-points");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(tbody.getElementsByTagName("tr"));

    // Determine if sorting is ascending or descending
    let ascending = table.getAttribute("data-sort") !== "asc";

    // Sort rows based on the clicked column
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

// Toggling the submenu when clicking the Learning Plan tab
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!"); // Debugging step

    const learningPlan = document.getElementById("learning-plan");
    const submenu = document.getElementById("submenu");

    if (!learningPlan || !submenu) {
        console.error("Learning Plan or submenu not found!");
        return;
    }

    console.log("Learning Plan found:", learningPlan); // Debugging step
    console.log("Submenu found:", submenu);

    // Toggle the submenu when clicking the Learning Plan tab
    learningPlan.addEventListener("click", function (event) {
        console.log("Learning Plan clicked!"); // Debugging step

        // Check if the submenu is already visible
        if (submenu.style.display !== "block") {
            // Position the submenu directly below the Learning Plan tab
            const rect = learningPlan.getBoundingClientRect();
            submenu.style.top = rect.bottom + "px"; // Position below the link
            submenu.style.left = rect.left + "px"; // Align with the left of the link
            submenu.style.display = "block"; // Show the submenu
        } else {
            submenu.style.display = "none"; // Hide the submenu if it's already visible
        }
    });

    // Hide submenu when clicking outside
    document.addEventListener("click", function (event) {
        if (!learningPlan.contains(event.target) && !submenu.contains(event.target)) {
            console.log("Clicked outside, hiding submenu."); // Debugging step
            submenu.style.display = "none";
        }
    });
});
