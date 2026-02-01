from pathlib import Path
from typing import Any, Dict
from fastmcp import FastMCP
import os
from dotenv import load_dotenv
from weather_client import OpenWeatherMapClient
import argparse

# Load environment variables
load_dotenv()

# Initialize MCP server
mcp = FastMCP(name="WeatherMCP")

# Get API key from environment variables
api_key = os.getenv("OPENWEATHERMAP_API_KEY")
if not api_key:
    print("Error: OPENWEATHERMAP_API_KEY not set in environment variables")
    exit(1)

# Initialize weather client
weather_client = OpenWeatherMapClient(api_key=api_key)


@mcp.tool()
def get_current_weather(location: str, units: str = "metric") -> Dict[str, Any]:
    """
    Gets the current weather for a specified location.
    
    :param location: The location to get weather for (e.g., "Beijing, CN").
    :param units: Temperature units (metric, imperial, standard). Defaults to "metric".
    :return: A dictionary with current weather information.
    """
    try:
        # Validate parameters
        if not location:
            return {"error": "Location is required"}
        
        if units not in ["metric", "imperial", "standard"]:
            return {"error": "Invalid units. Use metric, imperial, or standard."}
        
        # Call weather client
        result = weather_client.get_current_weather(location, units)
        
        return result
        
    except Exception as e:
        return {"error": f"Error: {str(e)}"}


@mcp.tool()
def get_weather_forecast(location: str, units: str = "metric") -> Dict[str, Any]:
    """
    Gets the 5-day weather forecast for a specified location.
    
    :param location: The location to get forecast for (e.g., "Shanghai, CN").
    :param units: Temperature units (metric, imperial, standard). Defaults to "metric".
    :return: A dictionary with weather forecast information.
    """
    try:
        # Validate parameters
        if not location:
            return {"error": "Location is required"}
        
        if units not in ["metric", "imperial", "standard"]:
            return {"error": "Invalid units. Use metric, imperial, or standard."}
        
        # Call weather client
        result = weather_client.get_weather_forecast(location, units)
        
        return result
        
    except Exception as e:
        return {"error": f"Error: {str(e)}"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Weather MCP Server")
    parser.add_argument("--mode", choices=["stdio", "http"], default="stdio", help="Server mode (default: stdio)")
    parser.add_argument("--host", default="127.0.0.1", help="HTTP server host (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000, help="HTTP server port (default: 8000)")
    
    args = parser.parse_args()
    
    if args.mode == "stdio":
        print("Starting Weather MCP Server in STDIO mode...")
        print("\nServer starting...")
        
        try:
            mcp.run()
        except KeyboardInterrupt:
            print("\nServer stopped by user")
        except Exception as e:
            print(f"Error starting server: {str(e)}")
    else:
        print(f"Starting Weather MCP Server in HTTP mode...")
        print(f"Server will be available at http://{args.host}:{args.port}")
        print("\nServer starting...")
        try:
            mcp.run(transport="http", host=args.host, port=args.port)
        except KeyboardInterrupt:
            print("\nServer stopped by user")
        except Exception as e:
            print(f"Error from server: {str(e)}")