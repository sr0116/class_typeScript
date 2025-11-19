import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchGetEmployeeInfos} from "@/redux/api/employeeAPI";

// 초기 기본 직원 목록
const initialTotal: EmployeeInfo[] = [
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1},
    {id: 2, name: "Jannie", age: 30, job: "frontend", language: "next", pay: 120},
    {id: 3, name: "Sue", age: 29, job: "backend", language: "react", pay: 130},
    {id: 4, name: "Susan", age: 28, job: "frontend", language: "react", pay: 17},
]

export type Mode = "" | "register" | "upgrade" | "delete" | "reset"

interface ModeItem {
    id: Mode;
    label: string;
}

// mode data
const modes: ModeItem[] = [
    {id: "register" as Mode, label: "register" as string},
    {id: "upgrade" as Mode, label: "upgrade" as string},
    {id: "delete" as Mode, label: "delete" as string},
    {id: "reset" as Mode, label: "reset" as string}
];

export type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
}

interface EmployeeStateType {
    mode: Mode;
    modes: ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo | null;
    selectedId: number;
    error: string | null;
    loading: boolean;
}

// initialState 설정
const initialState: EmployeeStateType = {
    mode: '',
    modes,
    infos: [],
    upInfo: null,
    selectedId: 0,
    error: null,
    loading: false
}

// 핸들 모드
const handleModeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<Mode>
) => {
    const mod = action.payload;

    // delete 모드일 때
    if (mod === "delete") {
        if (!state.selectedId) {
            alert("직원을 선택해 주세요");
            return;
        }

        const targetObj = state.infos.find(x => x.id === state.selectedId);
        if (!targetObj) {
            alert("해당 직원을 찾을 수 없습니다.");
            return;
        }

        if (confirm(`${targetObj?.name} 직원을 삭제하시겠습니까?`)) {

            state.infos = state.infos.filter(item => item.id !== state.selectedId);
            state.mode = "";
            state.upInfo = null;
            state.selectedId = 0;
            alert(`${targetObj?.name} 직원 삭제 완료되었습니다.`);
        }
        return;
    }

    // reset 모드일 때
    if (mod === "reset") {
        if (confirm("목록을 초기화 하시겠습니까?")) {

            state.infos = [...initialTotal];
            state.mode = "";
            state.upInfo = null;
            state.selectedId = 0;
            alert("목록을 초기화했습니다.");
        }
        return;
    }

    // upgrade 모드일 때
    if (mod === "upgrade") {
        if (!state.selectedId) {
            alert("수정할 직원을 먼저 선택해 주세요!!");
            return;
        }
    }

    state.mode = mod;
}

// 글수정
const handleUpgradeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<EmployeeInfo>
) => {
    const obj = action.payload;

    // 검증
    if (!obj.age || Number(obj.age) < 0) {
        alert("나이는 0 이상의 정수로 작성해주세요.");
        return;
    }

    if (!obj.pay || Number(obj.pay) < 0) {
        alert("급여는 0 이상의 정수로 작성해주세요.");
        return;
    }


    state.infos = state.infos.map(item =>
        item.id === state.selectedId ? {...obj, id: state.selectedId} : item
    );

    state.mode = "";
    state.upInfo = null;
}

// 아이디 받기
const handleSelectedIdReducer = (
    state: EmployeeStateType,
    action: PayloadAction<number>
) => {
    const id = action.payload;

    state.selectedId = id;
    state.upInfo = state.infos.find(info => info.id === id) ?? null;
}

// 글등록
const handleRegisterReducer = (
    state: EmployeeStateType,
    action: PayloadAction<EmployeeInfo>
) => {
    const nextId = state.infos.length
        ? Math.max(...state.infos.map(i => i.id)) + 1
        : 1;

    const newObj = {...action.payload, id: nextId};

    // 검증
    if (!newObj.name) {
        alert("이름은 필수입니다.");
        return;
    }


    if (state.infos.some(item => item.name === newObj.name)) {
        alert("중복된 이름입니다.");
        return;
    }

    if (!newObj.age || Number(newObj.age) < 0) {
        alert("나이는 0 이상의 정수로 작성해주세요.");
        return;
    }

    if (!newObj.pay || Number(newObj.pay) < 0) {
        alert("급여는 0 이상의 정수로 작성해주세요.");
        return;
    }

    if (!newObj.language) {
        alert("언어는 필수입니다.");
        return;
    }

    if (!newObj.job) {
        alert("직업은 필수입니다.");
        return;
    }

    // 검증 완료 → push
    state.infos.push(newObj);

    state.mode = "";
}

// thunk에 슬라이스 담기
const employeeSlice = createSlice({
    name:"employeeSlice",
    initialState,
    reducers:{
        handleMode: handleModeReducer,
        handleUpgrade: handleUpgradeReducer,
        handleRegister: handleRegisterReducer,
        handleSelectedId: handleSelectedIdReducer,
    },
    // 외부
    extraReducers: (builder) => {
        // 조회 GET 전체 데이터
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state, action) => {
                state.loading = true; // 로딩 상태
                state.error = null;
            })
            // 데이터가 들어오면 실행
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload; // response.data가 payload값이라 보면 됨
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload ??  "로딩 실패"; // catch로 리턴
            })
        // 등록
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state, action) => {
                state.loading = true; // 로딩 상태
                state.error = null;
            })
            // 데이터가 들어오면 실행
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload; // response.data가 payload값이라 보면 됨
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ??  "로딩 실패"; // catch로 리턴
            })
        // 수정
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state, action) => {
                state.loading = true; // 로딩 상태
                state.error = null;
            })
            // 데이터가 들어오면 실행
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload; // response.data가 payload값이라 보면 됨
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ??  "로딩 실패"; // catch로 리턴
            })
        // 삭제
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state, action) => {
                state.loading = true; // 로딩 상태
                state.error = null;
            })
            // 데이터가 들어오면 실행
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload; // response.data가 payload값이라 보면 됨
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ??  "로딩 실패"; // catch로 리턴
            })
    }
});

export const  {
    handleMode,
    handleUpgrade,
    handleRegister,
    handleSelectedId,
} = employeeSlice.actions;

export default employeeSlice.reducer;
