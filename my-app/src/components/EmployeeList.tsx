"use client"
import {buttonBarStyle} from "./Main";
import InfoTable from "@/components/InfoTable";
import {useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootState} from "@/redux/store";
import {handleSelectedId} from "@/redux/employeeSlice";

// 키하고 벨류가 같으면 하나만 사용 {a: 5}
const EmployeeList = () => {
    const {infos} = useSelector((state: RootState) => state.emp);
    const dispatch = useDispatch<RootDispatch>();

    return (
        <>
        <div style={buttonBarStyle}>
            {infos?.map(info => (
                <button
                    key={info.id}
                    onClick={() => dispatch(handleSelectedId(info.id))}
                >
                    {info.name}
                </button>

            ))}
        </div>
            <div>
                <InfoTable  />
            </div>
        </>
    );
};

export default EmployeeList;