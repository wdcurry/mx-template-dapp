import React, { useState } from 'react';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
  XaliasLoginButton
} from 'components/sdkDappComponents';
import { nativeAuth } from 'config';
import { RouteNamesEnum } from 'localConstants';
import { AuthRedirectWrapper } from 'wrappers';

const commonProps = {
  callbackRoute: RouteNamesEnum.dashboard,
  nativeAuth
};

const LoginButton = ({ ButtonComponent, text, icon }) => (
  <ButtonComponent
    className="login-button"
    loginButtonText={
      <div className="button-content">
        <span className="icon">{icon}</span>
        <span className="text">{text}</span>
      </div>
    }
    {...commonProps}
  />
);

const ParticleBackground = () => {
  // ... (ParticleBackground component code remains unchanged)
};

export const Unlock = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    // Here you would typically call a function passed from the parent to handle the close action
    // For now, we'll just hide our component
  };

  if (!isVisible) return null;

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className="unlock-container">
        <ParticleBackground />
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>×</button>
            <div className="login-card" data-testid="unlockPage">
              <div className="card-header">
                <h2>
                  <span className="title-wrapper">
                    <span className="lock-icon">🔒</span>
                    <span className="title-text">MultiversX Login</span>
                  </span>
                </h2>
                <p>Choose your gateway to the Multiverse</p>
              </div>
              <div className="login-options">
                <LoginButton ButtonComponent={WalletConnectLoginButton} text="xPortal App" icon="📱" />
                <LoginButton ButtonComponent={LedgerLoginButton} text="Ledger" icon="🛡️" />
                <LoginButton ButtonComponent={ExtensionLoginButton} text="DeFi Wallet" icon="💼" />
                <LoginButton ButtonComponent={WebWalletLoginButton} text="Web Wallet" icon="🌐" />
                <LoginButton ButtonComponent={XaliasLoginButton} text="xAlias" icon="🔑" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .unlock-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(10, 10, 10, 0.85); /* Increased opacity */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .particle-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1001;
        }
        .modal-overlay {
          position: relative;
          z-index: 1002;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .modal-content {
          background: rgba(17, 17, 17, 0.9);
          border-radius: 32px;
          padding: 24px;
          box-shadow: 0 0 40px rgba(74, 222, 128, 0.6); /* Increased glow intensity */
          animation: modalAppear 0.3s ease-out;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          color: #4ADE80;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .close-button:hover {
          color: #3EBE70;
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .login-card {
          background: rgba(24, 24, 24, 0.95); /* Slightly increased opacity */
          border-radius: 24px;
          padding: 28px;
          width: 100%;
          max-width: 400px;
        }
        .card-header {
          text-align: center;
          margin-bottom: 24px;
        }
        h2 {
          font-size: 28px;
          color: #4ADE80;
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .lock-icon {
          position: absolute;
          left: -36px;
          font-size: 28px;
          color: #4ADE80;
        }
        .title-text {
          text-align: center;
        }
        p {
          color: #a0a0a0;
          margin-bottom: 24px;
          font-size: 18px;
        }
        .login-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
        }
        .login-button {
          background: #4ADE80;
          border: none;
          border-radius: 16px;
          padding: 14px;
          color: #000000;
          font-weight: bold;
          transition: all 0.3s ease;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .login-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .login-button:hover::before {
          opacity: 1;
        }
        .login-button:hover {
          background: #3EBE70;
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.6);
        }
        .button-content {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .icon {
          position: absolute;
          left: 20px;
          font-size: 22px;
        }
        .text {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </AuthRedirectWrapper>
  );
};

export default Unlock;