import React from 'react';

import { 
  CartItemContainer,
  CartItemImage,
  ItemDetailsContainer
 } from '../cart-item/CartItem.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt='item'/>
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>{quantity} x Rp{price}</span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;