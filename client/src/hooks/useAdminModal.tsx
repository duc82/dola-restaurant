import { ChangeEvent, useCallback, useRef, useState } from "react";

const initialActiveModal = {
  create: false,
  update: false,
  delete: false
};

const useAdminModal = () => {
  const [activeModal, setActiveModal] = useState(initialActiveModal);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [id, setId] = useState("");
  const [isDeleteMany, setIsDeleteMany] = useState(false);
  const selectedRowsRef = useRef<HTMLInputElement | null>(null);

  const openCreateModal = () => {
    setActiveModal((prev) => ({
      ...prev,
      create: true
    }));
  };

  const openUpdateModal = (id: string) => {
    setId(id);
    setActiveModal((prev) => ({
      ...prev,
      update: true
    }));
  };

  const openDeleteModal = (data: string | string[]) => {
    if (typeof data === "string") {
      setId(data);
      setIsDeleteMany(false);
    } else {
      setSelectedRows(data);
      setIsDeleteMany(true);
    }

    setActiveModal((prev) => ({
      ...prev,
      delete: true
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
    if (isSelectAll) {
      setSelectedRows(selectedRows);
    } else {
      setSelectedRows([]);
    }
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

  const clearDeleteMany = () => {
    setSelectedRows([]);
    selectedRowsRef.current!.checked = false;
    setIsDeleteMany(false);
  };

  return {
    activeModal,
    id,
    selectedRows,
    isDeleteMany,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    closeModal,
    selectedRowsRef,
    handleSelectAll,
    handleSelect,
    clearDeleteMany
  };
};

export default useAdminModal;
