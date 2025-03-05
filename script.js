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
    console.log("Script loaded!"); // Debugging step 1

    const learningPlan = document.getElementById("learning-plan");
    const submenu = document.getElementById("submenu");

    if (!learningPlan || !submenu) {
        console.error("Learning Plan or submenu not found!");
        return;
    }

    console.log("Learning Plan found:", learningPlan); // Debugging step 2
    console.log("Submenu found:", submenu);

    // Track submenu state
    let isSubmenuVisible = false;

    learningPlan.addEventListener("click", function (event) {
        // If the submenu is visible, prevent navigation and toggle the submenu
        if (isSubmenuVisible) {
            event.preventDefault(); // Prevent link navigation if submenu is visible
            console.log("Submenu is visible, preventing navigation."); // Debugging step
            submenu.style.display = "none";
            isSubmenuVisible = false;
        } else {
            console.log("Learning Plan clicked, proceeding to navigate."); // Debugging step
            submenu.style.display = "block";
            isSubmenuVisible = true;
        }
    });

    // Hide submenu when clicking outside
    document.addEventListener("click", function (event) {
        if (!learningPlan.contains(event.target) && !submenu.contains(event.target)) {
            console.log("Clicked outside, hiding submenu."); // Debugging step 4
            submenu.style.display = "none";
            isSubmenuVisible = false;
        }
    });
});
