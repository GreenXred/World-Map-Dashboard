import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./CountrySlice";


export const store = configureStore({
    reducer: {
        country: countryReducer,
    },
});

// чтобы TypeScript понимал структуру всего Redux store, общее описание того, что хранится в Redux store
// и мог проверить:
// 1. правильность получения данных из store в функциях типа useSelector
// 2. правильность отправки экшенов в store в функциях типа useDispatch
export type RootState = ReturnType<typeof store.getState>; // функция, которая возвращает всё состояние Redux
export type AppDispatch = typeof store.dispatch;           // функция, которая отправляет экшены

