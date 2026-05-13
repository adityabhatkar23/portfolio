"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const gridSize = 15;

const getRandomCell = (snake = []) => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

const storage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return storage._memory?.[key] || null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      storage._memory = storage._memory || {};
      storage._memory[key] = value;
    }
  },
  _memory: {}
};

export default function MiniSnake() {
  const [gameState, setGameState] = useState("start"); // "start", "playing"
  const [snake, setSnake] = useState([
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
    { x: 3, y: 7 },
  ]);
  const [food, setFood] = useState(() => getRandomCell([
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
    { x: 3, y: 7 },
  ]));
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const intervalRef = useRef(null);
  const directionRef = useRef("RIGHT");
  const touchStartRef = useRef(null);
  const foodRef = useRef(food);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    const saved = storage.getItem("snakeHighScore");

    if (saved) {
      setHighScore(parseInt(saved, 10));
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const cellKey = (x, y) => `${x}-${y}`;

  // Update moveSnake to use foodRef instead of food directly
  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case "UP": head.y = (head.y - 1 + gridSize) % gridSize; break;
        case "DOWN": head.y = (head.y + 1) % gridSize; break;
        case "LEFT": head.x = (head.x - 1 + gridSize) % gridSize; break;
        case "RIGHT": head.x = (head.x + 1) % gridSize; break;
      }

      if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameState("start");
        clearInterval(intervalRef.current);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];
      const currentFood = foodRef.current;  // ← read from ref, not closure

      if (head.x === currentFood.x && head.y === currentFood.y) {
        const nextFood = getRandomCell(newSnake);
        setFood(nextFood);
        foodRef.current = nextFood;  // ← update ref immediately (don't wait for useEffect)
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            storage.setItem("snakeHighScore", newScore.toString());
          }
          return newScore;
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [highScore]);
  const handleKeyDown = useCallback((e) => {
    if (gameState === "start") {
      if (e.key === " " || e.key === "Enter") {
        startGame();
      }
      return;
    }

    if (gameState !== "playing") return;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (directionRef.current !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        e.preventDefault();
        if (directionRef.current !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (directionRef.current !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        e.preventDefault();
        if (directionRef.current !== "LEFT") setDirection("RIGHT");
        break;
    }
  }, [gameState]);

  const handleTouchStart = (e) => {
    if (gameState === "start") {
      startGame();
      return;
    }

    if (gameState !== "playing") return;

    e.preventDefault();
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleTouchEnd = (e) => {
    if (gameState !== "playing" || !touchStartRef.current) return;

    e.preventDefault();
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {

      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && directionRef.current !== "LEFT") {
          setDirection("RIGHT");
        } else if (deltaX < 0 && directionRef.current !== "RIGHT") {
          setDirection("LEFT");
        }
      }
    } else {

      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && directionRef.current !== "UP") {
          setDirection("DOWN");
        } else if (deltaY < 0 && directionRef.current !== "DOWN") {
          setDirection("UP");
        }
      }
    }

    touchStartRef.current = null;
  };

  const startGame = () => {
    const initialSnake = [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 },
      { x: 3, y: 7 },
    ];

    const newFood = getRandomCell(initialSnake);  // ← generate once
    setFood(newFood);
    foodRef.current = newFood;  // ← sync the ref immediately

    setSnake(initialSnake);
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameState("playing");
    setScore(0);
  };

  const resetGame = () => {
    clearInterval(intervalRef.current);
    setGameState("start");
  };

  useEffect(() => {
    const keyHandler = (e) => handleKeyDown(e);
    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      clearInterval(intervalRef.current);
    };
  }, [handleKeyDown]);


  useEffect(() => {
    if (gameState === "playing") {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(moveSnake, 300);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [gameState, moveSnake]);


  const cellSize = isMobile ? 20 : 16;
  const gap = isMobile ? 2 : 1;
  const containerWidth = gridSize * cellSize + (gridSize - 1) * gap;

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-black p-4 rounded-xl text-center mx-auto select-none"
        style={{
          width: `${containerWidth + 32}px`,
           height: `${containerWidth + 80}px`
          
        }}
      >
        {/* Score Display */}
        <div className={`text-white text-sm mb-3 flex justify-between items-center ${gameState === "playing" ? "visible" : "invisible"}`}>
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>

        {/* Game Grid */}
        <div
          className="mx-auto relative touch-none"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
            gap: `${gap}px`,
            width: `${containerWidth}px`,
            height: `${containerWidth}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {[...Array(gridSize * gridSize)].map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            const isSnake = snake.some((s) => s.x === x && s.y === y);
            const isFood = gameState === "playing" && food.x === x && food.y === y;

            return (
              <div
                key={cellKey(x, y)}
                className={`rounded-full ${isSnake ? "bg-white" : isFood ? "bg-red-700" : "bg-black"
                  }`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              />
            );
          })}

          {/* Start Screen Overlay */}
          {gameState === "start" && (
            <div
              className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center cursor-pointer"
              onClick={handleTouchStart}
            >
              <div className="text-white text-2xl font-bold mb-3">snake</div>
              <div className="text-gray-400 text-lg mb-3">
                {highScore > 0 ? `Best: ${highScore}` : ""}
              </div>
              <div className="text-white text-base mb-2">Tap to Start</div>
              <div className="text-gray-400 text-sm mb-3">or press Space/Enter</div>
              <div className="text-gray-500 text-xs text-center px-4">
                {isMobile ? "Swipe to control" : "Use arrow keys"}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Controls Instructions */}
        {gameState === "playing" && (
          <div className="mt-3 text-gray-400 text-xs text-center">
            {isMobile ? "Swipe to change direction" : "Use arrow keys to move"}
          </div>
        )}
      </div>
    </div>
  );
}