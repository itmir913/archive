class calculation
{
	public static void main(String[] args)
	{
		System.out.println("이항 연산자에 대해 알아보자!");
		System.out.println("먼저 대입연산자와 산술 연산자를 알아보겠습니다");
		
		int cal1=20;
		int cal2=30;
		int cal3=cal1+cal2;
		System.out.println(cal3*2);
		int cal4=100;
		System.out.println(cal4/cal1);
		System.out.println(cal4%cal2);
		
		System.out.println("");
		System.out.println("복합 대입 연산자란?");
		cal4/=cal1;
		System.out.println(cal4);
	}
}