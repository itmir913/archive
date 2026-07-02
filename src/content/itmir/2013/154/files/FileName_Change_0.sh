#!/sbin/sh
# #!/system/bin/sh
#--Made by Mir(whdghks913)

##
# FileName_Change_0.sh Script - aroma select time
##

##
# Script Will change File name.prop
if [ -s /tmp/aroma/FileName.prop ]; then
	cd /tmp/aroma
	cp FileName.prop FileName.prop.bak
	# change "selected.1=1" into "selected.1=0"
	busybox sed -e 's/selected.1=*/selected.1=0\n#/g' FileName.prop.bak > FileName.prop
fi
#-- End Script

#-- Exit Code
exit 1