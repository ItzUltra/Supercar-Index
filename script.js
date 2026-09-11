/* ========================================
 CarCore - MAIN WEBSITE SCRIPT
   Website functionality only
======================================== */


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

const closeCarModal =
    document.getElementById("closeCarModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");


/* Information Modal */

const infoButton =
    document.getElementById("infoButton");

const infoModal =
    document.getElementById("infoModal");

const closeInfoModal =
    document.getElementById("closeInfoModal");

const infoBackdrop =
    document.getElementById("infoBackdrop");


/* ========================================
   CAR DATA
======================================== */

/*
   The car database will be loaded
   from separate brand files.

   Example:

   mclaren.js
   ferrari.js
   bugatti.js

   All car objects will be collected
   into this array.
*/

const cars = [
    ...mclarenCars
];


/* ========================================
   CURRENT FILTER
======================================== */

let currentBrand = "All";


/* ========================================
   GET BRANDS
======================================== */

function getBrands() {

    const brands = [
        ...new Set(
            cars.map(car => car.brand)
        )
    ];

    return ["All", ...brands];

}


/* ========================================
   DISPLAY BRAND BUTTONS
======================================== */

function displayBrands() {

    brandList.innerHTML = "";

    const brands = getBrands();


    brands.forEach(brand => {

        const button =
            document.createElement("button");

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

    const searchText =
        searchInput.value
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

    const filteredCars =
        getFilteredCars();


    /* Section title */

    if (
        currentBrand === "All" &&
        searchInput.value.trim() === ""
    ) {

        sectionTitle.textContent =
            "Discover";

    }

    else if (
        searchInput.value.trim() !== ""
    ) {

        sectionTitle.textContent =
            `Search Results (${filteredCars.length})`;

    }

    else {

        sectionTitle.textContent =
            currentBrand;

    }


    /* No results */

    if (filteredCars.length === 0) {

        const message =
            document.createElement("div");

        message.textContent =
            "No cars found.";

        message.style.gridColumn =
            "1 / -1";

        message.style.padding =
            "40px";

        message.style.textAlign =
            "center";

        message.style.color =
            "#666";

        message.style.fontSize =
            "18px";


        carGrid.appendChild(message);

        return;

    }


    /* Create car cards */

    filteredCars.forEach(car => {

        const card =
            document.createElement("div");

        card.className =
            "car-card";


        /* ================================
           IMAGE
        ================================= */

        const imageContainer =
            document.createElement("div");

        imageContainer.className =
            "car-image";


        if (
            car.images &&
            car.images.length > 0
        ) {

            const image =
                document.createElement("img");

            image.src =
                car.images[0];

            image.alt =
                `${car.brand} ${car.model}`;


            imageContainer.appendChild(image);

        }

        else {

            imageContainer.textContent =
                "CAR IMAGE";

        }


        /* ================================
           INFORMATION
        ================================= */

        const info =
            document.createElement("div");

        info.className =
            "car-info";


        /* Brand */

        const brand =
            document.createElement("div");

        brand.className =
            "car-brand";

        brand.textContent =
            car.brand;


        /* Model */

        const name =
            document.createElement("div");

        name.className =
            "car-name";

        name.textContent =
            car.model;


        /* Summary */

        const summary =
            document.createElement("div");

        summary.className =
            "car-summary";

        summary.textContent =
            `${car.power} • ${car.drivetrain} • ${car.topSpeed}`;


        info.appendChild(brand);
        info.appendChild(name);
        info.appendChild(summary);


        /* ================================
           ADD TO CARD
        ================================= */

        card.appendChild(imageContainer);
        card.appendChild(info);


        /* ================================
           OPEN MODAL
        ================================= */

        card.addEventListener(
            "click",
            () => openCarModal(car)
        );


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


    /* ====================================
       SPECIFICATIONS
    ==================================== */

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
        ["Country", car.country],

        [
            "Production Count",
            `${car.productionCount} units`
        ],

        ["Price", car.price],
        ["Location", car.location]

    ];


    specifications.forEach(
        specification => {

            const spec =
                document.createElement("div");

            spec.className =
                "spec";


            const label =
                document.createElement("div");

            label.className =
                "spec-label";

            label.textContent =
                specification[0];


            const value =
                document.createElement("div");

            value.className =
                "spec-value";

            value.textContent =
                specification[1];


            spec.appendChild(label);
            spec.appendChild(value);


            modalSpecs.appendChild(spec);

        }
    );


    /* ====================================
       MAIN IMAGE
    ==================================== */

    mainImage.innerHTML = "";


    if (
        car.images &&
        car.images.length > 0
    ) {

        const image =
            document.createElement("img");

        image.src =
            car.images[0];

        image.alt =
            `${car.brand} ${car.model}`;


        mainImage.appendChild(image);

    }

    else {

        mainImage.textContent =
            "CAR IMAGE";

    }


    /* ====================================
       SHOW MODAL
    ==================================== */

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

searchInput.addEventListener(
    "input",
    () => {

        displayCars();

    }
);


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

infoButton.addEventListener(
    "click",
    () => {

        infoModal.classList.remove("hidden");

    }
);


closeInfoModal.addEventListener(
    "click",
    () => {

        infoModal.classList.add("hidden");

    }
);


infoBackdrop.addEventListener(
    "click",
    () => {

        infoModal.classList.add("hidden");

    }
);


/* ========================================
   ESCAPE KEY
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            carModal.classList.add("hidden");

            infoModal.classList.add("hidden");

        }

    }
);


/* ========================================
   INITIALIZE WEBSITE
======================================== */

displayBrands();
displayCars();
