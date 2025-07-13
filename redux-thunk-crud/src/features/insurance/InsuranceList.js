// src/features/insurance/InsuranceList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInsurances } from './insuranceSlice';

const InsuranceList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.insurance);

  useEffect(() => {
    dispatch(fetchInsurances());
  }, [dispatch]);

  return (
    <div>
      <h2>Insurance Policies</h2>
      {loading && <p>Loading policies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {list.map((policy) => (
          <li key={policy.id}>
            <strong>{policy.policyHolder}</strong> - {policy.policyType} - ₹{policy.premium}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsuranceList;
