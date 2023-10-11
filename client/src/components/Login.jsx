import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        const user = {
            email,
            password
        };
        console.log(user);
        try {
            const res = await fetch('http://localhost:3700/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!res.ok) {
                throw new Error('Error in fetch to login router');
            }

            console.log('User was logged in successfully');
        } catch(err) {
            console.error(err);
        }
    }
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;