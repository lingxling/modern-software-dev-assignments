import re

def extract_action_items(text: str) -> list[str]:
    lines = [line.strip("- ") for line in text.splitlines() if line.strip()]
    return [line for line in lines if "!" in line or line.lower().startswith("todo:")]

def extract_tags(text: str) -> list[str]:
    """Extract #tags from text"""
    tags = re.findall(r'#([a-zA-Z0-9_]+)', text)
    return [f"#{tag}" for tag in tags]

def extract_content(text: str) -> dict:
    """Extract both action items and tags from text"""
    return {
        "action_items": extract_action_items(text),
        "tags": extract_tags(text)
    }
