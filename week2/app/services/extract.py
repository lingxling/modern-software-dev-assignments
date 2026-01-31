from __future__ import annotations

import os
import re
from typing import List
import json
from typing import Any
from ollama import chat
from dotenv import load_dotenv

load_dotenv()

BULLET_PREFIX_PATTERN = re.compile(r"^\s*([-*•]|\d+\.)\s+")
KEYWORD_PREFIXES = (
    "todo:",
    "action:",
    "next:",
)


def _is_action_line(line: str) -> bool:
    stripped = line.strip().lower()
    if not stripped:
        return False
    if BULLET_PREFIX_PATTERN.match(stripped):
        return True
    if any(stripped.startswith(prefix) for prefix in KEYWORD_PREFIXES):
        return True
    if "[ ]" in stripped or "[todo]" in stripped:
        return True
    return False


def extract_action_items(text: str) -> List[str]:
    lines = text.splitlines()
    extracted: List[str] = []
    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue
        if _is_action_line(line):
            cleaned = BULLET_PREFIX_PATTERN.sub("", line)
            cleaned = cleaned.strip()
            # Trim common checkbox markers
            cleaned = cleaned.removeprefix("[ ]").strip()
            cleaned = cleaned.removeprefix("[todo]").strip()
            extracted.append(cleaned)
    # Fallback: if nothing matched, heuristically split into sentences and pick imperative-like ones
    if not extracted:
        sentences = re.split(r"(?<=[.!?])\s+", text.strip())
        for sentence in sentences:
            s = sentence.strip()
            if not s:
                continue
            if _looks_imperative(s):
                extracted.append(s)
    # Deduplicate while preserving order
    seen: set[str] = set()
    unique: List[str] = []
    for item in extracted:
        lowered = item.lower()
        if lowered in seen:
            continue
        seen.add(lowered)
        unique.append(item)
    return unique


def _looks_imperative(sentence: str) -> bool:
    words = re.findall(r"[A-Za-z']+", sentence)
    if not words:
        return False
    first = words[0]
    # Crude heuristic: treat these as imperative starters
    imperative_starters = {
        "add",
        "create",
        "implement",
        "fix",
        "update",
        "write",
        "check",
        "verify",
        "refactor",
        "document",
        "design",
        "investigate",
    }
    return first.lower() in imperative_starters


def extract_action_items_llm(text: str) -> List[str]:
    """
    Extract action items from text using an LLM via Ollama.
    
    Args:
        text: Input text to extract action items from
    
    Returns:
        List of extracted action items as strings
    """
    print(f"\n=== LLM Extraction Started ===")
    print(f"Input text: {text}")
    
    if not text.strip():
        print("Empty input, returning empty list")
        return []
    
    # System prompt to define the output format
    system_prompt = """You are an action item extractor. Your task is to identify and extract action items from the given text.

Action items are tasks, assignments, or things that need to be done. They can be:
- Explicitly marked with bullets (-, *, •), numbers (1., 2.), or checkboxes ([ ])
- Prefixed with keywords like "todo:", "action:", "next:"
- Imperative sentences describing tasks (e.g., "Review the code", "Update the documentation")

You must respond ONLY with valid JSON in the following format:
{
  "action_items": [
    "action item 1",
    "action item 2",
    ...
  ]
}

Do not include any explanations, notes, or additional text outside the JSON structure."""
    
    # User prompt with the actual text to process
    user_prompt = f"""Extract all action items from the following text:

{text}

Return the extracted action items as a JSON array."""
    
    print(f"System prompt: {system_prompt[:100]}...")  # Truncate for readability
    print(f"User prompt: {user_prompt}")
    
    try:
        # Call Ollama with structured output
        print("Calling Ollama chat API...")
        response = chat(
            model="llama3.1:8b",  # Using llama3 as a starting point
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            format="json"
        )
        
        print(f"Ollama response: {response}")
        
        # Parse the response
        content = ""
        
        # Handle different response structures
        if hasattr(response, "message"):
            # Case 1: response is an object with message attribute
            print(f"Response has message attribute: {type(response.message)}")
            if hasattr(response.message, "content"):
                content = response.message.content
                print(f"Content from Message object: {content}")
            else:
                print("Message object has no content attribute")
        elif isinstance(response, dict) and "message" in response:
            # Case 2: response is a dict with message key
            message = response["message"]
            print(f"Message is dict: {isinstance(message, dict)}")
            if isinstance(message, dict):
                content = message.get("content", "")
                print(f"Content from dict: {content}")
            elif hasattr(message, "content"):
                content = message.content
                print(f"Content from Message-like object: {content}")
            else:
                print("Unknown message type")
        else:
            print(f"Unexpected response structure: {type(response)}")
            print(f"Response: {response}")
        
        if content:
            try:
                parsed = json.loads(content)
                print(f"Parsed JSON: {parsed}")
                action_items = parsed.get("action_items", [])
                print(f"Extracted action items: {action_items}")
                # Ensure we return a list of strings
                if isinstance(action_items, list):
                    result = [str(item) for item in action_items]
                    print(f"Final result: {result}")
                    return result
                print("action_items is not a list, returning empty list")
                return []
            except json.JSONDecodeError as e:
                # Fallback if JSON parsing fails
                print(f"JSON decode error: {e}")
                return []
        print("No content found, returning empty list")
        return []
    except Exception as e:
        # Fallback to heuristic method if LLM fails
        print(f"Exception occurred: {e}")
        import traceback
        traceback.print_exc()
        fallback_result = extract_action_items(text)
        print(f"Fallback to heuristic method, result: {fallback_result}")
        return fallback_result
