// Место для вывода города
const city = document.querySelector('.city-name');
// Место для вывода ошибки
const cityErr = document.querySelector('.city-name--error');
// Место для вывода температуры
const temp = document.querySelector('.temperature');
let objAutoLocation;

checkSessionStorage();


function checkSessionStorage() {
    if (sessionStorage.getItem('cityAndTemp') === null) {
        findLocation();
    } else {
        getDatafromLocSt();
    }
}


// Поиск геолокации 
function findLocation() {
    if (!navigator.geolocation) {
        cityErr.textContent = 'Локация не определяется, введите город в поле ниже';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {  // если всё хорошо, получаем ширину и долготу
        const { longitude, latitude } = position.coords;
        const arr = [];
        arr.push(longitude, latitude);

        // Передаём ширину и долготу и получаем температуру по локации
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&appid=d99974b292ae5da6e80eca1d5534bc4b`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                //добавляем название местности
                // city.textContent = `${(data.name)}`;
                // temp.textContent = `${Math.floor(data.main.temp - 273.15)}`
                // console.log(data);

                let cityAutoLocation = data.name;
                let tempAutoLocation = Math.floor(data.main.temp - 273.15);
                let objAutoLocation = [];
                // Сохраняем данные в Session Storage
                objAutoLocation.push(cityAutoLocation, tempAutoLocation);
                const objAutoLocationJSON = JSON.stringify(objAutoLocation);
                window.sessionStorage.setItem("cityAndTemp", objAutoLocationJSON);
                getDatafromLocSt();

            })
            .catch(function () {
                //Обрабатываем ошибки
            });
    }

    async function error() { // если всё плохо пишем об этом
        cityErr.textContent = 'Локация не определяется :(';
    }
}

// Возвращаем данные из Session Storage
function getDatafromLocSt() {
    cityErr.textContent = '';
    const objAutoLocationString = sessionStorage.getItem('cityAndTemp');
    if (objAutoLocationString) {
        const arrayAutoLocation = JSON.parse(objAutoLocationString);
        for (const key in arrayAutoLocation) {
            arrayAutoLocation[0];
            city.textContent = `${arrayAutoLocation[0]}`;
            temp.textContent = `${arrayAutoLocation[1]}°`
            console.log(`${arrayAutoLocation[0]}, ${arrayAutoLocation[1]}`);
        }
    } else {
        console.log('Массив arrayAutoLocation не найден в Session Storage.');
    }
}



// Город из инпута и температура по нему 
function getGeoFromInput(e) {
    e.preventDefault();
    // Получаю значения из инпута 
    let inputField = document.getElementById('inputcity');
    let inputCityValue = inputField.value.trim();
    // Это ключ из API
    const apiKey = "d99974b292ae5da6e80eca1d5534bc4b";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&lang=ru&appid=${apiKey}`,
        {
            method: 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then((data) => {
            // console.log(Math.floor(data.main.temp - 273.15));
            // city.textContent = inputCityValue;
            let getNewTemp = Math.floor(data.main.temp - 273.15);

            // const objLocationStr = SessionStorage.getItem('cityAndTemp');
            // console.log(SessionStorage.getItem('cityAndTemp'));
            const objLocationStr = [inputCityValue, getNewTemp];
            const arrayGetLocationJSON = JSON.stringify(objLocationStr);
            window.sessionStorage.setItem("cityAndTemp", arrayGetLocationJSON);


            // objLocationStr[0] = inputCityValue;
            // objLocationStr[1] = getNewTemp;
            console.log(objLocationStr);
            getDatafromLocSt();
            inputField.value = '';

        })
        .catch(function () {
            //Обрабатываем ошибки
        });
}


// Клик по кнопке для выполнения функции 
document.querySelector('.search-icon').addEventListener('click', getGeoFromInput);




