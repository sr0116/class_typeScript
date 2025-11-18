import React from 'react';
// import {EmployeeInfo} from "@/components/Main"; // 절대 경로
import {buttonBarStyle, EmployeeInfo} from "./Main";
import InfoTable from "@/components/InfoTable";



// 오브젝트구조를 리스트로 나타낼때
//  <EmployeeList information= {infos} /> main 에서 information key값
// 인터페이스를 구성한 이유는 변수 뿐만 아니라 함수도 넘길 수 있음 (확장성)
// type은 C에서 구조체라고 보면 됨
// 인터페이스는 오브젝트 구조 -> 클래스라는 것
interface EmployeeInfoProps {
    infos: EmployeeInfo[];
    handleSelectedId: (id: number) => void; // return 없이  실행만
    selectedId : number ; // 여기서도 ? 사용할수 있음
}

// 키하고 벨류가 같으면 하나만 사용 {a: 5}
const EmployeeList = ({selectedId, infos, handleSelectedId}: EmployeeInfoProps) => {
    return (
        <>
        <div  style={buttonBarStyle}>
            {infos?.map(info => (
                <button
                    key={info.id}
                    onClick={() => handleSelectedId(info.id)}>
                    {info.name}
                </button>
            ))}
        </div>
            <div>
                <InfoTable
                    selectedId = {selectedId}
                    infos = {infos}
                />
            </div>
        </>
    );
};

export default EmployeeList;