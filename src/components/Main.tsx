"use client";

import React from "react";
import EmployeeList from "@/components/EmployeeList";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { handleMode } from "@/redux/slice/employeeSlice";
import type { Mode } from "@/redux/slice/employeeSlice";
import { fetchDeleteEmployeeInfoById } from "@/redux/api/employeeAPI";

export const Style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
};

const Main = () => {
    const { mode, selectedId, modes } = useSelector(
        (state: RootState) => state.emp
    );
    const dispatch = useDispatch<RootDispatch>();

    const handleModeChange = (id: Mode) => {
        // 삭제 클릭 시 - 여기에서만 삭제 실행
        if (id === "delete") {
            if (!selectedId) {
                alert("삭제할 직원을 선택해주세요.");
                return;
            }

            const ok = confirm(`정말 ${selectedId}번 직원을 삭제할까요?`);
            if (ok) {
                dispatch(fetchDeleteEmployeeInfoById(selectedId));
            }
            return;
        }

        // 그 외 register / upgrade / reset 모드 전환
        dispatch(handleMode(id));
    };

    return (
        <>
            <div>
                <EmployeeList />
            </div>
            <div style={Style}>
                {modes.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleModeChange(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div>
                {mode === "register" && <Register />}
                {mode === "upgrade" && <Upgrade />}
            </div>
        </>
    );
};

export default Main;
