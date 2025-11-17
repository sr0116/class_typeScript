"use client"
import React from 'react';

// main에서 데이터를 만듬
// 리액트에서 기본적으로 상수(불변)로 const 지정 , (immutable)
// let은 잘 사용하지 않음, mutable
// var 는 역상속이 되어버리는 문제때문에 잘 사용하지 않음
// 얕은 카피, 깊은 카피 (참조)
// 카피라는 것은 보통 0,1,2,3 ... 이렇게 있을 때 원본은 그대로 두고 새로 하나 생성해두고 값변경한다고 보면 됨
// 보통 리액트에서는 깊은 카피를 사용해야 함 [ ...arrs ] , {...object}  이게 가장 편함(리스트도 오브젝트도)
// list 안에 object

// 이게 결국 스키마 구성
type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
}

const initialState: EmployeeInfo[] = [
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1},
    {id: 2, name: "Jone", age: 30, job: "frontend", language: "next", pay: 120},
    {id: 3, name: "Jone", age: 29, job: "backend", language: "react", pay: 130},
    {id: 4, name: "Jone", age: 28, job: "frontend", language: "react", pay: 17},
]
console.log(initialState);


const Main = () => {
    return (
        <div>
            Hello TypeScript...!
        </div>
    );
};

export default Main;