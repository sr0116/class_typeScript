import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchGetEmployeeInfos,
    fetchPostEmployeeInfo,
    fetchPutEmployeeInfoById,
    fetchDeleteEmployeeInfoById,
} from "@/redux/api/employeeAPI";

export type Mode = "" | "register" | "upgrade" | "delete" | "reset";

interface ModeItem {
    id: Mode;
    label: string;
}

const modes: ModeItem[] = [
    { id: "register", label: "register" },
    { id: "upgrade", label: "upgrade" },
    { id: "delete", label: "delete" },
    { id: "reset", label: "reset" },
];

export type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
};

interface EmployeeStateType {
    mode: Mode;
    modes: ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo | null;
    selectedId: number | null;
    error: string | null;
    loading: boolean;
}

const initialState: EmployeeStateType = {
    mode: "",
    modes,
    infos: [],
    upInfo: null,
    selectedId: null,
    error: null,
    loading: false,
};

const handleModeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<Mode>
) => {
    const mod = action.payload;

    // reset 모드
    if (mod === "reset") {
        if (confirm("초기 데이터로 되돌릴까요?")) {
            state.infos = [];
            state.mode = "";
            state.upInfo = null;
            state.selectedId = null;
        }
        return;
    }

    // upgrade 모드
    if (mod === "upgrade") {
        if (!state.selectedId) {
            alert("수정할 직원을 선택하세요!");
            return;
        }
    }

    state.mode = mod;
};

const handleSelectedIdReducer = (
    state: EmployeeStateType,
    action: PayloadAction<number>
) => {
    const id = action.payload;
    state.selectedId = id;
    state.upInfo = state.infos.find((info) => info.id === id) ?? null;
};

const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers: {
        handleMode: handleModeReducer,
        handleSelectedId: handleSelectedIdReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.infos = action.payload;
                state.loading = false;
            })
            .addCase(fetchPostEmployeeInfo.fulfilled, (state, action) => {
                state.infos.push(action.payload);
                state.mode = "";
            })
            .addCase(fetchPutEmployeeInfoById.fulfilled, (state, action) => {
                const updated = action.payload;

                state.infos = state.infos.map((item) =>
                    item.id === updated.id ? updated : item
                );

                state.upInfo = updated;
            })
            .addCase(fetchDeleteEmployeeInfoById.fulfilled, (state, action) => {
                const deletedId = action.payload;

                // 여기에서 Redux 상태에서 삭제
                state.infos = state.infos.filter(
                    (item) => item.id !== deletedId
                );

                state.selectedId = null;
                state.upInfo = null;
                state.mode = "";
            });
    },
});

export const { handleMode, handleSelectedId } = employeeSlice.actions;

export default employeeSlice.reducer;
