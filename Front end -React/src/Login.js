import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './userSlice';
import './Login.css';
import './App.css';
import { variables } from './variables.js';

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        var check = 0;
        e.preventDefault();

        fetch(variables.API_URL + 'Registerations', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        }).then(res => res.status)
            .then((result) => {
                if (result == 201) {
                    alert("Welcome!");
                    dispatch(login({
                        name: name,
                        password: password
                    }))
                } else {
                    alert("Login Failed");
                }
            }, (error) => {
                alert('Unknown Error Ocurred');
            })
    }

    return (
        <div className='login'>
            <form className='login_form' onSubmit={(e) => handleSubmit(e)}>
                <h1>Join the Fun!</h1>
                <div>
                    <input type="name" name="Name" placeholder="Username" value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div><div>
                    <input type="password" name="Password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div><div>
                    <button type="submit"
                        style={{ float: 'left' }}
                        className="btn btn-dark  btn-outline-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Login;