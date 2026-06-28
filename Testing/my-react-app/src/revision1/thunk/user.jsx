import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser1 } from './userSlice';

const User = () => {
    const dispatch = useDispatch();
    
    // Extract everything we need from our global central store
    const { profile, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        // Trigger our asynchronous real-estate agent thunk action
        dispatch(fetchUser1());
    }, [dispatch]);

    // Conditional UI handling based on Thunk lifecycles
    if (loading) return <h1>Loading GitHub Profile...</h1>;
    if (error) return <h1>Error fetching profile: {error}</h1>;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>GitHub Profile (Global Redux State)</h1>
            {profile.login ? (
                <div>
                    <h2>Name: {profile.login}</h2>
                    <p>Bio created_at: {profile.created_at}</p>
                    <p>Public Repositories: {profile.public_repos}</p>
                </div>
            ) : (
                <p>No user profile loaded yet.</p>
            )}
        </div>
    );
};

export default User;