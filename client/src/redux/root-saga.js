import { all, call } from 'redux-saga/effects';

import { shopSagas } from '../redux/shop/shop.sagas';
import { userSaga } from '../redux/user/user.sagas';
import { cartSagas } from '../redux/cart/cart.sagas';

export default function* rootSaga() {
  yield all([
    call(shopSagas),
    call(userSaga),
    call(cartSagas)
  ]);
}