class Hangultest
{
	public static void main(String[] args)
	{
		char hangul1='미';
		char hangul2='르';
		
		char hangul3='M';
		int hangul4=(int)hangul3;
		
		char hangul5=0x77;
		
		System.out.println("이 소스를 만든사람은? "+hangul1+hangul2);
		System.out.println("알파벳 M의 유니코드 문자는? "+hangul4);
		
		System.out.println("유니코드 77은? "+hangul5);
	}
}