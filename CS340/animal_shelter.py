"""
animal_shelter.py

This module provides a CRUD class for interacting with a MongoDB database.
Currently it supports inserting new documents and looking up data from
the 'aac' database and 'animals' collection as specified by the class
instructions. 
Alex Hitchens
CS340
31MAY25

Updated to include the U and D in Crud.
Alex Hitchens
CS340
08JUN25
"""
from pymongo import MongoClient


class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """

    def __init__(self,USER,PASS):
        # Initializing the MongoClient. This helps to
        # access the MongoDB databases and collections.
        # This is hard-wired to use the aac database, the
        # animals collection, and the aac user.
        # Definitions of the connection string variables are
        # unique to the individual Apporto environment.
        #
        # You must edit the connection variables below to reflect
        # your own instance of MongoDB!
        #
        # Connection Variables
        #
        #USER = 'aacuser'
        #PASS = 'SNHU1234'
        HOST = 'nv-desktop-services.apporto.com'
        PORT = 34354
        DB = 'aac'
        COL = 'animals'
        #
        # Initialize Connection
        #
        self.client = MongoClient('mongodb://%s:%s@%s:%d' %
                                  (USER, PASS, HOST, PORT))
        self.database = self.client['%s' % (DB)]
        self.collection = self.database['%s' % (COL)]


# Complete this create method to implement the C in CRUD.

    def create(self, data):
        """
        Inserts data into the MongoDB 'aac' database in collection 'animals'

        Parameters
        ----------
        data : dict
            These are key/value pairs that have the data to insert.

        Raises
        ------
        ValueError
            If there is no data or it is not a dictionary, Error will
            prompt to notify.

        Returns
        -------
        bool:
            True if insert is successful, False otherwise

        """
        if not data or not isinstance(data, dict):
            raise ValueError("Input must be a non-Null Dictionary.")

        try:
            result = self.database.animals.insert_one(data)
            return result.acknowledged  # Returns true if result successful
        except Exception as e:
            print(f"Error inserting document: {e}")
            return False

# Create method to implement the R in CRUD.
    def read(self, data):
        """
        Tries to find data within the 'aac' database and 'animals' collection

        Parameters
        ----------
        data : dict
            These are key/value pairs that should be searched for

        Raises
        ------
        ValueError
            If there is no value or key, error will
            prompt to notify.

        Returns
        -------
        list:
            List of matching documents, unless it's empth then returns
            an empty list
        """
        if data is None or not isinstance(data, dict):
            raise ValueError("Input must be a non-Null Dictionary.")

        try:
            cursor = self.database.animals.find(data)
            return list(cursor)  # convert curser to list and return
        except Exception as e:
            print(f"Error finding information: {e}")
            return []

    def update(self, data, update):
        """
        Tries to find data within the 'aac' database and 'animals' collection
        and then update that information with the key/values in update

        Parameters
        ----------
        data : dict
            These are key/value pairs that should be searched for to update
        update : dict
            This is the what the data should be updated too.

        Raises
        ------
        ValueError
            If there is no data in either dictionaries, error will
            prompt to notify.

        Returns
        -------
        int:
            the number of objects that were modified.            
        """
        if not data or not isinstance(data, dict):
            raise ValueError("Input must be a non-Null Dictionary.")
        if not update or not isinstance(update, dict):
            raise ValueError("Input must be a non-Null Dictionary.")
        try:
            result = self.database.animals.update_many(data, {"$set": update})
            return result.modified_count  # returns number of modified
        except Exception as e:
            print(f"Error updating information: {e}")
            return 0

    def delete(self, data):
        """
        Tries to find data within the 'aac' database and 'animals' collection
        and then delete that data.

        Parameters
        ----------
        data : dict
            These are key/value pairs that should be searched for to delete


        Raises
        ------
        ValueError
            If there is no data in the dictionary, error will
            prompt to notify.

        Returns
        -------
        int:
            the number of objects that were deleted        
        """
        if not data or not isinstance(data, dict):
            raise ValueError("Input must be a non-Null Dictionary.")
        try:
            result = self.database.animals.delete_many(data)
            return result.deleted_count  # returns number of deleted
        except Exception as e:
            print(f"Error deleting information: {e}")
            return 0
