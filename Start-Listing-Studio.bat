@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE="
for /f "delims=" %%N in ('where node 2^>nul') do if not defined NODE_EXE set "NODE_EXE=%%N"
if not defined NODE_EXE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE_EXE (
  echo Node.js could not be found. Install Node.js 20 or newer, then run this again.
  pause
  exit /b 1
)
start "Listing Studio server" /min "%NODE_EXE%" server.mjs
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4173
