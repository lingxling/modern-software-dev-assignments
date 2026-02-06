from backend.app.services.extract import extract_action_items, extract_tags, extract_content


def test_extract_action_items():
    text = """
    This is a note
    - TODO: write tests
    - Ship it!
    Not actionable
    """.strip()
    items = extract_action_items(text)
    assert "TODO: write tests" in items
    assert "Ship it!" in items


def test_extract_tags():
    text = """
    This is a note with #tag1 and #tag2
    - TODO: write tests #task
    - Ship it! #urgent
    """.strip()
    tags = extract_tags(text)
    assert "#tag1" in tags
    assert "#tag2" in tags
    assert "#task" in tags
    assert "#urgent" in tags


def test_extract_content():
    text = """
    This is a note with #tag1
    - TODO: write tests
    - Ship it! #urgent
    """.strip()
    content = extract_content(text)
    assert "TODO: write tests" in content["action_items"]
    assert "Ship it! #urgent" in content["action_items"]
    assert "#tag1" in content["tags"]
    assert "#urgent" in content["tags"]
