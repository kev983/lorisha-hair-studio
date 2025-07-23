window.onload = function () {
  console.log("Hello, welcome to Lorisha's website.");

  var nav = document.getElementsByTagName("nav")[0];
  var btnDiv = document.getElementsByClassName("md:hidden")[0];
  //Get the menu button from the div
  var menuBtn = btnDiv.children[0];
  var cancelBtn = menuBtn.innerHTML;
  var mobileMenu = document.createElement("div");

  //Get the menu button and remove all class names excpet hidden
  var btn = document.getElementsByClassName("hidden")[0];
  var classNames = btn.className.split(" ");
  console.log(classNames);

  //Handle button click
  menuBtn.addEventListener("click", () => {
    if (btn.classList.contains("hidden")) {
      btn.classList.remove("hidden");
      btn.classList.add("showing");
      menuBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-6 h-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
    } else {
      btn.classList.add("hidden");
      btn.classList.remove("showing");
      menuBtn.innerHTML = cancelBtn;
    }
  });
};
