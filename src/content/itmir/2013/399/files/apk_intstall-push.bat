:: whdghks913.tistory.com
:: apk Install push
@echo off

:Main
echo.
echo    Apk Install Tool
echo.
IF NOT EXIST "%~nx1" goto FILE_NOT_EXIST
echo    Installing Apk
adb install -r %~nx1

:Exit
pause
exit

:FILE_NOT_EXIST
echo    There is no apk File
goto Exit