const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click',()=>{
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
document.querySelector(".hacker-name").onmouseover=event => {
    let iterations=0;
    const interval = setInterval(()=> {
    event.target.innerText=event.target.innerText.split("").map((letter, index) => {
        if (index<iterations){
            return event.target.dataset.value[index];
        }
        
        return letters[Math.floor(Math.random()*52)]}).join("");
        if (iterations>=event.target.dataset.value.length){
        clearInterval(interval);
    }
    iterations+=1;
}, 30);
}


const roles = [
    "Front-end Developer",
    "Software Engineer",
    "Mechanical Engineer",
    "Mechatronics Engineer",
    "Code Monkey",
    "Graphic Designer",
    "Product Designer",
  ];
  
  const rolesElement = document.getElementById("roles");
  let index = 0;
  
  function showNextRole() {
    rolesElement.textContent = roles[index];
    rolesElement.style.opacity = 1;
  
    setTimeout(() => {
      rolesElement.style.opacity = 0;
      index = (index + 1) % roles.length; // Move to the next role
      setTimeout(showNextRole, 1000); // Delay before showing the next role
    }, 2000); // Duration for displaying the current role
  }
  
  showNextRole();


  filterSelection("all")
  function filterSelection(c) {
    var x, y, i, j;
    x = document.getElementsByClassName("active-filter");
    y = document.getElementsByClassName("portfolio__item-container");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
      const computedStyle = window.getComputedStyle(x[i]);
      const displayMode = computedStyle.display;
      if (x[i].className.indexOf(c) > -1) {
        /*if (displayMode === "none" && (window.innerWidth < 801)){
          const filterContainer =  document.getElementById("filter-container");
          const currentMarginBottom = parseInt(window.getComputedStyle(filterContainer).marginBottom);
          const newMarginBottom = currentMarginBottom + 50;
          filterContainer.style.marginBottom = newMarginBottom + "px"; //adding 50px of margin for every tag present at the top of the tag list only for mobile configuration
        } */ 
        w3AddClass(x[i], "show");
      }
      for (j=0; j < y.length; j++){
        if (y[j].className.indexOf(c) > -1) w3AddClass(y[j], "show");
      }
      
    }
  }

  // Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

    // Show filtered elements again
function w3ReaddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
  
  // Hide elements that are not selected
  function w3RemoveClass(element, name) {
    var x, i, j, arr1;
    /*if (window.innerWidth < 801){
      const filterContainer =  document.getElementById("filter-container");
      const currentMarginBottom = parseInt(window.getComputedStyle(filterContainer).marginBottom);
      const newMarginBottom = currentMarginBottom - 50;
      filterContainer.style.marginBottom = newMarginBottom + "px";
    }*/
    x = document.getElementsByClassName(element);
    filters = document.getElementsByClassName("active-filter");
    portfolioItems = document.getElementsByClassName("portfolio__item-container");
    for (i = 0; i < x.length; i++){
        arr1 = x[i].className.split(" ");
        if (x[i].className.includes(element)){
            arr1.splice(arr1.indexOf(name), arr1.length-1);
            x[i].className = arr1.join(" ");
        }
    }   for (i = 0; i<filters.length; i++){
            var computedStyle = window.getComputedStyle(filters[i]);
            var displayValue = computedStyle.getPropertyValue("display");
            if (displayValue != "none"){
                keepfilter = filters[i].className.split(" ")[1];
                for (j=0; j<portfolioItems.length; j++){
                    if (portfolioItems[j].className.includes(keepfilter)){
                      w3ReaddClass(portfolioItems[j], name);
                    }
                }
            }
        }
  }
  
  // Add active class to the current control button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
