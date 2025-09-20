import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (user) => set({ selectedUser: user }),

    getAllContact: async () => {
        set({ isUsersLoading: true });

        try {
            const res = await addEventListener.get("/messages/contacts");
            set({ allContacts: res.data })
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });

        try {
            const res = await addEventListener.get("/messages/chats");
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
}))
