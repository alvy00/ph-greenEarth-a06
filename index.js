console.log("JS connected");

const getInBtn = document.getElementById("getin");
getInBtn.addEventListener('click', () => {
    addSelected();
    console.log("get in clicked")
})

// Global
const total = document.querySelectorAll('#total');

// Loading screens
const allCatSM = document.getElementById('allCatSM');
const allCatMD = document.getElementById('allCatMD');
const catLoadingSM = document.getElementById('catLoadingSM');
const catLoadingMD = document.getElementById('catLoadingMD');
const cardLoading = document.getElementById('cardLoading');

// Setting categories
let categories = [];
const catContainer = document.getElementById('smCategory');
const catContainerMD = document.getElementById('mdCategory');
const getCats = async () => {
    catLoadingSM.classList.remove('hidden');
    catLoadingMD.classList.remove('hidden');

    const res = await fetch('https://openapi.programming-hero.com/api/categories')
    const data = await res.json();
    categories = data.categories;
    //console.log(categories)

    for(let i=0; i<categories.length; i++){
        const catName = categories[i].category_name;

        //console.log(categories[i].category_name)
        const newCat = document.createElement('span');
        const newCatMD = document.createElement('span');
        newCat.className = "categorySM text-[10px] md:text-md pl-[7px] cursor-pointer"
        newCat.innerText = catName;

        newCatMD.className = "categoryMD text-[12px] md:text-[14px] w-full h-[25px] pl-[7px] my-1 cursor-pointer"
        newCatMD.innerText = catName;

        catContainer.appendChild(newCat);
        catContainerMD.appendChild(newCatMD);
    }

    const catCollSM = document.querySelectorAll('.categorySM');
    const catCollMD = document.querySelectorAll('.categoryMD');
    catCollSM.forEach((span, index) => {
        span.addEventListener('click', () => {
            addSelected(span.innerText);
            if(index===0){
                getPlants();
            } else {
                getPlantsCat(index);
            }
            //console.log(span.innerText, index);
        })
    })
    catCollMD.forEach((span, index) => {
        span.addEventListener('click', () => {
            addSelected(span.innerText);
            if(index===0){
                getPlants();
            } else {
                getPlantsCat(index);
            }
            //console.log(span.innerText, index);
        })
    })

    catLoadingSM.classList.add('hidden');
    catLoadingMD.classList.add('hidden');
    allCatSM.classList.remove('hidden');
    allCatMD.classList.remove('hidden');
}
getCats();

// Showing all plants 
let plants = [];
const cardsContainer = document.getElementById('cards');

const getPlants = async () => {
    cardLoading.classList.remove('hidden');
    cardsContainer.classList.add('hidden');
    cardsContainer.innerHTML = '';

    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    plants = data.plants;
    //console.log(plants)

    for(let i=0; i<plants.length; i++){
        const newPlant = document.createElement('div');
        newPlant.className = 'w-[190px] h-[350px] md:w-[320px] md:h-[390px] flex flex-col justify-center items-center gap-3 rounded-xl bg-white px-[12px] shadow-xl'
        newPlant.innerHTML = `
            <img class="w-[150px] h-[70px] md:w-[300px] md:h-[175px]" src="${plants[i].image}" alt=${plants[i].name} />
            <div class="flex flex-col gap-2">
                <span class="text-md md:text-xl font-bold cursor-pointer">
                    ${plants[i].name}
                </span>
                <span class="text-sm md:text-md text-gray-500">
                    ${plants[i].description}
                </span>
                <div class="flex justify-between">
                    <span class="text-[12px] md:text-sm text-center pt-[2px] md:pt-[0px] bg-green-100 rounded-3xl w-[90px]">
                        ${plants[i].category}
                    </span>
                    <span class="flex justify-between">
                        ৳ <span class="price">${plants[i].price}</span>
                    </span>
                </div>
            </div>
            <button class="addCartBtn text-[12px] md:text-sm text-white bg-green-700 hover:bg-green-500 w-full h-[25px] md:h-[30px] rounded-4xl cursor-pointer">
                Add to Cart
            </button>
        `

        cardsContainer.appendChild(newPlant);
    }

    document.querySelectorAll('.addCartBtn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.parentElement;
            let price = parseInt(card.querySelector(".price").innerText)
            let newPrice = parseInt(total[0].innerText) + price;
            total[0].innerText = newPrice;
            total[1].innerText = newPrice;
            console.log(total[0].innerText);
            //console.log(price)
        })
    })

    cardLoading.classList.add('hidden');
    cardsContainer.classList.remove('hidden');
}
getPlants();


// Show plants by category
let plantsCat = [];

const getPlantsCat = async (id) => {
    cardLoading.classList.remove('hidden');
    cardsContainer.classList.add('hidden');
    cardsContainer.innerHTML = '';

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    plantsCat = data.plants;
    //console.log(plantsCat)

    for(let i=0; i<plantsCat.length; i++){
        const newPlant = document.createElement('div');
        newPlant.className = 'w-[190px] h-[350px] md:w-[320px] md:h-[390px] flex flex-col justify-center items-center gap-3 rounded-xl bg-white px-[12px] shadow-xl'
        newPlant.innerHTML = `
            <img class="w-[150px] h-[70px] md:w-[300px] md:h-[175px]" src="${plantsCat[i].image}" alt=${plantsCat[i].name} />
            <div class="flex flex-col gap-2">
                <span class="text-md md:text-xl font-bold cursor-pointer">
                    ${plantsCat[i].name}
                </span>
                <span class="text-sm md:text-md text-gray-500">
                    ${plantsCat[i].description}
                </span>
                <div class="flex justify-between">
                    <span class="text-[12px] md:text-sm text-center pt-[2px] md:pt-[0px] bg-green-100 rounded-3xl w-[90px]">
                        ${plantsCat[i].category}
                    </span>
                    <span class="flex justify-between">
                        ৳ <span class="price">${plantsCat[i].price}</span>
                    </span>
                </div>
            </div>
            <button class="text-[12px] md:text-sm text-white bg-green-700 hover:bg-green-500 w-full h-[25px] md:h-[30px] rounded-4xl cursor-pointer">
                Add to Cart
            </button>
        `

        document.querySelectorAll('.addCartBtn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const card = btn.parentElement;
                let price = parseInt(card.querySelector(".price").innerText);
                let newPrice = parseInt(total.innerText) + price;
                total.innerText = newPrice;
                console.log("Added:", price, "New total:", newPrice);
            });
        });
        cardsContainer.appendChild(newPlant);
    }

    cardLoading.classList.add('hidden');
    cardsContainer.classList.remove('hidden');
}

// Mark selected category 
const addSelected = (category) => {
    const catCollSM = document.querySelectorAll('.categorySM');
    const catCollMD = document.querySelectorAll('.categoryMD');

    const selected = "text-white bg-green-700".split(" ");

    catCollSM.forEach((span) => {
        if(span.innerText === category){
            span.classList.add(...selected);
        }else{
            span.classList.remove(...selected);
        }
    })
    catCollMD.forEach((span) => {
        if(span.innerText === category){
            span.classList.add(...selected);
        }else{
            span.classList.remove(...selected);
        }
    })
    //console.log(catCollSM);
    //console.log(catCollMD);
}

