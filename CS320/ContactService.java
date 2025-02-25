package Project1;
import java.util.Vector;

public class ContactService {

	 // Delete a contact by it's ID
	 public static void deleteContact(Vector<Contact> contacts, String contactID ) {
		for(int i=0; i < contacts.size(); i++) {
			if(contacts.get(i).getContactID().equals(contactID)) {
				contacts.remove(i);
				return;
			}
		}
		System.out.println("Contact ID " + contactID + " not found.");
	}
	 
	 // Add a contact with known values
	 public static void addContact(Vector<Contact> contacts, String firstName, String lastName, String number, String address) {
		 contacts.addElement(new Contact(firstName,lastName,number,address));
	 }
	 
	 // Add a contact with default values
	 public static void addEmptyContact(Vector<Contact> contacts) {
		 contacts.addElement(new Contact());
	 }

	 //Update Contact's First Name
	 public static void updateContactFirstName(Vector<Contact> contacts, String contactID, String newInfo) {
		 for(int i=0; i < contacts.size(); i++) {
			 if(contacts.get(i).getContactID().equals(contactID)) {
				contacts.get(i).setFirstName(newInfo);
				return;
					}
		
		 }
		 System.out.println("Contact ID " + contactID + " not found.");
	}
	 
	 // Update Contacts Last Name
	 public static void updateContactLastName(Vector<Contact> contacts, String contactID, String newInfo) {
		 for(int i=0; i < contacts.size(); i++) {
			 if(contacts.get(i).getContactID().equals(contactID)) {
				contacts.get(i).setLastName(newInfo);
				return;
					}
		
		 }
		 System.out.println("Contact ID " + contactID + " not found.");
	 }
	 
	 //Update contacts phone number
	 public static void updateContactNumber(Vector<Contact> contacts, String contactID, String newInfo) {
		 for(int i=0; i < contacts.size(); i++) {
			if(contacts.get(i).getContactID().equals(contactID)) {
				contacts.get(i).setNumber(newInfo);
				return;
			 }
		
		 }
		 System.out.println("Contact ID " + contactID + " not found.");
	 }
	 
	 //Update a contacts address
	 public static void updateContactAddress(Vector<Contact> contacts, String contactID, String newInfo) {
		 for(int i=0; i < contacts.size(); i++) {
			 if(contacts.get(i).getContactID().equals(contactID)) {
				contacts.get(i).setAddress(newInfo);
				return;
					}
		
		 }
		 System.out.println("Contact ID " + contactID + " not found.");
	 }
	 

}
