
const changeSlideButton = document.querySelectorAll("[data-change-slide-button]")
changeSlideButton.forEach(button => {
    button.addEventListener("click", () => {
        const slides = document.querySelector(".slides")
        const activeSlide = document.querySelector("[data-active]")
        
        let indexActiveSlide = Array.from(slides.children).indexOf(activeSlide)

        indexActiveSlide = button.dataset.changeSlideButton === "next" 
            ? indexActiveSlide + 1
            : indexActiveSlide - 1

    if (indexActiveSlide >= slides.children.length) {
        indexActiveSlide = 0
    }

    if (indexActiveSlide < 0) {
        indexActiveSlide = slides.children.length - 1
      }


    activeSlide.removeAttribute("data-active")
     slides.children[indexActiveSlide].dataset.active = true

    })
});


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalAmount = "0.00"

function ready(){
    const removeProductButton = document.getElementsByClassName("remove-product-button")
    for(var i = 0; i < removeProductButton.length; i++){
        removeProductButton[i].addEventListener("click", removeProduct)
        
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for(var i = 0; i < quantityInputs.length; i++){
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }

    const addToCartButtons = document.getElementsByClassName("add-product-btn")
    for(var i=0; i < addToCartButtons.length;i++){
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)

}

function makePurchase(){
    if(totalAmount === "0.00"){
        alert("Your Cart is currently empty.")
    }else{
        alert(
            `
            Total Amount of Purchase: $${totalAmount}
            `
        )
    }
    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function removeProduct(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function checkIfInputIsNull(event){
    if(event.target.value === "0"){
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()
}

function addProductToCart(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText


    const productsCartName = document.getElementsByClassName("cart-product-title")
    for(var i = 0; i < productsCartName.length; i++){
        if(productsCartName[i].innerText === productTitle){
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            updateTotal()
            return
        }
    }

   

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
    <td class="product-identification">
    <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
    <strong class="cart-product-title" >${productTitle}</strong>
    </td>
    <td>
     <span class="cart-product-price">${productPrice}</span>
    </td>
    <td>
        <input class="product-qtd-input" type="number" value="1" min="0" name="qtd">
        <button class="remove-product-button">Remove</button>
    </td>
    `
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)

    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}



function updateTotal(){
    const cartProducts = document.getElementsByClassName("cart-product")
    totalAmount = 0

    for(var i= 0; i < cartProducts.length;i++){
        const productPriceText = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText
        const productPrice = parseFloat(productPriceText.replace("$", ""));
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
        totalAmount += productPrice * productQuantity
    }
    totalAmount = totalAmount.toFixed(2)
    document.querySelector(".cart-total-container span").innerText = "$" + totalAmount
}