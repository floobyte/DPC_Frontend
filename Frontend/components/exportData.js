function importNewsTab() {
  const newsTabHtml = `
      <div class="newstab">Latest News</div>
      <div class="newscontent">
          <marquee class="" behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();">
              <ul id="notifications" class="">
                  <li>
                      <a href="www.flooobyte.com">
                          <div class="datenews">01 December 2023 <span> </span></div>
                      </a>
                  </li>
                  <li>
                      <a href="www.flooobyte.com">
                          <div class="datenews">01 December 2023 <span> </span></div>
                      </a>
                  </li>
              </ul>
          </marquee>
      </div>`;
  const container = document.getElementById("news-container");
  if (container) {
    container.innerHTML = newsTabHtml;
  }
}

function importNavigationBar() {
  const navBarHtml = `
        <nav>
            <a href="./index.html"><img src="./image/logoDPC.svg" id="logo-img" /></a>

            <div class="nav-links" id="navLinks">
                <span class="icon" onclick="hidemenu()">&#10005;</span>
                <ul>
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./#course_call">Course</a></li>
                    <li><a href="./gallery.html">Gallery</a></li>
                    <li><a href="./event.html">Events</a></li>
                    <li><a href="./Admission_page.html">Admission</a></li>
                    <li><a href="./Contact_page.html">Contact</a></li>
                </ul>
            </div>
            <span class="icon" onclick="showmenu()">&#9776;</span>
        </nav>`;
  const container = document.getElementById("nav-container");
  if (container) {
    container.innerHTML = navBarHtml;
    // Set navLinks after adding the HTML to the page
    navLinks = document.getElementById("navLinks");
  }
}

function showmenu() {
  if (navLinks) {
    navLinks.style.right = "0";
  }
}

function hidemenu() {
  if (navLinks) {
    navLinks.style.right = "-200px";
  }
}

function sendmail() {
  // Implement your email sending logic here
  // Example:
  // Email.send({
  //     to: 'recipient@example.com',
  //     subject: 'Hello',
  //     body: 'This is a test email.'
  // }).then(message => alert("Thank you - Team DPC"));
}

// Call the import functions when the page is loaded
// window.addEventListener('load', function () {
//     importNewsTab();
//     importNavigationBar();
//     importFooterTab();
// });
function importFooterTab() {
  const footertbHtml = `
    <footer>
    <div class="row">
      <div class="col">
        <img src="./image/logoDPC.png" class="logo">
        <p>The D.P. Chaturvedi College in Seoni offers a wide
        range of academic disciplines, including Science, Commerce,
        Arts, and Education. It has played a pivotal role in establishing a benchmark for brexcellence in education.</p>
      </div>
      <div class="col">
        <h3>College <div class="underline"> <span></span></div> </h3>
        <p>SEONI M.P.</p>
        <p>SEONI</p>
        <p>SEONI M.P. (480661), India</p>
        <p class="email-id">dpccolle@gmail.com</p>
        <h4>+91 0123456789</h4>
      </div>
      <div class="col">
        <h3>Links <div class="underline"> <span></span></div></h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Contacts</a></li>
        </ul>
      </div>
      <div class="col">
        <h3>Newsletter <div class="underline"> <span></span></div></h3>
        <form>
          <i class="far fa-envelope"></i>
          <input type="email" placeholder="Enter your email id" required>
          <button type="submit"><i class="fas fa-arrow-right"></i></button>
        </form>
        <div class="social-icons">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-whatsapp"></i>
          <i class="fab fa-pinterest"></i>
        </div>
      </div>
  </div>
  <hr>
  <p class="copyright"> Floobyte.com © 2023 - All Rights Reserved</p>
  </footer>`;
  const container = document.getElementById("footer-container");
  if (container) {
    container.innerHTML = footertbHtml;
  }
}
// Call the import functions when the page is loaded
window.addEventListener("load", function () {
  importNewsTab();
  importNavigationBar();
  importFooterTab();
});
