import Input from "../../../components/common/Input.jsx";

export default function CustomerInfoForm({
  errors,
  form,
  onChange,
  onSubmit,
}) {
  return (
    <form className="form-stack" id="customer-info-form" onSubmit={onSubmit}>
      <Input
        autoComplete="name"
        error={errors.customerName}
        id="customerName"
        label="Nama pelanggan"
        onChange={(event) => onChange("customerName", event.target.value)}
        placeholder="Viqia"
        required
        value={form.customerName}
      />
      <Input
        error={errors.tableNumber}
        id="tableNumber"
        inputMode="numeric"
        label="Nomor meja"
        onChange={(event) => onChange("tableNumber", event.target.value)}
        pattern="[0-9]*"
        placeholder="Contoh: 12"
        required
        value={form.tableNumber}
      />
    </form>
  );
}
