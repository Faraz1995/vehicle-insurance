import { useEffect, useRef } from "react";

type ModalProps = {
  title?: string;
  children?: React.ReactNode;
  closeModal: () => void;
};

const Modal = ({ children, title, closeModal }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);

  return (
    <div
      className="
        fixed inset-0 bg-black/30 flex items-center justify-center z-50
      "
    >
      <div
        ref={modalRef}
        className="
          bg-white rounded-xl p-6 w-[300px] shadow-lg
        "
      >
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
