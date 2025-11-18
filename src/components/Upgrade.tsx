import React, {useEffect, useMemo, useState} from "react";
import {formStyle, inputStyle, labelStyle} from "@/components/Register";
import {EmployeeInfo} from "@/components/Main";

interface UpgradeProps {
    selectedId: number;
    infos: EmployeeInfo[];
    handleUpgrade: (info: EmployeeInfo) => void;
}

const Upgrade = ({selectedId, infos, handleUpgrade}: UpgradeProps) => {

    // useMemo로 선택된 employee 정보 계산
    const memoEmployee = useMemo(() => {
        return infos.find(info => info.id === selectedId) || null;
    }, [infos, selectedId]);


    //  form의 editable 상태 관리
    const [upInfo, setUpInfo] = useState<EmployeeInfo | null>(null);


    // memoEmployee가 변경될 때만 upInfo 초기화
    useEffect(() => {
        setUpInfo(memoEmployee);
    }, [memoEmployee]);


    if (!upInfo) return <div>선택된 정보가 없습니다.</div>;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUpInfo(prev =>
            prev ? { ...prev, [name]: value } : prev
        );
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUpgrade(upInfo);
    };


    return (
        <div>
            <form style={formStyle} onSubmit={handleSubmit}>
                <label style={labelStyle}>Name
                    <input type="text" name="name" value={upInfo.name}
                           style={inputStyle} disabled />
                </label>

                <label style={labelStyle}>Age
                    <input type="number" name="age" value={upInfo.age}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <label style={labelStyle}>Job
                    <input type="text" name="job" value={upInfo.job}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <label style={labelStyle}>Language
                    <input type="text" name="language" value={upInfo.language}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <label style={labelStyle}>Pay
                    <input type="number" name="pay" value={upInfo.pay}
                           style={inputStyle} onChange={handleChange} />
                </label>

                <button type="submit"> 수정 </button>
            </form>
        </div>
    );
};

export default Upgrade;
