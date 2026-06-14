import { CreditCard, Wallet } from 'lucide-react'

export function BookingForm({ members, selectedSlot, contactName, memberId, onContactName, onMemberId, onSubmit }) {
  const member = members.find((item) => item.id === Number(memberId))
  const payableAmount = selectedSlot && member ? selectedSlot.price * member.discount_rate : 0
  const balanceDeducted = member ? Math.min(member.balance, payableAmount) : 0
  const offlinePayment = Math.max(payableAmount - balanceDeducted, 0)

  return (
    <section className="panel booking-panel">
      <div className="section-title">
        <CreditCard size={18} />
        <h2>在线预约与费用结算</h2>
      </div>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          预约人
          <input value={contactName} onChange={(event) => onContactName(event.target.value)} placeholder="输入姓名" />
        </label>
        <label>
          会员折扣
          <select value={memberId} onChange={(event) => onMemberId(event.target.value)}>
            {members.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.level} · {(item.discount_rate * 10).toFixed(1)}折
              </option>
            ))}
          </select>
        </label>
        {member && (
          <div className="balance-box">
            <Wallet size={16} />
            <span>账户余额</span>
            <strong>¥{member.balance.toFixed(2)}</strong>
          </div>
        )}
        <div className="settlement-box">
          <span>当前时段</span>
          <strong>{selectedSlot ? selectedSlot.label : '请选择可预约时段'}</strong>
          <span>应付金额</span>
          <strong>¥{payableAmount.toFixed(2)}</strong>
          {selectedSlot && member && (
            <>
              <span className="deduction-label">余额抵扣</span>
              <strong className="deduction-value">-¥{balanceDeducted.toFixed(2)}</strong>
              <span className="offline-label">线下收款</span>
              <strong className="offline-value">¥{offlinePayment.toFixed(2)}</strong>
            </>
          )}
        </div>
        <button className="primary-action" type="submit" disabled={!selectedSlot || !contactName.trim()}>
          提交预约
        </button>
      </form>
    </section>
  )
}
