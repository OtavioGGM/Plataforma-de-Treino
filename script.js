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