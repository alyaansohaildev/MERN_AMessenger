'use client';
import { useEffect,useState } from "react";
import {getCookie, CheckIfLoggedIn } from "../../utils/login_handle"
import styles from "./AMessenger.module.css";
import Link from 'next/link';

export default function Home()
{
    const [data, setData] = useState(null);

    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    
     const handleSubmit = async (e) => {

         e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Signup successful!');
                setError('');
                setFormData({ username: '', email: '', password: '' });
            } else {
                setError(data.message || 'Signup failed');
                setSuccess('');
            }
            } catch (err) {
            setError('Server error');
            setSuccess('');
            }
        


     }
    useEffect(() => {

      const result = CheckIfLoggedIn()
       

         
    },[])

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <form className={styles.custom_form}  onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        <p className={styles.form_div_heading}>Enter Your Username</p>
        <input
            className={styles.input_field}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className={styles.form_div_heading}>Enter Your Email</p>
        <input
            className={styles.input_field}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className={styles.form_div_heading}>Enter Your Password</p>
        <input
            className={styles.input_field}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button className={styles.submit_button} type="submit">SIGN UP</button>

        <div>
            <Link href="../login">Already have an Account? LOGIN</Link>
        </div>
    </form>

            
        </div>
    )
}
