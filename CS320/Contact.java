package Project1;

public class Contact {
		final String contactID;
		// static to track over multiple instances
		static int count = 1;
		private String firstName;
		private String lastName;
		private String Number;
		private String Address;
	
	// Default Constructor
	public Contact() {
		this("None","None","0000000000","None");
	}
	//Overloaded Constructor
	public Contact(String fName, String lName, String Num, String Add) {
		contactID = createUniqueID();
		if (checkName(fName)) {
			firstName = fName;
			}
		else {
			firstName = "None";
		}
		if (checkName(lName)) {
			lastName = lName;
			}
		else {
			lastName = "None";
		}
		if(checkNumber(Num)) {
			Number = Num;
		}
		else {
			Number= "0000000000";
			}
		if (checkAddress(Add)) {
			Address = Add;
			}
		else {
			Address = "None";
		}

	}
	
	//Sets and Gets
	public void setFirstName(String name) {
		if (checkName(name)) {
		firstName = name;
		}
	}
	public String getFirstName() {
		return firstName;
	}
	public void setLastName(String name) {
		if(checkName(name)) {
		lastName = name;
		}
	}	
	public String getLastName() {
		return lastName;
	}
	public void setNumber(String num) {
		if(checkNumber(num)) {
		Number = num;
		}
	}
		
	public String getNumber() {
		return Number;
	}
	public void setAddress(String Add) {
		if (checkAddress(Add)) {
		Address = Add;
		}
	}
		
	public String getAddress() {
		return Address;
	}
	
	public String getContactID() {
		return contactID;
	}

     
	//Private Methods
	
	//increments the count variable and applies it to leading 0s to generate contactIDs
	//that look like 0000000001,0000000002, ect...
	private String createUniqueID() {
		String tempID;
		tempID = String.valueOf(count);
		int x = 10 - tempID.length();
			for(int i=0;i<x;i++) {
				tempID = "0"+tempID;
			}
		count = count + 1;
		
		// the contact ID shouldn't need to go this high but if it does, it will return all
		// zeros so not to erase existing accounts until the issue is fixed.
		if(tempID.length()>110) {
			System.out.println("Contact ID greater then 10 digits, returning all zeros.");
			return "0000000000";
		}
		
		return tempID;
		
	}
	
	//Ensures name is with in requirements
	private boolean checkName(String userInput) {
		
		if (userInput == null) {
			System.out.println("Name may not be Null.");
			return false;
		}
		
		else if (userInput.length()==0) {
			System.out.println("Name may not be blank.");
			return false;
		}
		
		
		else if(userInput.length()>10) {
			System.out.println("Name may only be 10 characters.");	
			return false;
		}
		else return true;
		
	}
	//Ensures phone number is with in requirements
	private boolean checkNumber(String userInput) {
		if (userInput == null) {
			System.out.println("Number may not be Null.");
			return false;
		}
		else if (userInput.length()!=10) {
			System.out.println("Number must be 10 Digits.");
			return false;
		}
		else return true;
		
	}
	//Ensures address is with in requirements
	private boolean checkAddress(String userInput) {
		if (userInput == null) {
			System.out.println("Address may not be Null.");
			return false;
		}
		else if (userInput.length()==0) {
			System.out.println("Address may not be blank.");
			return false;
		}
		else if(userInput.length()>30) {
			System.out.println("Address may only be 30 characters.");	
			return false;
		}
		else return true;
		
	}
	
}
