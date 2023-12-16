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
      <li><a href="./index.html">HOME</a></li>
        <li><a href="./createPost.html">CREATE POST</a></li>
        <li><a href="./createEvent.html">CREATE EVENT</a></li>
        <li><a href="./createCourse.html">CREATE COURSE</a></li>
        <li><a href="./notice.html">CREATE LATEST NEWS</a></li>
        <li><a href="./news.html">ALL NEWS</a></li>
      </ul>
    </div>
    <span class="icon" onclick="showmenu()">&#9776;</span>
  </nav>`;
  const container = document.getElementById("nav-container");
  if (container) {
    container.innerHTML = navBarHtml;

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
window.addEventListener("load", function () {
  importNewsTab();
  importNavigationBar();
});
