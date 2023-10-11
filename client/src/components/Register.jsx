import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        const user = {
            email,
            password
        }; // create user object
        console.log(user)
        // fetch to register router on server
        try {
            const res = await fetch('http://localhost:3700/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            
            if (!res.ok) {
                throw new Error('Error in fetch to register router');
            }

            console.log('User was registered successfully');
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
                <input type="email" placeholder="Re-Enter Email:" />
                <input type="password" placeholder="Re-Enter Password:" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
