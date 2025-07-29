window.onload = function () {
  console.log("Hello, welcome to Lorisha's website.");

  //Add the whatsapp button
  var whatsappBtn =
    "<a " +
    'href="https://wa.me/+254710209273?text=Hi%20I\'d%20like%20to%20book%20an%20appointment" ' +
    'target="_blank" ' +
    'id="whatsappBtn" ' +
    'class="p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 jello-horizontal" ' +
    ">" +
    ' <i class="fab fa-whatsapp" style="scale: 1.3"></i> ' +
    "</a>";
  var btnHolder = document.createElement("div");
  var root = document.getElementById("root");
  btnHolder.innerHTML = whatsappBtn;
  root.appendChild(btnHolder);

  //Add the script in the head
  var fontawesomecdn = '<link rel="stylesheet" href=""/>';
  var fontawesome = document.createElement("link");
  var head = document.getElementsByTagName("head")[0];
  fontawesome.rel = "stylesheet";
  fontawesome.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
  head.appendChild(fontawesome);

  //Change nav background based on scroll position
  var nav = document.getElementsByTagName("nav")[0];
  var logo = document.getElementsByTagName("span")[0];
  var svg = document.getElementsByTagName("svg")[0];
  var links = document.getElementsByClassName("md:flex")[0];
  var nodes = links.children;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      nav.style.background = "whitesmoke";
      nav.style.backdropFilter = "10px";
      menuBtn.style.color = "black";
      logo.style.color = "black";
      svg.style.color = "rgb(217, 119, 6)";
      nav.classList.add("shadow-lg");
      Array.from(nodes).forEach((node) => {
        if (!node.classList.contains("active")) {
          node.style.color = "black";
        }
      });
    } else {
      nav.style.background = "transparent";
      menuBtn.style.color = "white";
      logo.style.color = "white";
      svg.style.color = "white";
      nav.classList.remove("shadow-lg");
      Array.from(nodes).forEach((node) => {
        if (!node.classList.contains("active")) {
          node.style.color = "white";
        } else {
          node.style.color = "rgb(217, 119, 6)";
        }
      });
    }
  });

  //Get the menu button from the div
  var btnDiv = document.getElementsByClassName("md:hidden")[0];
  var menuBtn = btnDiv.children[0];
  var cancelBtn = menuBtn.innerHTML;

  //Get the menu button and remove all class names excpet hidden
  var btn = document.getElementsByClassName("hidden")[0];
  var classNames = btn.className.split(" ");

  //Handle button click
  menuBtn.addEventListener("mouseover", () => {
    btn.classList.remove("hidden");
    btn.classList.add("showing");
    menuBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-6 h-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
  });

  menuBtn.addEventListener("click", function () {
    if (btn.classList.contains("showing")) {
      btn.classList.add("hidden");
      btn.classList.remove("showing");
      menuBtn.innerHTML = cancelBtn;
    }
  });

  btn.addEventListener("mouseleave", () => {
    btn.classList.add("hidden");
    btn.classList.remove("showing");
    menuBtn.innerHTML = cancelBtn;
  });

  window.addEventListener("scroll", function () {
    btn.classList.add("hidden");
    btn.classList.remove("showing");
    menuBtn.innerHTML = cancelBtn;
  });
};
