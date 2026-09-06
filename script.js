/* ========================================
   NEV - CAR DATABASE
======================================== */


/* ========================================
   CAR DATABASE
======================================== */

const cars = [

    {
        brand: "McLaren",
        model: "F1",

        production: "1992–1998",
        country: "UK",

        engine: "6.1L BMW S70/2 V12",
        power: "627 hp",
        torque: "651 Nm",

        transmission: "6-speed manual",
        drivetrain: "RWD",

        acceleration: "3.2 s",
        topSpeed: "391 km/h",

        length: "4287 mm",
        width: "1820 mm",
        height: "1140 mm",

        weight: "1138 kg",

        productionCount: "64",
        price: "$20–35M",

        location: "Petersen Automotive Museum, Los Angeles",

        images: []
    },


    {
        brand: "McLaren",
        model: "F1 LM",

        production: "1995",
        country: "UK",

        engine: "6.1L BMW S70/2 GTR LM",
        power: "680 hp",
        torque: "705 Nm",

        transmission: "6-speed manual",
        drivetrain: "RWD",

        acceleration: "2.9 s",
        topSpeed: "382 km/h",

        length: "4367 mm",
        width: "1920 mm",
        height: "1120 mm",

        weight: "1062 kg",

        productionCount: "5",
        price: "$20–25M",

        location: "Ralph Lauren Car Collection",

        images: []
    }

];


/* ========================================
   ELEMENTS
======================================== */

const carGrid = document.getElementById("carGrid");
const brandList = document.getElementById("brandList");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");


/* Car Modal */

const carModal = document.getElementById("carModal");
const modalTitle = document.getElementById("modalTitle");
const modalSpecs = document.getElementById("modalSpecs");
const mainImage = document.getElementById("mainImage");

const closeCarModal = document.getElementById("closeCarModal");
const modalBackdrop = document.getElementById("modalBackdrop");


/* Info Modal */

const infoButton = document.getElementById("infoButton");
const infoModal = document.getElementById("infoModal");
const closeInfoModal = document.getElementById("closeInfoModal");
const infoBackdrop = document.getElementById("infoBackdrop");


/* ========================================
   CURRENT FILTER
======================================== */

let currentBrand = "All";


/* ========================================
   GET BRANDS
======================================== */

function getBrands() {

    const brands = [...new Set(cars.map(car => car.brand))];

    return ["All", ...brands];
}


/* ========================================
   DISPLAY BRAND BUTTONS
======================================== */

function displayBrands() {

    brandList.innerHTML = "";

    const brands = getBrands();

    brands.forEach(brand => {

        const button = document.createElement("button");

        button.className = "brand-button";

        button.textContent = brand;

        if (brand === currentBrand) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            currentBrand = brand;

            displayBrands();
            displayCars();

        });

        brandList.appendChild(button);

    });

}


/* ========================================
   FILTER CARS
======================================== */

function getFilteredCars() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();


    return cars.filter(car => {

        const matchesBrand =
            currentBrand === "All" ||
            car.brand === currentBrand;


        const searchableText = `
            ${car.brand}
            ${car.model}
            ${car.engine}
            ${car.country}
        `.toLowerCase();


        const matchesSearch =
            searchText === "" ||
            searchableText.includes(searchText);


        return matchesBrand && matchesSearch;

    });

}


/* ========================================
   DISPLAY CARS
======================================== */

function displayCars() {

    carGrid.innerHTML = "";

    const filteredCars = getFilteredCars();


    /* Section title */

    if (currentBrand === "All" && searchInput.value.trim() === "") {

        sectionTitle.textContent = "Discover";

    } else if (searchInput.value.trim() !== "") {

        sectionTitle.textContent =
            `Search Results (${filteredCars.length})`;

    } else {

        sectionTitle.textContent =
            currentBrand;

    }


    /* No results */

    if (filteredCars.length === 0) {

        const message = document.createElement("div");

        message.textContent = "No cars found.";

        message.style.gridColumn = "1 / -1";
        message.style.padding = "40px";
        message.style.textAlign = "center";
        message.style.color = "#666";
        message.style.fontSize = "18px";

        carGrid.appendChild(message);

        return;
    }


    /* Create cards */

    filteredCars.forEach(car => {

        const card = document.createElement("div");

        card.className = "car-card";


        /* Image */

        const imageContainer =
            document.createElement("div");

        imageContainer.className = "car-image";


        if (car.images.length > 0) {

            const image =
                document.createElement("img");

            image.src = car.images[0];
            image.alt = `${car.brand} ${car.model}`;

            imageContainer.appendChild(image);

        } else {

            imageContainer.textContent = "CAR IMAGE";

        }


        /* Information */

        const info =
            document.createElement("div");

        info.className = "car-info";


        const brand =
            document.createElement("div");

        brand.className = "car-brand";

        brand.textContent = car.brand;


        const name =
            document.createElement("div");

        name.className = "car-name";

        name.textContent = car.model;


        const summary =
            document.createElement("div");

        summary.className = "car-summary";

        summary.textContent =
            `${car.power} • ${car.drivetrain} • ${car.topSpeed}`;


        info.appendChild(brand);
        info.appendChild(name);
        info.appendChild(summary);


        /* Add everything to card */

        card.appendChild(imageContainer);
        card.appendChild(info);


        /* Open modal */

        card.addEventListener("click", () => {

            openCarModal(car);

        });


        carGrid.appendChild(card);

    });

}


/* ========================================
   OPEN CAR MODAL
======================================== */

function openCarModal(car) {

    modalTitle.textContent =
        `${car.brand} ${car.model}`;


    modalSpecs.innerHTML = "";


    /* Specifications */

    const specifications = [

        ["Engine", car.engine],
        ["Power", car.power],
        ["Max Torque", car.torque],
        ["Transmission", car.transmission],
        ["Drivetrain", car.drivetrain],

        ["0–100 km/h", car.acceleration],
        ["Top Speed", car.topSpeed],

        ["Length", car.length],
        ["Width", car.width],
        ["Height", car.height],

        ["Weight", car.weight],

        ["Production", car.production],
        ["Country", `🇬🇧 ${car.country}`],

        ["Production Count", `${car.productionCount} units`],

        ["Price", car.price],

        ["Location", car.location]

    ];


    specifications.forEach(specification => {

        const spec =
            document.createElement("div");

        spec.className = "spec";


        const label =
            document.createElement("div");

        label.className = "spec-label";

        label.textContent =
            specification[0];


        const value =
            document.createElement("div");

        value.className = "spec-value";

        value.textContent =
            specification[1];


        spec.appendChild(label);
        spec.appendChild(value);

        modalSpecs.appendChild(spec);

    });


    /* Main image */

    mainImage.innerHTML = "";

    if (car.images.length > 0) {

        const image =
            document.createElement("img");

        image.src = car.images[0];

        image.alt =
            `${car.brand} ${car.model}`;

        mainImage.appendChild(image);

    } else {

        mainImage.textContent = "CAR IMAGE";

    }


    carModal.classList.remove("hidden");

}


/* ========================================
   CLOSE CAR MODAL
======================================== */

function closeCarInformation() {

    carModal.classList.add("hidden");

}


/* ========================================
   SEARCH
======================================== */

searchInput.addEventListener("input", () => {

    displayCars();

});


/* ========================================
   CAR MODAL EVENTS
======================================== */

closeCarModal.addEventListener(
    "click",
    closeCarInformation
);


modalBackdrop.addEventListener(
    "click",
    closeCarInformation
);


/* ========================================
   INFORMATION MODAL
======================================== */

infoButton.addEventListener("click", () => {

    infoModal.classList.remove("hidden");

});


closeInfoModal.addEventListener("click", () => {

    infoModal.classList.add("hidden");

});


infoBackdrop.addEventListener("click", () => {

    infoModal.classList.add("hidden");

});


/* ========================================
   ESC KEY
======================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        carModal.classList.add("hidden");

        infoModal.classList.add("hidden");

    }

});


/* ========================================
   INITIALIZE WEBSITE
======================================== */

displayBrands();
displayCars();
