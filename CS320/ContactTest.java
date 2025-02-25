package Project1;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;


class ContactTest {

	@Test //Test base constructor ID is by default not Null.
	void testBaseConstructorIDNotNull() {
		Contact contact = new Contact();
		assertNotNull(contact.getContactID(), "Contact ID should not be null");
	}
	
	@Test //Test overloaded constructor IDs are not Null by default.
	void testOverloadConstructorIDNotNull() {
		Contact contact = new Contact(null,null,null,null);
		assertNotNull(contact.getContactID(), "Appointment ID should not be null");
	}
	
	@Test //Test IDs are unique.
	void testIDIsUnique() {
		Contact contact1 = new Contact();
		Contact contact2 = new Contact();
		assertFalse(contact1.getContactID().equals(contact2.getContactID()));
	}
	
	@Test //Test IDs can not be modified
	void testIDCantBeModified() {
		Contact contact = new Contact();
		assertThrows(NoSuchMethodException.class, () -> {
            contact.getClass().getMethod("setContactID", String.class);
        });
	}

	@Test //Test First Name can be set
	void testSetFirstName() {
		Contact contact = new Contact();
		contact.setFirstName("Bob");
		assertTrue(contact.getFirstName().equals("Bob"));
	}

	@Test //Test First Name can not be set to null
	void testFirstNameCantBeSetNull() {
		Contact contact = new Contact();
		contact.setFirstName(null);
		assertNotNull(contact.getFirstName(), "First Name should not be null");
	}
	
	@Test //Test First Name can not be over 10 characters
	void testFirstNameCantBeOverCharacterLimit() {
		Contact contact = new Contact();
		contact.setFirstName("BobBobBobBobBOb");
		assertFalse(contact.getFirstName().equals("BobBobBobBobBOb"));
	}
	
	@Test //Test Last Name can be set
	void testSetLastName() {
		Contact contact = new Contact();
		contact.setLastName("Ross");
		assertTrue(contact.getLastName().equals("Ross"));
	}

	@Test //Test Last Name can not be set to null
	void testLastNameCantBeSetNull() {
		Contact contact = new Contact();
		contact.setLastName(null);
		assertNotNull(contact.getLastName(), "Last Name should not be null");
	}
	
	@Test //Test Last Name can not be over 10 characters
	void testLastNameCantBeOverCharacterLimit() {
		Contact contact = new Contact();
		contact.setLastName("RossRossRoss");
		assertFalse(contact.getLastName().equals("RossRossRoss"));
	}
	
	
	@Test //Test Phones number can be set
	void testSetNumber() {
		Contact contact = new Contact();
		contact.setNumber("5556667777");
		assertTrue(contact.getNumber().equals("5556667777"));
	}

	@Test //Test Phone Number can not be set to null
	void testPhoneNumberCantBeSetNull() {
		Contact contact = new Contact();
		contact.setNumber(null);
		assertNotNull(contact.getNumber(), "NUmber should not be null");
	}
	
	@Test //Test Number can not be over 10 characters
	void testPhoneNumberCantBeOverCharacterLimit() {
		Contact contact = new Contact();
		contact.setNumber("55566677778");
		assertFalse(contact.getLastName().equals("55566677778"));
	}
	
	@Test //Test Number can not be under 10 characters
	void testPhoneNumberCantBeUnderCharacterLimit() {
		Contact contact = new Contact();
		contact.setNumber("555666777");
		assertFalse(contact.getLastName().equals("555666777"));
	}
	
	
	@Test //Test Address can be set
	void testSetAddress() {
		Contact contact = new Contact();
		contact.setAddress("Jacksonville, FL");
		assertTrue(contact.getAddress().equals("Jacksonville, FL"));
	}

	@Test //Test Address can not be set to null
	void testAddressCantBeSetNull() {
		Contact contact = new Contact();
		contact.setAddress(null);
		assertNotNull(contact.getAddress(), "Addres should not be null");
	}
	
	@Test //Test Last Name can not be over 30 characters
	void testAddressCantBeOverCharacterLimit() {
		Contact contact = new Contact();
		contact.setAddress("This is an example of a very long address that is over 30 characters in length.");
		assertFalse(contact.getAddress().equals("This is an example of a very long address that is over 30 characters in length."));
	}
	
	
	
	
}
