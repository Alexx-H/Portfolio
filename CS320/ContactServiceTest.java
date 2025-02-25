package Project1;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.Vector;

class ContactServiceTest {
	
	@Test //Test Base Constructor
	void testAddEmptyContactWithUniqueIDs() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		ContactService.addEmptyContact(contacts);
		
		assertFalse(contacts.get(0).getContactID().equals(contacts.get(1).getContactID()));
	}
	
	@Test //Test Overload Constructor
	void testAddCotnactWithUniqueIDs() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		ContactService.addEmptyContact(contacts);
		
		assertFalse(contacts.get(0).getContactID().equals(contacts.get(1).getContactID()));
	}

	@Test //Test Delete by Contact ID
	void testDeleteContactByContactID() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = contacts.get(0).getContactID();
		
		System.out.println("Contact to Delete: " + contacts.get(0).getContactID());
		ContactService.deleteContact(contacts, contactID);
		
		assertEquals(contacts.size(),0, "Contacts should be empty again after Deleting "+ contactID);
	}
	
	@Test //Test Delete by Contact ID but not found
	void testDeleteContactByContactIDNotFound() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = "9999999999";
		
		System.out.println("Contact to Delete: '99999999999'"  );
		ContactService.deleteContact(contacts, contactID);
		
		assertNotEquals(contacts.size(),0, "Contacts Should not have been found ");
	}
	
	@Test //Test Update FIrst Name method
	void testUpdateContactFirstName() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = contacts.get(0).getContactID();
		String newName="Bob";
		
		System.out.println("Task to update Name: " + contacts.get(0).getContactID());
		ContactService.updateContactFirstName(contacts,contactID,newName);
		
		assertEquals(contacts.get(0).getFirstName(),newName, "Contact " + contactID + " should be named 'Bob'");
	}
	
	@Test //Test Update FIrst Name method but it isn't found
	void testUpdateContactFirstNameNotFound() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = "9999999999";
		String newName="Bob";
		
		System.out.println("Task to update Name: 9999999999");
		ContactService.updateContactFirstName(contacts,contactID,newName);
		
		assertNotEquals(contacts.get(0).getFirstName(),newName, "Contact should not have been found");
	}
	
	@Test //Test Update Last Name method
	void testUpdateContactLastName() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = contacts.get(0).getContactID();
		String newName="Ross";
		
		System.out.println("Contact to update Name: " + contacts.get(0).getContactID());
		ContactService.updateContactLastName(contacts,contactID,newName);
		
		assertEquals(contacts.get(0).getLastName(),newName, "Contact " + contactID + " should be named 'Ross'");
	}
	
	@Test //Test Update Last Name method but it isn't found
	void testUpdateContactLastNameNotFound() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = "9999999999";
		String newName="Ross";
		
		System.out.println("Contact to update Name: 9999999999");
		ContactService.updateContactLastName(contacts,contactID,newName);
		
		assertNotEquals(contacts.get(0).getLastName(),newName, "Contact Should not have been found");
	}
	
	
	@Test //Test Update Phone Number method
	void testUpdateContactPhoneNumber() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = contacts.get(0).getContactID();
		String newNumber="5556667777";
		
		System.out.println("Contact to update Name: " + contacts.get(0).getContactID());
		ContactService.updateContactNumber(contacts,contactID,newNumber);
		
		assertEquals(contacts.get(0).getNumber(),newNumber, "Contact " + contactID + " should have number '5556667777'");
	}
	
	@Test //Test Update Phone Number method but it isn't found
	void testUpdateContactPhoneNumberNotFound() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = "9999999999";
		String newNumber="5556667777";
		
		System.out.println("Contact to update Number: '9999999999'");
		ContactService.updateContactNumber(contacts,contactID,newNumber);
		
		assertNotEquals(contacts.get(0).getNumber(),newNumber, "Contact should not have been found");
	}
	
	
	@Test //Test Update Address method
	void testUpdateContactAddress() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = contacts.get(0).getContactID();
		String newAddress="Jacksonville, FL";
		
		System.out.println("Contact to update Address: " + contacts.get(0).getContactID());
		ContactService.updateContactAddress(contacts,contactID,newAddress);
		
		assertEquals(contacts.get(0).getAddress(),newAddress, "Contact " + contactID + " should have address 'Jacksonville, FL'");
	}
	@Test //Test Update Address method but it isn't found
	void testUpdateContactAddressNotFound() {
		Vector<Contact> contacts = new Vector<>();
		ContactService.addEmptyContact(contacts);
		
		String contactID = "9999999999";
		String newAddress="Jacksonville, FL";
		
		System.out.println("Contact to update Address: 9999999999");
		ContactService.updateContactAddress(contacts,contactID,newAddress);
		
		assertNotEquals(contacts.get(0).getAddress(),newAddress, "Contact should not have been found");
	}
	
}