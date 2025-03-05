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

// Submenu
document.addEventListener("DOMContentLoaded", function () {
    const learningPlan = document.getElementById("learning-plan");
    const submenu = document.getElementById("submenu");
    const otherMenuItems = document.querySelectorAll("nav a:not(#learning-plan)");

    // Track whether the submenu is visible
    let isSubmenuVisible = false;

    // Show the submenu and navigate to learning-plan.html when Learning Plan is clicked
    learningPlan.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior (navigation)

        // Toggle submenu visibility
        if (isSubmenuVisible) {
            submenu.style.display = "none"; // Hide the submenu
            isSubmenuVisible = false; // Update visibility state
        } else {
            // Show the submenu below the Learning Plan tab
            const rect = learningPlan.getBoundingClientRect();
            submenu.style.top = (rect.bottom + 5) + "px"; // Position below the link with a slight gap
            submenu.style.left = rect.left + "px"; // Align with the left of the link
            submenu.style.display = "flex"; // Show the submenu (flex for horizontal layout)
            isSubmenuVisible = true; // Update visibility state
        }

        // Navigate to learning-plan.html
        window.location.href = "learning-plan.html";
    });

    // Navigate to submenu items when clicked
    submenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = link.getAttribute("href"); // Navigate to the link's href
        });
    });

    // Hide submenu when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!learningPlan.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = "none"; // Hide the submenu
            isSubmenuVisible = false; // Update visibility state
        }
    });

    // Hide submenu when clicking any other menu option
    otherMenuItems.forEach(function (item) {
        item.addEventListener("click", function () {
            submenu.style.display = "none"; // Hide the submenu when other menu items are clicked
            isSubmenuVisible = false; // Update visibility state
        });
    });
});