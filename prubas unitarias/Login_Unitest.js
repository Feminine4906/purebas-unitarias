describe('Login process', () => {
    let userElement;
    let claveElement;
  
    beforeEach(() => {
      // crea elementos HTML de usuario y clave
      userElement = document.createElement('input');
      userElement.id = 'usuario';
      claveElement = document.createElement('input');
      claveElement.id = 'clave';
      document.body.appendChild(userElement);
      document.body.appendChild(claveElement);
    });
  
    afterEach(() => {
      // elimina elementos HTML
      userElement.remove();
      claveElement.remove();
    });
  
    it('should display an error message if the user enters incorrect data', () => {
      // configura elementos HTML y valores incorrectos
      userElement.value = 'usuario1';
      claveElement.value = 'clave1';
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const clearInput = jest.fn();
  
      // llama a la función login con datos incorrectos
      login();
  
      // verifica que se muestre un mensaje de error y que se llame a clearInput
      expect(alertSpy).toHaveBeenCalledWith('Los datos introducidos son INCORRECTOS');
      expect(clearInput).toHaveBeenCalled();
      alertSpy.mockRestore();
    });
  
    it('should redirect if the user enters correct data', () => {
      // configura elementos HTML y valores correctos
      userElement.value = 'usuario';
      claveElement.value = 'clave';
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const redirect = jest.fn();
  
      // llama a la función login con datos correctos
      login();
  
      // verifica que se muestre un mensaje de éxito y que se llame a redirect
      expect(alertSpy).toHaveBeenCalledWith('Los datos introducidos son CORRECTOS.');
      expect(redirect).toHaveBeenCalled();
      alertSpy.mockRestore();
    });
  });
  