import { cart, UpdateDeliveryOptionId } from '../../data/cart.js';
import { products } from '../../data/products.js';
import formateCurrency from '../utils/money.js';
import { removeFromCart } from '../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' ;
import { deliveryOptions } from '../../data/deliveryOptions.js';

const today= dayjs() ;
const deliveryDate=today.add(7,'days')
console.log(deliveryDate.format('dddd, MMMM D'));
console.log(deliveryDate) ;
console.log('ffffffffffffffffff') ;

export function renderOrderSummary(){


    // Use 'let' to allow modification
    let ordersHTML = '';

    // Loop through each cart item to build the HTML
    cart.forEach((cartItem) => {
    // Find the matching product
    let product;
    products.forEach((productItem) => {
    if (productItem.id === cartItem.productId ) {
        product = productItem;
    }
    });

    const deliveryOptionId=cartItem.deliveryOptionId;
    let deliveryOption ;

    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
            deliveryOption=option ;
        }
    })
    const today=dayjs();
    const deliveryDate=today.add(
        deliveryOption.deliveryDays,
        'days'
    );
    const dateString=deliveryDate.format('dddd, MMMM D') ;



    ordersHTML += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
        <div class="delivery-date js-delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${product.name}
            </div>
            <div class="product-price">
                $${formateCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary 
                js-delete-link" data-product-id="${product.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(product,cartItem)}
            </div>
        </div>
        </div>`;

    });

    function setDeliveryDate(){

    }

    function deliveryOptionsHTML(product,cartItem){
    let html='';

    deliveryOptions.forEach((deliveryOption)=>{
        const today=dayjs();
        const deliveryDate=today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString=deliveryDate.format('dddd, MMMM D') ;
        const priceString=deliveryOption.priceCents===0
        ? 'FREE'
        :`$${formateCurrency(deliveryOption.priceCents)} -` ;

        const isChecked=deliveryOption.id===cartItem.deliveryOptionId;

        html+=`<div class="delivery-option js-delivery-option"
                data-product-id="${product.id}"
                data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked': ''} class="delivery-option-input" 
                name="delivery-option-${product.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        `;
    });
    return html;
    }

    console.log(ordersHTML) ;
    console.log('gggggggg') ;

    // Inject the dynamically created HTML into the document
    document.querySelector('.order-summary').innerHTML = ordersHTML;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        console.log(productId) ;
        removeFromCart(productId);
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        console.log(container) ;
        container.remove() ;
    })
    })

 document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
    const {productId, deliveryOptionId}=element.dataset;
    element.addEventListener('click',()=>{
        UpdateDeliveryOptionId(productId, deliveryOptionId) ;
        renderOrderSummary();
    })
    })
}
