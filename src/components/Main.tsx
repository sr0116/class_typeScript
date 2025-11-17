"use client"
import {useState} from 'react';
import EmployeeList from "@/components/EmployeeList";

// main에서 데이터를 만듬
// 리액트에서 기본적으로 상수(불변)로 const 지정 , (immutable)
// let은 잘 사용하지 않음, mutable
// var 는 역상속이 되어버리는 문제때문에 잘 사용하지 않음
// 얕은 카피, 깊은 카피 (참조)
// 카피라는 것은 보통 0,1,2,3 ... 이렇게 있을 때 원본은 그대로 두고 새로 하나 생성해두고 값변경한다고 보면 됨
// 보통 리액트에서는 깊은 카피를 사용해야 함 [ ...arrs ] , {...object}  이게 가장 편함(리스트도 오브젝트도)
// list 안에 object

// 이게 결국 스키마 구성
export type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
}
// {infos.map ( (info, index) => (
//     <div key={index}>{info.name}</div>
// ))}
export const initialState: EmployeeInfo[] = [
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1},
    {id: 2, name: "Jannie", age: 30, job: "frontend", language: "next", pay: 120},
    {id: 3, name: "Sue", age: 29, job: "backend", language: "react", pay: 130},
    {id: 4, name: "Susan", age: 28, job: "frontend", language: "react", pay: 17},
]

// 이것도 출력 됨 (string뿐만 아니라 list도가능)
const test = ["Jone", "Sue" , "Peter"] ;

export const  initialEmployeeInfo: EmployeeInfo =
        {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1}

const Main = () => {
    // 제네릭 (동적할당에서 사용함) -> EmployeeInfo[]
    const [infos, setInfos] = useState<EmployeeInfo[]>(initialState);
    const [info, setInfo] = useState<EmployeeInfo>(initialEmployeeInfo);
    return (
        <div>
            {/*map은 결국 list를 출력할 수 있다 (표출할 수 있다)*/}
           <EmployeeList information= {infos} />
        </div>
    );
};

export default Main;