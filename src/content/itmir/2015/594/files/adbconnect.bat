@echo off
title adb connect without usb
set port=5555
echo.
echo   adb connect without usb by Mir(whdghks913)
echo.
echo   Connect your Android device and adb host computer to a common Wi-Fi network accessible to both.
echo   Waiting for device, Connect the device to the host computer with a usb
echo.
adb kill-server
adb wait-for-device
adb tcpip %port%
echo.
echo   Disconnect the USB cable from the target device.
echo   Find the IP address of the Android device, and Enter the IP address
echo.
set /P ip=  Your IP : 
adb connect %ip%:%port%
timeout /t 1
echo.
adb devices
pause