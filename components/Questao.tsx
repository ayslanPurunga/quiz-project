import styles from "../styles/Questao.module.css";
import QuestaoModel from "../model/questao";
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
    { valor: 'A', cor: '#f2c866'},
    { valor: 'B', cor: '#ffbbc2'},
    { valor: 'C', cor: '#ac111c'},
    { valor: 'D', cor: '#aa59bc'}
]

interface QuestaoProps {
  valor: QuestaoModel;
  tempoPraResposta?: number
  respostasFornecida: (indice: number) => void
  tempoEsgotado: () => void

}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarRespostas() {
    return questao.respostas.map((resposta, i) => {
      return (
        <Resposta 
            key={`${questao.id}-${i}`}
            valor={resposta} 
            indice={i} 
            letra={letras[i].valor} 
            corFundoLetra={letras[i].cor} 
            respostasFornecida={props.respostasFornecida}
            />
      );
    });
  }

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador key={questao.id} duracao={props.tempoPraResposta ?? 10} 
        tempoEsgotado={props.tempoEsgotado}/>
      {renderizarRespostas()}
    </div>
  );
}
