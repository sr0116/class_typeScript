import React from 'react';
import {EmployeeInfo} from "@/components/Main";

// 폼태그 css
export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export  const labelStyle: React.CSSProperties = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    color: '#333',
};

export  const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
};

const initialInfo: EmployeeInfo = {
    // 초기화 작업
    id: 0, name: "", job: "", age : 0, language: "" , pay: 1
}

interface RegisterProps {
    handleRegister : (obj: EmployeeInfo) => void;
}

const Register = ({handleRegister} :  RegisterProps) => {
    const [info, setInfo] = React.useState<EmployeeInfo>(initialInfo);

    // 변함 없는 코드 (동적인 코드) [] -> 반정형 만들어줌
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInfo(prev => ({...prev, [name]: value}));
        // console.log(e.target.value);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRegister(info);

    }
    return (
        <div>
            <form style={formStyle} onSubmit={handleSubmit}>
                <label style={labelStyle}>Name
                <input type="text" name="name" style={inputStyle} required onChange={handleChange} /> </label>
                <label style={labelStyle}>age
                <input type="number" name="age"  style={inputStyle} required min={0} onChange={handleChange} /> </label>
                <label style={labelStyle}>job
                <input type="text" name="job"  style={inputStyle} required onChange={handleChange} /> </label>
                <label style={labelStyle}>language
                <input type="text" name="language"  style={inputStyle} required onChange={handleChange}/> </label>
                <label style={labelStyle}>pay
                <input type="number"  name="pay"  style={inputStyle} min={0} required onChange={handleChange}/> </label>
                <button type="submit"> 등록 </button>
            </form>
        </div>
    );
};

export default Register;