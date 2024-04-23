import { ChangeEvent, useCallback, useRef, useState } from "react";

const initialActiveModal = {
  create: false,
  update: false,
  delete: false,
};

const useAdminModal = () => {
  const [activeModal, setActiveModal] = useState(initialActiveModal);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [id, setId] = useState("");
  const selectedRowsRef = useRef<HTMLInputElement | null>(null);

  const openCreateModal = () => {
    setActiveModal((prev) => ({
      ...prev,
      create: true,
    }));
  };

  const openUpdateModal = (id: string) => {
    setId(id);
    setActiveModal((prev) => ({
      ...prev,
      update: true,
    }));
  };

  const closeModal = () => {
    setActiveModal(initialActiveModal);
  };

  const handleSelectAll = (
    e: ChangeEvent<HTMLInputElement>,
    selectedRows: string[]
  ) => {
    const isSelectAll = e.target.checked;
    setSelectedRows(isSelectAll ? selectedRows : []);
  };

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, maxLength: number) => {
      const isSelect = e.target.checked;

      const selectedAll = selectedRowsRef.current;
      if (!selectedAll) return;

      const newSelected = [...selectedRows];
      if (isSelect) {
        newSelected.push(id);
        setSelectedRows(newSelected);
        if (newSelected.length === maxLength) {
          selectedAll.checked = true;
        }
      } else {
        const index = newSelected.indexOf(id);
        if (index !== -1) {
          newSelected.splice(index, 1);
          setSelectedRows(newSelected);
        }
        selectedAll.checked = false;
      }
    },
    [selectedRows]
  );

  return {
    activeModal,
    id,
    selectedRows,
    openCreateModal,
    openUpdateModal,
    closeModal,
    selectedRowsRef,
    handleSelectAll,
    handleSelect,
  };
};

export default useAdminModal;
