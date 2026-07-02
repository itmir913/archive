class SCE
{
	public static void main(String[] args)
	{
		int M1=10, M2=10;
		boolean sce;
		
		sce=(M1+=20)<0 && (M2+=30)>50;
		System.out.println("M1의 값은 "+M1+", M2의 값은 "+M2+" 입니다");
		
		sce=(M1+=20)>0 || (M2+=30)>50;
		System.out.println("M1의 값은 "+M1+", M2의 값은 "+M2+" 입니다");
	}
}