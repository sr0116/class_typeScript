"use client";

import React, { useEffect, useState } from "react";
import { EmployeeInfo } from "@/redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, RootDispatch } from "@/redux/store";
import { fetchPutEmployeeInfos } from "@/redux/api/employeeAPI";
import { formStyle, inputStyle, labelStyle } from "@/components/Register";

const Upgrade = () => {
    const dispatch = useDispatch<RootDispatch>();
    const { upInfo } = useSelector((state: RootState) => state.emp);
    const [localInfo, setLocalInfo] = useState<EmployeeInfo | null>(null);

    useEffect(() => {
        if (upInfo) setLocalInfo(upInfo);
    }, [upInfo]);

    if (!localInfo) return <div>선택된 정보가 없습니다.</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalInfo(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (localInfo) dispatch(fetchPutEmployeeInfos(localInfo));
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <label style={labelStyle}>Name
                <input name="name" value={localInfo.name} disabled style={inputStyle} />
            </label>

            <label style={labelStyle}>Age
                <input name="age" type="number" value={localInfo.age} onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>Job
                <input name="job" value={localInfo.job} onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>Language
                <input name="language" value={localInfo.language} onChange={handleChange} style={inputStyle} />
            </label>

            <label style={labelStyle}>Pay
                <input name="pay" type="number" value={localInfo.pay} onChange={handleChange} style={inputStyle} />
            </label>

            <button type="submit">수정</button>
        </form>
    );
};

export default Upgrade;
