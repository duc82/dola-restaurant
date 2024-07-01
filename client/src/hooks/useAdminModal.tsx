import { ChangeEvent, useCallback, useRef, useState } from "react";

const initialActiveModal = {
  create: false,
  update: false,
};

const useAdminModal = () => {
  const [activeModal, setActiveModal] = useState(initialActiveModal);
  const [selectedRows, setSelectedRows] = useState<Map<string, boolean>>(
    new Map()
  );
  const selectAllRowsRef = useRef<HTMLInputElement | null>(null);

  const openCreateModal = () => {
    setActiveModal({
      create: true,
      update: false,
    });
  };

  const openUpdateModal = () => {
    setActiveModal({
      create: false,
      update: true,
    });
  };

  const closeModal = () => {
    setActiveModal(initialActiveModal);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>, ids: string[]) => {
    const isSelectAll = e.target.checked;
    if (isSelectAll) {
      const newSelectedRows = new Map<string, boolean>();

      ids.forEach((id) => {
        newSelectedRows.set(id, true);
      });

      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows(new Map());
    }
  };

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, maxLength: number) => {
      const isSelect = e.target.checked;

      const selectedAll = selectAllRowsRef.current;
      if (!selectedAll) return;

      const newSelectedRows = new Map(selectedRows);

      if (isSelect) {
        newSelectedRows.set(id, true);
        setSelectedRows(newSelectedRows);
        if (newSelectedRows.size === maxLength) {
          selectedAll.checked = true;
        }
      } else {
        newSelectedRows.delete(id);
        setSelectedRows(newSelectedRows);
        selectedAll.checked = false;
      }
    },
    [selectedRows]
  );

  const clearSelectedRows = () => {
    setSelectedRows(new Map());
    if (selectAllRowsRef.current) {
      selectAllRowsRef.current.checked = false;
    }
  };

  return {
    activeModal,
    selectedRows,
    openCreateModal,
    openUpdateModal,
    closeModal,
    selectAllRowsRef,
    handleSelectAll,
    handleSelect,
    clearSelectedRows,
  };
};

export default useAdminModal;
