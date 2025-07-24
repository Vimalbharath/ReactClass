import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      skills: [{ skill: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const hasEmptySkill = data.skills.some(s => !s.skill.trim());
    if (hasEmptySkill) {
      alert('Please fill all skill fields or remove empty ones.');
      return;
    }

    const skillList = data.skills.map(s => s.skill.trim());
    const user = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      skills: skillList
    };

    try {
      await api.post('/users', user);
      alert('Registration successful');
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={errors.name ? 'error-input' : ''}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Minimum 3 characters' }
          })}
          placeholder="Full Name"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          className={errors.email ? 'error-input' : ''}
          {...register('email', {
            required: 'Email is required',
            pattern: {
            value: /^[a-zA-Z0-9._%+-]+@example\.com$/,
            message: 'Email must be in the format name@example.com'
          }
          })}
          placeholder="Email"/>
{errors.email && <p className="error">{errors.email.message}</p>}


        <input
          type="password"
          className={errors.password ? 'error-input' : ''}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' }
          })}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <h4>Skills</h4>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              className={errors.skills?.[index]?.skill ? 'error-input' : ''}
              {...register(`skills.${index}.skill`, {
                required: 'Skill cannot be empty'
              })}
              placeholder={`Skill #${index + 1}`}
            />
            <button type="button" onClick={() => remove(index)}>Remove</button>
            {errors.skills?.[index]?.skill && (<p className="error">{errors.skills[index].skill.message}</p>)}
          </div>
        ))}
        <button type="button" onClick={() => append({ skill: '' })}>Add Skill</button>

        <br /><br />
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;
