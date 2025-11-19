import React, {useContext, useMemo} from 'react';
import {EmployeeInfo, useEmployee} from "@/context/EmployeeContext";

const tStyle: React.CSSProperties = {
    width: "800px",
    margin: "0 auto",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    tableLayout: "fixed",
};

const thStyle: React.CSSProperties = {
    backgroundColor: "#f2f2f2",
    color: "#333",
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.9em",
};

const tdStyle: React.CSSProperties = {
    padding: "12px 15px",
    borderBottom: "1px solid #eee",
    textAlign: "left",
    color: "#555",
};

interface InfotableProps {
    infos: EmployeeInfo[];
    selectedId: number;
}

const InfoTable = () => {
    const {infos, selectedId} = useEmployee();

    const infoObject: EmployeeInfo | undefined  = useMemo(() =>
        infos.find(info => info.id === selectedId), [selectedId, infos]); //  하나로 올때는 find

    const info2 = infos.filter(info => info.id === selectedId); // 여러 개가 올때는 필터 (리스트)
    // object.keys(object) => [0, 0] list로 만들어야 함 (화면에 object는 안 보이고 리스트로 해야 보임)
    // 다 보이게 할거면 object.entries [ [0, 0] , [0, 0] ....]

    // 조건을 걸어줘야 함
    if (!infoObject) return <div>선택된 정보가 없습니다.</div>;


    return (
        // 테이블 구조가 트리구조
        <div className="flex mx-auto">
            <table style={tStyle}>
                <thead>
                <tr>
                    {Object.keys(infoObject)
                        .filter(entry => entry !== "id")
                        .map(key => <th key={key}  style={thStyle}>{key}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                <tr>
                    {Object.values(infoObject)
                        .filter((_, idx) => idx !== 0)
                        .map(value => (<td key={value}  style={tdStyle}>{value}</td>))}
                </tr>
                </tbody>
            </table>


        </div>
    );
};

export default InfoTable;