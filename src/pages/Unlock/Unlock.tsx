import React, { useEffect, useRef } from 'react';
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(74, 222, 128, 0.1)';
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export const Unlock = () => {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className="unlock-container">
        <ParticleBackground />
        <div className="background-wrapper">
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
      <style jsx>{`
        .unlock-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background-color: #0a0a0a;
          position: relative;
          overflow: hidden;
        }
        .particle-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .background-wrapper {
          background: rgba(17, 17, 17, 0.8);
          width: 540px;
          padding: 19px 73px;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.15);
          position: relative;
          z-index: 1;
        }
        .login-card {
          background: rgba(24, 24, 24, 0.9);
          border-radius: 24px;
          padding: 29px 24px;
          width: 394px;
        }
        .card-header {
          text-align: center;
          margin-bottom: 24px;
        }
        h2 {
          font-size: 24px;
          color: #4ADE80;
          margin-bottom: 10px;
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
          left: -30px;
          font-size: 24px;
          color: #4ADE80;
        }
        .title-text {
          text-align: center;
        }
        p {
          color: #a0a0a0;
          margin-bottom: 24px;
          font-size: 17px;
          white-space: nowrap;
        }
        .login-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
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
          width: 90%;
          margin: 0 auto;
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
          box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
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
          font-size: 19px;
          text-align: center;
        }
      `}</style>
    </AuthRedirectWrapper>
  );
};

export default Unlock;
