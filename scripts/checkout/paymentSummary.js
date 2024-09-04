import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';

export function renderPaymentSummary(){
    let productsPriceCents=0 ;
    cart.forEach((cartItem)=>{
        const product=getProduct(cartItem.productId);
        productsPriceCents+=product.priceCents * cartItem.quantity ;
    });

    console.log(productsPriceCents) ;
}