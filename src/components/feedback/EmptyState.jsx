export default function EmptyState({ action, description, title }) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </section>
  );
}
