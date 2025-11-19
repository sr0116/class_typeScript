"use client"
import React, {useMemo, useState} from 'react';
import EmployeeList from "@/components/EmployeeList";
import InfoTable from "@/components/InfoTable";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";

export const buttonBarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
}

// main에서 데이터를 만듬
// 리액트에서 기본적으로 상수(불변)로 const 지정 , (immutable)
// let은 잘 사용하지 않음, mutable
// var 는 역상속이 되어버리는 문제때문에 잘 사용하지 않음
// 얕은 카피, 깊은 카피 (참조)
// 카피라는 것은 보통 0,1,2,3 ... 이렇게 있을 때 원본은 그대로 두고 새로 하나 생성해두고 값변경한다고 보면 됨
// 보통 리액트에서는 깊은 카피를 사용해야 함 [ ...arrs ] , {...object}  이게 가장 편함(리스트도 오브젝트도)
// list 안에 object

// 이게 결국 스키마 구성 (object 데이터 , 클래스라 보면됨)
// api를 받거나 주기위해서 사용
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

// 전체 데이터(Fact Table)
export const initialTotal: EmployeeInfo[] = [
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1},
    {id: 2, name: "Jannie", age: 30, job: "frontend", language: "next", pay: 120},
    {id: 3, name: "Sue", age: 29, job: "backend", language: "react", pay: 130},
    {id: 4, name: "Susan", age: 28, job: "frontend", language: "react", pay: 17},
]
// "" 이건 초기값
type Mode = "" | "register" | "upgrade" | "delete" | "reset"



// 이것도 출력 됨 (string뿐만 아니라 list도가능)
const test = ["Jone", "Sue", "Peter"];

export const initialEmployeeInfo: EmployeeInfo =
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1}

const Main = () => {
    // 현재 state는 총 4개 제네릭 <> (동적할당에서 사용함) -> EmployeeInfo[]
    const [infos, setInfos] = useState<EmployeeInfo[]>(initialTotal);
    const [info, setInfo] = useState<EmployeeInfo>(initialEmployeeInfo);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<Mode>('');
    const modes = useMemo(() => [
        {id: "register" as const, label: "register"},
        {id: "upgrade" as const, label: "upgrade"},
        {id: "delete" as const, label: "delete"},
        {id: "reset" as const, label: "reset"}
    ], []);  // 넣을 의존성 없어서 [] 빈값

    //   const  = useMemo(() => {
    //         리턴 안할 때
    //     }, [의존성을 넣으면 됨]); 대부분의 의존성은 props나 state가 변할 때 렌더링 ([] -> 이건 빈값 넣어주면 한 번만 변경하고 렌더링 안함)

    const handleUpgrade = (obj: EmployeeInfo) => {
        // 이름 중복
        infos.some(item => item.name !== obj.name);
        if (!obj.name) {
            alert("중복된 이름입니다")
            return;
        }

        if (!obj.age || Number(obj.age) < 0 ) {
            alert("나이는 0 이상의 정수로 작성해수세요.")
            return;
        }

        if (!obj.pay || Number(obj.pay) < 0 ) {
            alert("급여는 0 이상의 정수로 작성해수세요.")
            return;
        }

        if (!obj.language) {
            alert("언어 필수입니다.")
            return;
        }
        if (!obj.job) {
            alert("직업은 필수입니다.")
            return;
        }

        setInfos(prev =>
            prev.map(info =>
                info.id === obj.id ? obj : info
            )
        );
        console.log(obj);
    };

    
    const handleMode = (mod: Mode) => {
        // infos.filter( info => info.id !== selectedId)
        // 삭제
        if(mod === "delete") {
            if (!selectedId) {
                alert("직원을 선택해 주세요")
                return;
            }
            // targetObject (무슨 자료인지 확실하게 알아야 함)
            const targetObj = infos.find(x => x.id === selectedId);
            if (!targetObj) {
                alert("해당 직원을 찾을 수 없습니다.")
                return;
            }
            if (confirm(`${targetObj?.name} 직원을 삭제하시겠습니까?`)) {
                setInfos( prev => prev.filter(item => item.id !== selectedId))
                alert(`${selectedId} 번 ${targetObj?.name}직원을 삭제 완료했습니다.`)
            }
            return;
        }
        // 실제로는 else if 를 잘 사용안 함
        if (mod === "reset") {
            if (confirm("목록을 초기화 하시겠습니까?")) {
                setInfos(initialTotal);
                alert("목록을 초기화완료했습니다.")
            }
            return;
        }
        if (mod === "upgrade") {
            if (confirm("수정하시겠습니까?")) {

            }
        }
        setMode(mod);
    }

    const handleSelectedId = (id: number) => {
        setSelectedId(id); // id를 받았다고 치고 실행을 하면 setSelectedId(id);
    }
    // 글등록
    const handleRegister = (obj: EmployeeInfo) => {
        const nextId = infos.length ? Math.max(...infos.map(i => i.id)) + 1 : 1;
        // 아이디 정보
        const newObj = { ...obj, id: nextId };

        if (!obj.name) {
            alert("이름을 필수입니다.")
            return;
        }

        // 이름 중복
        infos.some(item => item.name !== obj.name);
        if (!obj.name) {
            alert("중복된 이름입니다")
            return;
        }

        if (!obj.age || Number(obj.age) < 0 ) {
            alert("나이는 0 이상의 정수로 작성해수세요.")
            return;
        }

        if (!obj.pay || Number(obj.pay) < 0 ) {
            alert("급여는 0 이상의 정수로 작성해수세요.")
            return;
        }

        if (!obj.language) {
            alert("언어 필수입니다.")
            return;
        }
        if (!obj.job) {
            alert("직업은 필수입니다.")
            return;
        }
        setInfos( prev => ([...prev, {...obj, id: nextId}]));
        console.log(newObj);
    }
    return (
        <>
            <div>
                {/*map은 결국 list를 출력할 수 있다 (표출할 수 있다)*/}
                <EmployeeList
                    infos={infos}
                    selectedId={selectedId}
                    handleSelectedId = {handleSelectedId}
                /> {/* 자식 : InfoTable */}
            </div>
            <div style={buttonBarStyle}>
                {/*map을 사용할 때는 리액트에서 key값을 지정해야 한다 , 안하면 오류는 안나지만 빨간 줄 */}
                {/*변경이 될 때 부모 상태 바뀌면 무조건 자식도 렌더링 되는 문제를 없애기 위해 usememo,usecallback , key값이 생겨남 (여기서 유니크한 키값으로 지정해줘야 함)*/}
                {/*useMemo - 데이터를 감싸는 것 (자료는) */}
                {/*useCallback - 함수를 감싸는 것*/}
                {/*지금은 useMemo*/}
                {modes.map(mode => (
                    <button
                        key={mode.id}  onClick={() => handleMode(mode.id)}> {mode.label}</button>
                ))}
            </div>
            <div>
                {/* 삼항 연산자는 두개만 되니까 두개 이상일 때는 밑에것 처럼 사용하면 됨{mode === "register" ? <Register /> : <Upgrade />}*/}
                {/*arrs?.map ? 문법도 있음 만약 널값이라면 예외처리 해준다고 보면됨*/}
                {mode === "register" && <Register handleRegister={handleRegister} /> }
                {mode === "upgrade" && <Upgrade infos= {infos} selectedId = {selectedId} handleUpgrade = {handleUpgrade} />}
            </div>

        </>
    );

};


export default Main;