"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { EmployeeInfo } from "@/redux/slice/employeeSlice";

const tStyle: React.CSSProperties = {
    width: "800px",
    margin: "0 auto",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
    borderRadius: "8px",
};

const thStyle: React.CSSProperties = {
    backgroundColor: "#f2f2f2",
    padding: "12px",
    fontWeight: "bold"
};

const tdStyle: React.CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid #ccc"
};

const InfoTable = () => {
    const { infos, selectedId } = useSelector((state: RootState) => state.emp);

    const infoObject: EmployeeInfo | undefined = useMemo(() =>
            infos.find(info => info.id === selectedId),
        [infos, selectedId]
    );

    if (!infoObject) return <div>선택된 정보가 없습니다.</div>;

    return (
        <table style={tStyle}>
            <thead>
            <tr>
                {Object.keys(infoObject)
                    .filter(k => k !== "id")
                    .map(k => <th key={k} style={thStyle}>{k}</th>)}
            </tr>
            </thead>

            <tbody>
            <tr>
                {Object.values(infoObject)
                    .filter((_, idx) => idx !== 0)
                    .map((v, idx) => (
                        <td key={idx} style={tdStyle}>
                            {String(v)}
                        </td>
                    ))}
            </tr>
            </tbody>
        </table>
    );
};

export default InfoTable;
