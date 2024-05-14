import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config/config";
import axios from "axios";
import '../styles/Registro.css';

export default function Registro() {
  const [userData, setUserData] = useState({
    dni: '',
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    fecha_nacimiento: null,    
    email : '',
    telefono:'',
    sexo:'',
    contra:'',
    tipoCuenta: 'estudiante'
  });

  const [confirmarContra, setConfirmarContra] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    console.log("contra "+ userData.contra);
    console.log("confirmar contra "+ confirmarContra);
    if (userData.contra !== confirmarContra) {
      alert("Las contraseñas no coinciden");
      return;
    }  
    try {
      let url;
      if (userData.tipoCuenta === 'estudiante') {
        url = `${API_URL}/estudiantes/register`;
      } else if (userData.tipoCuenta === 'profesor') {
        url = `${API_URL}/profesores/register`;
      }
      
      const response = await axios.post(url, userData);
      // Manejar la respuesta según sea necesario
    } catch (error) {      
      const errorInfo = error.response.data;
      setError(errorInfo.error);
      alert(errorInfo.error);
    }
  };  
         

  const resetFields = () => {
    setUserData({
      dni: '',
      nombre: '',
      apellido: '',
      fecha_nacimiento: null,      
      email: '',      
      sexo: '',
      telefono:'',
      contra:'',
    });
    setConfirmarContra('');
  };

  return (
    <body>
        <Helmet>
        <title>Registro</title>
        </Helmet>
        <main>
            <div className='section-container bg-logo'>                
            </div>
        <div className='section-register'>
            <form onSubmit={enviarDatos} className="register-form">
            <h2 >Registro</h2>
            <h3 >Informacion personal</h3>
            <div>
                <div>
                    <label htmlFor='email'>
                        <strong>Email</strong>
                    </label>
                    <input type='email' placeholder='Digite correo' onChange={onChange} required value={userData.email} name='email' className='form-control rounded-0 'style={{ width: '300px' }}></input>
                    </div>
                    <div>
                    <label htmlFor='dni'>
                        <strong>DNI</strong>
                    </label>
                    <input type='text' placeholder='Digite DNI' onChange={onChange} maxLength={8} required value={userData.dni} name='dni' className='form-control rounded-0' style={{ width: '300px' }}/>
                    </div>
                </div>
                <div>
                    <div>
                    <label htmlFor='nombre'>
                        <strong>Nombre</strong>
                    </label>
                    <input type='text' placeholder='Digite Nombre' onChange={onChange} required value={userData.nombre} name='nombre' className='form-control rounded-0' style={{ width: '300px' }}></input>
                    </div>
                    <div>
                    <label htmlFor='apellido_pat'>
                      <strong>Apellido Paterno</strong>
                    </label>
                    <input type='text' placeholder='Digite Apellido Paterno' onChange={onChange} required value={userData.apellido_pat} name='apellido_pat' className='form-control rounded-0' style={{ width: '300px' }}></input>
                  </div>
                  <div>
                    <label htmlFor='apellido_mat'>
                      <strong>Apellido Materno</strong>
                    </label>
                    <input type='text' placeholder='Digite Apellido Materno' onChange={onChange} required value={userData.apellido_mat} name='apellido_mat' className='form-control rounded-0' style={{ width: '300px' }}></input>
                  </div>
                </div>
                <div>
                <div className='date-picker-container'>
                    <label htmlFor='fecha_nacimiento'>
                        <strong>Fecha Nacimiento</strong>
                    </label>
                    <DatePicker
                        selected={userData.fecha_nacimiento}
                        onChange={(date) => setUserData({ ...userData, fecha_nacimiento: date })}
                        placeholderText='Digite o seleccione su cumpleaños'
                        className='form-control rounded-0'                  
                        dateFormat='dd/MM/yy'                  
                    />
                </div>
                </div>
                <div>
                <label htmlFor='sexo'>
                    <strong>Sexo</strong>
                </label>
                <select 
                    onChange={onChange}
                    value={userData.sexo}
                    name='sexo'                    
                    style={{ width: '300px' }}
                    required
                >
                    <option disabled value=''>Seleccionar</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>                
                </select>
                </div>
                <div>
                <label htmlFor='telefono'>
                    <strong>Telefono</strong>
                </label>
                <input
                    type='text'
                    placeholder='Digite Telefono'
                    onChange={onChange}
                    maxLength={9} 
                    required
                    value={userData.telefono}
                    name='telefono'
                    className='form-control rounded-0'
                    style={{ width: '300px' }}
                />
                </div>
                <div>
                    <label htmlFor='contra'>
                        <strong>Contraseña</strong>
                    </label>
                    <input 
                        type='password' 
                        placeholder='Digite Contraseña' 
                        onChange={onChange} 
                        required 
                        value={userData.contra} 
                        name='contra' 
                        className='form-control rounded-0' 
                        style={{ width: '300px' }} 
                    />
                </div>
                <div>
                    <label htmlFor='confirmarContra'>
                        <strong>Confirmar Contraseña</strong>
                    </label>
                    <input 
                  type='password' 
                  placeholder='Confirme Contraseña' 
                  onChange={(e) => setConfirmarContra(e.target.value)}
                  required 
                  value={confirmarContra}
                  name='confirmarContra' 
                  className='form-control rounded-0' 
                  style={{ width: '300px' }} 
                />
                </div>
                <select
                  name="tipoCuenta"
                  value={userData.tipoCuenta}
                  onChange={onChange}
                >
                  <option disabled value=''>Seleccionar</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                </select>            
            <button>Registrar</button>
            </form>
        </div>
        </main>
    </body>
  );  
}