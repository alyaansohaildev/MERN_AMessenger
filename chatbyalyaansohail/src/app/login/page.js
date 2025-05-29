'use client';
import { useEffect,useState } from "react";
import { CheckIfLoggedIn } from "@/utils/login_handle";
import styles from './login.module.css';


export default function LoginPage() {


    useEffect(() => {

        CheckIfLoggedIn().then((loginResult) => {
            console.log("Login Result: ", loginResult);
        });
        
    },[]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/login_with_params', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                if(data['loggedIn'])
                {
                    setSuccess('Signup successful!');
                    setError('');
                    setFormData({ email: '', password: '' });

                }
                
            } else {
                setError(data.message || 'Signup failed');
                setSuccess('');
            }
            } catch (err) {
            setError('Server error');
            setSuccess('');
            }
    };


    return (
        <div style={{display:'flex'}}>
       

            <form className={styles.custom_form} onSubmit={handleSubmit}>
                <h2>Login to AMessenger</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div>
                    <p className={styles.form_div_heading}>Enter Your Username</p>
                    <input
                        className={styles.input_field}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>


                <div>
                    <p className={styles.form_div_heading}>Enter Your Username</p>
                    <input
                        className={styles.input_field}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                
                <button className={styles.submit_button} type="submit">Login</button>

            </form>
        </div>
    )
}