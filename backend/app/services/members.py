from fastapi import HTTPException

from app.data.store import store
from app.models.domain import Member


def list_members() -> list[Member]:
    return list(store.members.values())


def recharge_member(member_id: int, amount: float) -> Member:
    member = store.members.get(member_id)
    if not member:
        raise HTTPException(status_code=404, detail="会员不存在")
    new_balance = round(member.balance + amount, 2)
    updated = member.model_copy(update={"balance": new_balance})
    store.members[member_id] = updated
    return updated
