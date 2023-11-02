let shop = document.getElementById("shop")

let basket =JSON.parse(localStorage.getItem("data")) || []

let generateShopItems = () => {
    return (shop.innerHTML = shopItemsData.map((data) => {
        /*Destrucring the object*/
        let { id, name, price, desc, img } = data
        let search = basket.find((x) => x.id === id) || []
        return `
        <div id="product-id-${id}" class="item">
        <img width="220" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id="${id}" class="quantity">
                    ${search.length === 0 ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
        `
    }).join(""))
}

generateShopItems()

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
    localStorage.setItem("data", JSON.stringify(basket))
    //console.log(basket)
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
    
}

let update = (id) => {
    let search = basket.find((x) => x.id == id)
    document.getElementById(id).textContent = search.item
    calculate()
}

let calculate = () =>{
    let cartItem = document.getElementById("cartItems")
    cartItem.textContent = basket.map((x) => x.item).reduce((x,y) => x+y,0)
}

calculate()