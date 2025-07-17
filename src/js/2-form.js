const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    formData = JSON.parse(savedData);

    if (formData.email) {
      form.elements.email.value = formData.email;
    }

    if (formData.message) {
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Помилка парсингу збережених даних', error);
  }
}

form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});
