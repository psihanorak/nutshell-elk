import firebase from 'firebase/app';
import 'firebase/auth';

import foodData from '../../helpers/data/foodData';
import addFood from '../addFood/addFood';
import menu from '../foodMaker/foodMaker';
import utils from '../../helpers/utils';

import './foodList.scss';

const buildFoods = (e) => {
  e.preventDefault();
  $('#food').removeClass('hide');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      menu.authFood();
    } else {
      let rowString = '';
      foodData.getFoods()
        .then((foods) => {
          const headerString = `
          <h1>MENU</h1>
          <thead>
          <thead class="colored">
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          `;
          foods.forEach((food) => {
            if (food.isAvailable === true) {
              rowString += menu.foodMakerNoAuth(food);
            }
          });
          const domString = `<table class='table table-bordered'>` + headerString + rowString + `</table>` // eslint-disable-line
          utils.printToDom('#food', domString);
        });
    }
  })
    .catch((err) => console.error('it broke', err));
};

const addFoodEvent = (e) => {
  e.preventDefault();
  const newFood = {
    name: $('#addFood-name').val(),
    price: $('#addFood-price').val() * 1,
    isAvailable: true,
  };
  console.warn(newFood);
  foodData.addFood(newFood)
    .then(() => {
      menu.authFood();
      utils.printToDom('#new-food', '');
    })
    .catch((err) => console.error('could not add food', err));
};

const foodListEvents = () => {
  $('body').on('click', '#food-adder', addFoodEvent);
  $('body').on('click', '#add-food', addFood.showAddFoodForm);
};

export default { buildFoods, addFoodEvent, foodListEvents };