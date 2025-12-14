import { legacy_createStore as createStore } from 'redux';
import { cartReducer } from './reducer';

// Створюємо магазин на основі нашого редьюсера
const store = createStore(cartReducer);

export default store;