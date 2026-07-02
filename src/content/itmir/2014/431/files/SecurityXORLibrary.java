package com.whdghks913.xor;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

import android.widget.ProgressBar;

/**
 * encryption utilizing a xor operation..
 * You can use the getSecurityXOR() Method(etc..), you can get the encryption
 * 
 * How to use : http://itmir.tistory.com
 * 
 * @author Mir (whdghks913@naver.com)
 **/
public class SecurityXOR {
	
	private boolean fileSecurity=false;
	private boolean oneMinute_Boolean=false;
	private int oneMinute_int;
	private int Max_FileSize, isFileSize;
	
	/**
	 * Code는 원본값, XorCode는 비밀번호 입니다 xor암호화후, int형으로 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return int
	 */
	public int getSecurityXOR(int Code, int XorCode){
		if(XorCode==0)
			return 0;
		return Code ^ XorCode;
	}
	
	/**
	 * Code는 원본값, XorCode는 비밀번호 입니다 xor암호화후, int형으로 반환합니다 XorCode가 0일경우 null을 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return String
	 */
	public String getSecurityXOR(String Code, int XorCode){
		if(XorCode==0)
			return null;
		byte codeChar[] = new byte[Code.getBytes().length];
		codeChar = Code.getBytes();
		
		for(int x=0; x< Code.getBytes().length; x++)
			codeChar[x] = (byte) (codeChar[x] ^ XorCode);
		
		return new String(codeChar);
	}
	
	/**
	 * Code는 원본값, XorCode[]는 비밀번호 입니다 이때 XorCode는 byte 배열을 사용하며, 더욱 나은 보안을 자랑할수 있습니다 
	 *  xor암호화후, String형으로 반환합니다
	 *  
	 * @param Code
	 * @param XorKey[]
	 * @return String
	 */
	public String getSecurityXOR(String Code, byte XorKey[]){
		byte codeChar[] = new byte[Code.getBytes().length];
		codeChar = Code.getBytes();
		
		for(int x=0, y=0; x< Code.getBytes().length; x++){
			codeChar[x] = (byte) (codeChar[x] ^ XorKey[y]);
			y = (++y < XorKey.length ? y : 0); // j값이 keyChar 문자열 크기보다 크면 0 아니면 j
		}
		return new String(codeChar);
	}
	
	/**
	 * Code는 원본값, XorCode는 비밀번호 입니다 XorCode는 int이며, xor암호화후, long형으로 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return long
	 */
	public long getSecurityXOR(long Code, int XorCode){
		if(XorCode==0)
			return 0;
		return Code ^ XorCode;
	}
	
	/**
	 * Code는 원본값, XorCode는 비밀번호 입니다 XorCode는 long이며, xor암호화후, long형으로 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return long
	 */
	public long getSecurityXOR(long Code, long XorCode){
		if(XorCode==0)
			return 0;
		return Code ^ XorCode;
	}
	
	/**
	 *  Code는 원본값, XorCode는 비밀번호 입니다 xor암호화후, int형으로 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return int
	 */
	public int getSecurityXOR(short Code, int XorCode){
		if(XorCode==0)
			return 0;
		return Code ^ XorCode;
	}
	
	/**
	 * Code는 원본값, XorCode는 비밀번호 입니다 xor암호화후, int형으로 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return int
	 */
	public int getSecurityXOR(byte Code, int XorCode){
		if(XorCode==0)
			return 0;
		return Code ^ XorCode;
	}
	
	/**
	 * Code는 원본값, XorCode는 비밀번호 입니다 xor암호화후, char형으로 반환합니다
	 * 
	 * @param Code
	 * @param XorCode
	 * @return char
	 */
	public char getSecurityXOR(char Code, int XorCode){
		if(XorCode==0)
			return 0;
		return (char) (Code ^ XorCode);
	}
	
	/**
	 * originFile는 암호화할 파일, securityFile는 암호화된 파일, XorCode는 비밀번호, progressBar는 진행바 입니다
	 * 프로그래스바는 진행여부를 확인할때 사용합니다
	 * xor암호화후, boolean형으로 반환합니다
	 * 
	 * true는 성공, false는 실패 입니다
	 * 
	 * @param originFile
	 * @param securityFile
	 * @param XorCode
	 * @param progressBar
	 * @return boolean
	 */
	public boolean securityFileXOR(File originFile, File securityFile, int XorCode, ProgressBar progressBar){
		if(!originFile.exists())
			return false;
		if(XorCode==0)
			return false;
        try {
        	fileSecurity = true;
        	
            FileInputStream fis = new FileInputStream(originFile);
            FileOutputStream fos = new FileOutputStream(securityFile);
            
            FileChannel input = fis.getChannel();
            
            progressBar.setMax((int) input.size());
            
            Max_FileSize = (int) input.size();
            
            int len = 0;
            int size = 0;
//            byte[] buf = new byte[1024];
            
//            while((len = fis.read(buf)) != -1){
            while((len = fis.read()) != -1 && fileSecurity){
            	len = len ^ XorCode;
            	fos.write(len);
//                fos.write(buf, 0, len);
                fos.flush();
                ++size;
                isFileSize = size;
                progressBar.setProgress(size);
            }
            
            fileSecurity = false;
            
            fis.close();
            fos.close();
            input.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return securityFile.exists();
    }
	
	/**
	 * originFile는 암호화할 파일, securityFile는 암호화된 파일, XorCode는 비밀번호 입니다
	 * xor암호화후, boolean형으로 반환합니다
	 * 
	 * true는 성공, false는 실패 입니다
	 * 
	 * @param originFile
	 * @param securityFile
	 * @param XorCode
	 * @return boolean
	 */
	public boolean securityFileXOR(File originFile, File securityFile, int XorCode){
		if(!originFile.exists() || originFile.isDirectory())
			return false;
		if(XorCode==0)
			return false;
        try {
        	fileSecurity = true;
        	
            FileInputStream fis = new FileInputStream(originFile);
            FileOutputStream fos = new FileOutputStream(securityFile);
            
            Max_FileSize = (int) fis.getChannel().size();
            
            int len = 0;
            int size = 0;
//            byte[] buf = new byte[1024];
            
//            while((len = fis.read(buf)) != -1){
            while((len = fis.read()) != -1 && fileSecurity){
            	len = len ^ XorCode;
            	fos.write(len);
//                fos.write(buf, 0, len);
                fos.flush();
                ++size;
                isFileSize = size;
            }
            
            fileSecurity = false;
            
            fis.close();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return securityFile.exists();
    }
	
	/**
	 * securityFileXOR() 메소드 연관 - securityFileXOR()메소드 작동을 중단할때 사용합니다
	 */
	public void stopFileSecurity(){
		fileSecurity = false;
	}
	
	/**
	 * securityFileXOR() 메소드 연관 - 남은 시간을 초 단위로 반환합니다 대략 값입니다
	 * 
	 * @return int
	 */
	public int remainingTime(){
		try {
			if(!oneMinute_Boolean) // oneMinute_Boolean가 false라면 1초동안 작업량을 구한다
				oneMinute_Thread();
			int Remaining = Max_FileSize - isFileSize; // 현재 남아있는 파일 용량을 구한다
			if(Remaining<=0 || oneMinute_int<=0)
				return 0;
			int remainingTime = Remaining / oneMinute_int; // 남은 시간(초단위)을 구한다
			return remainingTime; // 반환한다
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	private void oneMinute_Thread() throws InterruptedException{
		int before = isFileSize; // 1초전 파일 크기
		Thread.sleep(1000);
		oneMinute_int = isFileSize - before; // 1초후 파일크기 - 1초전 파일크기 = 1초동안 작업량
		oneMinute_Boolean=true;
	}
	
	/**
	 * securityFileXOR() 메소드 연관 - 현재 xor연산이 완료된 크기를 구합니다 (byte단위)
	 * 
	 * @return int
	 */
	public int getIsFileSize(){
		return isFileSize;
	}
	
	/**
	 * securityFileXOR() 메소드 연관 - 전체 파일의 크기를 구합니다 (byte단위)
	 * 
	 * @return int
	 */
	public int getTotalFileSize(){
		return Max_FileSize;
	}
	
	/**
	 * jar의 버전을 표시합니다
	 * 
	 * @return String
	 */
	public String getJarVersion(){
		return "SecurityXOR by Mir(whdghks913), v1.0";
	}
	
}
