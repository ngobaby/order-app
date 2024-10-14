let food = [
    { image: "images/pasta.png", foodName: "Spicy Pasta", price: 1500 },
    { image: "images/burger.png", foodName: "Burger", price: 1900 },
    { image: "images/ice-cream.png", foodName: "Chocolate Icecream", price: 2500 },
    { image: "images/fried-rice.png", foodName: "Fried Rice and Wings", price: 3500 },
    { image: "images/juice.png", foodName: "Freshly Squeezed Juice", price: 7500 },
    { image: "images/sharwama.png", foodName: "Chicken and Beef Sharwama", price: 1800 },
    { image: "images/chips-chicken.png", foodName: "Chicken and Chips", price: 1950 },
    { image: "images/pizza.png", foodName: "Pizza", price: 4500 },
];
let localCart = localStorage.getItem('cart')
let cart = !localCart? [] :JSON.parse(localCart)
loadMenu(food); 
document.addEventListener("DOMContentLoaded", function() {
    loadMenu(food); 
    IncreaseCounter()
})

function loadMenu(menu) {
    let menuitems = "";
    let menuCard = document.getElementById('menu-items');
    menu.forEach((item, index) => {  
        menuitems += `
            <div class="col-6 col-lg-3 item d-flex align-items-center justify-content-center">
                <div class="food text-center">
                    <img src="${item.image}" alt="${item.foodName}">
                    <p class="food-name">${item.foodName}</p>
                    <h5>₦${item.price}</h5>
                    <button class="btn btn-primary" onclick="addToCart(${index})">Add To Cart</button> <!-- Use index directly -->
                </div>
            </div>
        `;
    });
    menuCard.innerHTML = menuitems;
}


function SearchMenu(){
    let searchValue = document.getElementById('search-input').value.trim().toLowerCase()
    let searchResult = food.filter(item =>  item.foodName.toLowerCase().includes(searchValue))
    if (searchResult.length > 0){
        loadMenu(searchResult); 
    } else{
        alert(`food is not on the menu`)
    }
    document.getElementById('search-input').value = ""
};

function addToCart(index){
    let menuItems = food[index]
let cartSearch = cart.find(item => (item.foodName === menuItems.foodName
))
    if (!cartSearch){
        cart.push({
            image : menuItems.image,
            foodName: menuItems.foodName,
            price: menuItems.price,
            quantity : 1,
            total: menuItems.price
        })
        alert(`${menuItems.foodName} is succesfully added to cart`)
        IncreaseCounter()
    }else{
        cartSearch.quantity += 1;
        cartSearch.total = cartSearch.quantity*cartSearch.price
        alert(`quantity for ${menuItems.foodName} has been increased to ${cartSearch.quantity}`)
        IncreaseCounter()
    }
localStorage.setItem('cart', JSON.stringify(cart))
}

function IncreaseCounter(){
    document.getElementById('counter').innerHTML = cart.length
}
