class Ifelse
{
	public static void main(String[] args)
	{
		int n1=50, n2=80;
		
		if(n1<50)
			System.out.println("n1은 50보다 작다");
		else
			System.out.println("n1은 50이거나 50보다 크다");
			
		if(n1==n2 && n1>n2)
			System.out.println("n1=n2이며 n1>n2이다");
		else
			System.out.println("n1=n2와 n1>n2가 성립하지 않는다");	
	}
}