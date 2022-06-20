/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
//Defining Global Element Variables

const navBarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
//Creating a new document fragment
const newDocFrag = document.createDocumentFragment();

//End Global Element Variables


// build the navigation from Sections

for (const section of sections) {

    // Creating a new list item <li> element
    const newNavBarListItem = document.createElement("li");
    // Creating a new link <a> element to put inside the <li>
    const newNavBarListItemLink = document.createElement("a");
    // Creating a new text node to write the section name inside the link <a>
    const listItemText = document.createTextNode(section.getAttribute("data-nav"));
    
    // Adding classes and attributes to the link <a>
    newNavBarListItemLink.classList.add("menu__link");
    newNavBarListItemLink.setAttribute("data-scrollTo", "#"+section.getAttribute("id"));
    // Adding the text node inside the link <a>
    newNavBarListItemLink.appendChild(listItemText);
    
    // Adding the link inside <li>
    newNavBarListItem.appendChild(newNavBarListItemLink);
    
    //adding the list item <li> inside the new fragment 
    newDocFrag.appendChild(newNavBarListItem)
};

// Adding the fragment to the nav bar list <ul>
navBarList.appendChild(newDocFrag);

// Getting all the created list items Links <a>
const newNavBarListItemLinks = document.querySelectorAll(".menu__link");

// Adding 'active-section' class to section when near top of viewport
// And adding 'menu__activeLink' class to the corresponding link
let observer = new IntersectionObserver(callback, {rootMargin: "-150px 0px -400px 0px"});
for (const section of sections) {
    observer.observe(section);
};

function callback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            removeAllActiveLinks(); // Remove all 'menu__activeLink' classes from menu links
            removeAllActiveSections(); // Remove all 'active-section' classes from sections
            for (const link of newNavBarListItemLinks) {
                if(link.getAttribute("data-scrollto") == "#"+entry.target.getAttribute("id")){
                    link.classList.add("menu__activeLink");
                };
            };
            entry.target.classList.add("your-active-class");
        }; 
    });
};

// Scrolling to section on menu item click
for (const link of newNavBarListItemLinks) {
    link.addEventListener("click", function () {
        const section = document.querySelector(link.getAttribute("data-scrollTo"));
        section.scrollIntoView({'behavior':'smooth'});
        removeAllActiveLinks();
        link.classList.add("menu__activeLink");
        
    });
};

// Remove all 'menu__activeLink' classes from menu links
function removeAllActiveLinks(){
    navBarListItemLinks = navBarList.querySelectorAll("a");
    console.log(navBarListItemLinks);
    for (const link of newNavBarListItemLinks) {
        link.classList.remove("menu__activeLink");
    };
    
};

// Remove all 'active-section' classes from sections
function removeAllActiveSections(){
    for (const section of sections) {
        section.classList.remove("your-active-class");
    };
};
