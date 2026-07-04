echo ""
echo ""
echo "    Kernel을 컴파일 하기 위한 환경 구축을 시작합니다"
echo "    Made by Mir(whdghks913)"
echo ""
echo "   5초뒤 작업을 실행합니다"
sleep 1
clear

echo ""
echo ""
echo "    Kernel을 컴파일 하기 위한 환경 구축을 시작합니다"
echo "    Made by Mir(whdghks913)"
echo ""
echo "   4초뒤 작업을 실행합니다"
sleep 1
clear

echo ""
echo ""
echo "    Kernel을 컴파일 하기 위한 환경 구축을 시작합니다"
echo "    Made by Mir(whdghks913)"
echo ""
echo "   3초뒤 작업을 실행합니다"
sleep 1
clear

echo ""
echo ""
echo "    Kernel을 컴파일 하기 위한 환경 구축을 시작합니다"
echo "    Made by Mir(whdghks913)"
echo ""
echo "   2초뒤 작업을 실행합니다"
sleep 1
clear

echo ""
echo ""
echo "    Kernel을 컴파일 하기 위한 환경 구축을 시작합니다"
echo "    Made by Mir(whdghks913)"
echo ""
echo "   1초뒤 작업을 실행합니다"
sleep 1
clear
echo ""
echo ""
echo "    Kernel을 컴파일 하기 위한 환경 구축을 시작합니다"
echo "    Made by Mir(whdghks913)"
echo ""
echo "   작업을 시작합니다"
echo ""
echo ""

sudo apt-get install git-core gnupg flex bison gperf libsdl1.2-dev libesd0-dev build-essential zip curl
libncurses5-dev zlib1g-dev valgrind

sudo add-apt-repository "deb http://kr.archive.ubuntu.com/ubuntu/ hardy multiverse"

sudo add-apt-repository "deb http://kr.archive.ubuntu.com/ubuntu/ hardy-updates multiverse"

sudo apt-get update

sudo apt-get install sun-java6-jdk


cd ~/arm-eabi-4.4.0/bin
chmod +x ./*
cd ~/arm-eabi-4.4.0/arm-eabi/bin
chmod +x ./*
cd ~/arm-eabi-4.4.0/libexec/gcc/arm-eabi/4.4.0
chmod +x ./*
cd ~/arm-eabi-4.4.0/libexec/gcc/arm-eabi/4.4.0/install-tools
chmod +x ./*

cd ~/arm-eabi-4.4.3/bin
chmod +x ./*
cd ~/arm-eabi-4.4.3/arm-eabi/bin
chmod +x ./*
cd ~/arm-eabi-4.4.3/libexec/gcc/arm-eabi/4.4.3
chmod +x ./*
cd ~/arm-eabi-4.4.3/libexec/gcc/arm-eabi/4.4.3/install-tools
chmod +x ./*

echo ""
echo "당신은 툴체인을 무엇을 쓰시고 계십니까?"
echo "정확하게 작성해 주세요"
echo "1 -- 4.4.0 버전"
echo "2 -- 4.4.3 버전"
read nember
case $nember in

1)
if busybox [ "`grep arm-eabi- ~/.bashrc`" ]; then
	echo ""
        sleep 1
else
	echo "
export JAVA_HOME=/usr/lib/jvm/java-1.6.0-sun
export ANDROID_JAVA_HOME=$JAVA_HOME
export CROSS_COMPILE=$HOME/arm-eabi-4.4.0/bin/arm-eabi-
export PATH=$PATH:$HOME/arm-eabi-4.4.0/bin/
export ARCH=arm" >> ~/.bashrc
sleep 1
fi;;

2)
if busybox [ "`grep arm-eabi- ~/.bashrc`" ]; then
	echo ""
        sleep 1
else
	echo "
export JAVA_HOME=/usr/lib/jvm/java-1.6.0-sun
export ANDROID_JAVA_HOME=$JAVA_HOME
export CROSS_COMPILE=$HOME/arm-eabi-4.4.3/bin/arm-eabi-
export PATH=$PATH:$HOME/arm-eabi-4.4.3/bin/
export ARCH=arm" >> ~/.bashrc
sleep 1
fi;;

esac
