"""Test calling Weather MCP Server using OpenAI SDK. Test server/main.py http mode"""

import os
import time
import subprocess
from openai import OpenAI
import asyncio
from fastmcp import Client

# Configure OpenAI client with DeepSeek API
openai_client = OpenAI(
    api_key="XXX",
)

# MCP server configuration
MCP_SERVER_URL = "http://localhost:8000"
mcp_client = Client(f"{MCP_SERVER_URL}/mcp")


async def get_tools_from_mcp():
    """Get tool definitions from MCP server"""
    try:
        async with mcp_client:
            tools = await mcp_client.list_tools()
            
            # Convert MCP tool definitions to OpenAI tool format
            openai_tools = []
            for tool in tools:
                # Access Tool object properties directly
                openai_tool = {
                    "type": "function",
                    "function": {
                        "name": tool.name,
                        "description": tool.description,
                        "parameters": tool.inputSchema
                    }
                }
                openai_tools.append(openai_tool)
            
            return openai_tools
    except Exception as e:
        print(f"Error getting tools: {str(e)}")
        return []


async def call_tool(name: str, arguments: dict):
    """Call MCP tool using fastmcp Client"""
    async with mcp_client:
        result = await mcp_client.call_tool(name, arguments)
        return result


async def test_openai_sdk_integration():
    """Test integrating with MCP server using OpenAI SDK"""
    print("=== Testing OpenAI SDK Integration with MCP Server ===")
    
    # Get tool definitions from MCP server
    tools = await get_tools_from_mcp()
    
    if not tools:
        print("No tools available from MCP server")
        return False
    
    # Example user query
    user_query = "What's the weather like in Beijing today?"
    
    print(f"User query: {user_query}")
    print("Available tools:")
    for tool in tools:
        print(f"- {tool['function']['name']}: {tool['function']['description']}\n")
    
    # Call OpenAI API with tools
    print("\nCalling OpenAI API with MCP tools...")
    try:
        response = openai_client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "user", "content": user_query}
            ],
            tools=tools
        )
        
        message = response.choices[0].message
        
        # Check if the model wants to call a tool
        if message.tool_calls:
            tool_call = message.tool_calls[0]
            print(f"\nModel wants to call tool: {tool_call.function.name}")
            print(f"Arguments: {tool_call.function.arguments}")
            
            # Parse arguments
            import json
            arguments = json.loads(tool_call.function.arguments)
            
            # Call the MCP server using fastmcp Client
            tool_response = await call_tool(tool_call.function.name, arguments)
            
            print(f"\nMCP server response:")
            print(tool_response)
            
            # Send the tool response back to the model
            print("\nSending tool response back to model...")
            final_response = openai_client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "user", "content": user_query},
                    message,
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(tool_response)
                    }
                ]
            )
            
            print(f"\nFinal model response:")
            print(final_response.choices[0].message.content)
            
            return True
        else:
            print(f"\nModel response (no tool call):")
            print(message.content)
            return True
            
    except Exception as e:
        print(f"Error calling OpenAI API: {str(e)}")
        return False


async def test_openai_sdk_forecast():
    """Test getting weather forecast using OpenAI SDK"""
    print("\n=== Testing Weather Forecast with OpenAI SDK ===")
    
    # Get tool definitions from MCP server
    tools = await get_tools_from_mcp()
    
    if not tools:
        print("No tools available from MCP server")
        return False
    
    # Example user query
    user_query = "What's the weather forecast for Shanghai in the next 5 days?"
    
    print(f"User query: {user_query}")
    
    # Call OpenAI API with tools
    print("\nCalling OpenAI API with MCP tools...")
    try:
        response = openai_client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "user", "content": user_query}
            ],
            tools=tools
        )
        
        message = response.choices[0].message
        
        # Check if the model wants to call a tool
        if message.tool_calls:
            tool_call = message.tool_calls[0]
            print(f"\nModel wants to call tool: {tool_call.function.name}")
            print(f"Arguments: {tool_call.function.arguments}")
            
            # Parse arguments
            import json
            arguments = json.loads(tool_call.function.arguments)
            
            # Call the MCP server using fastmcp Client
            tool_response = await call_tool(tool_call.function.name, arguments)
            
            print(f"\nMCP server response:")
            print(tool_response)
            
            # Send the tool response back to the model
            print("\nSending tool response back to model...")
            final_response = openai_client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "user", "content": user_query},
                    message,
                    {
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(tool_response)
                    }
                ]
            )
            
            print(f"\nFinal model response:")
            print(final_response.choices[0].message.content)
            
            return True
        else:
            print(f"\nModel response (no tool call):")
            print(message.content)
            return True
            
    except Exception as e:
        print(f"Error calling OpenAI API: {str(e)}")
        return False


async def run_all_tests():
    """Run all tests"""
    await test_openai_sdk_integration()
    await test_openai_sdk_forecast()


if __name__ == "__main__":
    # Start the MCP server in HTTP mode
    # print("Starting MCP server in HTTP mode...")
    # server_process = subprocess.Popen(
    #     ["python", "server/main.py", "--mode", "http", "--port", "8000"],
    #     stdout=subprocess.PIPE,
    #     stderr=subprocess.PIPE,
    #     text=True
    # )
    # 
    # # Give the server time to start
    # print("Waiting for server to start...")
    # time.sleep(3)
    
    try:
        # Run tests
        asyncio.run(run_all_tests())
        
    except Exception as e:
        print(f"Error in OpenAI SDK tests: {str(e)}")
    
    print("\nOpenAI SDK integration tests completed!")