export default function PaymentMethodCard({ checked, method, onChange }) {
  return (
    <label className="payment-method-card">
      <input
        checked={checked}
        name="payment-method"
        onChange={() => onChange(method.id)}
        type="radio"
      />
      <span>
        <strong>{method.name}</strong>
        <p>{method.description}</p>
      </span>
    </label>
  );
}
