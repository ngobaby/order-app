
function displayOrder() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let order = document.getElementById('order');
    order.innerHTML = "";

    if (cart.length > 0) {
        let totalPrice = 0;
        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            order.innerHTML += `
                <div>
                    <h4>${item.foodName}</h4>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
        order.innerHTML += `<h4>Total Price: ${totalPrice}</h4>`;
    } else {
        order.innerHTML = `<p>No meal was ordered</p>`;
    }
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index >= 0) {
        let removedItem = cart[index];
        cart.splice(index, 1);  
        localStorage.setItem('cart', JSON.stringify(cart));  
        alert(`${removedItem.foodName} has been removed successfully`);

        
        displayOrder();
        IncreaseCounter();  
    } else {
        alert("Item not found in cart.");
    }
}

function processOrder(event){
    event.preventDefault()
    let address = document.getElementById('delivery-address').value;
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;

    alert(`Order has been successfully Placed`)
    document.getElementById('delivery-address').value = ""
    document.getElementById('name').value = ""
    document.getElementById('phone').value = ""
}
function cancelOrder() {
    let address = document.getElementById('delivery-address').value;
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    localStorage.removeItem('cart');
    displayOrder(); 
    alert("Your order has been canceled.");
     document.getElementById('delivery-address').value = ""
    document.getElementById('name').value = ""
    document.getElementById('phone').value = ""
}