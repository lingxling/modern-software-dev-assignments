import requests
from typing import Dict, Any, List, Optional
from datetime import datetime

class OpenWeatherMapClient:
    """Client for interacting with OpenWeatherMap API"""
    
    def __init__(self, api_key: str):
        """
        Initialize the OpenWeatherMap client
        
        Args:
            api_key: OpenWeatherMap API key
        """
        self.api_key = api_key
        self.base_url = "https://api.openweathermap.org/data/2.5"
        self.session = requests.Session()
        # Set a reasonable timeout for API calls
        self.timeout = 10
    
    def get_current_weather(self, location: str, units: str = "metric") -> Dict[str, Any]:
        """
        Get current weather for a location
        
        Args:
            location: City name or coordinates
            units: Temperature units (metric, imperial, standard)
            
        Returns:
            Dictionary with weather information
        """
        try:
            params = {
                "q": location,
                "appid": self.api_key,
                "units": units,
                "lang": "zh_cn"  # Use Chinese for weather descriptions
            }
            
            response = self.session.get(
                f"{self.base_url}/weather",
                params=params,
                timeout=self.timeout
            )
            
            # Check for API errors
            response.raise_for_status()
            
            data = response.json()
            
            # Parse and format the response
            weather_data = {
                "location": f"{data.get('name')}, {data.get('sys', {}).get('country', '')}",
                "temperature": data.get('main', {}).get('temp'),
                "description": data.get('weather', [{}])[0].get('description'),
                "humidity": data.get('main', {}).get('humidity'),
                "wind_speed": data.get('wind', {}).get('speed'),
                "icon": data.get('weather', [{}])[0].get('icon'),
                "timestamp": datetime.now().isoformat()
            }
            
            return weather_data
            
        except requests.exceptions.HTTPError as e:
            if hasattr(e, 'response') and e.response is not None:
                if e.response.status_code == 404:
                    return {"error": "Location not found"}
                elif e.response.status_code == 429:
                    return {"error": "API rate limit exceeded"}
                else:
                    return {"error": f"HTTP error: {str(e)}"}
            else:
                return {"error": f"HTTP error: {str(e)}"}
        except requests.exceptions.ConnectionError:
            return {"error": "Connection error"}
        except requests.exceptions.Timeout:
            return {"error": "Request timeout"}
        except Exception as e:
            return {"error": f"Error: {str(e)}"}
    
    def get_weather_forecast(self, location: str, units: str = "metric") -> Dict[str, Any]:
        """
        Get 5-day weather forecast for a location
        
        Args:
            location: City name or coordinates
            units: Temperature units (metric, imperial, standard)
            
        Returns:
            Dictionary with forecast information
        """
        try:
            params = {
                "q": location,
                "appid": self.api_key,
                "units": units,
                "lang": "zh_cn"  # Use Chinese for weather descriptions
            }
            
            response = self.session.get(
                f"{self.base_url}/forecast",
                params=params,
                timeout=self.timeout
            )
            
            # Check for API errors
            response.raise_for_status()
            
            data = response.json()
            
            # Parse and format the forecast
            location_name = f"{data.get('city', {}).get('name')}, {data.get('city', {}).get('country', '')}"
            
            # Get daily forecast (every 8th item, as OpenWeatherMap provides 3-hourly data)
            forecast_items = []
            for i, item in enumerate(data.get('list', [])):
                if i % 8 == 0:  # Every 8th item (3-hour intervals, so 8 items per day)
                    forecast_item = {
                        "date": datetime.fromtimestamp(item.get('dt')).strftime('%Y-%m-%d'),
                        "temperature": item.get('main', {}).get('temp'),
                        "description": item.get('weather', [{}])[0].get('description'),
                        "humidity": item.get('main', {}).get('humidity'),
                        "wind_speed": item.get('wind', {}).get('speed'),
                        "icon": item.get('weather', [{}])[0].get('icon')
                    }
                    forecast_items.append(forecast_item)
            
            # Limit to 5 days
            forecast_items = forecast_items[:5]
            
            forecast_data = {
                "location": location_name,
                "forecast": forecast_items,
                "timestamp": datetime.now().isoformat()
            }
            
            return forecast_data
            
        except requests.exceptions.HTTPError as e:
            if hasattr(e, 'response') and e.response is not None:
                if e.response.status_code == 404:
                    return {"error": "Location not found"}
                elif e.response.status_code == 429:
                    return {"error": "API rate limit exceeded"}
                else:
                    return {"error": f"HTTP error: {str(e)}"}
            else:
                return {"error": f"HTTP error: {str(e)}"}
        except requests.exceptions.ConnectionError:
            return {"error": "Connection error"}
        except requests.exceptions.Timeout:
            return {"error": "Request timeout"}
        except Exception as e:
            return {"error": f"Error: {str(e)}"}