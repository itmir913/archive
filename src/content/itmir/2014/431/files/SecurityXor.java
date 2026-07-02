import java.io.File;

import com.whdghks913.xor.SecurityXOR;

public class SecurityXor {
	
	public static SecurityXOR securityXOR = new SecurityXOR();
	public static boolean isFileXOR = false;
	
	public static void main(String[] args) {
		System.out.println("--ExampleSecurityXor--");
		System.out.println("");
		System.out.println("");
		
		/**
		 * byte
		 */
		byte a = 5;
		System.out.println("--byte");
		System.out.print("securityXOR.getSecurityXOR(5, 12) : ");
		System.out.println(securityXOR.getSecurityXOR(a, 12)); // byte xor
		
		System.out.println("");
		
		/**
		 * char
		 */
		System.out.println("--char");
		System.out.print("securityXOR.getSecurityXOR('A', 5) : ");
		System.out.println(securityXOR.getSecurityXOR('A', 5));// char xor

		System.out.println("");
		
		/**
		 * int
		 */
		System.out.println("--int");
		System.out.print("securityXOR.getSecurityXOR(25, 854) : ");
		System.out.println(securityXOR.getSecurityXOR(25, 854)); // int xor

		System.out.println("");
		
		/**
		 * long, int
		 */
		System.out.println("--long(int)");
		System.out.print("securityXOR.getSecurityXOR(85L, 852) : ");
		System.out.println(securityXOR.getSecurityXOR(85L, 852)); // long, int xor

		System.out.println("");
		
		/**
		 * long, long
		 */
		System.out.println("--long(long)");
		System.out.print("securityXOR.getSecurityXOR(85258L, 85L) : ");
		System.out.println(securityXOR.getSecurityXOR(85258L, 85L)); // long, long xor

		System.out.println("");
		
		/**
		 * short
		 */
		short d = 56;
		System.out.println("--short");
		System.out.print("securityXOR.getSecurityXOR(56, 582) : ");
		System.out.println(securityXOR.getSecurityXOR(d, 582)); // short xor

		System.out.println("");
		
		/**
		 * String, byte[]
		 */
		byte[] e = { 5, 8, 9 };
		System.out.println("--String(byte[])");
		System.out.print("securityXOR.getSecurityXOR(\"Hi XOR\", { 5, 8, 9 }) : ");
		System.out.println(securityXOR.getSecurityXOR("Hi XOR", e)); // String, byte[] xor

		System.out.println("");
		
		/**
		 * String, int
		 */
		System.out.println("--String(int)");
		System.out.print("securityXOR.getSecurityXOR(\"JAR FILE\", 251) : ");
		System.out.println(securityXOR.getSecurityXOR("JAR FILE", 251)); // String, int xor

		System.out.println("");
		
		System.out.println("--File");
		System.out.println("securityXOR.securityFileXOR(new File(\"C:/java/test.txt\"), new File(\"C:/java/test_xor.txt\"), 8547)");
		System.out.println("Success : true, Fail : false");
		
		System.out.println("");
		
		/**
		 * File - TotalSize
		 */
		System.out.println("--TotalSize");
		System.out.print("securityXOR.getTotalFileSize() : ");
		System.out.print(securityXOR.getTotalFileSize());
		System.out.println("byte(바이트)");

		System.out.println("");
		
		new Thread(new Runnable() {
			@Override
			public void run() {
				System.out.println("");
				/**
				 * File
				 */
				isFileXOR = true;
				boolean a = securityXOR.securityFileXOR(new File("C:/java/test.txt"), new File("C:/java/test_xor.txt"), 8547);
				System.out.println("");
				System.out.println("--File");
				System.out.println("securityXOR.securityFileXOR(new File(\"C:/java/test.txt\"), new File(\"C:/java/test_xor.txt\"), 8547)");
				System.out.println("Success : true, Fail : false");
				System.out.print("Result : ");
				System.out.println(a); // File, File, int xor
				isFileXOR = false;
				
			}
		}).start();
		
		new Thread(new Runnable() {
			@Override
			public void run() {
				while(isFileXOR){
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					System.out.println("");
					
					/**
					 * File - remaining Time
					 */
					int a = securityXOR.remainingTime();
					
					System.out.println("--remaining Time");
					System.out.print("securityXOR.remainingTime() : ");
					System.out.print(a);
					System.out.println("Sec(초)");
					
					/**
					 * Now File Size
					 */
					System.out.println("--isFileSize");
					System.out.print("securityXOR.getIsFileSize() : ");
					System.out.print(securityXOR.getIsFileSize());
					System.out.println("byte(바이트)");
					
					if(a==0)
						isFileXOR = false;
				}
			}
		}).start();
		
		/**
		 * jar version
		 */
		System.out.println("");
		System.out.println("--JarVersion");
		System.out.print("securityXOR.getJarVersion() : ");
		System.out.println(securityXOR.getJarVersion());
		
		System.out.println("");
		/**
		 * File Security stop
		 */
//		securityXOR.stopFileSecurity();
	}

}
