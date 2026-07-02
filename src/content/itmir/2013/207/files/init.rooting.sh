#!/system/bin/sh
mount -orw,remount /system
cp /Root/Superuser.apk /system/app/Superuser.apk
cp /Root/su /system/bin/su
chmod 644 /system/app/Superuser.apk
chmod 06755 /system/bin/su
ln -s /system/bin/su /system/xbin/su
reboot
