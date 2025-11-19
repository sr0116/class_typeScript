"use client"
import EmployeeList from "@/components/EmployeeList";
import Register from "@/components/Register";
import Upgrade from "@/components/Upgrade";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {handleMode} from "@/redux/slice/employeeSlice";

export const buttonBarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
}
{/*이게 액션.페이로드 -> 스테이트값을 찾는다고 보면 됨 dispatch(handleMode(mode.id)) */}

const Main = () => {
    const {mode, modes} = useSelector((state: RootState) => state.emp);
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <EmployeeList />
            </div>
            <div style={buttonBarStyle}>
                {modes.map(mode => (
                    <button

                        key={mode.id}  onClick={() => dispatch(handleMode(mode.id))}> {mode.label}</button>
                ))}
            </div>
            <div>

                {mode === "register" && <Register /> }
                {mode === "upgrade" && <Upgrade />}
            </div>

        </>
    );

};



export default Main;