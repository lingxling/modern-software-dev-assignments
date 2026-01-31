from __future__ import annotations

from typing import Optional
from pydantic import BaseModel


class NoteCreate(BaseModel):
    """Schema for creating a new note"""
    content: str


class NoteResponse(BaseModel):
    """Schema for note response"""
    id: int
    content: str
    created_at: str


class ActionItemExtractRequest(BaseModel):
    """Schema for action item extraction request"""
    text: str
    save_note: bool = False


class ActionItemResponse(BaseModel):
    """Schema for action item response"""
    id: int
    text: str


class ActionItemExtractResponse(BaseModel):
    """Schema for action item extraction response"""
    note_id: Optional[int]
    items: list[ActionItemResponse]


class ActionItemMarkDoneRequest(BaseModel):
    """Schema for marking action item done request"""
    done: bool = True


class ActionItemMarkDoneResponse(BaseModel):
    """Schema for marking action item done response"""
    id: int
    done: bool


class ActionItemFullResponse(BaseModel):
    """Schema for full action item response"""
    id: int
    note_id: Optional[int]
    text: str
    done: bool
    created_at: str
