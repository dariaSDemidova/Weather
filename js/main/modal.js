const modals = () => {
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

    // Получение элементов DOM
    const enterButton = document.querySelector('.account');
    const registerButton = document.querySelector('.login-modal__register');
    const loginModal = document.querySelector('.login-modal');
    const registerModal = document.querySelector('.register-modal');
    const loginModalClose = document.querySelector('.login-modal .login-modal__close');
    const registerModalClose = document.querySelector('.register-modal .register-modal__close');
    const loginButton = document.querySelector('.login-modal__button');
    const registerSubmitButton = document.querySelector('.register-modal__button');

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



    // // Добавление обработчика для кнопки "Войти"
    // loginButton.addEventListener('click', () => {
    //     loginModal.style.display = "none";
    //     document.body.style.overflow = "";
    // });

    // // Добавление обработчика для кнопки "Зарегистрироваться"
    // registerSubmitButton.addEventListener('click', () => {
    //     registerModal.style.display = "none";
    //     document.body.style.overflow = "";
    // });
};

// Вызов функции для привязки модального окна
modals();





// let isLoggedIn = false; // Изначально пользователь не вошел

// // Функция для обновления текста на кнопке входа
// function updateLoginButtonText() {
//     const loginButton = document.querySelector('.account');
//     if (isLoggedIn) {
//         loginButton.textContent = "Имя пользователя";
//     } else {
//         loginButton.textContent = "Личный кабинет";
//     }
// }

// // Вызов функции для установки начального текста
// updateLoginButtonText();

