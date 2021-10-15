import os
# Use the package we installed
from slack_bolt import App
import requests
import json
import re
from emoji import emojize
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import time

# Initializes your app with your bot token and signing secret
flights = {

}
app = App(
    token=os.environ.get("SLACK_BOT_TOKEN"),
    signing_secret=os.environ.get("SLACK_SIGNING_SECRET")
)

@app.message("knock knock")
def ask_who(message, say):
    say("_Who's there?_")

@app.message("Whats up")
def ask_who(message, say):
    say("Nothing much dawg")

@app.message("Hello")
def say_hello(message, say):
	user = message['user']
	print(user)
	say(f"Hello King <@{user}> the third")

@app.message(re.compile("What is the weather "))
def get_weather(say, message):
	message = message['text']
	message = str(message)
	place = message.split()
	print(place)
	place = place[-1]
	print('http://api.openweathermap.org/data/2.5/weather?q='+place+'&appid=d902c7dae869ac4697f56b3cdb038677')
	response = requests.get('http://api.openweathermap.org/data/2.5/weather?q='+place+'&appid=d902c7dae869ac4697f56b3cdb038677')
	response = response.json()
	weather = response['main']['temp']
	weather = (weather-273.15) * (9/5) + 32
	weather = round(weather, 2)
	nweather = weather
	weather = str(weather)
	if nweather < 60:
		say("The weather is " + weather + " degrees fahrenheit in " + place + emojize(':snowflake:'))
	else:
		say("The weather is " + weather + " degrees fahrenheit in " + place + emojize(':sun:'))

@app.message(re.compile("Flight from "))
def flight_price(say, message):
	user = message['user']
	message = message['text']
	message = str(message)
	message = message.split()
	origin = message[2]
	dest = message[4]
	url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/'+origin+'-sky/'+dest+'-sky/2021-01-10'

	querystring = {"inboundpartialdate":"2021-01-20"}

	headers = {
    	'x-rapidapi-key': "3d28ceffcfmshd419c1ab7ab8072p10b098jsn979e41b0f264",
    	'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    }
	print(url)
	response = requests.request("GET", url, headers=headers, params=querystring)
	response = response.json()
	print(response)
	airline = response['Carriers'][0]["Name"]
	
	direct = response['Quotes'][0]['Direct']

	if direct == True:
		direct = ""
	else:
		direct = "not "

	price = response['Quotes'][0]['MinPrice']
	nprice = price - price*0.2
	nprice = str(nprice)
	price = str(price)
	flights[user] = [origin, dest, "2021-01-10", "2021-01-20"]
	print(flights)
	say("The minumum price is " + price + " Dollars."+ " It is on " + airline +". It is " + direct + "direct" + "\n"
		+ "Would you like me to alert you when the price becomes " + nprice + " dollars ?")
	searchPrices(origin, dest, nprice)


@app.message(re.compile("Yes "))
def add_watch(say, message):
	if message['user'] in flights:
		message = Mail(
		from_email='Carrent@example.com',
		to_emails='NoReply@example.com',
		subject='Thank you for signing up for flight watch',
		html_content='I will let you know once your flight price drops to the specified amount')
		try:
			sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
			response = sg.send(message)
			print(response.status_code)
			print(response.body)
			print(response.headers)
			say("Ok, I will let you know")
		except Exception as e:
			print(e.message)
			say("Doesn't look like you haven't signed up for flight watch =(")
	else:
		say("Doesn't look like you haven't signed up for flight watch =(")
    




def searchPrices(origin, dest, nprice):
	for i in range(5):
		time.sleep(30)
		url = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/'+origin+'-sky/'+dest+'-sky/2021-01-10'

		querystring = {"inboundpartialdate":"2021-01-20"}

		headers = {
	    	'x-rapidapi-key': "3d28ceffcfmshd419c1ab7ab8072p10b098jsn979e41b0f264",
	    	'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	    }
		response = requests.request("GET", url, headers=headers, params=querystring)
		response = response.json()
		price = response['Quotes'][0]['MinPrice']
		airline = response['Carriers'][0]["Name"]
	
		direct = response['Quotes'][0]['Direct']

		if direct == True:
			direct = ""
		else:
			direct = "not "
		if(price <= float(nprice)):
			mail = Mail(
			from_email='Carrent@example.com',
			to_emails='NoReply@example.com',
			subject='The price is less than or equal to '+ nprice,
			html_content='That is pretty cool dawg from '+origin+' to '+dest+' .')
			try:
				sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
				response = sg.send(mail)
				print(response.status_code)
				print(response.body)
				print(response.headers)
			except Exception as e:
				print(e.mail)
		else:
			mail = Mail(
			from_email='Carrent@example.com',
			to_emails='NoReply@example.com',
			subject='The price is not less than or equal to '+ nprice,
			html_content='That is pretty cool dawg '+origin+' to '+dest+' .' + 'The current lowest price is '+str(price)+' on '+ airline +' it is '+ direct + 'direct')
			try:
				sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
				response = sg.send(mail)
				print(response.status_code)
				print(response.body)
				print(response.headers)
			except Exception as e:
				print(e.mail)


# Start your app
if __name__ == "__main__":
    app.start(port=int(os.environ.get("PORT", 3000)))


















