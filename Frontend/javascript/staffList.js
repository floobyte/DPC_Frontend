document.addEventListener("DOMContentLoaded", () => {
  const staffTable = document.getElementById("staff-table");

  fetch("https://garb-prawn.cyclic.app/api/staff/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((staffs) => {
      if (staffs.length === 0) {
        const noStaffsMessage = document.createElement("p");
        noStaffsMessage.textContent =
          "There are no Staffs available. Please add one.";

        staffTable.appendChild(noStaffsMessage);
        return;
      }

      const table = document.createElement("table");

      const tableHeader = `
        <tr>
          <th>Srl No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Designation</th>
          <th>Department</th> <!-- Corrected the spelling of Department -->
        </tr>
      `;
      table.innerHTML = tableHeader;

      let serialNumber = 1;

      staffs.forEach((staff) => {
        const row = document.createElement("tr");

        const serialNoCell = document.createElement("td");
        serialNoCell.textContent = serialNumber++;
        row.appendChild(serialNoCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = staff.name;
        nameCell.style.cursor = "pointer";

        nameCell.addEventListener("click", () => {
          showDetails(staff);
        });

        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = staff.email;
        row.appendChild(emailCell);

        const designationCell = document.createElement("td");
        designationCell.textContent = staff.designation;
        row.appendChild(designationCell);

        const departmentCell = document.createElement("td");
        departmentCell.textContent = staff.department;
        row.appendChild(departmentCell);
        table.appendChild(row);
      });

      staffTable.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching Staffs:", error);
    });
});

function showDetails(staff) {
  window.location.href = `/Frontend/staffDetails.html?id=${staff._id}`;
}
