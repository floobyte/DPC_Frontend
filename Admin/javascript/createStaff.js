const staffForm = document.getElementById("staffForm");

staffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");

  if (!token) {
    alertify.error("Please log in to create a staff member.");
    return;
  }

  const formData = new FormData(staffForm);

  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/staff/create",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      alertify.success("Staff member created successfully!");
      alertify.set("notifier", "position", "top-right");
      staffForm.reset();
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.error("Validation error:", errorData);
    } else {
      alertify.error("Staff member creation failed. Please try again.");
      alertify.set("notifier", "position", "top-right");
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alertify.error("An error occurred. Please try again.");
    alertify.set("notifier", "position", "top-right");
    console.error(error);
  }
});
