import React from 'react';

function EmployeeFuncGreeting({ isEmployeeLoggedIn, employeeName }) {
  // Element Variable
  let message;
  if (isEmployeeLoggedIn) {
    message = <div className="greeting">✅ Welcome back, {employeeName}. (Element Variable)</div>;
  } else {
    message = <div className="greeting warning">🔒 You are not logged in. (Element Variable)</div>;
  }

  return (
    <div className="render-box">
      <h4>1️⃣ Short-Circuit Operator</h4>
      {isEmployeeLoggedIn && (
        <div className="greeting">
          ✅ Welcome, {employeeName}. (Short-circuit)
        </div>
      )}

      <h4>2️⃣ Ternary Operator</h4>
      {
        isEmployeeLoggedIn ? (
          <div className="greeting">✅ Welcome, {employeeName}. (Ternary)</div>
        ) : (
          <div className="greeting warning">🔒 Please log in. (Ternary)</div>
        )
      }

      <h4>3️⃣ If-Else Block</h4>
      {
        (() => {
          if (isEmployeeLoggedIn) {
            return <div className="greeting">✅ Hello {employeeName}! (If-Else)</div>;
          } else {
            return <div className="greeting warning">🔒 Login required. (If-Else)</div>;
          }
        })()
      }

      <h4>4️⃣ Element Variable</h4>
      {message}
    </div>
  );
}

export default EmployeeFuncGreeting;
