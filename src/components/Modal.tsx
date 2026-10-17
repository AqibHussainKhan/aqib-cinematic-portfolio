import { useEffect, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Icon } from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
}
export default function Modal({
  open,
  onClose,
  labelledBy,
  className = "surface-dialog",
  children,
  onKeyDown,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={dialogRef}
      className={className}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      {children}
    </dialog>
  );
}

export function CloseButton({
  onClose,
  label = "Close dialog",
  floating = false,
}: {
  onClose: () => void;
  label?: string;
  floating?: boolean;
}) {
  return (
    <button
      type="button"
      className={`round-button${floating ? " floating-close" : ""}`}
      onClick={onClose}
      aria-label={label}
    >
      <Icon name="close" />
    </button>
  );
}
