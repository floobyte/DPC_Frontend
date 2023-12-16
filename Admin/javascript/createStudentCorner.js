const studentcornerForm = document.getElementById("studentcornerForm");

studentcornerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please log in to create a Notice.");
    return;
  }

  const formData = new FormData(studentcornerForm);

  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/studentcorner/create",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.ok) {
      alertify.set("notifier", "position", "top-right");
      alertify.success("created successfully!");
      studentcornerForm.reset();
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.error("Validation error:", errorData);
    } else {
      alertify.set("notifier", "position", "top-right");
      alertify.error("creation failed. Please try again.");
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("An error occurred. Please try again.");
    console.error(error);
  }
});
