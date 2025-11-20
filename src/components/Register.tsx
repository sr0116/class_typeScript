"use client";

import React, { useState } from 'react';
import { EmployeeInfo } from "@/redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { fetchPostEmployeeInfos } from "@/redux/api/employeeAPI";

export const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px"
};

export const labelStyle: React.CSSProperties = {
    marginBottom: "10px",
    fontWeight: "bold"
};

export const inputStyle: React.CSSProperties = {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
};

const initialState: EmployeeInfo = {
    id: 0,
    name: "",
    age: 0,
    job: "",
    language: "",
    pay: 0
};

const Register = () => {
    const dispatch = useDispatch<RootDispatch>();
    const { infos } = useSelector((state: RootState) => state.emp);
    const [info, setInfo] = useState<EmployeeInfo>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!info.name) {
            alert("이름은 필수입니다.");
            return;
        }

        dispatch(fetchPostEmployeeInfos(info));
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <label style={labelStyle}>
                Name
                <input name="name" onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>
                Age
                <input name="age" type="number" onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>
                Job
                <input name="job" onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>
                Language
                <input name="language" onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>
                Pay
                <input name="pay" type="number" onChange={handleChange} style={inputStyle} />
            </label>

            <button type="submit">등록</button>
        </form>
    );
};

export default Register;
