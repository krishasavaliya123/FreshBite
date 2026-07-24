// ============================
// FOOD DATA
// ============================

const foods = [

{
id:1,
name:"Margherita Pizza",
price:299,
category:"Pizza",
image:"images/pizza.jpg"
},

{
id:2,
name:"Cheese Burger",
price:199,
category:"Burger",
image:"images/burger.jpg"
},

{
id:3,
name:"Red Sauce Pasta",
price:249,
category:"Pasta",
image:"images/pasta.jpg"
},

{
id:4,
name:"Veg Sandwich",
price:149,
category:"Sandwich",
image:"images/sandwich.jpg"
},

{
id:5,
name:"French Fries",
price:129,
category:"Snacks",
image:"images/fries.jpg"
},

{
id:6,
name:"Veg Momos",
price:179,
category:"Momos",
image:"images/momos.jpg"
}

];

// ============================
// CART
// ============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================
// LOAD MENU
// ============================

const foodContainer = document.querySelector(".food-container");

function loadFoods(){

foodContainer.innerHTML="";

foods.forEach(food=>{

foodContainer.innerHTML += `

<div class="card">

<img src="${food.image}" alt="${food.name}">

<h3>${food.name}</h3>

<p>${food.category}</p>

<h4>₹${food.price}</h4>

<button onclick="addToCart(${food.id})">

Add To Cart

</button>

</div>

`;

});

}

loadFoods();

// ============================
// ADD TO CART
// ============================

function addToCart(id){

const item = cart.find(product=>product.id===id);

if(item){

item.quantity++;

}

else{

const food = foods.find(product=>product.id===id);

cart.push({

...food,

quantity:1

});

}

saveCart();

displayCart();

}

// ============================
// DISPLAY CART
// ============================

function displayCart(){

const cartItems=document.getElementById("cartItems");

const total=document.getElementById("total");

const count=document.getElementById("cart-count");

cartItems.innerHTML="";

let grandTotal=0;

let totalItems=0;

if(cart.length===0){

cartItems.innerHTML="<h3>Your cart is empty.</h3>";

total.innerHTML="0";

count.innerHTML="0";

return;

}

cart.forEach(item=>{

grandTotal += item.price*item.quantity;

totalItems += item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>

₹${item.price}

</p>

</div>

<div class="quantity-box">

<button onclick="changeQty(${item.id},-1)">-</button>

<span>${item.quantity}</span>

<button onclick="changeQty(${item.id},1)">+</button>

</div>

<div>

<h4>

₹${item.price*item.quantity}

</h4>

</div>

</div>

`;

});

total.innerHTML=grandTotal;

count.innerHTML=totalItems;

}

// ============================
// CHANGE QUANTITY
// ============================

function changeQty(id,value){

const item=cart.find(product=>product.id===id);

item.quantity += value;

if(item.quantity<=0){

cart=cart.filter(product=>product.id!==id);

}

saveCart();

displayCart();

}
// ============================
// SAVE CART
// ============================

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

}

// ============================
// CLEAR CART
// ============================

function clearCart(){

    if(confirm("Clear your shopping cart?")){

        cart=[];

        saveCart();

        displayCart();

    }

}

// ============================
// CHECKOUT
// ============================

const checkoutBtn=document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click",function(){

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    const amount=document.getElementById("total").innerHTML;

    alert(

`🎉 Order Placed Successfully!

Total Amount : ₹${amount}

Estimated Delivery : 30 Minutes

Thank you for ordering from FreshBite.`

);

    cart=[];

    saveCart();

    displayCart();

});

// ============================
// CONTACT FORM
// ============================

const contactForm=document.getElementById("contactForm");

contactForm.addEventListener("submit",function(e){

    e.preventDefault();

    const inputs=contactForm.querySelectorAll("input, textarea");

    let valid=true;

    inputs.forEach(input=>{

        if(input.value.trim()===""){

            valid=false;

        }

    });

    if(!valid){

        alert("Please fill all fields.");

        return;

    }

    alert("Thank you! Your message has been sent.");

    contactForm.reset();

});

// ============================
// SMOOTH SCROLL
// ============================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ============================
// SCROLL NAVBAR SHADOW
// ============================

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>50){

        header.style.boxShadow="0 5px 20px rgba(0,0,0,.25)";

    }

    else{

        header.style.boxShadow="0 4px 15px rgba(0,0,0,.15)";

    }

});

// ============================
// PAGE LOAD ANIMATION
// ============================

window.addEventListener("load",()=>{

    document.body.style.opacity="0";

    document.body.style.transition="opacity .6s";

    setTimeout(()=>{

        document.body.style.opacity="1";

    },100);

});

// ============================
// SEARCH FOOD (OPTIONAL)
// ============================

function searchFood(keyword){

    const cards=document.querySelectorAll(".card");

    keyword=keyword.toLowerCase();

    cards.forEach(card=>{

        const name=card.querySelector("h3").innerText.toLowerCase();

        if(name.includes(keyword)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

// ============================
// FILTER CATEGORY (OPTIONAL)
// ============================

function filterCategory(category){

    const cards=document.querySelectorAll(".card");

    cards.forEach(card=>{

        const text=card.querySelector("p").innerText;

        if(category==="All" || text===category){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

// ============================
// INITIALIZE
// ============================

displayCart();

console.log("FreshBite Loaded Successfully 🚀");