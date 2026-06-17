type ConfirmaDeleteProps = {
  open?: boolean;
  isOpen?: boolean;
  show?: boolean;
  visible?: boolean;
  title?: string;
  message?: string;
  nome?: string;
  itemName?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  handleClose?: () => void;
  handleConfirm?: () => void;
};

export function ConfirmaDelete({
  open,
  isOpen,
  show,
  visible,
  title = "Confirmar exclusão",
  message,
  nome,
  itemName,
  onClose,
  onCancel,
  onConfirm,
  handleClose,
  handleConfirm,
}: ConfirmaDeleteProps) {
  const shouldShow = open ?? isOpen ?? show ?? visible ?? true;

  if (!shouldShow) {
    return null;
  }

  const close = onClose || onCancel || handleClose;
  const confirm = onConfirm || handleConfirm;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 16,
      }}
    >
      <div
        style={{
          background: "#111827",
          color: "#fff",
          width: "100%",
          maxWidth: 420,
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <h2 style={{ margin: "0 0 12px", fontSize: 22 }}>{title}</h2>

        <p style={{ margin: "0 0 24px", color: "#d1d5db", lineHeight: 1.5 }}>
          {message ||
            `Tem certeza que deseja excluir ${
              nome || itemName || "este item"
            }? Essa ação não poderá ser desfeita.`}
        </p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button
            type="button"
            onClick={close}
            style={{
              border: "1px solid #4b5563",
              background: "transparent",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={confirm}
            style={{
              border: "none",
              background: "#dc2626",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmaDelete;
export const DeleteConfirmModal = ConfirmaDelete;
