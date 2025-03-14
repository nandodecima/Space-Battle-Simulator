import React, { useState, useEffect } from 'react';
import './App.css';

const SpaceBattleSimulator = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [gameStatus, setGameStatus] = useState('active');
  const [damageRangeP] = useState([5, 20]);
  const [damageRangeE] = useState([5, 20]); //rigged so enemys damage is always more than players

  const handleFire = () => {
    const playerDamage = Math.floor(Math.random() * (damageRangeP[1] - damageRangeP[0] + 1)) + damageRangeP[0];
    const enemyDamage = Math.floor(Math.random() * (damageRangeE[1] - damageRangeE[0] + 1)) + damageRangeE[0];

    const newPlayerHealth = Math.max(0, playerHealth - enemyDamage);
    const newEnemyHealth = Math.max(0, enemyHealth - playerDamage);

    setPlayerHealth(newPlayerHealth);
    setEnemyHealth(newEnemyHealth);

    if (newPlayerHealth <= 0 && newEnemyHealth <= 0) {
      setGameStatus('draw');
    } else if (newPlayerHealth <= 0) {
      setGameStatus('lose');
    } else if (newEnemyHealth <= 0) {
      setGameStatus('win');
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