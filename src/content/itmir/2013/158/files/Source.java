class Source
{
	public static void main(String[] args)
	{
		int M1=50, M2=100;
		
		boolean MM1=(M1==50 && M2==100);
		boolean MM2=(M1<50 || M2>200);
		
		System.out.println("M1은 50이고 M2는 100이다 ="+MM1);
		System.out.println("M1<50이고 M2>200이다     ="+MM2);
	}
}