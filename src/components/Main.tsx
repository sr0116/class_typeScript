"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { handleMode } from "@/redux/slice/employeeSlice";
import EmployeeList from "@/components/EmployeeList";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";

export const buttonBarStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px"
};

const Main = () => {
    const { mode, modes, selectedId } = useSelector((state: RootState) => state.emp);
    const dispatch = useDispatch<RootDispatch>();

    const handleClick = (id: string) => {
        dispatch(handleMode(id as any));
    };

    return (
        <>
            <EmployeeList />

            <div style={buttonBarStyle}>S
                {modes.map(item => (
                    <button key={item.id} onClick={() => handleClick(item.id)}>
                        {item.label}
                    </button>
                ))}
            </div>

            {mode === "register" && <Register />}
            {mode === "upgrade" && <Upgrade />}
        </>
    );
};

export default Main;
