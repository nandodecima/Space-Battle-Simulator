import React, { useState, useEffect } from 'react';
import './App.css';


const SpaceBattleSimulator = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [gameStatus, setGameStatus] = useState('active');
  const [damageRangeP] = useState([5, 20]);
  const [damageRangeE] = useState([5, 20]);

  // Sound effect objects
  const fireSound = new Audio('/sounds/LaserGunFire.wav');
  const winSound = new Audio('/sounds/Winning.wav');
  const loseSound = new Audio('/sounds/Losing.wav');
  const drawSound = new Audio('/sounds/Draw.wav');

  // Set initial volume levels (optional)
  fireSound.volume = 0.4; // 50% volume for fire sound
  winSound.volume = 0.7;  // 70% volume for win sound
  loseSound.volume = 0.7; // 70% volume for lose sound

  const handleFire = () => {
    fireSound.play(); // Play fire sound effect

    const playerDamage = Math.floor(Math.random() * (damageRangeP[1] - damageRangeP[0] + 1)) + damageRangeP[0];
    const enemyDamage = Math.floor(Math.random() * (damageRangeE[1] - damageRangeE[0] + 1)) + damageRangeE[0];

    const newPlayerHealth = Math.max(0, playerHealth - enemyDamage);
    const newEnemyHealth = Math.max(0, enemyHealth - playerDamage);

    setPlayerHealth(newPlayerHealth);
    setEnemyHealth(newEnemyHealth);

    if (newPlayerHealth <= 0 && newEnemyHealth <= 0) {
      setGameStatus('draw');
      drawSound.play();
    } else if (newPlayerHealth <= 0) {
      setGameStatus('lose');
      loseSound.play(); // Play lose sound effect
    } else if (newEnemyHealth <= 0) {
      setGameStatus('win');
      winSound.play(); // Play win sound effect
    }
  };

  const handleRestart = () => {
    setPlayerHealth(100);
    setEnemyHealth(100);
    setGameStatus('active');
  };

  // Generate stars dynamically
  useEffect(() => {
    const numStars = 150;
    const starContainer = document.querySelector('.space-background');
    starContainer.innerHTML = ''; // Clear previous stars

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      starContainer.appendChild(star);
    }
  }, []);

  return (
    <>
      {/* Background Music */}
      {/* <audio id="bg-music" loop autoPlay>
        <source src="/sounds/Background.wav" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio> */}

      <div className="space-background"></div> {/* Space Background with Stars */}

      <div className="battle-container">
        <h1 className="battle-title">🚀 Space Battle Simulator 🚀</h1>

        <div className="battle-area">
          {/* Player Health on the Left */}
          <div className="health-box player-side">
            <h2>🛸 You</h2>
            <div className="health-bar">
              <div className="health-fill player" style={{ width: `${playerHealth}%` }}></div>
            </div>
            <p>{playerHealth} HP</p>
          </div>

          {/* Fire/Restart Button in the Middle */}
          <div className="button-box">
            {gameStatus === 'active' ? (
              <button onClick={handleFire} className="fire-button">🚀 Fire</button>
            ) : (
              <button onClick={handleRestart} className="restart-button">🔄 Restart</button>
            )}
          </div>

          {/* Enemy Health on the Right */}
          <div className="health-box enemy-side">
            <h2>👾 Enemy</h2>
            <div className="health-bar">
              <div className="health-fill enemy" style={{ width: `${enemyHealth}%` }}></div>
            </div>
            <p>{enemyHealth} HP</p>
          </div>
        </div>

        {/* Game Status Message */}
        {gameStatus !== 'active' && (
          <p className="game-status">
            {gameStatus === 'win' ? '🎉 You won the battle!' : gameStatus === 'lose' ? '💀 You lost the battle!' : '⚖️ It\'s a draw!'}
          </p>
        )}
      </div>
    </>
  );
};

export default SpaceBattleSimulator;