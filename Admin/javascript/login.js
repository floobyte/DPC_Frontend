document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const credentials = { email, password };

    try {
      const response = await fetch(
        "https://garb-prawn.cyclic.app/api/user/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);

        if (data.token) {
          alertify.set("notifier", "position", "top-right");
          alertify.error("Welcome to admin panel");
          window.location.href = "/Admin/index.html";
        } else {
          console.error("Invalid token");
        }
      } else {
        const res = await response.json();
        alertify.set("notifier", "position", "top-right");
        alertify.error(res.message);
      }
    } catch (error) {
      alertify.set("notifier", "position", "top-right");
      alertify.error(`Login failed. An error occurred.`);
    }
  });
