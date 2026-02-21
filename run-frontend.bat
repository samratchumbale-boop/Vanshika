@echo off
REM ─── run-frontend.bat ────────────────────────────────────────────────────────
REM Windows helper to install deps and start the Vite dev server
REM Usage: Double-click or run from terminal inside D:\HACKWHACK

echo.
echo  ╔══════════════════════════════════════╗
echo  ║   Personal Learning Progress App    ║
echo  ╚══════════════════════════════════════╝
echo.

REM Check if node_modules exists; install if not
IF NOT EXIST "node_modules\" (
    echo [1/2] Installing dependencies with pnpm...
    pnpm install
    IF ERRORLEVEL 1 (
        echo ERROR: pnpm install failed. Please make sure pnpm is installed.
        pause
        exit /b 1
    )
) ELSE (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Starting Vite dev server...
echo       Open http://localhost:5173 in your browser
echo.

pnpm run dev

pause
