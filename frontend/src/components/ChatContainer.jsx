import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";

export default function ChatContainer() {
    const { selectedUser, getMessagesByUserId, messages } = useChatStore();
    const { authUser } = useAuthStore()

    useEffect(() => {
        getMessagesByUserId(selectedUser._id)

    }, [selectedUser, getMessagesByUserId])

    return (
        <>
        <ChatHeader />
        </>


    )
}