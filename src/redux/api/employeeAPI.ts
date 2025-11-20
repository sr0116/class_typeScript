import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EmployeeInfo } from "@/redux/slice/employeeSlice";

// 공통 API URL
const API_URL = "http://localhost:3001/app/emp";

/*
    전체 조회 GET
    반환 타입: EmployeeInfo[]
*/
export const fetchGetEmployeeInfos = createAsyncThunk<
    EmployeeInfo[],
    void,
    { rejectValue: string }
>(
    "employeeApi/fetchGetEmployeeInfos",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("데이터 로드 실패");
        }
    }
);

/*
    등록 POST
    param: EmployeeInfo
    반환: EmployeeInfo (서버가 생성한 id 포함)
*/
export const fetchPostEmployeeInfos = createAsyncThunk<
    EmployeeInfo,
    EmployeeInfo,
    { rejectValue: string }
>(
    "employeeApi/fetchPostEmployeeInfos",
    async (emp, thunkAPI) => {
        try {
            const response = await axios.post(API_URL, emp);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("등록 실패");
        }
    }
);

/*
    수정 PUT
*/
export const fetchPutEmployeeInfos = createAsyncThunk<
    EmployeeInfo,
    EmployeeInfo,
    { rejectValue: string }
>(
    "employeeApi/fetchPutEmployeeInfos",
    async (emp, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/${emp.id}`, emp);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("수정 실패");
        }
    }
);

/*
    삭제 DELETE
    param: number(id)
    반환: 삭제된 id
*/
export const fetchDeleteEmployeeInfoById = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    "employeeApi/fetchDeleteEmployeeInfoById",
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue("삭제 실패");
        }
    }
);
