const addAddressButton = document.querySelector('.add-adress');
const makeTemplateButton = document.querySelector('.make-template');

const adressSection = document.querySelector('.adress-section');
const newAddress = document.querySelector('.new-address');
const savedAddressSection = document.querySelector('.saved-address-section');

class InputField {
  constructor(labelText, width, height){
    this.labelText = labelText;
    this.width = width;
    this.height = height;
  }

  createField(){
    const label = document.createElement('p');
    label.textContent = this.labelText;
    label.style.marginBottom = '10px';
    newAddress.append(label);

    const input = document.createElement('input');
    input.setAttribute('id', this.labelText)
    input.setAttribute('class', 'address-form-input')
    input.style.width = this.width + 'px';
    input.style.height = this.height + 'px';
    input.style.marginBottom = '30px';
    input.style.borderColor = 'rgb(66, 61, 61)';
    input.style.borderRadius = '3px';
    newAddress.append(input);
  }
}


function showNewAddressForm() {
  const title = document.createElement('h4');
  title.textContent = 'Заполните форму';
  title.classList.add('new-adress-field-title');
  newAddress.append(title);

  const inputForArea = new InputField('Регион', 300, 25);
  inputForArea.createField();

  const inputForCity = new InputField('Город', 300, 25);
  inputForCity.createField();

  const inputForStreet = new InputField('Улица', 350, 25);
  inputForStreet.createField();

  const inputForHouse = new InputField('Дом', 50, 25);
  inputForHouse.createField();

  const inputForBuilding = new InputField('Строение/Корпус', 50, 25);
  inputForBuilding.createField();

  const inputForEntrance = new InputField('Подъезд', 50, 25);
  inputForEntrance.createField();

  const inputForFloor = new InputField('Этаж', 50, 25);
  inputForFloor.createField();

  const inputForApartment = new InputField('Квартира', 50, 25);
  inputForApartment.createField();


  const inputForComment = new InputField('Комментарий курьеру', 350, 25);
  inputForComment.createField();

  return inputForArea, inputForCity, inputForStreet, inputForHouse, inputForBuilding, inputForEntrance, inputForFloor, inputForApartment, inputForComment;

}
addAddressButton.addEventListener('click', showNewAddressForm);


//состояние disabled для кноки 'добавить адрес'
window.onload = function() {
  addAddressButton.onclick = function() {
    this.disabled = 'disabled';
  }
}


//кнопка сохранить
function makeSaveButton() {
  const buttonSaveAddress = document.createElement('button');
  buttonSaveAddress.textContent = 'Сохранить адрес'
  buttonSaveAddress.style.width = '230px';
  buttonSaveAddress.style.height = '40px';
  buttonSaveAddress.style.fontWeight = '600';
  buttonSaveAddress.style.backgroundColor = 'rgb(234, 227, 227)';
  buttonSaveAddress.style.borderColor = 'rgb(66, 61, 61)';
  buttonSaveAddress.style.borderRadius = '3px';
  buttonSaveAddress.style.display = 'block';
  adressSection.append(buttonSaveAddress);
  buttonSaveAddress.addEventListener('click', saveAddress);
};

//при клике "добавить адрес" появляется кнопка сохранить
addAddressButton.addEventListener('click', () => {
  makeSaveButton()
});


//скрываю форму нового адреса
function hideNewAddressForm() {
  const newAddressForm = document.querySelector('.new-address')
  //если форма есть на странице, то удаляю
  if (newAddressForm) {
    newAddressForm.remove();
  }
}

//созданию контент для адреса
const createAddress = (title, description) => {
  //создаю div
  const addressItemCell = document.createElement('div')
  //добавляю стили
  addressItemCell.classList.add('address-item-cell')
  //добавляю внутрь div теги с содержимым из параметров
  addressItemCell.innerHTML += `
      <span class="item-title">${title}</span>
      <div>${description || 'Отсутствует'}</div>
  `
  //возвращаю наполненный div
  return addressItemCell
}

//создаю дополнительные кнопки для строк в таблице
function createAdditionalButtons(container) {
  //элемент корзины
  const addressBasket = document.createElement('div')
  addressBasket.classList.add('address-item-basket')
  //при клике по корзине выполняется функция удаления
  addressBasket.addEventListener('click', (e) => {
    e.target.parentElement.remove() //удаляю от лица родителя - e.target.parentElement - родительский тэг для корзины
  })

  //элемент карандаша
  const addressPencil = document.createElement('div');
  addressPencil.classList.add('address-item-pencil');

  //добавляем дополнительные кнопки в таблицы
  container.prepend(addressBasket)
  container.prepend(addressPencil)
}

//сохранённые адреса из localStorage
const savedAddressesInfo = JSON.parse(localStorage.getItem('saved-addresses')) ?? []

//отрисовка адресов
function renderAddresses(list) {
  const savedAddressList = document.querySelector('.saved-address');

  list.forEach((item) => {
    //создаем элемент li и добавляем стили
    const addressItemContainer = document.createElement('li')
    addressItemContainer.classList.add('address-item-container')

    //проходимся по каждому элементу массива (т.е. по объекту)
    Object.keys(item).forEach((itemKey) => {
      //создаю адрес (т.е. наполненный div)
      //createAddress создаёт контент для адреса с элементами объекта
      const newAddress = createAddress(itemKey, item[itemKey])
      //наполненный див добавляем в <li>
      addressItemContainer.append(newAddress)
    })
    //создаём кнопки 
    createAdditionalButtons(addressItemContainer)
    //в тег с адресами добавляем наполненный <li>
    savedAddressList.prepend(addressItemContainer)
  })
}

//функция проходится по массиву из localStorage, создаёт теги option с наполнением и добавляет в select
function renderAddressOptions(list) {
  const addressOptionsElement = document.getElementById('address-select')
  //проходимся по ключам списка и на каждой итерации создаём элемент option с содержимым
  Object.values(list).forEach((addressDescription) => {
    const option = document.createElement('option')
    option.textContent = Object.values(addressDescription).join(' ')
    addressOptionsElement.append(option)
  })
}

//отрисовываем адреса из localStorage в таблицу
renderAddresses(savedAddressesInfo)
//отрисовываем адреса из localStorage в option
renderAddressOptions(savedAddressesInfo)

//2.вывести данные из инпутов newAddress в блок savedAddressSection
  function saveAddress(inputForArea, inputForCity, inputForStreet, inputForHouse, inputForBuilding, inputForEntrance, inputForFloor, inputForApartment, inputForComment) {
    const savedAddressList = document.querySelector('.saved-address');
    const addressItemContainer = document.createElement('li')
    //объект для записи в localStorage
    const addressInfo = {}

    //находим все инпуты у формы
    const formAddNewAddressInputs = [...document.querySelectorAll('.address-form-input')] //[...] превращает HTMLCollection в Array чтобы вызвать метод forEach

    //проходимся по массиву
    formAddNewAddressInputs.forEach((input) => {
      //создаём адрес
      const newAddress = createAddress(input.id, input.value)   //?
      //добавляем адрес (наполненный div) в li
      addressItemContainer.append(newAddress)
      addressItemContainer.classList.add('address-item-container')
      //записываем данные для localStorage
      addressInfo[input.id] = input.value
    })

    //добавляем дополнительные кнопки для адреса
    createAdditionalButtons(addressItemContainer)
    savedAddressList.append(addressItemContainer)

    //если в localStorage нет сохраненных адресов
    if(!localStorage.getItem('saved-addresses')) {
      //добавляем
      localStorage.setItem('saved-addresses', JSON.stringify([addressInfo]))
    } else {
      //если они уже есть - записываем в savedAddressesDescriptions
      const savedAddressesDescriptions = localStorage.getItem('saved-addresses')
      //превращаем строчку в массив
      const parsedSavedAddressesDescriptions = JSON.parse(savedAddressesDescriptions)
      //добавляем в массив объект адреса для localStorage
      parsedSavedAddressesDescriptions.push(addressInfo)
      //сохраняем в localStorage
      localStorage.setItem('saved-addresses', JSON.stringify(parsedSavedAddressesDescriptions))
    }

    //скрываем форму добавления адреса
    hideNewAddressForm()
}
