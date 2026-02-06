def test_create_and_list_notes(client):
    payload = {"title": "Test", "content": "Hello world"}
    r = client.post("/notes/", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["title"] == "Test"

    r = client.get("/notes/")
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 1

    r = client.get("/notes/search/")
    assert r.status_code == 200

    r = client.get("/notes/search/", params={"q": "Hello"})
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 1

def test_search_notes_case_insensitive(client):
    # Create test notes with mixed case
    payloads = [
        {"title": "Project Update", "content": "Important meeting tomorrow"},
        {"title": "Shopping List", "content": "Milk, eggs, bread"},
        {"title": "TODO List", "content": "Finish homework, call mom"}
    ]
    
    for payload in payloads:
        r = client.post("/notes/", json=payload)
        assert r.status_code == 201, r.text
    
    # Test case-insensitive search
    r = client.get("/notes/search/", params={"q": "project"})
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 1
    
    r = client.get("/notes/search/", params={"q": "SHOPPING"})
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 1
    
    r = client.get("/notes/search/", params={"q": "todo"})
    assert r.status_code == 200
    items = r.json()
    assert len(items) >= 1

def test_search_notes_no_results(client):
    # Test search with no results
    r = client.get("/notes/search/", params={"q": "nonexistentterm123"})
    assert r.status_code == 200
    items = r.json()
    assert len(items) == 0
