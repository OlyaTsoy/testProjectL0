document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.querySelector('.main__userForm');

  const switchCart = document.querySelector('.shoppingCart__switch');
  const switchGoods = document.querySelector('.absenceGoods__switch');
  const cartList = document.querySelector('.shoppingCart__list');
  const goodsList = document.querySelector('.absenceGoods__list');

  const inputLabel = document.querySelector('.shoppingCart__label');
  const wrap = document.querySelector('.shoppingCart__header');

  const newNode = document.createElement('div');
  const elemText = document.createTextNode('203 товарa · 2 101 063 сом');

  switchCart.addEventListener('click', toggleCartBlock);
  switchGoods.addEventListener('click', toggleGoodsBlock);

  function toggleCartBlock() {
    if (cartList.style.display !== 'none') {
      cartList.style.display = 'none';
      switchCart.classList.add('switch--off');
      newNode.style.fontFamily = 'Segoe UI Bold';
      newNode.appendChild(elemText);
      wrap.replaceChild(newNode, inputLabel);
    } else {
      cartList.style.display = 'block';
      switchCart.classList.remove('switch--off');
      wrap.replaceChild(inputLabel, newNode);
    }
  }

  function toggleGoodsBlock() {
    if (goodsList.style.display !== 'none') {
      goodsList.style.display = 'none';
      switchGoods.classList.add('switch--off');
    } else {
      goodsList.style.display = 'block';
      switchGoods.classList.remove('switch--off');
    }
  }


  const selectAll = document.querySelector('#selectAll');
  const shoppingItems = document.querySelectorAll('.shoppingCart__checkbox');
  const totalPrice = document.querySelector('.order__price');
  const totalOldPrice = document.querySelector('.order__old');
  const totalPriceDelta = document.querySelector('.order__discount');

  const paymentCheckbox = document.querySelector('#payment');

  function setTotalPrice() {
    const totalNewSpans = document.querySelectorAll(
      '.shoppingCart__checkbox:checked ~ .goodsInfo__price .goodsInfo__new'
    );
    const totalOldSpans = document.querySelectorAll(
      '.shoppingCart__checkbox:checked ~ .goodsInfo__price .goodsInfo__old'
    );

    let totalNew = 0;
    let totalOld = 0;

    totalNewSpans.forEach((span) => {
      const str = span.textContent.replaceAll(/[^0-9]/g, '');
      let num = +str;
      totalNew = totalNew + num;
    });
    totalOldSpans.forEach((span) => {
      const str = span.textContent.replaceAll(/[^0-9]/g, '');
      let num = +str;
      totalOld = totalOld + num;
    });

    const totalDelta = totalOld - totalNew;

    totalPrice.innerText = totalNew.toLocaleString('ru-RU');
    totalOldPrice.innerText = `${totalOld.toLocaleString('ru-RU')} сом`;
    totalPriceDelta.innerText = `-${totalDelta.toLocaleString('ru-RU')} сом`;
    if (paymentCheckbox.checked) {
      orderBtn.innerText = `Оплатить ${totalNew.toLocaleString('ru-RU')} сом`;
    }
  }

  const restGoods = document.querySelectorAll('.deliveryContent__label--all');
  selectAll.addEventListener('click', () => {
    restGoods.forEach((el) => {
      el.classList.remove('hidden');
    });
    if (selectAll.checked) {
      shoppingItems.forEach((elem) => {
        elem.checked = true;
      });
    } else {
      shoppingItems.forEach((elem) => {
        elem.checked = false;
      });
      restGoods.forEach((el) => {
        el.classList.add('hidden');
      });
    }
    setTotalPrice();
  });

  shoppingItems.forEach((shoppingItem) => {
    shoppingItem.addEventListener('change', () => {
      restGoods.forEach((el) => {
        el.classList.remove('hidden');
      });
      let checkedAll = true;
      let uncheckedAll = true;
      setTotalPrice();
      shoppingItems.forEach((shoppingItem) => {
        const productDelivery = document.querySelectorAll(
          `.deliveryContent__item--product${shoppingItem.id.slice(-1)}`
        );
        if (!shoppingItem.checked) {
          productDelivery.forEach((el) => {
            el.classList.add('hidden');
          });
          checkedAll = false;
        } else {
          uncheckedAll = false;
          productDelivery.forEach((el) => {
            el.classList.remove('hidden');
          });
        }
      });

      if (uncheckedAll) {
        restGoods.forEach((el) => {
          el.classList.add('hidden');
        });
      }

      if (checkedAll) {
        selectAll.checked = true;
      } else {
        selectAll.checked = false;
      }
    });
  });


  const btnsEdit = document.querySelectorAll('.popupPayment');
  const btnsEditDelivery = document.querySelectorAll('.popupDelivery');
  const btnsPopupEdit = document.querySelectorAll('.main__popupSwitch');
  const popupPayment = document.querySelector('.main__popup');
  const popupDelivery = document.querySelector('.main__popup--delivery');

  popupManage(btnsEdit, popupPayment);
  popupManage(btnsEditDelivery, popupDelivery);

  function popupManage(nodeList, popupItem) {
    nodeList.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        popupItem.classList.add('visible');
      });
    });

    btnsPopupEdit.forEach((btn) => {
      btn.addEventListener('click', () => {
        popupItem.classList.remove('visible');
      });
    });
  }

  const pickupButton = document.querySelector('.main__popupOptionsBtn--pickUpPoint');
  const courierButton = document.querySelector('.main__popupOptionsBtn--courier');
  const pickupList = document.querySelector('.main__popupList--pickUpPoint');
  const courierList = document.querySelector('.main__popupList--courier');

  pickupButton.addEventListener("click", function () {
    pickupButton.classList.add('main__popupOptionsBtn--active');
    courierButton.classList.remove('main__popupOptionsBtn--active');
    courierList.style.display = "none";
    pickupList.style.display = "block";
  });

  courierButton.addEventListener("click", function () {
    courierButton.classList.add('main__popupOptionsBtn--active');
    pickupButton.classList.remove('main__popupOptionsBtn--active');
    pickupList.style.display = "none";
    courierList.style.display = "block";
  });

  const tooltipFree = document.querySelectorAll('.tooltipFree');

  tooltipFree.forEach((el) => {
    const tooltip = document.createElement('div');
    const tooltipText = document.createTextNode(
      'Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно'
    );
    tooltip.className = 'tooltip';
    tooltip.appendChild(tooltipText);
    el.appendChild(tooltip);
  });


  const orderBtn = document.querySelector('.order__button');
  const paymentDesc = document.querySelectorAll('.paymentDesc');

  paymentCheckbox.addEventListener('click', () => {
    if (paymentCheckbox.checked) {
      paymentDesc.forEach((el) => {
        el.style.display = 'none';
        setTotalPrice();
      });
    } else {
      paymentDesc.forEach((el) => {
        el.style.display = 'block';
        orderBtn.innerText = 'Заказать';
      });
    }
  });


  const formRegex = {
    name: {
      regex: /^[а-яА-ЯёЁ]+$/u,
      errMsg: 'Укажите имя',
      infoMsg: 'Укажите имя',
    },
    surname: {
      regex: /^[а-яА-ЯёЁ]+$/u,
      errMsg: 'Введите фамилию',
      infoMsg: 'Введите фамилию',
    },
    mail: {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errMsg: 'Проверьте адрес электронной почты',
      infoMsg: 'Укажите электронную почту',
    },
    phoneNumber: {
      regex: /^\+7 \d{3} \d{3} \d{2} \d{2}$/,
      errMsg: 'Формат: +9 999 999 99 99',
      infoMsg: 'Укажите номер телефона',
    },
    document: {
      regex: /^\d{14}$/,
      errMsg: 'Проверьте ИНН',
      infoMsg: 'Укажите ИНН',
    },
  };
  const formFields = document.querySelectorAll('.userForm input');

  formFields.forEach((formInput) => {
    formInput.addEventListener('blur', () => {
      const inputValue = formInput.value;
      if (inputValue) {
        formInput.parentElement.classList.add('userForm__field--active');
      } else {
        formInput.parentElement.classList.remove('userForm__field--active');
      }
      const validData = formRegex[formInput.id];
      const errorBox = formInput.parentElement.querySelector('span');
      if (validateField(validData, inputValue, errorBox)) {
        formInput.parentElement.classList.remove('userForm__field--err');
      } else {
        formInput.parentElement.classList.add('userForm__field--err');
      }
    });
  });

  userForm.addEventListener('submit', checkFormFields);
  orderBtn.addEventListener('click', (e) => {
    checkFormFields();
  });

  function checkFormFields(e) {
    formFields.forEach((formInput) => {
      const inputValue = formInput.value;
      if (inputValue) {
        formInput.parentElement.classList.add('userForm__field--active');
      } else {
        formInput.parentElement.classList.remove('userForm__field--active');
      }
      const validData = formRegex[formInput.id];
      const errorBox = formInput.parentElement.querySelector('span');
      if (validateField(validData, inputValue, errorBox)) {
        formInput.parentElement.classList.remove('userForm__field--err');
      } else {
        formInput.parentElement.classList.add('userForm__field--err');
      }
    });
  }

  function validateField(validData, value, errorBox) {
    if (value === '') {
      errorBox.innerText = validData.infoMsg;
      return true;
    } else if (!validData.regex.test(value)) {
      errorBox.innerText = validData.errMsg;
      return false;
    } else {
      errorBox.innerText = '';
      return true;
    }
  }
});