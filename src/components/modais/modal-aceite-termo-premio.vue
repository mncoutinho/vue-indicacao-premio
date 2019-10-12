<template>
<div>
    <q-btn @click="toggle()" flat dense icon="visibility" /> Visualizar o REGULAMENTO
      <q-modal v-model="opened" :content-css="{minWidth: '60vw', minHeight: '34vh', maxWidth:'60vw', maxHeight: '74vh' }">
        <div class="layout-padding">
            <div class="row justify-end">
                <q-btn dense  flat outline icon="clear" @click="toggle()"  color="dark" label="Fechar" />
            </div>
                <div class="row gutter-x-sm">
                  <div class="col-12">
                    <h4>VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos 2019 </h4>
                    <h5>Regulamento</h5>
                    <p>DO PRÊMIO</p>
                    <p>Art. 1o O Conselho Regional de Engenharia e Agronomia do Rio de Janeiro – Crea-RJ, com apoio de sua Comissão de Educação, e em parceria com as instituições de ensino cadastradas no Crea-RJ, torna pública a realização do VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos, mediante as regras estabelecidas neste regulamento.</p>
                    <p>Art. 2o O VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos foi instituído mediante a Portaria AD/PRES/RJ no 1.179/2010, de 29 de dezembro de 2010.</p>
                    <p>DO OBJETIVO</p>
                    <p>Art. 3o São objetivos do VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos valorizar, reconhecer e divulgar a produção acadêmica das áreas da Engenharia, da Agronomia, da Geologia, da Geografia, da Meteorologia, nos níveis médio e superior, mestrado e doutorado contribuindo para a criação tecnológica e inovadora de produtos, processos e serviços para a sociedade brasileira.</p>
                    <p>Art.4o São candidatos à premiação os projetos e/ou os trabalhos de conclusão de curso de nível médio e superior (TCC)/monografias, dissertações ou teses de mestrado e de doutorado aprovados nas instâncias competentes das instituições de ensino cadastradas ou em cadastramento no CREA-RJ, com conclusões referentes ao ano de 2018 e que, doravante neste documento, serão nominados por trabalho(s) e/ ou projeto(s).</p>
                    <p>Parágrafo único: Para fins de concorrer à avaliação, o trabalho e/ ou projeto será apresentado em formato de artigo, cuja especificação encontra-se adiante.</p>
                    <p>DO TEMA</p>
                    <p>Art. 5o O tema dos trabalhos indicados para o VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos deve ter relevância para as áreas relacionadas ao Sistema Confea/Crea.</p>
                    <p>DA ABRANGÊNCIA</p>
                    <p>Art. 6o A abrangência do VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos está circunscrita às instituições de ensino cadastradas e/ou em cadastramento no CREA-RJ em todo o estado do Rio de Janeiro.</p>
                    <p>Parágrafo único: Somente serão aceitos trabalhos dos cursos de nível médio das áreas de segurança do trabalho, agronomia e meteorologia, de acordo com o anexo da resolução 473/02, de 30/01/2019.</p>
                    <p>DO PÚBLICO ALVO</p>
                    <p>Art. 7o Poderão concorrer ao VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos os egressos de instituições de ensino públicas e privadas, de cursos reconhecidos pelo Ministério da Educação – MEC e cadastrados junto ao Crea-RJ.</p>
                    <p>Parágrafo único: Caso o curso não esteja com o cadastro concluído, serão aceitos também cursos com a solicitação de cadastramento em andamento junto ao Crea-RJ, através da apresentação do protocolo de requerimento.</p>
                    <p>DAS CATEGORIAS</p>
                    <p>Art. 8o O VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos será classificado nas seguintes categorias:
                      <ul>
                        <li>I – Nível médio;</li>
                        <li>II – Nível superior;</li>
                        <li>III – Mestrado;</li>
                        <li>IV – Doutorado.</li>
                      </ul>
                    </p>
                    <p>Parágrafo único: Os candidatos para concorrer ao VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos na categoria III e IV do artigo anterior deverão, no momento da indicação, possuir registro ou visto profissional junto ao Crea-RJ e/ou estarem com solicitação de cadastramento em andamento. Por ocasião do recebimento da premiação, os indicados nas categorias III e IV deverão estar com a anuidade do exercício em dia e/ou estipular o prazo para regularização da situação junto ao Conselho.</p>
                    <p>DAS INDICAÇÕES</p>
                    <p>Art. 9o A indicação para participação no VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos ficará a cargo da instituição de ensino, condicionada ao completo e correto preenchimento do formulário de indicação, em concordância com este regulamento instituído pelo Crea-RJ, mediante ao envio de declaração assinada e validada pela comissão avaliadora.</p>
                    <p>Parágrafo único: O Crea-RJ enviará ofício via e-mail às coordenações das instituições de ensino cadastradas e/ou em cadastramento no Conselho, contendo as informações sobre este regulamento e que o formulário eletrônico de INDICAÇÃO a ser preenchido para a participação no Prêmio se encontra disponível na URL www.crea-rj.org.br/premiocrea.</p>
                    <p>Art. 10. Somente poderá ser indicado trabalho e/ou projeto cumprindo os seguintes requisitos:</p>
                    <ul>
                      <li>I – cada autor poderá participar de apenas uma categoria de premiação;</li>
                      <li>II – os trabalhos e/ou projetos de autoria coletiva poderão ter, no máximo, 4 (quatro) autores;</li>
                      <li>III – cessão de direito de reprodução do trabalho e/ou projeto;</li>
                      <li>IV – aceite deste regulamento, em todas as suas condições, pelo(s) autor(es), coordenador(es), avaliador(es) e pela instituição de ensino do trabalho e/ou projeto indicado, concordando integralmente com as eventuais modificações que nele venham a ser inseridas, desde que não sejam atinentes às categorias de premiação e aos prêmios a serem outorgados, aceitando também as decisões que vierem a ser proferidas pelo Crea-RJ.</li>
                    </ul>
                    <p>Art. 11. Não poderá concorrer ao VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos prestador de serviço de empresa contratada pelo Crea-RJ, estagiário, empregado que esteja alocado em tarefa referente a esta premiação e conselheiro.</p>
                    <p>Art. 12. O autor do trabalho e/ou projeto se responsabilizará pela autenticidade da obra indicada e cederá ao Crea-RJ o direito de reproduzir ou permitir a reprodução por terceiro(s) a obra indicada, em todo ou em parte, em qualquer meio ou forma, e em qualquer território brasileiro ou no exterior, por tempo indeterminado.</p>
                    <ul>
                      <li>§ 1o O direito de reproduzir o trabalho e/ou projeto será exercido pelo Crea-RJ sempre que tenha por objetivo divulgar o VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos ou enfatizar a contribuição do autor para sua área de conhecimento.</li>
                      <li>§ 2o O autor do trabalho e/ou projeto aceitará expressamente, no ato da indicação, que em relação à cessão outorgada nenhuma remuneração lhe será devida por direito de autoria da obra ou outro, em nenhum tempo e sob qualquer pretexto.</li>
                    </ul>
                    <p>Art. 13. A indicação de trabalho e/ou projeto deverá ocorrer no período entre 1o julho a 6 de setembro de 2019.</p>
                    <p>Art. 14. A coordenação da instituição de ensino deverá comunicar ao(s) autor(es) acerca da indicação do trabalho e/ou projeto.</p>
                    <p>DA APRESENTAÇÃO DE TRABALHO E/OU PROJETOS</p>
                    <p>Art. 15. O trabalho e/ou projeto deverá ser apresentado à premiação por meio de artigo elaborado a partir de seus dados e fiel a ele, contendo:</p>
                    <ul>
                      <li>I – título, que deverá coincidir com o do trabalho e/ou projeto apresentado à premiação;</li>
                      <li>II – resumo, palavras chave, introdução, objetivos, justificativa, metodologia, resultados, considerações finais ou conclusões e referências e, exclusivamente para os casos de projetos, anexos;</li>
                      <li>III - texto escrito em língua portuguesa. No caso de trabalhos produzidos em outro idioma, o autor deverá enviar o arquivo traduzido para língua portuguesa; e</li>
                      <li>IV - as seguintes informações na primeira página do arquivo do trabalho: Nome da Instituição, Nome do trabalho, Curso, Nível, Nome dos autores, orientador, coorientador e avaliadores.</li>
                    </ul>
                    <p>Parágrafo único: Nos casos de projetos, os desenhos porventura elaborados podem ser apresentados em anexos.</p>
                    <p>Art. 16. O trabalho e/ou projeto deverá ser enviado em arquivo digital, no formato PDF, sem senha de proteção, no sistema de indicação de trabalhos disponibilizado na URL www.crea-rj.org.br/premiocrea.</p>
                    <p>Art. 17. Os trabalhos e/ou projetos deverão ter tamanho do papel folha A4 (210 mm x 297 mm), com recuo na primeira linha de 1,25 cm, justificado. Usar margens esquerda e superior de 3 cm; e margens direita e inferior de 2 cm. Fonte Times New Roman, tamanho 12 e espaçamento 1,5.</p>
                    <p>O número de páginas do artigo de apresentação indicado será, excetuando-se nos casos de projetos, </p>
                    <ul>
                      <li>I – Nível médio de 7 a 15 páginas.</li>
                      <li>II – Nível superior de 15 a 35 páginas; e</li>
                      <li>III – Mestrado e Doutorado de 15 a 40 páginas.</li>
                    </ul>
                    <p>Nos casos de projetos, o número de páginas pode ser superior ao indicado.</p>
                    <p>Parágrafo único: deverá ser enviado um arquivo com o resumo do trabalho com 1300 a 1600 caracteres para inclusão no e-book publicado pelo Crea-RJ.</p>
                    <p>DOS JULGADORES DOS TRABALHOS E/OU PROJETOS</p>
                    <p>Art. 18. Os trabalhos e/ou projetos deverão ser indicados pelas coordenações dos cursos que os inscreveram após serem selecionados por comissão de seleção da instituição de ensino, composta por, ao menos, três professores do curso, todos três com registro ou visto profissional junto ao Crea-RJ ou com solicitação em andamento e anuidade em dia.</p>
                    <p>Art. 19. A coordenação da instituição de ensino participante da premiação deverá comunicar ao(s) autor(es) acerca da seleção do trabalho e/ou projeto, por ocasião da indicação para participação no VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos.</p>
                    <p>DO PROCESSO DE AVALIAÇÃO E SELEÇÃO</p>
                    <p>Art. 20. Serão avaliados trabalhos e/ou projetos acadêmicos referentes ao ano de 2018.</p>
                    <p>Art. 21. Na avaliação e seleção dos trabalhos e/ou projetos serão considerados os seguintes critérios:</p>
                    <ul>
                      <li>I - ter suas proposições e produtos e/ou serviços em afinidade com a sustentabilidade tecnológica, social e ambiental;</li>
                      <li>II – ter pertinência e aplicabilidade para a Engenharia, Agronomia, Geologia, Geografia, Meteorologia e áreas afins;</li>
                      <li>III – originalidade e inovação em seu conteúdo e contribuição para o avanço da Engenharia, Agronomia, Geologia, Geografia e Meteorologia e áreas afins;</li>
                      <li>IV – ter aplicação prática para a solução de problemas concretos sobre o tema e resultados finais.</li>
                    </ul>
                    <p>Art. 22. Não compete ao Crea-RJ ou aos organizadores do VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos emitir juízo de valor acerca dos trabalhos e/ou projetos indicados, cabendo exclusivamente ao autor qualquer responsabilidade perante terceiros, decorrente de seu conteúdo.</p>
                    <p>Art. 23. Serão indicados para premiação trabalhos e/ou projetos por instituição de ensino, da seguinte forma:</p>
                    <ul>
                      <li>I – um por curso de nível médio por modalidade;</li>
                      <li>II – um por curso de nível superior por modalidade; e</li>
                      <li>III – até dez por instituição de ensino na categoria mestrado e doutorado.</li>
                    </ul>
                    <p>Art. 24. As coordenações das instituições de ensino participantes deverão comunicar ao Crea-RJ os trabalhos e/ou projetos selecionados no prazo estabelecido no art. 13, que trata da indicação.</p>
                    <p>DA PREMIAÇÃO</p>
                    <p>Art. 25. O VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos será conferido pelo Crea-RJ aos autores de trabalhos e/ou projetos indicados pelas coordenações das instituições de ensino participantes da premiação.</p>
                    <p>Art. 26. Os trabalhos e/ou projetos indicados serão publicados nos veículos que o Crea-RJ julgar pertinente.</p>
                    <p>Art. 27. Os trabalhos e/ou projetos indicados em cada uma das categorias serão divulgados por meio digital em anais da premiação, no Portal do Crea-RJ.</p>
                    <p>Parágrafo único: Os professores e coorientadores que não forem profissionais registrados ou com visto no Crea-RJ ou com solicitação em andamento concordam que em nenhum tempo e sob qualquer pretexto reclamar desta condição da indicação.</p>
                    <p>Art. 28. Os autores de trabalhos e/ou projetos que forem indicados receberão certificado de menção honrosa, a serem entregues em solenidade de premiação.</p>
                    <p>Art. 29. As instituições de ensino participantes receberão troféu e certificado de reconhecimento, a serem entregues em solenidade de premiação.</p>
                    <p>Art. 30. Os professores orientadores e coorientadores e trabalhos e/ou projetos que forem indicados, que sejam profissionais registrados ou com visto no Crea-RJ ou com solicitação em andamento no momento da indicação pela instituição de ensino, receberão certificado de menção honrosa, a serem entregues em solenidade de premiação.</p>
                    <p>Parágrafo único: Os professores e coorientadores que não forem profissionais registrados ou com visto no Crea-RJ ou com solicitação em andamento concordam que em nenhum tempo e sob qualquer pretexto reclamar desta condição da indicação.</p>
                    <p>Art. 31. Os professores avaliadores de trabalhos e/ou projetos que forem indicadosreceberão certificado de menção honrosa, a serem entregues em solenidade de premiação.</p>
                    <p>Art. 32. Os autores, professores orientadores, coorientadores, avaliadores e representantes de instituições de ensino, que não comparecerem à solenidade de premiação terão até 60 (sessenta) dias, a partir da data do evento, para retirarem seus certificados na sede do Crea-RJ.</p>
                    <p>ENTREGA DO PRÊMIO</p>
                    <p>Art. 33. A entrega do VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos ocorrerá em solenidade, a ser realizada até dezembro de 2019, na cidade do Rio de Janeiro.</p>
                    <p>INFORMAÇÕES COMPLEMENTARES</p>
                    <p>Art. 34. Ao final da indicação on-line haverá um campo para que seja marcada a concordância com os termos estabelecidos.</p>
                    <p>Art. 35. Os casos omissos ou não previstos neste regulamento serão definidos pela organização do VIII Prêmio Crea-RJ de Trabalhos Científicos e Tecnológicos e/ou pela Comissão de Educação do Crea-RJ.</p>
                  </div>
                </div>
              <br>
      </div>
    </q-modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      opened: false
    }
  },
  methods: {
    async toggle () {
      this.opened = !this.opened
    }
  }
}
</script>
