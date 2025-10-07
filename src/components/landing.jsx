import React, { useState, useEffect } from 'react';
import './Landing.css';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const Landing = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      console.error('Login error:', err);
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Logout failed. Please try again.');
    }
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="logo">ITSKOLAR</h1>
          <nav className="nav">
            {user ? (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            ) : (
              <>
                <a href="#features">Features</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {user ? (
              <div className="welcome-message">
                <h1 className="hero-title">Welcome to ITSKOLAR, {user.displayName}! 🎉</h1>
                <p className="hero-subtitle">Ready to start your coding journey?</p>
                
                <div className="user-info">
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="profile-pic" 
                  />
                  <div className="user-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Email Verified:</strong> {user.emailVerified ? '✅ Yes' : '❌ No'}</p>
                  </div>
                </div>

                <div className="dashboard-actions">
                  <button className="cta-button">🚀 Start Coding</button>
                  <button className="cta-button secondary">📚 View Challenges</button>
                  <button className="cta-button secondary">👥 Join Community</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="hero-title">Your BSIT Coding Partner</h1>
                <p className="hero-subtitle">
                  Daily code assistance, project collaboration, and learning resources 
                  tailored for BSIT students. Start your coding journey with ITSKOLAR today!
                </p>
                
                {error && (
                  <div className="error-message">
                    ⚠️ {error}
                  </div>
                )}
                
                <button 
                  className="google-login-btn"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </>
                  )}
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </button>

                <div className="features-preview">
                  <div className="feature-item">
                    <span className="feature-icon">💻</span>
                    <span>Daily Coding Challenges</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">👥</span>
                    <span>Peer Collaboration</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📚</span>
                    <span>BSIT Resources</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {!user && (
            <div className="hero-image">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="code-content">
                  <pre>{`// Welcome to ITSKOLAR\nfunction greetStudent() {\n  console.log("Hello BSIT Student!");\n  return "Start coding today!";\n}`}</pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Only show features section if user is not logged in */}
      {!user && (
        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">Why Choose ITSKOLAR?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Daily Practice</h3>
                <p>Consistent coding exercises tailored for BSIT curriculum</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>Collaborate</h3>
                <p>Work on projects with fellow BSIT students</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📖</div>
                <h3>Resources</h3>
                <p>Access to BSIT-specific learning materials</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ITSKOLAR. BSIT Students' Coding Partner.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;