/* 할인률을 구하는 Java 프로그램

이 프로그램은 오로지 책과 독해의 힘으로 Mir(whdghks913)가 재작한 프로그램 입니다
아직까지 우리는 정수(또는 소수)를 입력받는 방법을 배우지 않았기에 미리 지정해둔
숫자로 연산하도록 만들었습니다
나중에 정수를 입력받는 방법을 배우게 되면 그때 이 프로그램의 2.0버전이 출시됩니다

Made By Mir
사용자 께서는 int money와 int percent의 값을 수정해서 사용하시면 됩니다
*/

class money
{
	public static void main(String[] args)
	{
		int money=10000; // 할인의 대상이 되는 원금  [수정 필요]
		int percent=20; // 20%의 할인                        [수정 필요]
		
		System.out.println("이 프로그램은 실제 가격과 할인률을 지정하면");
		System.out.println("얼마가 깍히는지, 할인된 가격은 얼마인지");
		System.out.println("구하는 프로그램 입니다");
		System.out.println("");
		System.out.println("원금: "+money+", 할인률: "+percent+"%");
		sale(money, percent);
		System.out.println("");
		System.out.println("프로그램을 마칩니다");
	}
	
	public static void sale(int money, double percent) // money은 원금이며 percent는 할인률이다
	{
	double M3=percent*0.01; // M3는 %를 소수점으로 변환한 값이다 즉 20%를 0.2로 변환한다
	double yourmoney=money*M3; // 할인되는 가격
	double actually=money-yourmoney; // 실제 가격
	System.out.println("할인되는 가격: "+yourmoney+", 실제 가격: "+actually);
	}
}