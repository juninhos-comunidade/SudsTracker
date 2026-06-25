'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './suporte.module.css';
import { useTheme } from '@/app/context/ThemeContext';

const PERGUNTAS_FREQUENTES = [
  {
    pergunta: 'O que é a escala SUDS?',
    resposta: 'SUDS (Subjective Units of Distress Scale) é uma escala de 0 a 10 usada para medir seu nível de ansiedade ou desconforto emocional em um momento específico.',
  },
  {
    pergunta: 'Meus registros ficam salvos onde?',
    resposta: 'Atualmente seus registros são salvos localmente no seu navegador. Em breve, com a integração completa ao backend, eles serão salvos de forma segura na nuvem.',
  },
  {
    pergunta: 'Como mudo entre visão de Paciente e Profissional?',
    resposta: 'Vá em Configurações no menu lateral e use o seletor "Simular Visão do App" para alternar entre as duas visualizações.',
  },
  {
    pergunta: 'Esqueci minha senha, o que faço?',
    resposta: 'Na tela de login, clique em "Esqueceu a senha?" para iniciar o processo de recuperação.',
  },
  {
    pergunta: 'Como entro em contato com a equipe?',
    resposta: 'Você pode nos enviar um e-mail diretamente através do botão de contato abaixo, ou usar o formulário desta página.',
  },
];

export default function SuportePage() {
  const [perguntaAberta, setPerguntaAberta] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const toggleResposta = (index) => {
    setPerguntaAberta(perguntaAberta === index ? null : index);
  };

  const handleEnviarMensagem = (e) => {
    e.preventDefault();
    // Por enquanto só simula o envio (sem backend ainda)
    setEnviado(true);
    setNome('');
    setEmail('');
    setMensagem('');
  };
  const { modoEscuro } = useTheme();

  return (
    <div className={`${styles.suporteContainer} ${modoEscuro ? styles.dark : ''}`}>
      <div className={styles.suporteContent}>
        <Link href="/home" className={styles.voltarLink}>
          Voltar para tela inicial
        </Link>

        <h1 className={styles.titulo}>Central de Suporte</h1>
        <p className={styles.subtitulo}>
          Estamos aqui para ajudar. Confira as perguntas frequentes ou envie sua mensagem.
        </p>

        {/* PERGUNTAS FREQUENTES */}
        <section className={styles.secao}>
          <h2 className={styles.secaoTitulo}>Perguntas Frequentes</h2>

          <div className={styles.faqLista}>
            {PERGUNTAS_FREQUENTES.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqPergunta}
                  onClick={() => toggleResposta(index)}
                >
                  {item.pergunta}
                  <span className={styles.faqIcone}>
                    {perguntaAberta === index ? '−' : '+'}
                  </span>
                </button>
                {perguntaAberta === index && (
                  <p className={styles.faqResposta}>{item.resposta}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FORMULÁRIO DE CONTATO */}
        <section className={styles.secao}>
          <h2 className={styles.secaoTitulo}>Não encontrou o que precisava?</h2>

          {enviado ? (
            <div className={styles.mensagemSucesso}>
              ✅ Mensagem enviada! Nossa equipe responderá em breve.
            </div>
          ) : (
            <form onSubmit={handleEnviarMensagem} className={styles.formulario}>
              <div className={styles.campo}>
                <label>Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className={styles.campo}>
                <label>E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className={styles.campo}>
                <label>Mensagem</label>
                <textarea
                  rows={5}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Descreva sua dúvida ou problema..."
                  required
                />
              </div>

              <button type="submit" className={styles.btnEnviar}>
                Enviar Mensagem
              </button>
            </form>
          )}

          <p className={styles.contatoDireto}>
            Ou envie um e-mail direto para{' '}
            <a href="mailto:suporte@suds.com">suporte@suds.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}