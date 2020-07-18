import souvData from '../../helpers/data/souvData';
import utils from '../../helpers/utils';
import souvBuilder from '../souvBuilder/souvBuilder';
import addSouv from '../addSouv/addSouv';

import './souvList.scss';
import editSouv from '../editSouv/editSouv';

const newSouvEvent = (e) => {
  e.preventDefault();
  const newSouvObj = {
    name: $('#addSouv-name').val(),
    price: $('#addSouv-price').val(),
    description: $('#addSouv-description').val(),
    imageUrl: $('#addSouv-imageUrl').val(),
    isAvailable: $('#addSouv-isAvailable').prop('checked'),
  };
  souvData.addSouv(newSouvObj)
    .then(() => {
      souvBuilder.souvCardBuilder();
      utils.printToDom('#new-souv', '');
    })
    .catch((err) => console.error(err));
};

const removeSouvEvent = (e) => {
  e.preventDefault();
  const souvId = e.target.closest('.souv-card').id;
  souvData.deleteSouv(souvId)
    .then(() => {
      souvBuilder.souvCardBuilder();
    })
    .catch((err) => console.error(err));
};

const editSouvEvent = (e) => {
  e.preventDefault();
  const { souvId } = document.querySelector('#souv-id-finder').dataset;
  console.error(souvId);
  const updatedSouv = {
    name: $('#editSouv-name').val(),
    price: $('#editSouv-price').val(),
    description: $('#editSouv-description').val(),
    imageUrl: $('#editSouv-imageUrl').val(),
    isAvailable: $('#editSouv-isAvailable').prop('checked'),
  };

  souvData.editSouv(souvId, updatedSouv)
    .then(() => {
      souvBuilder.souvCardBuilder();
      utils.printToDom('#edit-souv', '');
    })
    .catch((err) => console.error(err));
};

const souvViewEvent = (e) => {
  e.preventDefault();
  $('#souvenirs').removeClass('hide');
  souvBuilder.souvCardBuilder();
};

const souvEvents = () => {
  $('body').on('click', '#viewSouv', souvViewEvent);
  $('body').one('click', '#add-souv', addSouv.addSouvForm);
  $('body').one('click', '#souv-adder', newSouvEvent);
  $('body').on('click', '#delete-souv', removeSouvEvent);
  $('body').on('click', '#update-souv', editSouv.editSouvForm);
  $('body').on('click', '#souv-editor', editSouvEvent);
};

export default { souvEvents };
