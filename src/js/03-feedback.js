import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const STORAGE_KEY = 'feedback-form-state';

const formData = {
    email: '',
    message: '',
};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('input')
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem('STORAGE_KEY');
    console.log(formData);
 }

function onTextareaInput(evt) {
    formData[evt.target.name] = evt.target.value;
    const stringifiedData = JSON.stringify(formData);
    localStorage.setItem('STORAGE_KEY', stringifiedData);
}
 
function populateTextarea() {
    const savedMessage = localStorage.getItem('STORAGE_KEY');
    if (savedMessage === null) {
        return;
    }
    refs.textarea.value = savedMessage.message || '';
    refs.input.value = savedMessage.email || '';
    formData.email = savedMessage.email || '';
    formData.message = savedMessage.message || '';
    
 }





