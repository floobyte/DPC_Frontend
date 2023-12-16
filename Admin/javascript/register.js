const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);

  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/user/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alertify.set("notifier", "position", "top-right");
      alertify.success("Registered successfully!");
      window.location.href = "./login.html";
    } else if (response.status === 400) {
      const errorData = await response.json();
      alertify.set("notifier", "position", "top-right");

      const message = errorData.message;
      alertify.error(message);
    } else {
      alertify.set("notifier", "position", "top-right");
      alertify.error("Registeration failed. Please try again.");
    }
  } catch (error) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("An error occurred. Please try again.");
  }
});
