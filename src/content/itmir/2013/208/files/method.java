class method
{
	public static void main(String[] args)
	{
		System.out.println("오랜만 입니다! 자바프로그램을 시작합니다");
		int Mir=80;
		Hi(7, 5);
		Hi(8, Mir);
		Hi(9,8);
		System.out.println("자바프로그램을 종료합니다");
	}
	
	public static void Hi(int H1, int H2)
	{
		System.out.println("Hi 메소드 실행 "+H1+" "+H2);
	}
}