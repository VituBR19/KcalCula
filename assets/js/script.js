const form = document.getElementById('form');

const resultModal = document.querySelector('.result-modal');
const validateModal = document.querySelector('.validate-modal');

const modalClose = document.querySelector('.modal-close');

const mobileInformation = document.getElementById('information');
const information = document.querySelector('.information')

mobileInformation.addEventListener('click', () => {
   information.style.display = 'flex'

   setTimeout(() => {
    information.style.display = 'none'
   }, 4000);
})

form.addEventListener('submit', handleSubimit);
resultModal.addEventListener('click', () => closeModal(resultModal));
validateModal.addEventListener('click', () => closeModal(validateModal));

modalClose.addEventListener('click', () => closeModal(resultModal));

function handleSubimit(event) {
    event.preventDefault();
    formValidate()
    resultModal.style.display = "flex";

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

function formValidate() {
    const inputs = document.querySelectorAll('input')

    inputs.forEach(input => {
        if(!input.valueAsNumber) {
            throw validateModal.style.display = 'flex';
        }
    })
}

function closeModal(modal = null) {
    if(!modal) {
        validateModal.style.display = 'none';
        resultModal.style.display = 'none';
        return 
    }
    modal.style.display = "none";
}

function getSelectedValue(id) {
    const select = document.getElementById(id);

    return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
    return Number(document.getElementById(id).value);
}
