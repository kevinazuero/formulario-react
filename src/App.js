import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateNombre = (nombre) => {
    if (nombre.trim() === '') {
      return 'El nombre es requerido';
    }
    if (nombre.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    return '';
  };

  const validateCorreo = (correo) => {
    if (correo.trim() === '') {
      return 'El correo es requerido';
    }
    if (!emailRegex.test(correo)) {
      return 'Por favor ingresa un correo válido';
    }
    return '';
  };

  const validateContrasena = (contrasena) => {
    if (contrasena === '') {
      return 'La contraseña es requerida';
    }
    if (contrasena.length < 8) {
      return 'La contraseña debe tener mínimo 8 caracteres';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      validateField(name, value);
    }
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'nombre':
        error = validateNombre(value);
        break;
      case 'correo':
        error = validateCorreo(value);
        break;
      case 'contrasena':
        error = validateContrasena(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos
    const nombreError = validateNombre(formData.nombre);
    const correoError = validateCorreo(formData.correo);
    const contrasenaError = validateContrasena(formData.contrasena);

    setErrors({
      nombre: nombreError,
      correo: correoError,
      contrasena: contrasenaError
    });

    // Si no hay errores, procesar el formulario
    if (!nombreError && !correoError && !contrasenaError) {
      alert('¡Registro exitoso! Todos los datos son válidos.');
      setFormData({ nombre: '', correo: '', contrasena: '' });
      setErrors({ nombre: '', correo: '', contrasena: '' });
    } else {
      alert('Por favor corrige los errores en el formulario.');
    }
  };

  // PASO 5: El JSX actualizado con estados y eventos (va en el return)
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body p-4">
                <h1 className="text-center mb-4 text-warning">Crear Cuenta</h1>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.nombre && (
                      <div className="text-danger small mt-1">{errors.nombre}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                      value={formData.correo}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.correo && (
                      <div className="text-danger small mt-1">{errors.correo}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contrasena" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="contrasena"
                      name="contrasena"
                      className={`form-control ${errors.contrasena ? 'is-invalid' : ''}`}
                      value={formData.contrasena}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.contrasena && (
                      <div className="text-danger small mt-1">{errors.contrasena}</div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-warning btn-lg w-100">
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;