// src/features/insurance/AddInsuranceForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInsurance } from './insuranceSlice';

const AddInsuranceForm = () => {
  const dispatch = useDispatch();
  const [policyHolder, setHolder] = useState('');
  const [policyType, setType] = useState('');
  const [premium, setPremium] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPolicy = {
      policyHolder,
      policyType,
      premium: parseFloat(premium),
    };
    dispatch(addInsurance(newPolicy));

    // Reset
    setHolder('');
    setType('');
    setPremium('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Insurance</h3>
      <input
        type="text"
        placeholder="Policy Holder"
        value={policyHolder}
        onChange={(e) => setHolder(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Policy Type"
        value={policyType}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Premium"
        value={premium}
        onChange={(e) => setPremium(e.target.value)}
        required
      />
      <button type="submit">Add Policy</button>
    </form>
  );
};

export default AddInsuranceForm;
