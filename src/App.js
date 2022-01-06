import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Cell from './components/Cell';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐼', '🐻', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'];

const WIN_STATES = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const App = () => {
  const [firstPlayer, setFirstPlayer] = useState({ score: 0, emoji: '' });
  const [secondPlayer, setSecondPlayer] = useState({ score: 0, emoji: '' });
  const [boardCells, setBoardCells] = useState(['', '', '', '', '', '', '', '', '']);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [tie, setTie] = useState(false);

  const handleCellClick = (idx) => {
    if (!gameOver) {
      const newBoardCells = [...boardCells];
      newBoardCells[idx] = !currentTurn ? firstPlayer.emoji : secondPlayer.emoji;
      setBoardCells(newBoardCells);
      setCurrentTurn(!currentTurn);
    }
  };

  const checkIfSomebodyWon = () => {
    const isGameOver = WIN_STATES.some((state) => {
      return boardCells[state[0]] === boardCells[state[1]] && boardCells[state[0]] === boardCells[state[2]] && boardCells[state[0]] !== '';
    });

    return isGameOver;
  };

  const restartGame = () => {
    setBoardCells(['', '', '', '', '', '', '', '', '']);
    setCurrentTurn(0);
    setGameOver(false);
    initialSetup();
  };

  useEffect(() => {
    const isGameOver = checkIfSomebodyWon();
    const isATie = boardCells.every((cell) => cell !== '') && !isGameOver;

    if (isATie) {
      setTie(isATie);
      setGameOver(true);
    }
    
    if (isGameOver) {
      setGameOver(true);
      currentTurn ? setFirstPlayer({ ...firstPlayer, score: firstPlayer.score + 1 }) : setSecondPlayer({ ...secondPlayer, score: secondPlayer.score + 1 });
    }
  }, [boardCells]);

  const initialSetup = () => {
    const [firstEmoji, secondEmoji] = EMOJIS.sort(() => 0.5 - Math.random()).slice(0, 2);
    setFirstPlayer({ ...firstPlayer, emoji: firstEmoji });
    setSecondPlayer({ ...secondPlayer, emoji: secondEmoji });
  }

  useEffect(() => {
    initialSetup();
  }, []);

  return (
    <>
      <div className="current">Turno actual: <span>{!currentTurn ? firstPlayer.emoji : secondPlayer.emoji}</span></div>

      <div className="scores">
        <div className={classnames('score', { winner: currentTurn && gameOver && !tie })}>Jugador {firstPlayer.emoji} [{firstPlayer.score}]</div>
        <div className={classnames('score', { winner: !currentTurn && gameOver && !tie })}>[{secondPlayer.score}] Jugador {secondPlayer.emoji}</div>
      </div>

      <div className={classnames('gameboard', { disabled: gameOver })}>
        {
          boardCells.map((emoji, idx) => (
            <Cell
              key={idx}
              emoji={emoji}
              idx={idx}
              handleCellClick={handleCellClick}
            />
          ))
        }
      </div>

      
      <button
        className={classnames('restart', { hidden: !gameOver })}
        onClick={restartGame}
      >
        ¡Jugar otra vez!
      </button>
    </>
  );
};

export default App;
