"use client"

import {
    useMemo,
    useCallback,
    useState,
    createContext,
    PropsWithChildren, useContext
} from "react";


// EmployeeContext key 값이라 보면 됨
export const EmployeeContext = createContext<EmployeeContextValue | undefined>(undefined);

// PropsWithChildren 라이브러리
export const EmployeeProvider = ({children}: PropsWithChildren) => {

// 현재 state는 총 4개 제네릭 <> (동적할당에서 사용함) -> EmployeeInfo[]
    const [infos, setInfos] = useState<EmployeeInfo[]>(initialTotal);
    const [upInfo, setUpInfo] = useState<EmployeeInfo>(initialEmployeeInfo);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<Mode | string>('');
    const modes = useMemo(() => [
        {id: "register" as Mode, label: "register"},
        {id: "upgrade" as Mode, label: "upgrade"},
        {id: "delete" as Mode, label: "delete"},
        {id: "reset" as Mode, label: "reset"}
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

        if (!obj.age || Number(obj.age) < 0) {
            alert("나이는 0 이상의 정수로 작성해수세요.")
            return;
        }

        if (!obj.pay || Number(obj.pay) < 0) {
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
    // 핸들 모드
    const handleMode = (mod: Mode) => {
        // infos.filter( info => info.id !== selectedId)
        // 삭제
        if (mod === "delete") {
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
                setInfos(prev => prev.filter(item => item.id !== selectedId))
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
    // 아이디 받기
    const handleSelectedId = (id: number) => {
        setSelectedId(id); // id를 받았다고 치고 실행을 하면 setSelectedId(id);
    }
// 글등록
    const handleRegister = (obj: EmployeeInfo) => {
        const nextId = infos.length ? Math.max(...infos.map(i => i.id)) + 1 : 1;
        // 아이디 정보
        const newObj = {...obj, id: nextId};
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
        if (!obj.age || Number(obj.age) < 0) {
            alert("나이는 0 이상의 정수로 작성해수세요.")
            return;
        }
        if (!obj.pay || Number(obj.pay) < 0) {
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
        setInfos(prev => ([...prev, {...obj, id: nextId}]));
        console.log(newObj);
    }
    // value값 만들기 (여기서 키값)
    const value = useMemo(() => (
        {
            infos,
            upInfo,
            mode,
            modes,
            selectedId,
            handleMode,
            handleSelectedId,
            handleRegister,
            handleUpgrade
        }
    ), [
        infos,
        upInfo,
        mode,
        modes,
        selectedId,
        handleSelectedId,
        handleMode,
        handleRegister,
        handleUpgrade
    ])
    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    )
}


// 사용자 훅 : use 사용
export const useEmployee = () => {
            const context = useContext(EmployeeContext);
            if (!context) {
                throw new Error("usecontext 못 찾음")
            }
            return context;
}

