import { useState } from "react";
import { Form } from "react-bootstrap"

export const EmailInput = ({ fieldname, name, placeholder, handleChange }) => {
    let [err, setError] = useState();
    const selfHandle = (e) => {
        let value = e.target.value;
        // console.log(value)
        if (!value) {
            // error msg
            setError("Email is required");
        } else {
            handleChange(e);
        }
    }

return (
    <Form.Group className="mb-3" controlId="email">
        <Form.Label>{fieldname}</Form.Label>
        <InputComponent type="email" required fieldname={fieldname} name={name} placeholder={placeholder} handleChange={selfHandle} />
        {
            err && <em className="text-danger">{err} </em>
        }
    </Form.Group>
    )
}

export const PasswordInput = ({ fieldname, name, placeholder, handleChange }) => {
    return (
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>{fieldname} </Form.Label>
            <InputComponent type="password" required fieldname={fieldname} name={name} placeholder={placeholder} handleChange={handleChange} />
        </Form.Group>
    )
}

export const InputComponent = ({ size, type, name,required, placeholder, handleChange }) => {
    return (
        <Form.Control size= {size} type={type} required name={name} placeholder={placeholder} onChange={handleChange} />
    )
}