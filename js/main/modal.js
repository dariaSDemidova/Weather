// Получение элементов DOM
const enterButton = document.querySelector('.account');
const registerButton = document.querySelector('.login-modal__register');
const loginModal = document.querySelector('.login-modal');
const registerModal = document.querySelector('.register-modal');
const loginModalClose = document.querySelector('.login-modal .login-modal__close');
const registerModalClose = document.querySelector('.register-modal .register-modal__close');
const loginButton = document.querySelector('.login-modal__button');
const registerSubmitButton = document.querySelector('.register-modal__button');

const userName = document.getElementById("user_name");
const userMail = document.getElementById("user_mail");
const userPassword = document.getElementById("user_password_reg");

const userLoginMail = document.getElementById("user_login");
const userLoginPass = document.getElementById("user_password");

const accountName = document.querySelector(".account-name");



const modals = () => {

    // Функция регистрации
    function regUser() {

        let userNameValue = userName.value;
        let userMailValue = userMail.value;
        let userPasswordValue = userPassword.value;
        let userArr = []; // пустой массив
        // Пушим в массив данные и сохраняем массив в LocalStorage по ключу
        userArr.push(userMailValue, userPasswordValue, userNameValue);
        const objUserArrJSON = JSON.stringify(userArr);
        window.localStorage.setItem("userData", objUserArrJSON);
        alert("Регистрация прошла успешно!");
    }

    // Кнопка "Зарегистрироваться"
    registerSubmitButton.addEventListener('click', regUser);

    // Проверка, есть ли что-то в LocalStorage по нашему ключу
    function checkLStorage() {
        const objUserString = localStorage.getItem('userData');
        if (objUserString) { // если массив существует
            const userInfo = JSON.parse(objUserString);
            accountName.textContent = userInfo[2];
            return userInfo;
            return JSON.parse(objUserString);
        } else {
            console.log("Массива не существует"); // если массива не существует
        }
    }

    checkLStorage();


    // Функция авторизации
    function autorizationUser() {

        let userArr = checkLStorage(); // возвращаем данные из LocalStorage, если они есть
        if (userArr) {
            let userLoginMailValue = userLoginMail.value; //получаем инпут почты
            let userLoginPassValue = userLoginPass.value; //получаем инпут пароль
            console.log(userArr[0], userArr[1]);
            console.log(userLoginMailValue, userLoginPassValue);


            if (userLoginMailValue == userArr[0] && userLoginPassValue == userArr[1]) {
                alert("Вы успешно авторизовались!"); //если совпадает с элементами в массиве
                accountName.textContent = userArr[2];  //вставляем имя за модалкой
            } else {
                alert("Данные неверны!");
                document.querySelector(".loginErr").textContent = "Данные неверны!"; //если не совпадает с элементами в массиве
            }
        } else {
            alert("Вы не зарегистрированы");
            loginButton.disabled = true;
            document.querySelector(".loginErr").textContent = "Данные неверны!"; //если не совпадает с элементами в массиве
        }
    }
    // Кнопка "Войти!"
    loginButton.addEventListener('click', autorizationUser);











    function bindModal(trigger, modal, close) {
        // Добавление слушателя для открытия модального окна
        trigger.addEventListener('click', (e) => {
            // Проверка, было ли событие клика
            if (e.target) {
                // Предотвращение стандартного действия (например, перехода по ссылке)
                e.preventDefault();
            }

            // Отображение модального окна и блокировка прокрутки страницы
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        // Добавление слушателя для закрытия модального окна
        close.addEventListener('click', () => {
            // Скрытие модального окна и восстановление прокрутки страницы
            modal.style.display = "none";
            document.body.style.overflow = "";
        });
    }


    // Привязка модального окна к кнопке "Вход"
    bindModal(enterButton, loginModal, loginModalClose);
    bindModal(registerButton, registerModal, registerModalClose);




    // Добавляем валидацию для формы регистрации
    const registrationForm = document.getElementById("register-form");
    // Функция для валидации поля формы
    function validateField(field, errorMessageElement) {
        // Проверка валидности поля
        if (!field.checkValidity()) {
            // Если поле невалидно, добавляем класс ошибки и устанавливаем текст ошибки
            field.classList.add("error");
            errorMessageElement.textContent = field.validationMessage;
        } else {
            // Если поле валидно, удаляем класс ошибки и очищаем текст ошибки
            field.classList.remove("error");
            errorMessageElement.textContent = "";
        }
    }

    // Обработчик события отправки формы
    registrationForm.addEventListener("submit", function (event) {
        // Отмена стандартного поведения формы (перезагрузка страницы)
        event.preventDefault();

        // Получение полей формы и элементов ошибок
        const nameField = document.getElementById("user_name");
        const nameErrorElement = nameField.nextElementSibling;
        validateField(nameField, nameErrorElement);

        const emailField = document.getElementById("user_mail");
        const emailErrorElement = emailField.nextElementSibling;
        validateField(emailField, emailErrorElement);

        const phoneField = document.getElementById("user_phone");
        const phoneErrorElement = phoneField.nextElementSibling;
        validateField(phoneField, phoneErrorElement);

        const passwordField = document.getElementById("user_password");
        const passwordErrorElement = passwordField.nextElementSibling;
        validateField(passwordField, passwordErrorElement);

        const confirmPasswordField = document.getElementById("user_confirm-password");
        const confirmPasswordErrorElement = confirmPasswordField.nextElementSibling;
        validateField(confirmPasswordField, confirmPasswordErrorElement);

        const agreementCheckbox = document.getElementById("user_agreement");
        const agreementErrorElement = agreementCheckbox.nextElementSibling;

        // Валидация чекбокса "Согласие на обработку данных"
        if (!agreementCheckbox.checked) {
            agreementCheckbox.classList.add("error");
            agreementErrorElement.textContent = "Согласитесь с обработкой данных";
        } else {
            agreementCheckbox.classList.remove("error");
            agreementErrorElement.textContent = "";
        }

        // Проверка валидности всей формы
        if (registrationForm.checkValidity()) {
            // Код, выполняемый при успешной валидации
            const nameValue = nameField.value;
            const emailValue = emailField.value;

            console.log("Имя:", nameValue);
            console.log("Электронная почта:", emailValue);

            // Сброс значений формы
            registrationForm.reset();
        }
    });
};

// Вызов функции для привязки модального окна
modals();


