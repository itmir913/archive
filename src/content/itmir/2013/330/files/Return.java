class Return{
	public static void main(String[] args){
		int values = Add(1, 3);
		System.out.println("1+3="+values);
	}
	
	public static int Add(int num1, int num2){
		int result = num1+num2;
		return result;
	}
}