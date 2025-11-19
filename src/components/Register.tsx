"use client"

import React, {useState} from 'react';
import {EmployeeInfo} from "@/redux/slice/employeeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "@/redux/store";
import {fetchPostEmployeeInfos} from "@/redux/api/employeeAPI";

// 폼태그 css
export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export  const labelStyle: React.CSSProperties = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    color: '#333',
};

export  const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
};

const initialEmpInfo: EmployeeInfo
    = {id:0, name: '', age: 0, job: "", language: "", pay: 0}


const Register = () => {
    const dispatch = useDispatch<RootDispatch>();
    const [info, setInfo] = useState<EmployeeInfo>(initialEmpInfo);
    const {infos} = useSelector((state:RootState)=> state.emp);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // console.log(name, value)
        setInfo((prev) => ({ ...prev, [name]: value })); // id는 그대로 유지
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    // 검증
    if (!info.name) {
        alert("이름은 필수입니다.");
        return;
    }
        if (!info.age || Number(info.age) < 0) {
            alert("나이는 0 이상의 정수로 작성해주세요.");
            return;
        }

        if (!info.pay || Number(info.pay) < 0) {
            alert("급여는 0 이상의 정수로 작성해주세요.");
            return;
        }
    if (infos.some(item => item.name === info.name)) {
        alert("중복된 이름입니다.");
        return;
    }

    if (!info.language) {
        alert("언어는 필수입니다.");
        return;
    }

    if (!info.job) {
        alert("직업은 필수입니다.");
        return;
    }
        dispatch( fetchPostEmployeeInfos(info));
    };

    return (
        <div>
            <form style={formStyle} onSubmit={handleSubmit}>
                <label style={labelStyle}>Name
                <input type="text" name="name" style={inputStyle} required onChange={handleChange} /> </label>
                <label style={labelStyle}>age
                <input type="number" name="age"  style={inputStyle} required min={0} onChange={handleChange} /> </label>
                <label style={labelStyle}>job
                <input type="text" name="job"  style={inputStyle} required onChange={handleChange} /> </label>
                <label style={labelStyle}>language
                <input type="text" name="language"  style={inputStyle} required onChange={handleChange}/> </label>
                <label style={labelStyle}>pay
                <input type="number"  name="pay"  style={inputStyle} min={0} required onChange={handleChange}/> </label>
                <button type="submit"> 등록 </button>
            </form>
        </div>
    );
};

    export default Register;