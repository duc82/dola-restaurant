import { ChangeEvent, useCallback, useRef, useState } from "react";

const initialActiveModal = {
  create: false,
  update: false,
  delete: false,
};

const useAdminModal = () => {
  const [activeModal, setActiveModal] = useState(initialActiveModal);
  const [id, setId] = useState("");
  const [ids, setIds] = useState<string[]>([]);
  const [isDeleteMany, setIsDeleteMany] = useState(false);
  const selectedAllRef = useRef<HTMLInputElement | null>(null);

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

  const openDeleteModal = (data: string | string[]) => {
    if (typeof data === "string") {
      setId(data);
      setIsDeleteMany(false);
    } else {
      setIds(data);
      setIsDeleteMany(true);
    }

    setActiveModal((prev) => ({
      ...prev,
      delete: true,
    }));
  };

  const closeModal = () => {
    setActiveModal(initialActiveModal);
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>, ids: string[]) => {
    const isSelectAll = e.target.checked;
    if (isSelectAll) {
      setIds(ids);
    } else {
      setIds([]);
    }
  };

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string, maxLength: number) => {
      const isSelect = e.target.checked;

      const selectedAll = selectedAllRef.current;
      if (!selectedAll) return;

      const newSelected = [...ids];
      if (isSelect) {
        newSelected.push(id);
        setIds(newSelected);
        if (newSelected.length === maxLength) {
          selectedAll.checked = true;
        }
      } else {
        const index = newSelected.indexOf(id);
        if (index !== -1) {
          newSelected.splice(index, 1);
          setIds(newSelected);
        }
        selectedAll.checked = false;
      }
    },
    [ids]
  );

  const clearDeleteMany = () => {
    setIds([]);
    selectedAllRef.current!.checked = false;
    setIsDeleteMany(false);
  };

  return {
    activeModal,
    id,
    ids,
    isDeleteMany,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    closeModal,
    selectedAllRef,
    handleSelectAll,
    handleSelect,
    clearDeleteMany,
  };
};

export default useAdminModal;
