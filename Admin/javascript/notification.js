const noticeForm = document.getElementById("noticeForm");

noticeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please log in to create a Notification.");
    return;
  }

  const formData = new FormData(noticeForm);

  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/notification/create",
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
      alertify.success("Notification created successfully!");
      noticeForm.reset();
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.error("Validation error:", errorData);
    } else {
      alertify.set("notifier", "position", "top-right");
      alertify.error("Notification creation failed. Please try again.");
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("An error occurred. Please try again.");
    console.error(error);
  }
});
