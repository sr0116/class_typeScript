
import React from 'react';
import {buttonBarStyle} from "./Main";
import InfoTable from "@/components/InfoTable";
import {EmployeeContext, useEmployee} from "@/context/EmployeeContext";

// 키하고 벨류가 같으면 하나만 사용 {a: 5}
const EmployeeList = () => {
    const {infos, handleSelectedId, selectedId}  = useEmployee();

    return (
        <>
        <div  style={buttonBarStyle}>
            {infos?.map(info => (
                <button
                    key={info.id}
                    onClick={() => handleSelectedId(info.id)}>
                    {info.name}
                </button>
            ))}
        </div>
            <div>
                <InfoTable
                    selectedId = {selectedId}
                    infos = {infos}
                />
            </div>
        </>
    );
};

export default EmployeeList;