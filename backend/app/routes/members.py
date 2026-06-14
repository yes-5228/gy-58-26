from fastapi import APIRouter

from app.models.domain import Member
from app.schemas import MemberRecharge
from app.services import members as member_service

router = APIRouter(tags=["members"])


@router.get("/members", response_model=list[Member])
def list_members() -> list[Member]:
    return member_service.list_members()


@router.post("/members/{member_id}/recharge", response_model=Member)
def recharge_member(member_id: int, payload: MemberRecharge) -> Member:
    return member_service.recharge_member(member_id, payload.amount)
