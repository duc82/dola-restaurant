interface CreateModalProps {
  show: boolean;
  onClose: () => void;
}

interface UpdateModalProps {
  show: boolean;
  onClose: () => void;
  id: string;
}

export type { CreateModalProps, UpdateModalProps };
