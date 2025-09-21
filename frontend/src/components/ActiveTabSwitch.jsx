import { useChatStore } from "../store/useChatStore"


export default function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore()

    return (
        <div className="tabs tabs-boxes bg-transparent p-2 m-2">
            <button onClick={() => setActiveTab("chats")}
                className={`tab ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
            >Chats</button>
            <button
                className={`tab ${activeTab === "constact" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
                onClick={() => setActiveTab("constact")}>Contacts</button>
        </div>
    )
}