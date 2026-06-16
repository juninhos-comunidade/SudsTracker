import styles from './MensagemErro.module.css';

// tipo: 'erro' | 'sucesso'
// modoEscuro: boolean
export default function MensagemErro({ mensagem, tipo = 'erro', modoEscuro = false }) {
  if (!mensagem) return null;

  // Escolhe a classe CSS com base no tipo e no modo
  const classe = tipo === 'sucesso'
    ? (modoEscuro ? styles.sucesso : styles.sucessoLight)
    : (modoEscuro ? styles.erro : styles.erroLight);

  const icone = tipo === 'sucesso' ? '✅' : '⚠️';

  return (
    <div className={`${styles.mensagem} ${classe}`}>
      {icone} {mensagem}
    </div>
  );
}