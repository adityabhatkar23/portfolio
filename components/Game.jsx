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

/** Pure tick: no React state updates (safe if logic is run more than once). */
function stepSnake(prevSnake, currentDirection, foodPos) {
  const head = { ...prevSnake[0] };

  switch (currentDirection) {
    case "UP":
      head.y = (head.y - 1 + gridSize) % gridSize;
      break;
    case "DOWN":
      head.y = (head.y + 1) % gridSize;
      break;
    case "LEFT":
      head.x = (head.x - 1 + gridSize) % gridSize;
      break;
    case "RIGHT":
      head.x = (head.x + 1) % gridSize;
      break;
    default:
      break;
  }

  if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
    return { died: true, nextSnake: prevSnake, ate: false, nextFood: foodPos };
  }

  const newSnake = [head, ...prevSnake];
  const ate = head.x === foodPos.x && head.y === foodPos.y;

  if (!ate) {
    newSnake.pop();
  }

  const nextFood = ate ? getRandomCell(newSnake) : foodPos;

  return { died: false, nextSnake: newSnake, ate, nextFood };
}

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
  const [gameState, setGameState] = useState("start");
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
  const snakeRef = useRef(snake);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

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

  const moveSnake = useCallback(() => {
    const prev = snakeRef.current;
    const foodPos = foodRef.current;
    const { died, nextSnake, ate, nextFood } = stepSnake(
      prev,
      directionRef.current,
      foodPos,
    );

    if (died) {
      setGameState("start");
      clearInterval(intervalRef.current);
      return;
    }

    setSnake(nextSnake);
    if (ate) {
      setFood(nextFood);
      setScore((s) => {
        const newScore = s + 1;
        setHighScore((hs) => {
          if (newScore > hs) {
            storage.setItem("snakeHighScore", String(newScore));
            return newScore;
          }
          return hs;
        });
        return newScore;
      });
    }
  }, []);
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

    const newFood = getRandomCell(initialSnake); 
    setFood(newFood);
    foodRef.current = newFood;

    setSnake(initialSnake);
    snakeRef.current = initialSnake;
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
        className="bg-card p-4 rounded-none text-center mx-auto select-none"
        style={{
          width: `${containerWidth + 32}px`,
           height: `${containerWidth + 80}px`
          
        }}
      >
        {/* Score Display */}
        <div className={`text-foreground text-sm mb-3 flex justify-between items-center ${gameState === "playing" ? "visible" : "invisible"}`}>
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
                className={`rounded-none ${isSnake ? "bg-game-snake" : isFood ? "bg-game-food" : "bg-game-cell"
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
              className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center cursor-pointer"
              onClick={handleTouchStart}
            >
              <div className="text-foreground text-2xl font-bold mb-3">snake</div>
              <div className="text-muted-foreground text-lg mb-3">
                {highScore > 0 ? `Best: ${highScore}` : ""}
              </div>
              <div className="text-foreground text-base mb-2">Tap to Start</div>
              <div className="text-muted-foreground text-sm mb-3">or press Space/Enter</div>
              <div className="text-muted-foreground/90 text-xs text-center px-4">
                {isMobile ? "Swipe to control" : "Use arrow keys"}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Controls Instructions */}
        {gameState === "playing" && (
          <div className="mt-3 text-muted-foreground text-xs text-center">
            {isMobile ? "Swipe to change direction" : "Use arrow keys to move"}
          </div>
        )}
      </div>
    </div>
  );
}