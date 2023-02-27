// Importar las bibliotecas necesarias
const $ = require('jquery');
const { ajax } = require('jquery');
const { jest } = require('@jest/globals');

// Importar el código que se va a probar
require('../path/to/your/javascript/file');

// Crear una prueba
describe('test update_user form submission', () => {
  // Simular la solicitud Ajax
  jest.spyOn($, 'ajax').mockImplementation(() => {
    return {
      done: function(callback) {
        callback('Success');
      }
    };
  });

  // Crear un mock del evento preventDefault
  const event = { preventDefault: jest.fn() };

  // Crear un mock del objeto jQuery para el formulario de actualización del usuario
  const $form = $('<form id="update_user"><input name="id" value="1"><input name="name" value="John"></form>');

  // Disparar el evento submit del formulario y comprobar que se llama a la función ajax
  test('should send update request to API when form is submitted', () => {
    $form.trigger('submit', [event]);
    expect(event.preventDefault).toHaveBeenCalled();
    expect($.ajax).toHaveBeenCalled();
    expect($.ajax).toHaveBeenCalledWith({
      url: 'http://localhost:3000/api/users/1',
      method: 'PUT',
      data: { id: '1', name: 'John' }
    });
  });
});
