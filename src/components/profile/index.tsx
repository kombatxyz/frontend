'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../navbar';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useParams, useRouter } from 'next/navigation';
import { BackIcon, EditIcon, LinkIcon } from '@/assets/svg';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setAvatar } from '@/redux/slice/userSlice';

const Profile: React.FC = () => {
  const { user } = useDynamicContext();
  const params = useParams();
  const router = useRouter();
  const walletAddress = params?.walletAddress as string;
  const dispatch = useDispatch();
  const avatar = useSelector((state: RootState) => state.user.avatar);

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Check if the current user owns this profile
  const isOwner = user?.verifiedCredentials?.some(
    (vc) => vc.address === walletAddress,
  );

  useEffect(() => {
    if (user) {
      // Initialize with existing data from user metadata or profile
      setUsername(user.alias || user.firstName || '');
      // Bio is typically custom metadata...
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      console.log('Saving profile:', { username, bio, email });
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setAvatar(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="back-btn">
        <button onClick={() => router.back()}>
          <BackIcon />
          Back
        </button>
      </div>
      <div className="profile-content-wrapper">
        <div className="header">
          <h2>Profile</h2>
          {isOwner && !isEditing && (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              <EditIcon />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
        <div className="profile-glass-card">
          <div className="profile-layout">
            {/* Avatar Section */}

            {/* Profile Content */}
            <div className="profile-main-content">
              {isEditing ? (
                <form onSubmit={handleSave} className="edit-form">
                  <div className="avatar-section edit-avatar">
                    <div className="avatar-display">
                      <Image
                        src={
                          avatar ||
                          (user as any)?.avatar ||
                          '/default-avatar.png'
                        }
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="upload-avatar">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      accept="image/*"
                    />
                    <button className="upload-btn" onClick={triggerFileInput}>
                      <EditIcon />
                    </button>
                  </div>
                  <div className="grid-cols">
                    <div className="input-group">
                      <label>Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                      />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="save-btn"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="view-mode">
                  <div className="avatar-section">
                    <div className="avatar-display">
                      <Image
                        src={
                          avatar ||
                          (user as any)?.avatar ||
                          '/default-avatar.png'
                        }
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="user-info">
                      <h3>${username || 'No username set'}</h3>
                      {email && (
                        <div className="user-email">
                          <p>{email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="wallet-tag">
                    <p>
                      {walletAddress
                        ? `${walletAddress}`
                        : 'Start building your profile'}
                    </p>
                    <button className="copy-link">
                      <LinkIcon />
                    </button>
                  </span>

                  <div className="info-box">
                    <p>{bio || 'No bio yet. Click edit to tell your story.'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
