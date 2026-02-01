# MCP Server for OpenWeatherMap API Design Document

## Project Status

**Implementation Status**: ✅ Core requirements completed

This design document guided the implementation of a Weather MCP Server. All core requirements have been successfully implemented:

- ✅ OpenWeatherMap API integration
- ✅ Two MCP tools: `get_current_weather` and `get_weather_forecast`
- ✅ Robust error handling for HTTP failures, timeouts, and empty results
- ✅ API rate limit awareness
- ✅ Clear setup instructions and documentation
- ✅ Dual deployment modes: STDIO (local) and HTTP (remote)
- ⏸️ Optional authentication for HTTP transport (not implemented)

## Current Context
- We need to build a Model Context Protocol (MCP) server that wraps an external API
- The server should be runnable locally via STDIO transport and integrate with MCP clients like Claude Desktop
- The goal is to understand core MCP capabilities and implement robust tool definitions

## Requirements

### Functional Requirements
1. Integrate with OpenWeatherMap API to provide weather information
2. Expose at least two MCP tools:
   - `get_current_weather`: Get current weather for a specified location
   - `get_weather_forecast`: Get 5-day weather forecast for a specified location
3. Implement proper error handling for API failures, timeouts, and empty results
4. Respect API rate limits and handle them gracefully
5. Provide clear setup instructions and example usage

### Non-Functional Requirements
1. Performance: Response time should be under 2 seconds for API calls
2. Reliability: Handle network errors and API rate limits gracefully
3. Security: Keep API keys secure through environment variables
4. Observability: Implement proper logging for debugging and monitoring

## Design Decisions

### 1. External API Selection
Will implement integration with OpenWeatherMap API because:
- It provides comprehensive weather data through a simple RESTful interface
- It has a free tier with reasonable rate limits for development purposes
- It offers both current weather and forecast endpoints, allowing us to implement multiple tools
- It requires minimal setup and has clear documentation

### 2. Deployment Mode
Will implement both deployment modes:
- **STDIO Server**: For local integration with Claude Desktop and AI IDEs
- **HTTP Server**: For remote access and integration with agents (extra credit)

### 3. Error Handling Strategy
Will implement a layered error handling approach:
- API client level: Handle HTTP errors, timeouts, and rate limits
- MCP tool level: Validate parameters and return user-friendly error messages
- Server level: Catch unexpected errors and return graceful error responses

## Technical Design

### 1. Core Components

**MCP Server**:
- Uses FastMCP library for MCP implementation
- Supports both STDIO and HTTP transport modes
- Provides two weather-related tools
- Handles command-line arguments for configuration

**OpenWeatherMap API Client**:
- HTTP client with timeout and error handling
- Integrates with current weather and forecast endpoints
- Parses and formats API responses
- Handles rate limit awareness

### 2. Data Models

**Current Weather Response**:
- location: str - Location name and country
- temperature: float - Current temperature
- description: str - Weather description
- humidity: int - Humidity percentage
- wind_speed: float - Wind speed
- icon: str - Weather icon code
- timestamp: str - Response timestamp

**Forecast Item**:
- date: str - Forecast date
- temperature: float - Forecast temperature
- description: str - Weather description
- humidity: int - Humidity percentage
- wind_speed: float - Wind speed
- icon: str - Weather icon code

**Forecast Response**:
- location: str - Location name and country
- forecast: list[ForecastItem] - List of 5 forecast items
- timestamp: str - Response timestamp

### 3. Integration Points
- **OpenWeatherMap API**: RESTful API endpoints for weather data
  - Current weather: `/weather` endpoint
  - Forecast: `/forecast` endpoint
- **MCP Client Integration**: STDIO transport for local clients, HTTP transport for remote clients
- **Environment Variables**: For API key configuration

### 4. Files Structure
- `week3/server/main.py`: Main MCP server implementation
- `week3/server/weather_client.py`: OpenWeatherMap API client
- `week3/README.md`: Setup instructions and documentation
- `week3/requirements.txt`: Project dependencies
- `week3/.env`: Environment variables file (not committed)
- `week3/test_openai_sdk.py`: Unit tests for MCP tools
- `week3/test_weather_client.py`: Unit tests for OpenWeatherMap API client
- `week3/design_doc_mcp.md`: Design document for MCP server

## Implementation Plan

1. **Initial Setup**:
   - Create project structure and files
   - Set up dependencies and environment variables
   - Implement basic OpenWeatherMap API client

2. **Tool Implementation**:
   - Implement `get_current_weather` MCP tool
   - Implement `get_weather_forecast` MCP tool
   - Add error handling and rate limit awareness

3. **Testing and Documentation**:
   - Test tools with sample inputs
   - Create comprehensive README.md
   - Document tool usage and example flows

## Testing Strategy

### Integration Tests
- Test end-to-end tool functionality with real API calls
- Test error handling for various scenarios
- Test client integration with Claude Desktop
- Test HTTP server functionality with cURL requests

## Error Handling

### Expected Errors
1. **API Key Errors**:
   - Missing API key in environment variables
   - Invalid API key

2. **Network Errors**:
   - Connection timeouts
   - DNS resolution failures
   - Network unreachable

3. **API Errors**:
   - Location not found (404)
   - Rate limit exceeded (429)
   - Server errors (5xx)

4. **Parameter Errors**:
   - Missing required parameters
   - Invalid parameter values

### Error Handling Approach
- **API Client Level**: Catch and translate HTTP errors to user-friendly messages
- **MCP Tool Level**: Validate parameters and return structured error responses
- **Server Level**: Catch unexpected errors and return graceful error messages

## Security Considerations
- API keys are stored in environment variables, not hard-coded
- No user data is stored or transmitted
- Rate limits are respected to avoid API abuse
- HTTP server does not implement authentication (optional feature not implemented)

## Dependencies

### Required Dependencies
- **fastmcp**: For MCP server implementation
- **requests**: For making API calls to OpenWeatherMap
- **python-dotenv**: For loading environment variables

## Implementation Summary

### What Was Implemented

The following components were successfully implemented according to this design document:

1. **Core MCP Server** ([main.py](week3/server/main.py)):
   - FastMCP-based server with STDIO and HTTP transport support
   - Command-line argument parsing for deployment mode selection
   - Environment variable loading for API key configuration
   - Graceful startup and shutdown handling

2. **OpenWeatherMap API Client** ([weather_client.py](week3/server/weather_client.py)):
   - HTTP client with timeout and error handling
   - Current weather endpoint integration
   - 5-day forecast endpoint integration
   - Rate limit awareness and handling
   - Response parsing and formatting

3. **MCP Tools**:
   - `get_current_weather`: Retrieves real-time weather data for any location
   - `get_weather_forecast`: Retrieves 5-day weather forecast for any location
   - Both tools support metric, imperial, and standard units
   - Parameter validation and error handling

4. **Error Handling**:
   - Network connection errors
   - HTTP timeout errors
   - API rate limit errors (401, 429 status codes)
   - Location not found errors
   - Invalid parameter errors

5. **Documentation**:
   - Comprehensive README.md with setup instructions
   - Example usage for both STDIO and HTTP modes
   - Tool reference with parameters and return values
   - Troubleshooting guide

### What Was Not Implemented

1. **Authentication for HTTP Transport** (Optional Bonus Feature):
   - API key validation at the MCP server level
   - OAuth2-style bearer tokens with audience validation
   - Secure token handling without passing tokens to upstream APIs

2. **Additional Weather Tools**:
   - Air quality index
   - UV index
   - Historical weather data
   - Weather alerts and warnings

### Future Work

1. **Implement Authentication**: Add MCP-level authentication for HTTP transport to earn the bonus points and improve security
2. **Add More Tools**: Implement additional weather-related tools to provide more comprehensive weather information
3. **Improve Logging**: Replace print statements with proper logging framework for better observability
4. **Add Caching**: Implement response caching to reduce API calls and improve performance
5. **Deploy Remotely**: Deploy the HTTP server to a cloud platform (e.g., Vercel, Cloudflare) for remote access

## References
- OpenWeatherMap API Documentation: https://openweathermap.org/api
- MCP Server Quickstart: https://modelcontextprotocol.io/quickstart/server
- FastMCP Documentation: https://github.com/fastmcp/fastmcp
