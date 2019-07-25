import ShopActionsType from '../shop/shop.types';

export const updateCollections = collectionsMap => ({
  type: ShopActionsType.UPDATE_COLLECTIONS,
  payload: collectionsMap
})