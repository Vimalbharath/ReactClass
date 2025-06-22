import React from 'react';

const User = (props) => {
  const name = props.children;
  const age = props.age ?? 'NA'; // Default fallback for age

  // Conditional rendering
  if (!name) {
    return <div className="user invalid">❌ Invalid Entry: Name is missing</div>;
  }

  return (
    <div className="user">
      ✅ Name: {name} | Age: {age}
    </div>
  );
};

export default User;
