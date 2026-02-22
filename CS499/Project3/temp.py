from pymongo import MongoClient
from datetime import datetime, timezone
import time
import board
import adafruit_ahtx0
# configurables
MONGO_URI = "mongodb://temp_rw:12345@localhost:27017/temperatures?authSource=temperatures" #thr route into the docker container for mongodb
DB_NAME = "temperatures"
COLLECTION_NAME = "readings"

SAMPLE_SECONDS = 5

i2c = board.I2C() #default i2c pins

# sensor object on the board
thSensor = adafruit_ahtx0.AHTx0(i2c)


class TempLogger:

    def __init__(self, mongo_uri=MONGO_URI):

        #create the client using the conection
        self.client = MongoClient(mongo_uri)
        #set the database
        self.db = self.client[DB_NAME]
        #set the collections
        self.col = self.db[COLLECTION_NAME]
        #add a time colomn
        self.col.create_index("time")

        #a flag so we can pause recording
        self.recording_enabled = True

    # do one log
    def log_once(self):
        # get the temp and humidity
        temp_c = thSensor.temperature
        humidity = thSensor.relative_humidity

        #storing the doc... json style
        doc = {
            "time": datetime.now(timezone.utc),
            "temperature": float(temp_c),
            "humidity": float(humidity),
        }
        result = self.col.insert_one(doc) # stick it in the database
        print(f"Saved reading {result.inserted_id}: {doc}") #print it out




def main():
    # create logger object
    logger = TempLogger()

    while True:
        # record loop
        if logger.recording_enabled:
            logger.log_once()
        else:
            print("Recording paused...")

        # Note: I wanted to add a menu in here but was having some issues, so i took it out
        # that is why there is an recording_enabled. I may do this later though

        start = time.time()
        while time.time() - start < SAMPLE_SECONDS:
            time.sleep(0.2)



if __name__ == "__main__":
    main()
