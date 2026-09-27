document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Cardston Alberta",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923, August, 26",
    area: 88562,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cardston-alberta/400x250/cardston-alberta-temple-lds-664426-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Fresno California",
    location: "Fresno, California, United States",
    dedicated: "2000, April, 9",
    area: 10700,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fresno-california/400x250/fresno-california-temple-lds-161838-wallpaper.jpg"
  }
];


const getTempleYear = (temple) => {
  const match = temple.dedicated.match(/(\d{4})/);
  return match ? Number(match[1]) : 0;
};

const renderTemples = (items) => {
  const templeContainer = document.querySelector(".res-grid") || document.querySelector("#temples");
  if (!templeContainer) return;

  templeContainer.innerHTML = "";
  const formatArea = new Intl.NumberFormat("en-US");

  items.forEach((temple) => {
    const card = document.createElement("article");
    card.classList.add("temple-card");

    card.innerHTML = `
      <div class="temple-header">
        <h3>${temple.templeName}</h3>
        <div class="temple-meta">
          <p><strong>Location:</strong> ${temple.location}</p>
          <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
          <p><strong>Size:</strong> ${formatArea.format(temple.area)} sq ft</p>
        </div>
      </div>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
    `;

    templeContainer.appendChild(card);
  });
};

const filterTemples = (filter) => {
  switch (filter) {
    case "Old":
      return temples.filter((temple) => getTempleYear(temple) < 1900);
    case "New":
      return temples.filter((temple) => getTempleYear(temple) > 2000);
    case "Large":
      return temples.filter((temple) => temple.area > 90000);
    case "Small":
      return temples.filter((temple) => temple.area < 10000);
    case "Home":
    default:
      return temples;
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const pageHeading = document.querySelector("#heading-title") || document.querySelector("main h2");
  const mainNav = document.querySelector(".navigation");
  const hamburgerButton = document.querySelector("#menu");

  // Initial render on load
  renderTemples(temples);


  const navLinks = document.querySelectorAll(".navigation a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const filter = link.textContent.trim();

      if (pageHeading) {
        pageHeading.textContent = filter;
      }

      renderTemples(filterTemples(filter));

      if (mainNav && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        if (hamburgerButton) hamburgerButton.classList.remove("open");
      }
    });
  });

 
  if (hamburgerButton && mainNav) {
    hamburgerButton.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      hamburgerButton.classList.toggle("open");
      hamburgerButton.setAttribute("aria-expanded", String(isOpen));
    });
  }
});