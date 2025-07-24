import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const res = await api.get('/users');
      const user = res.data.find(
        u =>
          u.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          u.password === formData.password.trim()
      );

      if (user) {
        localStorage.setItem('token', 'user-token');
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={errors.email ? 'error-input' : ''}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' }
          })}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          className={errors.password ? 'error-input' : ''}
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' }
          })}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
