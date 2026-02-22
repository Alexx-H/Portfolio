from datetime import datetime, timedelta, timezone
from pymongo import MongoClient
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button, CheckButtons

#  connection settings
MONGO_URI = "mongodb://temp_rw:12345@10.0.0.103:27017/temperatures?authSource=temperatures"
DB_NAME ="temperatures"
COLL_NAME = "readings"
debug = False

# This function gets the data from the database
def fetch_window(col, sinceTime: datetime):
    # this gets the data queried since specifief time
    cursor = col.find({"time": {"$gte": sinceTime}}).sort("time", 1)
    times, temps, hums = [], [], [] #create the lists


    for doc in cursor:
        t = doc.get("time") # Get the time
        if t is None: # if time isn't there skip it
            continue
        times.append(t) # add it to the list

        temps.append((doc.get("temperature")*1.8)+32) # append temp (and convert)
        hums.append(doc.get("humidity")) # get humidity
    return times, temps, hums


def main():

    client = MongoClient(MONGO_URI) # define the clinet and the ...
    col = client[DB_NAME][COLL_NAME] # database and collection

    if(debug): # helped me debug the connection to the database
        print("Viewer time:", datetime.now(timezone.utc))
        latest = col.find_one(sort=[("time", -1)])
        print("Latest:", latest)

    #create the plot area
    fig, ax = plt.subplots()
    plt.subplots_adjust(left=0.08, right=0.78, bottom=0.22, top=0.90)

    # create the lines
    (temp_line,) = ax.plot([], [], label="Temperature")
    (hum_line,) = ax.plot([], [], label="Humidity")

    # title
    ax.set_title("Temp / Humidity")
    ax.set_xlabel("Time")
    ax.legend(loc="upper left", bbox_to_anchor=(1.02, 1.0), borderaxespad=0.0)

    # where the stats going to go
    info = ax.text(
        0.99, 0.98, "",
        transform=ax.transAxes,
        ha="right", va="top"
    )

    #state of the graph
    state = {
        "hours": 6.0,  # time shown
        "show_temp": True,
        "show_hum": True,
        "auto_refresh": False,
        "last_data": ([], [], [])  # time, temp, hum
    }

    # redraw updates the graph,
    def redraw():

        now = datetime.now(timezone.utc) # get the current time
        since = now - timedelta(hours=float(state["hours"])) # get the earliest time we are want to display

        times, temps, hums = fetch_window(col, since) # get the info from mongo
        state["last_data"] = (times, temps, hums)  # saveit in the current state

        # apply the toggles
        temp_line.set_visible(state["show_temp"])
        hum_line.set_visible(state["show_hum"])

        # update the data in the lines
        if state["show_temp"]:
            temp_line.set_data(times, temps)
        else:
            temp_line.set_data([], [])

        if state["show_hum"]:
            hum_line.set_data(times, hums)
        else:
            hum_line.set_data([], [])

        # if we have any data
        if times:
            ax.set_xlim(min(times), max(times)) # sets the x size properly

            # set the ys to the max and min of the ys in the list
            ys = []
            if state["show_temp"]:
                ys += [v for v in temps if v is not None]
            if state["show_hum"]:
                ys += [v for v in hums if v is not None]
            if ys:
                pad = 1
                ax.set_ylim(min(ys) - pad, max(ys) + pad)

            # Show latest reading
            latest_t = times[-1]
            latest_temp = round(temps[-1],2)
            latest_hum = round(hums[-1],2)
            info.set_text(
                f"Window: {state['hours']:.2f} h\n"
                f"Latest:\n"
                f"  {latest_t.strftime('%Y-%m-%d %H:%M:%S')}Z\n"
                f"  Temp: {latest_temp}\n"
                f"  Hum:  {latest_hum}"
            )
        else:
            # just in case nothing has loaded up.
            info.set_text(f"Window: {state['hours']:.2f} h\nNo data in range.")

        fig.canvas.draw_idle()

    # Everything below here is the ui/buttons/ect.


    # Slider
    slider_ax = fig.add_axes([0.10, 0.10, 0.62, 0.04])
    hour_slider = Slider(slider_ax, "Hours", 0.25, 168.0, valinit=state["hours"])

    def on_slider(val):
        state["hours"] = float(val)
        redraw()

    hour_slider.on_changed(on_slider)


    # check boxes to remove certain things
    cax = fig.add_axes([0.80, 0.55, 0.18, 0.15])
    checks = CheckButtons(cax, ["Temp", "Humidity"], [state["show_temp"], state["show_hum"]])

    def on_check(label):
        if label == "Temp":
            state["show_temp"] = not state["show_temp"]
        elif label == "Humidity":
            state["show_hum"] = not state["show_hum"]
        redraw()

    checks.on_clicked(on_check)

    # refresh vs autorefresh
    rax = fig.add_axes([0.80, 0.46, 0.18, 0.06])
    refresh_btn = Button(rax, "Refresh now!")
    refresh_btn.on_clicked(lambda _: redraw())

    aax = fig.add_axes([0.80, 0.38, 0.18, 0.06])
    auto_btn = Button(aax, "Auto: OFF")

    def toggle_auto(_):
        state["auto_refresh"] = not state["auto_refresh"]
        auto_btn.label.set_text("Auto: ON" if state["auto_refresh"] else "Auto: OFF")
        fig.canvas.draw_idle()

    auto_btn.on_clicked(toggle_auto)

    # timer for refresh
    timer = fig.canvas.new_timer(interval=5000)
    timer.add_callback(lambda: redraw() if state["auto_refresh"] else None)
    timer.start()


    # the intitial draw
    redraw()
    plt.show()

if __name__ == "__main__":
    main()

