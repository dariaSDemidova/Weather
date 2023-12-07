// Место для вывода города
const city = document.querySelector('.city-name');
// Место для вывода ошибки
const cityErr = document.querySelector('.city-name--error');
// Место для вывода температуры
const temp = document.querySelector('.temperature');
// Место для иконки погоды
const weatherIcon = document.querySelector('.weather-icon');
// Поле ввода города
let inputField = document.getElementById('inputcity');
// Кнопка для ввода названия города 
const searchBtn = document.querySelector('.search-icon');

let objAutoLocation;
// Штуки для создания карточек
const cardContainer = document.getElementById("formList");
const cardOne = document.querySelector(".item-one");
const cardTwo = document.querySelector(".item-two");
const cardThree = document.querySelector(".item-three");
const cardFour = document.querySelector(".item-four");


// Массив с товарами, потому что локальный Джейсон подгружается только при запуске из VScode :(
const products = [
    {
        "id": "1",
        "name": "Варежки",
        "price": "570",
        "img": "image/products/varezhki.jpg",
        "brief": "Тёплые варежки из 100%-шерсти",
        "main": "Самые комфортные вязаные варежки для женщин. Зимние краги, отлично дополнят любой Ваш образ, с шубой, с пуховиком, с пальто, красивый принт не оставит никого равнодушным, будет хорошим , приятным подарком.Варежки сохранят Ваши руки в тепле до -25 С. отдавайте предпочтение ручной стирке в холодной воде. При стирке в стиральной машине, выбирайте функцию деликатной стирки без отжима. Варежки теплые, зимние, шерстяные, вязаные, удобные, комфортные.",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "frost"
    },
    {
        "id": "2",
        "name": "Ушанка",
        "price": "1990",
        "img": "image/products/yshanka.jpg",
        "brief": "Традиционно-идеальная шапка в морозы",
        "main": "Шапка ушанка стала несомненым трендом в этом сезоне. Такая шапка плюшевая отлично впишется в повседневный лук и согреет в холодную погоду. Наша шапка демисезонная имеет качественную навышивку логотипа Carhartt и подойдет для мужчин, для женщин, для подростков. Ушанка зимняя имеет замок, который можно регулировать и утеплитель для более прохладной погоды. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "frost"
    },
    {
        "id": "3",
        "name": "Плед с подогревом",
        "price": "2100",
        "img": "image/products/pled.jpg",
        "brief": "Включи плед и забудь о холоде",
        "main": "Плед с подогревом – ваш идеальный спутник в холодные зимние ночи! Забудьте о холоде и дискомфорте, наслаждайтесь теплом и уютом, обернувшись в нежные объятия этого удивительного изделия. Наша простынь одеяло с подогревом – это инновационное решение для обеспечения комфортной температуры во время сна. Благодаря встроенному подогреву, вы сможете настроить оптимальную температуру и наслаждаться приятным теплом в любое время года. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "frost"
    },
    {
        "id": "4",
        "name": "Тёплые штаны",
        "price": "3350",
        "img": "image/products/shtani.jpg",
        "brief": "Для ожидания автобуса на остановке",
        "main": "Утепленные штаны подходят для повседневного использования, для путешествий и даже как горнолыжный костюм для сноуборда. Брюки женские теплые настоящая находка для прогулок на свежем воздухе. Треники с утеплителем согреют вас в любую погоду, так как они непромокаемые, непродуваемые, водонепроницаемые. Подойдут для высоких, для невысоких, на большие размеры, для беременных. Эти модные оверсайз болоневые штанцы женские лучшая находка для пополнения зимнего гардероба и практичная вещь на осень. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "frost"
    },
    {
        "id": "5",
        "name": "Перчатки",
        "price": "650",
        "img": "image/products/perchatki.jpg",
        "brief": "Незаменимы в минусовую температуру",
        "main": "Тёплые перчатки одна из самых нужных вещей в зимнем гардеробе. Они обеспечивают надежную защиту от холода и мороза. Рукавицы утеплены мягкой меховой подкладкой, эластичные манжеты позволяют перчаткам хорошо сидеть на руках и при этом не давят, но отлично защищают от холодного воздуха и попадания снега, если вы решили поиграть в снежки. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "cold"
    },
    {
        "id": "6",
        "name": "Кружка-термос",
        "price": "1180",
        "img": "image/products/kruzhka.jpg",
        "brief": "Кружка-термос подарит тепло и уют",
        "main": "Стильная и яркая термокружка для для кофе и чая, подарит вам тепло и уют в дороге. Модную термокружку удобно брать с собой на учебу, работу и в любое увлекательное путешествие. Маленький термос поможет сохранить тепло вашего любимого напитка в течение дня. Кружка-термос подойдет для горячих и холодных напитков, а так же для воды. Туристическая бутылка - термос удобна для использования в коротких и длинных поездках, его можно использовать в автомобилях и поездах. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "cold"
    },
    {
        "id": "7",
        "name": "Вязаные носки",
        "price": "1250",
        "img": "image/products/noski.jpg",
        "brief": "Тёплые носки из шерстяной пряжи, ручная работа",
        "main": "Тёплые носки выполнены из шерстяной пряжи. Высокие носки представлены в оливковом цвете и украшены узорным орнаментом. Вязаные носочки идеальны для уютных зимних вечеров в компании пледа и какао. Пряжа из натуральной овечьей шерсти делает носки теплыми и идеальными для морозной зимы. Благодаря полиамиду и акрилу в составе они сохраняют форму и цвет даже после частых стирок и будут радовать вас не один сезон. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "cold"
    },
    {
        "id": "8",
        "name": "Тёплый шарф",
        "price": "1730",
        "img": "image/products/sharf.jpg",
        "brief": "Фактурная вязка и жаккардовоый узор",
        "main": "Однослойный шарф выполнен из шерсти с совмещением фактурной вязки и жаккардового узора. Мягкое и теплое полотно сохранит первоначальную форму даже после долгой носки. Гипоаллергенный материал подойдет людям с чувствительной кожей. Стирать изделие рекомендуем вручную или в стиральной машине в режиме ручной стирки универсальными моющими средствами, не содержащими отбеливателей, при температуре 40 С. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "cold"
    },
    {
        "id": "9",
        "name": "Куртка-ветровка",
        "price": "4700",
        "img": "image/products/vetrovka.jpg",
        "brief": "идеальная верхняя одежда для демисезона",
        "main": "Стильная и модная демисезонная ветровка без капюшона - это идеальная верхняя одежда для весны и осени. Куртка весна-осень не спортивная выполнена из плотной непромокаемой и непродуваемой премиум ткани. Эта тонкая стеганная тактическая курточка спасет вас от дождя и ветра. Оснащена мягкой подкладкой. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "spring"
    },
    {
        "id": "10",
        "name": "Кроссовки",
        "price": "3450",
        "img": "image/products/krossovki.jpg",
        "brief": "Для трекинга хайкинга и походов",
        "main": "Демисезонные кроссовки для трейла, мембранная технология похожа на GORE-TEX, непромокаемые, бронированный носок позволит вам преодолевать любые препятствия. Технология Vibram Litebase, разработанная для значительного снижения веса подошвы. Эффект достигается за счет уменьшения толщины резинового слоя подошвы при сохранении компоновки и формы грунтозацепов.кроссовки подойдут для трекинга хайкинга и походов в прохладное время года.",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "spring"
    },
    {
        "id": "11",
        "name": "Жилет",
        "price": "1640",
        "img": "image/products/zhilet.jpg",
        "brief": "Идеальный выбор для повседневного образа",
        "main": "Стильная и модная жилетка - идеальный выбор для повседневного образа! Эта черная безрукавка станет незаменимой вещью в демисезонном гардеробе - осень и весна. Изготовленная из дутого стеганого материала, жилетка мужская также обеспечит комфорт и тепло в прохладные весенние и осенние дни. Короткая длина жилета делает его идеальным для молодежного образа. Большие карманы добавляют практичности и удобства. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "spring"
    },
    {
        "id": "12",
        "name": "Лонгслив",
        "price": "1280",
        "img": "image/products/longsleeve.jpeg",
        "brief": "Лонгслив универсальный базовый, унисекс",
        "main": "Лонгслив унисекс, выполнен из высококачественного хлопка (плотность 180г/м2). Ткань плотная, не просвечивает, при этом мягкая на ощупь, содержит в составе лайкру 8%, поэтому хорошо тянется и идеально сидит по фигуре. выдержит огромное количество стирок. Кофта оверсайз имеет довольно длинный рукав – можно носить его навыпуск или закатать. Лонгслив белый/черный с принтом. Принт выполнен качественно, не боится стирок, нанесен также на рукава изделия, что выгодно выделяет нашу футболку с надписью, футболку с принтом из множества подобных. Лонгслив женский, лонгслив мужской может быть одеждой для дома и одеждой для вечеринки, одеждой в школу, для мальчиков, для девочек, одеждой для танцев (хип-хоп) и для прогулок, подойдет для занятия спортом, йогой, бегом и уж точно станет незаменимой одеждой для путешествий. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "spring"
    },
    {
        "id": "13",
        "name": "Бутылка для воды",
        "price": "730",
        "img": "image/products/bottle.jpg",
        "brief": "Чтобы не забывать пить воду в жару",
        "main": "Бутылка для воды 500 мл. Выполненна из современного безопасного материала, который не выделяет и не впитывает запахи, обладает высокой прочностью. Стильная и функциональная, незаменима для тех, кто ведет активный образ жизни, подойдет для тренировок, как бутылка для школы, для туризма, хоккейная бутылка, для бега и не только. Надежный механизм открывания крышки с кнопки и дополнительный фиксатор дает 100% защиту от протекания. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "warm"
    },
    {
        "id": "14",
        "name": "Крем SPF",
        "price": "990",
        "img": "image/products/spf.jpg",
        "brief": "Защитит вашу кожу от солнечных лучей",
        "main": "Чувствительная кожа лица нуждается в особой заботе и защите от солнечных лучей. Деликатный крем Sensitive Care Cream с экстрактом овса и натуральными маслами миндаля и масло ши (карите) в составе смягчает и успокаивает кожу, помогает в устранении зуда и покраснений, восстанавливает липидный барьер. Комплекс бетаина, аллантоина и витамина Е увлажняет, устраняет чувство стянутости и шелушение, возвращает коже ощущение длительного комфорта. Крем не содержит отдушку.",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "warm"
    },
    {
        "id": "15",
        "name": "Бейсболка",
        "price": "395",
        "img": "image/products/kepka.jpg",
        "brief": "Идеальное дополнение к крутому образу",
        "main": "Бейсболка послужит идеальным дополнением к Вашему стильному образу. Кепка летняя выполнена из 100% хлопка в строгом черном цвете и будет отлично смотреться, как в сочетании со спортивными вещами, так и с повседневной одеждой. Классическая бейсболка мужская регулируется по размеру с помощью застежки, поэтому данный аксессуар прекрасно подойдет, как мужчинам, так и женщинам. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "warm"
    },
    {
        "id": "16",
        "name": "Базовая футболка",
        "price": "1225",
        "img": "image/products/shirt.jpg",
        "brief": "Футболка для мужчин и женщин",
        "main": "Унисекс футболка с короткими рукавами и свободным покроем идеально сочетается с различными стилями: от спортивного до делового. Такая хлопковая майка с округлым вырезом горловины красиво смотрится с джинсами, брюками и юбкой, ее можно надеть под кардиган или пиджак. Изготовлена из мягкой и эластичной ткани, она гарантирует максимальный комфорт в любое время года. ",
        "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "tag": "warm"
    }
];



// Проверка, есть ли что-то в SessionStorage по нашему ключу
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

    function success(position) {  // если всё хорошо, получаем широту и долготу
        const { longitude, latitude } = position.coords;
        const arr = [];
        arr.push(longitude, latitude);

        // Передаём широту и долготу
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&appid=35ef705f13389766e1067cae35276354`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {

                console.log(data);
                //получаем название местности
                let cityAutoLocation = data.name;
                //получаем температуру
                let tempAutoLocation = Math.floor(data.main.temp - 273.15);
                //получаем иконку погоды
                let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
                //создаём пустой массив
                let objAutoLocation = [];
                // Пушим в массив данные и сохраняем массив в Session Storage
                objAutoLocation.push(cityAutoLocation, tempAutoLocation, iconUrl);
                const objAutoLocationJSON = JSON.stringify(objAutoLocation);
                window.sessionStorage.setItem("cityAndTemp", objAutoLocationJSON);
                getDatafromLocSt();

            })
            .catch(error => alert(error.message));
    }

    function error() { // если всё плохо пишем об этом
        cityErr.textContent = 'Локация не определяется :(';
    }
}

// Возвращаем данные из Session Storage
function getDatafromLocSt() {
    cityErr.textContent = ''; // очищаем поле ошибки

    const objAutoLocationString = sessionStorage.getItem('cityAndTemp');
    if (objAutoLocationString) { // если массив существует
        const arrayAutoLocation = JSON.parse(objAutoLocationString);
        city.textContent = `${arrayAutoLocation[0]}`;
        temp.textContent = `${arrayAutoLocation[1]}°`;
        weatherIcon.src = `${arrayAutoLocation[2]}`;
        console.log(`${arrayAutoLocation[0]}, ${arrayAutoLocation[1]}`)
    } else {
        console.log('Массив arrayAutoLocation не найден в Session Storage.');
    };

    if (cardContainer) { // если контейнер для товаров существует
        const arrayAutoLocation = JSON.parse(objAutoLocationString);
        cardFour.textContent = ''; // очищаем карточки
        cardThree.textContent = ''; // очищаем карточки
        cardTwo.textContent = ''; // очищаем карточки
        cardOne.textContent = ''; // очищаем карточки

        let tempValue = `${parseInt(arrayAutoLocation[1])}`; // получаем из массива температуру как число

        // console.log(`${parseInt(arrayAutoLocation[1])}`);

        // проверяем температуру и получаем соответствующий тэг
        function checkTemp() {
            if (tempValue < -15) {
                console.log('frost');
                return 'frost';
            } else if (tempValue >= -15 && tempValue <= 0) {
                console.log('cold');
                return 'cold';
            } else if (tempValue > 0 && tempValue <= 15) {
                console.log('spring');
                return 'spring';
            } else if (tempValue > 15) {
                console.log('warm');
                return 'warm';
            } else {
                console.log('Некорректная температура');
                return 'Некорректная температура';
            }
        }
        // console.log(checkTemp());

        // функция постройки карточек
        function buildCards() {
            let tagValue = checkTemp(); //возвращаем тэг из функции
            console.log(tagValue);
            //получаем сокращённый массив с товарами по тэгу
            let filteredItems = products.filter(function (item) {
                return item.tag == tagValue;
            });
            console.log(filteredItems);

            getElemstoCardOne(filteredItems); //карточка товара 1
            getElemstoCardTwo(filteredItems);   //карточка товара 2
            getElemstoCardThree(filteredItems); //карточка товара 3
            getElemstoCardFour(filteredItems); //карточка товара 4
        }

        buildCards(); //строим карточки


    } else {
        console.log(`На этой странице нет контейнера для карточек "cardContainer"`); // если контейнер не существует
    }
}


//приводим город к нужному формату
function formatCity(name) {
    let nameLowerCase = name.toLowerCase();
    let newName = nameLowerCase[0].toUpperCase() + nameLowerCase.slice(1);
    return newName.replace(/ +/g, '').replace(/-[a-zа-яё]/g, $0 => $0.toUpperCase()).trim();
}




// Город из инпута и температура по нему 
function getGeoFromInput(e) {
    e.preventDefault();
    // Получаю значения из инпута 
    let inputCityValue = formatCity(inputField.value);
    // Это ключ из API
    const apiKey = "35ef705f13389766e1067cae35276354";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&lang=ru&appid=${apiKey}`,
        {
            method: 'GET'
        })
        .then(res => {
            return res.json();
        })
        .then((data) => {
            let getNewTemp = Math.floor(data.main.temp - 273.15);
            //получаем иконку погоды
            let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`

            const objLocationStr = [inputCityValue, getNewTemp, iconUrl];
            const arrayGetLocationJSON = JSON.stringify(objLocationStr);
            window.sessionStorage.setItem("cityAndTemp", arrayGetLocationJSON);

            console.log(objLocationStr);
            getDatafromLocSt();
            inputField.value = '';

        })
        .catch(function () {
            console.log(`Возникла ошибка: ${error.name} + ${error.message}`)//Обрабатываем ошибки
        });
}

//Кнопка ввода города
searchBtn.addEventListener('click', getGeoFromInput);

// inputField.addEventListener('keypress', function (e) {
//     let key = e.key;
//     if (key === 13) { // код клавиши Enter
//         searchBtn.click();
//     }
// });


//Enter — тоже кнопка ввода города
document.addEventListener('keydown', event => {
    if (event.code === 'Enter') {
        event.preventDefault();
        searchBtn.click();
    };
});



// Функция постройки карточки товара 1 
function getElemstoCardOne(filteredItems) {
    //Создаю и добавляю в карточку картинку товара
    const urlImg = filteredItems[0].img;
    const itemImage = new Image(200, 200);
    itemImage.classList.add("item-img");
    itemImage.src = urlImg;

    // Создаю div для контента в карточке
    const content = document.createElement("div");
    content.classList.add("content");

    //Создаю заголовок для названия товара
    const itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.textContent = filteredItems[0].name;

    //Создаю заголовок для краткого описания товара
    const itemdesc = document.createElement("p");
    itemdesc.classList.add("item-desc");
    itemdesc.textContent = filteredItems[0].brief;

    cardOne.append(itemImage, content);
    content.append(itemName, itemdesc)
}

// Функция постройки карточки товара 2 
function getElemstoCardTwo(filteredItems) {
    //Создаю и добавляю в карточку картинку товара
    const urlImg = filteredItems[1].img;
    const itemImage = new Image(200, 200);
    itemImage.classList.add("item-img");
    itemImage.src = urlImg;

    // Создаю div для контента в карточке
    const content = document.createElement("div");
    content.classList.add("content");

    //Создаю заголовок для названия товара
    const itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.textContent = filteredItems[1].name;

    //Создаю заголовок для краткого описания товара
    const itemdesc = document.createElement("p");
    itemdesc.classList.add("item-desc");
    itemdesc.textContent = filteredItems[1].brief;

    cardTwo.append(itemImage, content);
    content.append(itemName, itemdesc)
}


// Функция постройки карточки товара 3 
function getElemstoCardThree(filteredItems) {

    //Создаю и добавляю в карточку картинку товара
    const urlImg = filteredItems[2].img;
    const itemImage = new Image(200, 200);
    itemImage.classList.add("item-img");
    itemImage.src = urlImg;

    // Создаю div для контента в карточке
    const content = document.createElement("div");
    content.classList.add("content");

    //Создаю заголовок для названия товара
    const itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.textContent = filteredItems[2].name;

    //Создаю заголовок для краткого описания товара
    const itemdesc = document.createElement("p");
    itemdesc.classList.add("item-desc");
    itemdesc.textContent = filteredItems[2].brief;

    cardThree.append(itemImage, content);
    content.append(itemName, itemdesc)
}

// Функция постройки карточки товара 4 
function getElemstoCardFour(filteredItems) {
    //Создаю и добавляю в карточку картинку товара
    const urlImg = filteredItems[3].img;
    const itemImage = new Image(200, 200);
    itemImage.classList.add("item-img");
    itemImage.src = urlImg;

    // Создаю div для контента в карточке
    const content = document.createElement("div");
    content.classList.add("content");

    //Создаю заголовок для названия товара
    const itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.textContent = filteredItems[3].name;

    //Создаю заголовок для краткого описания товара
    const itemdesc = document.createElement("p");
    itemdesc.classList.add("item-desc");
    itemdesc.textContent = filteredItems[3].brief;

    cardFour.append(itemImage, content);
    content.append(itemName, itemdesc)
}
