import "./SidebarFooter.css";

export type SidebarFooterButton = {
    label: string;
    variant: "primary" | "secondary";
    onClick?: () => void;
};

export type SidebarFooterProps = {
    message?: string;
    buttons: SidebarFooterButton[];
};

export default function SidebarFooter({ message, buttons }: SidebarFooterProps) {
    return (
        <>
            {message && <span className="sidebar-footer-message">{message}</span>}
            {buttons.map((btn) => (
                <button
                    key={btn.label}
                    type="button"
                    className={`sidebar-footer-btn ${btn.variant}`}
                    onClick={btn.onClick}
                >
                    {btn.label}
                </button>
            ))}
        </>
    );
}
