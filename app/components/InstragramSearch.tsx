'use client';

import { useState } from 'react';

export default function InstagramSearch() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      console.log('&&data', data)
      setProfileData(data.result);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Instagram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={fetchProfile} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
        {loading ? 'Loading...' : 'Fetch'}
      </button>

      {profileData && (
        <div className="mt-4">
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Full Name:</strong> {profileData.full_name}</p>
           <p><strong>Biography:</strong> {profileData.biography}</p>
           <p><strong>Private:</strong> {profileData.is_private ? 'Yes' : 'No'}</p>
          <p><strong>Followers:</strong> {profileData.edge_followed_by?.count}</p>
          <p><strong>Following:</strong> {profileData.edge_follow?.count}</p>
          {/* <img src={profileData.profile_pic_url} alt="Profile" width={150} /> */}
        </div>
      )}
    </div>
  );
}
