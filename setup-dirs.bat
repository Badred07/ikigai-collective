@echo off
REM Create directory structure
md src\assets\images 2>nul
md src\assets\icons 2>nul
md src\components\common 2>nul
md src\components\home 2>nul
md src\components\shop 2>nul
md src\components\cart 2>nul
md src\components\auth 2>nul
md src\components\admin 2>nul
md src\components\product 2>nul
md src\pages 2>nul
md src\services 2>nul
md src\hooks 2>nul
md src\context 2>nul
md src\utils 2>nul
md src\styles 2>nul
md src\config 2>nul
md public 2>nul

echo Directory structure created successfully!
