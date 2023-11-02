let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket =JSON.parse(localStorage.getItem("data")) || []

let generateShoppingItems = () => {
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x
            let search = shopItemsData.find(y => y.id === id) || []
            let {img, price, name} = search
            return `
            <div class="cart-items">
               <img width="100" src="${img}"/>
               <div class="details">              
                    <div class="name-price-x">
                        <h4 class="name-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$${price}</p>
                        </h4> 
                        <i onclick="removeItems(${id})" class="bi bi-x-lg"></i>                                               
                    </div> 
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">
                        ${search.length === 0 ? 0 : item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$${price*item} </h3> 
                </div>              
           </div>
            `
        }).join(""))
    }else{
        shoppingCart.innerHTML = `
        <h2>Cart is empty</h2>
        <a href='index.html'>
            <button id=bckHome class=bckHome> Back to home </button> 
        </a>        `
    }
}

generateShoppingItems()

let calculate = () =>{
    let cartItem = document.getElementById("cartItems")
    cartItem.textContent = basket.map((x) => x.item).reduce((x,y) => x+y,0)
}

calculate()


let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        search.item += 1
    }
    generateShoppingItems();
    localStorage.setItem("data", JSON.stringify(basket))
    update(selectedItem.id)
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined || search.item === 0) {
        return
    } else {
        search.item -= 1
    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    localStorage.setItem("data", JSON.stringify(basket))
    generateShoppingItems();
}

let update = (id) => {
    let search = basket.find((x) => x.id == id)
    document.getElementById(id).textContent = search.item
    calculate()
    totalAmount()
}

let removeItems = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
    generateShoppingItems()
    calculate()
    totalAmount()
}

let totalAmount = () =>{
    label.innerHTML=''
    if(basket.length !==0){
        let amount = basket.map((x) => {
            let {id, item} = x
            let search = shopItemsData.find(x => x.id == id) || []
             return item * search.price
         }).reduce((x,y) => x+y, 0)
         console.log(amount)
         if(amount > 0){
            label.innerHTML = `<h3>Total Bill= $${amount}</h3>
                <div>
                    <button class="checkOut">Checkout</button>
                    <button onclick="clearCart()" class="clearAll">Clear Cart</button>
                </div>
                </div>
            `
         }
    }else return
}

totalAmount()

let clearCart = () => {
    basket = []
    localStorage.setItem("data", JSON.stringify(basket))
    totalAmount()
    calculate()
    generateShoppingItems();   
}