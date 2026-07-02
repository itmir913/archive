echo "Origin Folder Name :"
read origin_name

echo "Patch Folder Name :"
read patch_name

echo "Patch File Name :"
read patch_file_name

diff -urpN $origin_name $patch_name > $patch_file_name.patch

sleep 2
