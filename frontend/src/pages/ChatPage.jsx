import { useAuthStore } from "../store/useAuthStore"

export default function ChatPage() {
    const { logout } = useAuthStore();

    return (
            <button onClick={ logout} className="z-10">logout</button>
    )
}