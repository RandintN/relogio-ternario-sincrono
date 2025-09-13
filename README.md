# Synchronous Ternary Clock / Relógio Ternário Síncrono

This project visualizes time using a balanced ternary perspective with smooth sine-like waves, making the passage of time feel more organic and intuitive. It supports English and Portuguese with a language toggle button (top-left of the page).

Este projeto visualiza o tempo usando uma perspectiva ternária balanceada com ondas suaves do tipo senoidal, tornando a passagem do tempo mais orgânica e intuitiva. Ele oferece suporte a Português e Inglês com um botão de troca de idioma (no canto superior esquerdo da página).

---

## English

- 👉 [Live view](https://robsoncassiano.software/tools/balanced-ternary-clock)
- Language: use the EN/PT toggle button at the top-left.

### Understand the Concept
A day is not just a linear count from 0 to 24. It has a natural flow, a rhythm: time "grows" from midnight to its peak at noon, then "shrinks", returning to the starting point. It is like the tide rising and falling, or the act of inhaling and exhaling.

This clock visualizes that cycle using the balanced ternary system.

- Positive values (+): represent the time that has already passed since the start of the cycle (midnight, minute :00). It is the time’s "inhalation" phase, and the curve rises.
- Negative values (-): represent the time remaining until the cycle ends. It is the "exhalation" phase, and the curve falls.
- Zero (0): the transition point, the start and end of each cycle.

Practical example: 21:00 (9 pm) is interpreted as "3 hours left until midnight", represented as -3h. Likewise, 45 seconds is seen as "15 seconds left until the next minute", becoming -15s. Conversely, 10:00 am is simply +10h.

The name Synchronous (Sine + Chronometer) comes from sine curves, which capture this ebb and flow and make the experience of seeing time pass more intuitive and organic.

### Project structure
- index.html — markup and base structure
- css/style.css — styles
- js/main.js — clock logic, animation, and i18n

### Development
- No build step is required. Simply open index.html.
- The script is loaded with `defer` and fonts are optimized using resource hints.

### License
This project is licensed under the MIT License — see the LICENSE file for details.

---

## Português

- 👉 [Visualização](https://robsoncassiano.software/tools/balanced-ternary-clock)
- Idioma: use o botão PT/EN no canto superior esquerdo.

### Entenda o Conceito
Um dia não é apenas uma contagem linear de 0 a 24. Ele possui um fluxo natural, um ritmo: o tempo "cresce" da meia-noite até seu pico ao meio-dia, e então "diminui", retornando ao ponto inicial. É como a maré que sobe e desce, ou o ato de inspirar e expirar.

Este relógio visualiza esse ciclo usando o sistema ternário balanceado.

- Valores Positivos (+): representam o tempo que já passou desde o início do ciclo (meia-noite, minuto :00). É a fase de "inspiração" do tempo, e a curva sobe.
- Valores Negativos (-): representam o tempo que falta para o ciclo terminar. É a fase de "expiração", e a curva desce.
- Zero (0): é o ponto de transição, o início e o fim de cada ciclo.

Exemplo prático: 21:00 (9 da noite) é interpretado como "faltam 3 horas para a meia-noite", sendo representado como -3h. Da mesma forma, 45 segundos é visto como "faltam 15 segundos para o próximo minuto", tornando-se -15s. Em contrapartida, 10:00 da manhã é simplesmente +10h.

O nome Síncrono (Seno + Cronômetro) vem das curvas senoidais, que são a representação matemática perfeita desse fluxo e refluxo, tornando a experiência de ver o tempo passar mais intuitiva e orgânica.

### Estrutura do projeto
- index.html — marcação e estrutura base
- css/style.css — estilos
- js/main.js — lógica do relógio, animação e i18n

### Desenvolvimento
- Não há etapa de build. Basta abrir o index.html.
- O script é carregado com `defer` e as fontes são otimizadas com resource hints.

### Licença
Este projeto é licenciado sob a Licença MIT — veja o arquivo LICENSE para detalhes.
