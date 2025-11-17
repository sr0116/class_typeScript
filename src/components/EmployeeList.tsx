import React from 'react';
import {EmployeeInfo} from "@/components/Main";

// 오브젝트구조를 리스트로 나타낼때
//  <EmployeeList information= {infos} /> main 에서 information key값
// 인터페이스를 구성한 이유는 변수 뿐만 아니라 함수도 넘길 수 있음 (확장성)
// type은 C에서 구조체라고 보면 됨
// 인터페이스는 오브젝트 구조 -> 클래스라는 것
interface EmployeeInfoProps {
    information: EmployeeInfo[];
}

// 키하고 벨류가 같으면 하나만 사용 {a: 5}
const EmployeeList = ({information}: EmployeeInfoProps) => {
    return (
        <div>
            {information.map( info => (<div key={info.id}>{info.name}</div>
            ))}
        </div>
    );
};

export default EmployeeList;