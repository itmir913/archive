#!/sbin/sh
# #!/system/bin/sh
#--Made by Mir(whdghks913)

##
# FileName_Start.sh Script - aroma start time
##

##
# If the file does not have, Script will make tmp file
if [ ! -s /tmp/aroma/FileName.prop ]; then
	# Make a tmp file
	touch /tmp/aroma/FileName.prop
	# Write tmp file "selected.1=0"
	echo "selected.1=0" > /tmp/aroma/FileName.prop
fi
#-- End Script

#-- Exit Code
exit 1