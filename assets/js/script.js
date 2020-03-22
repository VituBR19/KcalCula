const form = document.getElementById('form');

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

form.addEventListener('submit', handleSubimit);
modal.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

function handleSubimit(event) {
    event.preventDefault();

    modal.style.display = "flex";

    const age = getInputNumberValue('age');
    const weight = getInputNumberValue('weight');
    const height = getInputNumberValue('height');
    
    const gender = getSelectedValue('gender');
    const activityLevel = getSelectedValue('activity_level');

    const tmb = Math.round(
        gender === 'female'
        ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
        : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
    );

    const maintenance = Math.round(tmb * Number(activityLevel));
    const loseWeight = maintenance - 450;
    const gainWeight = maintenance + 450;

    const layout = `
        <h2>Aqui está o resultado:</h2>

        <div class="result-content">
            <ul>
                <li>
                    Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
                </li>
                <li>
                    Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
                </li>
                <li>
                    Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
                </li>
                <li>
                    Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
                </li>
            </ul>
        </div>
    `;

    const resultList = document.getElementById('result');
    resultList.innerHTML = layout;
}

function closeModal() {
    console.log('entrou')
    modal.style.display = "none";
    console.log(modal)
}

function getSelectedValue(id) {
    const select = document.getElementById(id);

    return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
    return Number(document.getElementById(id).value);
}
