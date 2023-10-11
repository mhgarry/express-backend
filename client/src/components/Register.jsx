import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        console.log(user);

        fetch('http://localhost:3700/api/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: user,
        }).then(() => {
            console.log('new user added');
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email:"
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password:"
                />
                <input type="email" placeholder="Re-Enter Email:" />
                <input type="password" placeholder="Re-Enter Password:" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
