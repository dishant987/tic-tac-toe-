import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [grid, setGrid] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const resetGrid = useCallback(() => {
    const emptyGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    setGrid(emptyGrid);

    setWinner(null);
    setWinStreak(gridSize); // Set win streak to grid size automatically
  }, [gridSize]);

  useEffect(() => {
    resetGrid();
  }, [gridSize, resetGrid]);

  const handleCellClick = (row, col) => {
    if (grid[row][col] || winner) return;

    const updatedGrid = grid.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    );

    setGrid(updatedGrid);
    checkWinner(updatedGrid, row, col);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkDirection = (grid, row, col, dx, dy) => {
    const player = grid[row][col];
    let count = 1; // Start with the current cell already counted

    // Check one direction (dx, dy)
    for (let i = 1; i < winStreak; i++) {
      const newRow = row + dx * i;
      const newCol = col + dy * i;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && grid[newRow][newCol] === player) {
        count++;
      } else {
        break;
      }
    }

    // Check the opposite direction (-dx, -dy)
    for (let i = 1; i < winStreak; i++) {
      const newRow = row - dx * i;
      const newCol = col - dy * i;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && grid[newRow][newCol] === player) {
        count++;
      } else {
        break;
      }
    }

    return count >= winStreak;
  };

  const checkWinner = (updatedGrid, row, col) => {
    if (
      checkDirection(updatedGrid, row, col, 1, 0) || // Check horizontal
      checkDirection(updatedGrid, row, col, 0, 1) || // Check vertical
      checkDirection(updatedGrid, row, col, 1, 1) || // Check diagonal (down-right)
      checkDirection(updatedGrid, row, col, 1, -1)   // Check diagonal (down-left)
    ) {
      setWinner(currentPlayer);
    } else if (updatedGrid.flat().every((cell) => cell)) {
      setWinner("Draw");
    }
  };

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    console.log(size)
    if (size >= 3 && size <= 10) {
      setGridSize(size);
      resetGrid();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content (Tic-Tac-Toe game) */}
      <div className="flex-grow rounded-2xl flex flex-col items-center justify-center bg-gray-100 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6 w-full">
          <div className="flex-1">
            <label className="block text-lg">Grid Size (n x n)</label>
            <input
              type="number"
              value={gridSize}
              onChange={handleGridSizeChange}
              className="border rounded p-2"
              min={3}
              max={10}
            />
          </div>
        </div>

        {/* Display current player's turn */}
        <div className="text-xl font-bold mb-4">
          {winner ? (winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`) : `${currentPlayer}'s turn`}
        </div>

        {/* Grid for the Tic-Tac-Toe game */}
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className="w-16 h-16 border-2 border-gray-500 rounded-md duration-300 flex items-center justify-center text-2xl font-bold bg-white hover:bg-gray-200"
              >
                {cell}
              </button>
            ))
          )}
        </div>

        {/* Restart button */}
        <div className="mt-4 text-center">
          <button
            onClick={resetGrid}
            className="mt-2 p-2 bg-blue-500 duration-200 text-white rounded hover:bg-blue-600"
          >
            Restart Game
          </button>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>

  );
};

export default App;
