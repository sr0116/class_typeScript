"use client"

import React, {useEffect, useState} from "react";
import {formStyle, inputStyle, labelStyle} from "@/components/Register";
import {EmployeeInfo, handleUpgrade} from "@/redux/employeeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "@/redux/store";

const Upgrade = () => {
    const dispatch = useDispatch<RootDispatch>();

    // Redux에서 현재 선택된 직원(upInfo) 가져오기
    const { upInfo } = useSelector((state: RootState) => state.emp);

    // local에서 편집본 관리
    const [localInfo, setLocalInfo] = useState<EmployeeInfo | null>(null);

    // 선택된 직원 정보가 바뀌면 localInfo에 반영
    useEffect(() => {
        if (upInfo) setLocalInfo(upInfo);
    }, [upInfo]);

    if (!localInfo) return <div>선택된 정보가 없습니다.</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLocalInfo(prev => prev ? {...prev, [name]: value} : prev);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(handleUpgrade(localInfo)); // ✔ 정상 작동
    };

    return (
        <div>
            <form style={formStyle} onSubmit={handleSubmit}>
                <label style={labelStyle}>Name
                    <input type="text" name="name" value={localInfo.name}
                           style={inputStyle} disabled />
                </label>

                <label style={labelStyle}>Age
                    <input type="number" name="age" value={localInfo.age}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <label style={labelStyle}>Job
                    <input type="text" name="job" value={localInfo.job}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <label style={labelStyle}>Language
                    <input type="text" name="language" value={localInfo.language}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <label style={labelStyle}>Pay
                    <input type="number" name="pay" value={localInfo.pay}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <button type="submit"> 수정 </button>
            </form>
        </div>
    );
};

export default Upgrade;
