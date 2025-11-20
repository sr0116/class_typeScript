import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchDeleteEmployeeInfoById,
    fetchGetEmployeeInfos,
    fetchPostEmployeeInfos,
    fetchPutEmployeeInfos
} from "@/redux/api/employeeAPI";

/*
    모드 타입
*/
export type Mode = "" | "register" | "upgrade" | "delete" | "reset";

/*
    모드 버튼 형태
*/
interface ModeItem {
    id: Mode;
    label: string;
}

/*
    직원 타입
*/
export type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
};

/*
    Redux 상태 타입
*/
interface EmployeeStateType {
    mode: Mode;
    modes: ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo | null;
    selectedId: number | null;
    error: string | null;
    loading: boolean;
}

/*
    모드 버튼 목록
*/
const modes: ModeItem[] = [
    { id: "register", label: "register" },
    { id: "upgrade", label: "upgrade" },
    { id: "delete", label: "delete" },
    { id: "reset", label: "reset" },
];

/*
    초기 상태
*/
const initialState: EmployeeStateType = {
    mode: "",
    modes,
    infos: [],
    upInfo: null,
    selectedId: null,
    error: null,
    loading: false
};

/*
    mode reducer
*/
const handleModeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<Mode>
) => {
    const mod = action.payload;

    if (mod === "delete") {
        if (!state.selectedId) {
            alert("직원을 선택해 주세요.");
            return;
        }
        state.mode = mod;
        return;
    }

    if (mod === "reset") {
        if (confirm("목록을 초기화하시겠습니까?")) {
            state.infos = [];
            state.upInfo = null;
            state.selectedId = null;
            state.mode = "";
        }
        return;
    }

    if (mod === "upgrade") {
        if (!state.selectedId) {
            alert("수정할 직원을 선택해 주세요.");
            return;
        }
    }

    state.mode = mod;
};

/*
    selectedId 설정 reducer
*/
const handleSelectedIdReducer = (
    state: EmployeeStateType,
    action: PayloadAction<number>
) => {
    const id = action.payload;
    state.selectedId = id;
    state.upInfo = state.infos.find(info => info.id === id) ?? null;
};

/*
    Slice 구성
*/
const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers: {
        handleMode: handleModeReducer,
        handleSelectedId: handleSelectedIdReducer
    },
    extraReducers: (builder) => {

        // GET 목록
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload;
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "로드 실패";
            });

        // POST 등록
        builder
            .addCase(fetchPostEmployeeInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = [...state.infos, action.payload];
                state.mode = "";
            })
            .addCase(fetchPostEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "등록 실패";
            });

        // PUT 수정
        builder
            .addCase(fetchPutEmployeeInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPutEmployeeInfos.fulfilled, (state, action) => {
                const updated = action.payload;
                state.loading = false;

                state.infos = state.infos.map(item =>
                    item.id === updated.id ? updated : item
                );

                state.upInfo = null;
                state.selectedId = null;
                state.mode = "";
            })
            .addCase(fetchPutEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "수정 실패";
            });

        // DELETE 삭제
        builder
            .addCase(fetchDeleteEmployeeInfoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeleteEmployeeInfoById.fulfilled, (state, action) => {
                const id = action.payload;

                state.loading = false;
                state.infos = state.infos.filter(item => item.id !== id);

                state.mode = "";
                state.upInfo = null;
                state.selectedId = null;
            })
            .addCase(fetchDeleteEmployeeInfoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "삭제 실패";
            });
    }
});

export const {
    handleMode,
    handleSelectedId
} = employeeSlice.actions;

export default employeeSlice.reducer;
