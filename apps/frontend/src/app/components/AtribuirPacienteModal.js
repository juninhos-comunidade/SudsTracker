'use client';
import { useState } from 'react';
import styles from './NovoRegistroModal.module.css'; 
import { buscarPacientePorUsuarioId, buscarUsuarioPorEmail, buscarProfissionalPorUsuarioId } from '../services/usuarioService'; // 💡 Importação corrigida com o nome real
import { vincularPacienteAoProfissional } from '../services/ProfissionalService';
import { useUser } from '@/app/context/UserContext';

export default function VincularPacienteModal({ onClose }) {
  const { user } = useUser();
  const [emailPaciente, setEmailPaciente] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleVincular = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!emailPaciente.trim()) {
      setErro('Por favor, digite o e-mail do paciente.');
      return;
    }

    setCarregando(true);

    try {

   const dadosProfissional = await buscarProfissionalPorUsuarioId(user.id);
      if (!dadosProfissional.ok || !dadosProfissional.data) {
        setErro('Erro ao identificar seu perfil profissional. Verifique a rota no backend.');
        setCarregando(false);
        return;
      }


      const resultadoUserPaciente = await buscarUsuarioPorEmail(emailPaciente.trim().toLowerCase());
      if (!resultadoUserPaciente.ok || !resultadoUserPaciente.data) {
        setErro('Paciente não encontrado com este e-mail.');
        setCarregando(false);
        return;
      }

      const perfilPaciente = await buscarPacientePorUsuarioId(resultadoUserPaciente.data.usuario.id);
      if (!perfilPaciente.ok || !perfilPaciente.data) {
        setErro('Este usuário existe, mas não possui perfil de paciente.');
        setCarregando(false);
        return;
      }

      const resultado = await vincularPacienteAoProfissional(perfilPaciente.data.id, dadosProfissional.data.id);

      if (resultado.ok) {
        setSucesso('Paciente vinculado com sucesso à sua clínica!');
        setTimeout(() => {
          onClose();
          window.location.reload(); 
        }, 1500);
      } else {
        setErro(resultado.error || 'Erro ao realizar vínculo no banco.');
      }
    } catch (err) {
      console.error(err);
      setErro('Erro de conexão com o servidor de banco de dados.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ maxWidth: '450px' }}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        
        <div className={styles.header}>
          <h2>Vincular Novo Paciente</h2>
          <p className={styles.subtitle}>Digite o e-mail cadastrado do paciente para trazê-lo ao seu painel</p>
        </div>

        <form onSubmit={handleVincular} style={{ marginTop: '20px' }}>
          {erro && <p style={{ color: '#a61c1c', background: '#fce8e6', padding: '10px', borderRadius: '8px', fontSize: '13px', margin: '0 0 16px 0' }}>⚠️ {erro}</p>}
          {sucesso && <p style={{ color: '#1ca64c', background: '#e6fceb', padding: '10px', borderRadius: '8px', fontSize: '13px', margin: '0 0 16px 0' }}>✓ {sucesso}</p>}

          <div className={styles.campo}>
            <label>E-mail do Paciente</label>
            <input
              type="email"
              placeholder="exemplo@paciente.com"
              value={emailPaciente}
              onChange={(e) => setEmailPaciente(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className={styles.footer} style={{ marginTop: '24px' }}>
            <button type="button" className={styles.btnSecondary} onClick={onClose} disabled={carregando}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={carregando}>
              {carregando ? 'Vinculando...' : 'Confirmar Vínculo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
