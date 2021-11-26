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

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll('section');
const frag = document.createDocumentFragment();
let userHasScrolled = false;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function toggleActiveState() {
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };

  function callback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // get the nav item corresponding to the id of the section
        // that is currently in view
        console.log(entry.target.id);
        const navItem = document.querySelector(`[href="#${entry.target.id}"]`);
        // add 'active' class on the navItem
        navItem.classList.add('active');
        //console.log(navItem.getAttribute('class'));
        // remove 'active' class from any navItem that is not
        // same as 'navItem' defined above
        const navItems = document.querySelectorAll('.active');
        navItems.forEach((item) => {
          if (item != navItem) {
            item.classList.remove('active');
          }
        });
      }
    });
  }
  const observer = new IntersectionObserver(callback, options);
  sections.forEach((sec) => observer.observe(sec));
}

function scrollToSection(event) {
  event.preventDefault();
  const sec = document.querySelector(
    `[data-nav="${event.target.textContent}"]`
  );
  sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (let item of sections) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.textContent = item.getAttribute('data-nav');
  a.setAttribute('href', '#' + item.getAttribute('id'));
  li.appendChild(a);
  frag.appendChild(li);
}
const ul = document.querySelector('#navbar__list');
ul.appendChild(frag);
const navItems = document.querySelectorAll('#navbar__list li');
navItems.forEach((nav) => {
  console.log(nav.innerHTML);
});
// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', toggleActiveState);
// Scroll to anchor ID using scrollTO event
const anchors = document.querySelectorAll('li a');
for (a of anchors) {
  a.addEventListener('click', scrollToSection);
}

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar__menu')[0];

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
