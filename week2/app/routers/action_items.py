from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, HTTPException

from .. import db
from ..schemas import (
    ActionItemExtractRequest,
    ActionItemExtractResponse,
    ActionItemMarkDoneRequest,
    ActionItemMarkDoneResponse,
    ActionItemFullResponse,
    ActionItemResponse
)
from ..services.extract import extract_action_items, extract_action_items_llm


router = APIRouter(prefix="/action-items", tags=["action-items"])


@router.post("/extract", response_model=ActionItemExtractResponse)
def extract(payload: ActionItemExtractRequest) -> ActionItemExtractResponse:
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")

    note_id: Optional[int] = None
    if payload.save_note:
        note_id = db.insert_note(text)

    items = extract_action_items(text)
    ids = db.insert_action_items(items, note_id=note_id)
    action_items = [ActionItemResponse(id=i, text=t) for i, t in zip(ids, items)]
    return ActionItemExtractResponse(note_id=note_id, items=action_items)


@router.post("/extract-llm", response_model=ActionItemExtractResponse)
def extract_llm(payload: ActionItemExtractRequest) -> ActionItemExtractResponse:
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")

    note_id: Optional[int] = None
    if payload.save_note:
        note_id = db.insert_note(text)

    items = extract_action_items_llm(text)
    ids = db.insert_action_items(items, note_id=note_id)
    action_items = [ActionItemResponse(id=i, text=t) for i, t in zip(ids, items)]
    return ActionItemExtractResponse(note_id=note_id, items=action_items)


@router.get("", response_model=List[ActionItemFullResponse])
def list_all(note_id: Optional[int] = None) -> List[ActionItemFullResponse]:
    rows = db.list_action_items(note_id=note_id)
    return [
        ActionItemFullResponse(
            id=r["id"],
            note_id=r["note_id"],
            text=r["text"],
            done=bool(r["done"]),
            created_at=r["created_at"],
        )
        for r in rows
    ]


@router.post("/{action_item_id}/done", response_model=ActionItemMarkDoneResponse)
def mark_done(action_item_id: int, payload: ActionItemMarkDoneRequest) -> ActionItemMarkDoneResponse:
    db.mark_action_item_done(action_item_id, payload.done)
    return ActionItemMarkDoneResponse(id=action_item_id, done=payload.done)


