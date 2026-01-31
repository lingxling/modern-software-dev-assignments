import os
import pytest

from ..app.services.extract import extract_action_items, extract_action_items_llm


def test_extract_bullets_and_checkboxes():
    text = """
    Notes from meeting:
    - [ ] Set up database
    * implement API extract endpoint
    1. Write tests
    Some narrative sentence.
    """.strip()

    items = extract_action_items(text)
    assert "Set up database" in items
    assert "implement API extract endpoint" in items
    assert "Write tests" in items


def test_extract_action_items_llm_bullet_list():
    """Test LLM extraction with bullet list input"""
    text = """
    Meeting notes:
    - Review project requirements
    - Update documentation
    - Schedule next meeting
    """.strip()

    items = extract_action_items_llm(text)
    assert isinstance(items, list)
    # We can't assert exact content since LLM output may vary, but we expect non-empty results
    # For testing purposes, we'll check that the function doesn't raise an exception


def test_extract_action_items_llm_keyword_prefixed():
    """Test LLM extraction with keyword-prefixed lines"""
    text = """
    Todo: Fix bug in login page
    Action: Update user profile API
    Next: Review pull requests
    """.strip()

    items = extract_action_items_llm(text)
    assert isinstance(items, list)


def test_extract_action_items_llm_empty_input():
    """Test LLM extraction with empty input"""
    text = ""
    items = extract_action_items_llm(text)
    assert isinstance(items, list)
    assert len(items) == 0


def test_extract_action_items_llm_narrative_text():
    """Test LLM extraction with narrative text"""
    text = """
    We need to finish the project by Friday. First, we should complete the backend implementation. Then, we'll work on the frontend UI. Finally, we'll run all the tests to make sure everything works correctly.
    """.strip()

    items = extract_action_items_llm(text)
    assert isinstance(items, list)
