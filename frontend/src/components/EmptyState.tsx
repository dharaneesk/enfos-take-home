interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="state-panel state-panel--empty">
      <div className="state-panel__icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect
            x="3"
            y="5"
            width="14"
            height="11"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M3 9H17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <p className="state-panel__title">{title}</p>
      <p className="state-panel__message">{message}</p>
    </div>
  );
}
