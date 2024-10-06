import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  users: [],
  selectedUser: null,
  isEditUserModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  openAddUserModal: () => set({ isAddUserModalOpen: true }),
  closeAddUserModal: () => set({ isAddUserModalOpen: false }),
  openEditUserModal: () => set({ isEditUserModalOpen: true }),
  closeEditUserModal: () => set({ isEditUserModalOpen: false }),
});

export const useUserStore = create(devtools(store, "userStore"));
