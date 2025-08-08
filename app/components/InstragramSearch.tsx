'use client';

import { useState } from 'react';

export default function InstagramSearch() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    if (!username) {
      setError('Username is required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if(!res.ok) {
        setError('Failed to fetch profile');
        return
      }
      
      const data = await res.json();
      setProfileData(data.result);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="text"
        placeholder="Instagram username"
        value={username}
        onChange={(e) => {setUsername(e.target.value); setError('')}}
        className="border px-2 py-1"
      />
      <button onClick={fetchProfile} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded w-full">
        {loading ? 'Loading...' : 'Fetch'}
      </button>

      {profileData && (
        <div className="mt-4" style={{maxWidth: '200px'}}>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Full Name:</strong> {profileData.full_name}</p>
           <p><strong>Biography:</strong> {profileData.biography}</p>
           <p><strong>Private:</strong> {profileData.is_private ? 'Yes' : 'No'}</p>
          <p><strong>Followers:</strong> {profileData.edge_followed_by?.count}</p>
          <p><strong>Following:</strong> {profileData.edge_follow?.count}</p>
          {/* <img src={profileData.profile_pic_url} alt="Profile" width={150} /> */}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
