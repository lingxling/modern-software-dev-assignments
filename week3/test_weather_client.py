"""Test the server/weather_client.py"""

from server.weather_client import OpenWeatherMapClient
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENWEATHERMAP_API_KEY")
client = OpenWeatherMapClient(api_key)

print("Testing OpenWeatherMap Client")
print("=" * 50)

print("\n=== Test 1: Get Current Weather for Beijing ===")
result = client.get_current_weather("Beijing, CN", "metric")
print(result)

print("\n=== Test 2: Get Weather Forecast for Shanghai ===")
result = client.get_weather_forecast("Shanghai, CN", "metric")
print(result)

print("\n=== Test 3: Invalid Location ===")
result = client.get_current_weather("InvalidLocation123", "metric")
print(result)

print("\n=== Test 4: Missing Location ===")
result = client.get_current_weather("", "metric")
print(result)

print("\n" + "=" * 50)
print("Tests completed")
