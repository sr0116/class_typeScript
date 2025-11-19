import {configureStore} from "@reduxjs/toolkit";
import emp from "@/redux/employeeSlice";
// import employeeSlice from "@/redux/employeeSlice"; 변수명 emp로 사용


export const store = configureStore({
    reducer: {
        emp ,
    }
});

// 상태 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의(함수 - 액션)
export type RootDispatch = typeof store.dispatch;