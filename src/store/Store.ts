import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {},
});


// чтобы TypeScript понимал структуру всего Redux store, общее описание того, что хранится в Redux store
// и мог проверить:
// 1. правильность получения данных из store в функциях типа useSelector
// 2. правильность отправки экшенов в store в функциях типа useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  

