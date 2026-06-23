'use client';
import { useState, useEffect } from 'react';
import { useUser, UserProvider } from '@/app/context/UserContext';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import SudsModal from '@/app/components/SudsModal';
import styles from './home.module.css';
import { MOCK_STATISTICS } from '@/app/utils/mockData';
import NovoRegistroModal from '@/app/components/NovoRegistroModal';
import { useTheme } from '@/app/context/ThemeContext';
import { buscarAnotacoesPorPaciente } from '../services/AnotacoesService';
import { buscarPacientePorUsuarioId } from '../services/usuarioService';
import { useRouter } from 'next/navigation'
import VincularPacienteModal from '@/app/components/AtribuirPacienteModal'; // 💡 Adicione junto com os outros imports


const formatarDataLocal = (stringData) => {
  if (!stringData) return 'Sem data';
  const dataObj = new Date(stringData);
  if (isNaN(dataObj.getTime())) return 'Data inválida';
  
  // 💡 O 'timeZone' força o JavaScript a calcular o dia correto com base no fuso do Brasil
  return dataObj.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

export default function HomePage() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  );
}

function HomeContent() {
  const router = useRouter()
  // Ajustado destructuring para pegar tipoUsuario e updateTipoUsuario
  const { user, tipoUsuario, updateTipoUsuario, logout, loading, showSudsModal, fecharOModal } = useUser();
  const [currentTab, setCurrentTab] = useState('home');
  const { modoEscuro, toggleModoEscuro } = useTheme();
  const [forcedModalOpen, setForcedModalOpen] = useState(false);
  const [showNovoRegistroModal, setShowNovoRegistroModal] = useState(false);
  const [todosRegistros, setTodosRegistros] = useState([]);
  const [confirmandoLimpeza, setConfirmandoLimpeza] = useState(false);
  const [showVincularModal, setShowVincularModal] = useState(false); // 💡 Controla a abertura do vínculo profissional


 useEffect(() => {
    if (!loading) {
      const tokenLocal = typeof window !== 'undefined' ? localStorage.getItem('suds_token') : null;
      const usuarioLocal = typeof window !== 'undefined' ? localStorage.getItem('suds_user') : null;

      if (!user && !tokenLocal && !usuarioLocal) {
        alert("Acesso negado. Por favor, faça login para acessar esta página.");
        router.push('/'); 
      }
    }
  }, [user, loading, router]);

  

  useEffect(() => {
    async function carregarDadosDoBanco() {
      const tipoReal = tipoUsuario || (typeof window !== 'undefined' ? localStorage.getItem('suds_tipo_usuario') : null);
      
      if (tipoReal === 'paciente' && user?.id) {
        const perfilPaciente = await buscarPacientePorUsuarioId(user.id);

        if (perfilPaciente.ok && perfilPaciente.data) {
          const idRealDoPaciente = perfilPaciente.data.id;
          const resultadoAnotacoes = await buscarAnotacoesPorPaciente(idRealDoPaciente);

          if (resultadoAnotacoes.ok && resultadoAnotacoes.data) {
            setTodosRegistros(resultadoAnotacoes.data);
          } else {
            console.error("Erro ao carregar diário:", resultadoAnotacoes.error);
          }
        } else {
          console.error("Erro ao vincular perfil do paciente:", perfilPaciente.error);
        }
      }
    }

    if (!loading && user) {
      carregarDadosDoBanco();
    }
  }, [tipoUsuario, loading, user]);

  // Lógica de variáveis utilitárias
  const ultimoRegistro = todosRegistros.length > 0 ? todosRegistros[0] : null;

  const handleLimparDados = () => {
    logout();
    window.location.reload();
  };

  const deveExibirOModal = (showSudsModal || forcedModalOpen) && tipoUsuario === 'paciente';

  const handleFecharModalGeral = () => {
    fecharOModal();            
    setForcedModalOpen(false); 
  };  
  return (
    <div className={styles.homeContainer}>
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Controlado centralizadamente e pelo estado manual */}
      {deveExibirOModal && (
        <SudsModal 
          onClose={handleFecharModalGeral} 
          onSaibaMais={() => {
            handleFecharModalGeral();
            setCurrentTab('sobre'); 
          }}
        />
      )}
      {showNovoRegistroModal && (
        <NovoRegistroModal onClose={() => setShowNovoRegistroModal(false)} />
      )}
      
    
      {showVincularModal && (
        <VincularPacienteModal onClose={() => setShowVincularModal(false)} />
      )}
      

      <Header />

      <main className={styles.mainContent} style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
        
        <div style={{ flex: 1 }}>
          {/* ABA: HOME */}
          {currentTab === 'home' && (
            <>
              <div className={styles.contentHeader}>
                <h1 className={styles.pageTitle}>
                  {tipoUsuario === 'paciente' ? 'Diário SUDS' : 'Painel de Controle Clínico'}
                </h1>
                <p className={styles.pageSubtitle}>
                  {tipoUsuario === 'paciente'
                    ? 'Registre suas emoções e acompanhe sua evolução'
                    : 'Monitore o nível de perturbação subjetiva de seus pacientes vinculados'}
                </p>
              </div>

              <div className={styles.dashboardTopRow}>
                {/* BANNER INFORMATIVO */}
                <section className={styles.bannerInformativo}>
                  <div className={styles.bannerConteudoTexto}>
                    <span className={styles.bannerEtiqueta}>Informativo</span>
                    <h2>{tipoUsuario === 'paciente' ? 'O que é a escala SUDS?' : 'Central de Monitoramento'}</h2>
                    <p>
                      {tipoUsuario === 'paciente'
                        ? 'A Unidade Subjetiva de Perturbação (SUDS) mede sua ansiedade ou desconforto de 0 a 100. Use o diário regularmente para identificar seus padrões emocionais.'
                        : 'Abaixo estão consolidados os dados coletados pelos diários de seus pacientes em tempo real. Utilize as métricas para pautar suas próximas sessões clínicas.'}
                    </p>
                    {tipoUsuario === 'paciente' && (
                      <button 
                        className={styles.bannerBotao} 
                        onClick={() => setForcedModalOpen(true)} // CORRIGIDO: Ativa o modal manualmente sem dar reload!
                      >
                        Saber mais sobre o método →
                      </button>
                    )}
                  </div>
                  <div className={styles.bannerIconeMental}>🧠</div>
                </section>

                {/* CARD DE RESUMO SEMANAL */}
                <div className={styles.companionCard}>
                  <span className={styles.companionTag}>Resumo Semanal</span>
                  <h3>{tipoUsuario === 'paciente' ? 'Sua Evolução' : 'Atividade da Clínica'}</h3>
                  <p>
                    {tipoUsuario === 'paciente'
                      ? 'Você manteve uma excelente constância de registros nos últimos dias. Continue mapeando!'
                      : 'Há novos registros críticos de nível SUDS acima de 70 que requerem atenção no seu painel.'}
                  </p>
                  <button 
                    className={styles.companionBtn}
                    onClick={() => setCurrentTab('estatisticas')}
                  >
                    {tipoUsuario === 'paciente' ? 'Ver estatísticas →' : 'Ver análises clínicas →'}
                  </button>
                </div>
              </div>

              {/* ÁREA DE AÇÃO PRINCIPAL */}
              <section className={styles.contentArea}>
                <div className={styles.placeholderCard}>
                  <div className={styles.placeholderIcon}>
                    {tipoUsuario === 'paciente' ? '📝' : '👥'}
                  </div>
                  <h2>{tipoUsuario === 'paciente' ? 'Pronto para começar?' : 'Gestão de Pacientes'}</h2>
                  <p>
                    {tipoUsuario === 'paciente'
                      ? 'Adicione um novo registro e mapeie como está seu nível de estresse ou calmaria agora.'
                      : 'Visualize e gerencie a listagem completa de indivíduos sob sua supervisão psicológica.'}
                  </p>
                  <div className={styles.actionButtons}>
                    {tipoUsuario === 'paciente' ? (
                      <button className={styles.btnPrimary} onClick={() => setShowNovoRegistroModal(true)}>
                        + Novo Registro SUDS
                      </button>
                    ) : (
                      <button className={styles.btnPrimary} onClick={() => setShowVincularModal(true)}>
                        + Vincular Novo Paciente
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* CARDS COMPLEMENTARES - GRID */}
              <section className={styles.cardsGrid}>
                <div className={styles.gridCard}>
                  <div className={styles.cardWidgetHeader}>
                    <h3>{tipoUsuario === 'paciente' ? 'Próximos Passos' : 'Agenda do Dia'}</h3>
                    <span className={styles.widgetBadge}>A fazer</span>
                  </div>
                  <p className={styles.widgetMainText}>
                    {tipoUsuario === 'paciente' ? 'Nenhum exercício pendente' : '3 Sessões Confirmadas'}
                  </p>
                  <span className={styles.widgetFooter}>
                    {tipoUsuario === 'paciente' ? 'Próxima consulta: Quinta-feira' : 'Próxima: Paciente de ID 001 às 14h'}
                  </span>
                </div>

                <div className={styles.gridCard}>
                  <div className={styles.cardWidgetHeader}>
                    <h3>{tipoUsuario === 'paciente' ? 'Último Registro' : 'Alertas Críticos'}</h3>
                    <span className={styles.widgetBadgeMuted}>Hoje</span>
                  </div>
                  <p className={styles.widgetMainText}>
                    {tipoUsuario === 'paciente'
                      ? (ultimoRegistro ? `SUDS: ${ultimoRegistro.intensidade}` : 'Nenhum registro ainda')
                      : 'Nenhum Alerta'}
                  </p>
                  <span className={styles.widgetFooterStatus}>
                    {tipoUsuario === 'paciente'
                      ? (ultimoRegistro ? `Registrado em ${formatarDataLocal(ultimoRegistro.createAt)}` : 'Adicione seu primeiro registro')
                      : 'Estabilidade geral na última semana'}
                  </span>
                </div>

                <div className={styles.gridCard}>
                  <div className={styles.cardWidgetHeader}>
                    <h3>Insights</h3>
                    <span className={styles.widgetBadgeLight}>Dica</span>
                  </div>
                  <p style={{ margin: 0 }} className={styles.widgetInsightText}>
                    {tipoUsuario === 'paciente'
                      ? '“Registrar o SUDS pela manhã ajuda a mapear gatilhos de ansiedade preventiva antes da rotina.”'
                      : '“Acompanhar a curva descendente do SUDS ajuda a comprovar a eficácia das abordagens cognitivo-comportamentais aplicadas.”'}
                  </p>
                </div>
              </section>

              {/* COLABORADORES DO PROJETO */}
              <section className={styles.collaboratorsSection}>
                <h2 className={styles.sectionTitle}>Colaboradores do Projeto</h2>
                <div className={styles.collaboratorsGrid}>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>👨‍⚕️</div><div className={styles.collaboratorInfo}><h4>João Guilherme</h4><p>back-end</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>💻</div><div className={styles.collaboratorInfo}><h4>Júlia Barbosa</h4><p>back-end/segurança</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>🎨</div><div className={styles.collaboratorInfo}><h4>Well</h4><p>back-end/API</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>👩‍⚕️</div><div className={styles.collaboratorInfo}><h4>Laryssa Ferreira</h4><p>UI-UX/Frontend</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>⚙️</div><div className={styles.collaboratorInfo}><h4>Yuri</h4><p>back-end</p></div></div>
                  <div className={styles.collaboratorCard}><div className={styles.collaboratorAvatar}>📋</div><div className={styles.collaboratorInfo}><h4>Levi Santos</h4><p>frontend</p></div></div>
                </div>
              </section>
            </>
          )}

          { /* ABA ESTATÍSTICAS */}
          {currentTab === 'estatisticas' && (
            <div className={styles.tabContent}>
              <h1 className={styles.pageTitle}>Estatísticas</h1>
              <p className={styles.pageSubtitle}>
                {tipoUsuario === 'paciente' ? 'Gráficos e evolução dos seus níveis de SUDS' : 'Visão geral consolidada da sua base de pacientes'}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>📊</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Média Geral' : 'Média da Clínica'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>{MOCK_STATISTICS.mediaGeral}</p>
                  </div>
                </div>

                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>🔥</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Dias Seguidos' : 'Atendimentos Mês'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                      {tipoUsuario === 'paciente' ? `${MOCK_STATISTICS.diasConsecutivos}d` : '28'}
                    </p>
                  </div>
                </div>

                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>🧠</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Mais Comum' : 'Gatilho Frequente'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '4px 0 0 0', textTransform: 'capitalize' }}>{MOCK_STATISTICS.emocaoMaisFrequente}</p>
                  </div>
                </div>

                <div className={styles.gridCard} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
                  <span style={{ fontSize: '24px' }}>📝</span>
                  <div>
                    <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                      {tipoUsuario === 'paciente' ? 'Total Registros' : 'Prontuários Ativos'}
                    </h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                      {tipoUsuario === 'paciente' ? MOCK_STATISTICS.registrosTotal : '12 pacientes'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.gridCard} style={{ textAlign: 'center', padding: '40px 20px', border: '2px dashed var(--border)', background: 'none' }}>
                <p style={{ fontWeight: '600', color: 'var(--text-secondary)', margin: '0 0 4px 0' }}>📈 Gráfico de Evolução de Sintomas</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
                  Espaço preparado para renderização acessível. Quando o back-end injetar as rotas de histórico, utilizaremos o Recharts para plotar uma linha lilás estática com balões de texto descritivos.
                </p>
              </div>

              {tipoUsuario === 'paciente' && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ marginBottom: '12px' }}>Histórico de Registros</h3>

              {todosRegistros.length === 0 ? (
                <div className={styles.gridCard} style={{ textAlign: 'center', padding: '24px' }}>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Nenhum registro ainda. Adicione seu primeiro registro na aba Home!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {todosRegistros.map((registro) => {
                    // 💡 Força o cálculo correto da data respeitando o fuso horário do Brasil
                    const dataObj = new Date(registro.createAt);
                    const dataFormatada = !isNaN(dataObj.getTime())
                      ? dataObj.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                      : 'Data inválida';

                    return (
                      <div key={registro.id || registro.createAt} className={styles.gridCard} style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                            SUDS: {registro.intensidade}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {dataFormatada}
                          </span>
                        </div>
                        {registro.anotacao && (
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 6px 0' }}>
                            {registro.anotacao}
                          </p>
                        )}
                        {registro.gatilhos && (
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                            <strong>Gatilhos:</strong> {registro.gatilhos}
                          </p>
                        )}
                      </div>
                    ); // 💡 Fechamento do return corrigido
                  })} {/* 💡 Fechamento do .map() corrigido */}
                </div>
              )}
            </div>
          )}
            </div>
          )}

          {/* ABA: SOBRE O SUDS */}
          {currentTab === 'sobre' && (
            <div className={styles.tabContent} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h1 className={styles.pageTitle}>Sobre o SUDS</h1>
                <p className={styles.pageSubtitle}>Entenda a aplicação prática da escala</p>
                
                <div className={styles.gridCard}>
                  <h3>Como avaliar seu nível:</h3>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px', lineHeight: 1.8 }}>
                    <li><strong>0:</strong> Totalmente relaxado, paz absoluta.</li>
                    <li><strong>25:</strong> Desconforto leve, pequenos pensamentos de preocupação.</li>
                    <li><strong>50:</strong> Ansiedade moderada, desconfortável mas ainda sob controle.</li>
                    <li><strong>75:</strong> Perturbação severa, muito difícil de concentrar.</li>
                    <li><strong>100:</strong> O pior nível de ansiedade, pânico ou estresse traumático possível.</li>
                  </ul>
                </div>
              </div>

              <section className={styles.bannerInformativo} style={{ maxWidth: '100%' }}>
                <div className={styles.bannerConteudoTexto}>
                  <span className={styles.bannerEtiqueta}>Informativo</span>
                  <h2>Por que mapear diariamente?</h2>
                  <p>
                    Ao criar constância nas respostas livres do seu diário pessoal e cruzar com as notas de 0 a 100, nosso sistema gera um mapa preventivo. Isso ajuda você e seu profissional de saúde a detectar picos de estresse antes mesmo que eles se tornem uma crise de ansiedade.
                  </p>
                </div>
                <div className={styles.bannerIconeMental}>💡</div>
              </section>
            </div>
          )}

          {/* CONFIGURAÇÕES */}
        {currentTab === 'settings' && (
          <div className={styles.tabContent}>
            <h1 className={styles.pageTitle}>Configurações do Sistema</h1>
            <p className={styles.pageSubtitle}>Gerencie suas preferências locais de desenvolvimento</p>

            <div className={styles.gridCard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: 'var(--text-secondary)' }}>Usuário de Sessão:</p>
                <code style={{ background: 'var(--btn-surface)', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>
                  {user?.nome || 'Visitante'} ({user?.email || 'usuario@suds.com'})
                </code>
              </div>

              <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: 'var(--text-secondary)' }}>Perfil de Acesso Atual:</p>
                {/* 💡 CORREGIDO: Remove o <select> e a função quebrada, exibindo apenas o texto puro do banco */}
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginTop: '4px' }}>
                  {tipoUsuario === 'profissional' ? '💼 Profissional / Psicólogo' : '👤 Paciente'}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: 'var(--text-secondary)' }}>Modo Escuro</p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Alterna o tema visual do aplicativo</p>
                </div>
                <button
                  onClick={toggleModoEscuro}
                  style={{
                    background: modoEscuro ? '#9883e5' : 'var(--btn-surface)',
                    color: modoEscuro ? 'white' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  {modoEscuro ? '🌙 Ativado' : '☀️ Desativado'}
                </button>
              </div>

              <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px' }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: '500', color: 'var(--text-secondary)' }}>
                  Notificações <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>(em breve)</span>
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'not-allowed', opacity: 0.6 }}>
                  <input type="checkbox" disabled />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Receber lembretes diários para registrar o SUDS</span>
                </label>
              </div>

              <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px' }}>
                {!confirmandoLimpeza ? (
                  <button
                    onClick={() => setConfirmandoLimpeza(true)}
                    style={{ background: 'var(--erro-bg)', color: 'var(--danger-text)', border: '1px solid var(--erro-borda)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                  >
                    Limpar Preferências do Navegador
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tem certeza? Essa ação não pode ser desfeita.</span>
                    <button
                      onClick={handleLimparDados}
                      style={{ background: 'var(--danger-text)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
                    >
                      Sim, limpar
                    </button>
                    <button
                      onClick={() => setConfirmandoLimpeza(false)}
                      style={{ background: 'var(--btn-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid #eae6f0', paddingTop: '16px' }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: '500', color: 'var(--text-secondary)' }}>
                  Deletar Conta <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>(em breve)</span>
                </p>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                  Excluir sua conta é uma ação permanente e removerá todos os seus dados.
                </p>
                <button
                  onClick={() => alert('Função de exclusão de conta em desenvolvimento. Em breve disponível!')}
                  className={styles.btnExcluirConta}
                >
                  Excluir Conta
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

        { /* RODAPÉ */}
        <footer className={styles.footer}>
          <p className={styles.footerTexto}>
            &copy; 2026 SUDS App. Todos os direitos reservados.
          </p>
          <p className={styles.footerAssinatura}>
            Desenvolvido com 💜 pela equipe SUDS Tracker
          </p>
        </footer>

      </main>
    </div>
  );
}