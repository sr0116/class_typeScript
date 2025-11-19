import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeInfo} from "@/redux/slice/employeeSlice";


const API_URL = "http://localhost:3001";
// get방식 전체 infos , post 방식
// 동적 할당createAsyncThunk<EmployeeInfo[]
export const fetchGetEmployeeInfos = createAsyncThunk<EmployeeInfo[], void, { rejectValue: string }>(
    "employeeApi/fetchGetEmployeeInfos",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/app/emp`);
            return response.data; // 리턴된 값 action.payload -> 이걸 덩크가 잡는다고 보념되

        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 로드 실패")
        }
    }
);

// post 방식
export const fetchPostEmployeeInfos = createAsyncThunk<
    EmployeeInfo, EmployeeInfo, { rejectValue: string }>(
    "employeeApi/fetchPostEmployeeInfos",
    async (obj, thunkAPI) => {
        try {
            const response = await axios.post<EmployeeInfo>(`${API_URL}/app/emp`, obj);
            return response.data;

        } catch (e) {
            return thunkAPI.rejectWithValue("보내기 실패");

        }
    }
)

// delete
export const fetchDeleteEmployeeInfoById = createAsyncThunk<
    number, number, { rejectValue: string }>(
    "employeeApi/fetchDeleteEmployeeInfoById",
    async (id, thunkAPI) => {
        try {
            await axios.put(`${API_URL}/${id}`, id);
            return id;

        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 삭제 실패");

        }
    }
)

export const fetchPutEmployeeInfos = createAsyncThunk<
    EmployeeInfo, EmployeeInfo, { rejectValue: string }>(
    "employeeApi/fetchPutEmployeeInfos",
    async (emp, thunkAPI) => {
        try {
            const response = await axios.put<EmployeeInfo>(`${API_URL}/${emp.id}`, emp);
            return response.data;

        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 수정 실패");

        }
    }
)

