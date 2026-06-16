import styles from './InputField.module.css';

export default function InputField({ label, id, type = 'text', placeholder, value, onChange, erro, modoEscuro = false }) {
  return (
    <div className={styles.grupoInput}>
      <label
        htmlFor={id}
        className={modoEscuro ? styles.labelDark : styles.labelLight}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!erro}
        className={modoEscuro ? styles.inputDark : styles.inputLight}
      />
      {erro && (
        <span className={`${styles.erroInline} ${modoEscuro ? styles.erroInlineDark : styles.erroInlineLight}`}>
          ⚠️ {erro}
        </span>
      )}
    </div>
  );
}