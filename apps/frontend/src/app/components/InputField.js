import styles from './InputField.module.css';

export default function InputField({ label, id, type = 'text', placeholder, value, onChange, erro, modoEscuro = false }) {
  return (
    <div className={styles.grupoInput}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!erro}
      />
      
      {erro && (
        <span className={`${styles.erroInline} ${modoEscuro ? styles.erroInlineDark : styles.erroInlineLight}`}>
          ⚠️ {erro}
        </span>
      )}
    </div>
  );
}