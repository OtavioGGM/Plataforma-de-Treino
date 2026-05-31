document.addEventListener("DOMContentLoaded", () => {
    
    //abas de treino
    const dayCards = document.querySelectorAll('.day-card');  
    const exerciseLists = document.querySelectorAll('.exercise-list');  

    dayCards.forEach(card => {  
        card.addEventListener('click', () => {  
            const jaEstaAtivo = card.classList.contains('active');  

            dayCards.forEach(c => c.classList.remove('active'));  
            exerciseLists.forEach(list => list.classList.remove('active'));  

            if (!jaEstaAtivo) {  
                card.classList.add('active');  
                const day = card.dataset.day;  
                document.getElementById(day).classList.add('active');  
            }  
        });  
    });
    //finalizar o treino
    const botoesFinalizar = document.querySelectorAll(".botao-finalizar-treino");

    botoesFinalizar.forEach(botao => {
        botao.addEventListener("click", (evento) => {
            // encontrar a lista de exercícios (.exercise-list) onde este botão específico está dentro
            const listaAtiva = evento.target.closest(".exercise-list");
            
            if (!listaAtiva) return;

            const checkboxes = listaAtiva.querySelectorAll(".exercise-check");
            const totalExercicios = checkboxes.length;
            const exerciciosFeitos = Array.from(checkboxes).filter(input => input.checked).length;

            if (exerciciosFeitos < totalExercicios) {
                const desejaFinalizarTruta = confirm("Você não selecionou todos os exercícios do seu treino. Tem certeza que deseja finalizá-lo?");
                if (!desejaFinalizarTruta) {
                    return; // cancelar se clicar em "Cancelar"
                }
            }
            //Confetes
            try {
                // Rajada Esquerda
                confetti({
                    particleCount: 300, //num numero de confetes (150 default)
                    spread: 80,
                    origin: { x: 0.1, y: 0.6 }
                });

                // Rajada Direita
                confetti({
                    particleCount: 300, 
                    spread: 80,
                    origin: { x: 0.9, y: 0.6 }
                });
            } catch (erro) {
                console.warn("Sem confetes dessa vez, mas seu treino foi salvo!", erro);
            }

            //tempo em 2500ms para dar tempo dos confetes caírem antes do alert() travar a tela
            setTimeout(() => {
                alert("Treino Concluído!");
                
                    //reseta os checkboxes do treino
                    checkboxes.forEach(input => {
                        input.checked = false;
                    });
            }, 2500); //tempo
        });
    });

    //temporizador
    const btnStart = document.getElementById('btn-start');
    const btnStop = document.getElementById('btn-stop');

    // Variável global ao escopo do cronômetro para poder resetá-lo se clicarem duas vezes
    let interval; 

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            const minutesInput = document.getElementById('minute');
            const secondsInput = document.getElementById('second');
            const display = document.getElementById('timer');

            // Converte valores para número garantindo que vazios virem zero
            const min = parseInt(minutesInput.value) || 0;
            const sec = parseInt(secondsInput.value) || 0;

            let duration = (min * 60) + sec;

            if (duration <= 0) {
                alert("Insira um tempo válido para o cronômetro!");
                return;
            }

            // Limpa o intervalo anterior se o usuário clicar em "Iniciar" novamente
            clearInterval(interval); 
            
            if (btnStop) btnStop.disabled = false; // Habilita o botão de parar
            startTimer(duration, display);
        });
    }

    //botão de cancelar
    if (btnStop) {
        btnStop.addEventListener('click', () => {
            //para o temporizador imediatamente
            clearInterval(interval); 

            //pega os inputs e o display para resetar o texto da tela
            const minutesInput = document.getElementById('minute');
            const secondsInput = document.getElementById('second');
            const display = document.getElementById('timer');

            //Formata os valores iniciais dos inputs com zero à esquerda
            const min = String(minutesInput.value || '0').padStart(2, '0');
            const sec = String(secondsInput.value || '0').padStart(2, '0');

            //devolve o tempo original digitado para o display
            display.innerHTML = `${min}:${sec}`;
        });
    }

    function startTimer(duration, display) {
        let timerLeft = duration;
        let minutes, seconds;

        interval = setInterval(() => {
            minutes = Math.floor(timerLeft / 60);
            seconds = Math.floor(timerLeft % 60);

            // Formatação com zero à esquerda (Ex: 05:09)
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            display.innerHTML = `${minutes}:${seconds}`;

            timerLeft -= 1;

            if (timerLeft < 0) {
                display.innerHTML = 'ACABOU!!!';
                clearInterval(interval);
            }
        }, 1000);
    }
});
