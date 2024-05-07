import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from "../config/config";
import axios from "axios";
import '../styles/Registro.css';

export default function Registro() {
  
  const [clienteData, setData] = useState({
    dni: '',
    nombre: '',
    apellidoPat: '',
    apellidoMat: '',
    fechaNacimiento: null,
    distrito: '',
    departamento: '',
    email : '',
    telefono:'',
    sexo:'',
    contra:'',
  });
  const [confirmarContra, setConfirmarContra] = useState('')
  const [showModal, setShowModal] = useState(false);  

  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'confirmarContra') {
      setConfirmarContra(value);
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const enviarDatos = async (e) => {
    e.preventDefault();
    console.log("Contraseña:", clienteData.contra);
    console.log("Confirmar Contraseña:", confirmarContra);
    
    if (clienteData.contra !== confirmarContra) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    try {
      const url = `${API_URL}/estudiante/registrar`;
      const response = await axios.post(url, clienteData);
      setShowModal(true);
    } catch (error) {      
      const errorInfo = error.response.data;
      setError(errorInfo.error);
      alert(errorInfo.error);
    }
  }; 
         

  const resetFields = () => {
    setData({
      dni: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: null,      
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
                    <input type='email' placeholder='Digite correo' onChange={onChange} required value={clienteData.email} name='email' className='form-control rounded-0 'style={{ width: '300px' }}></input>
                    </div>
                    <div>
                    <label htmlFor='dni'>
                        <strong>DNI</strong>
                    </label>
                    <input type='text' placeholder='Digite DNI' onChange={onChange} maxLength={8} required value={clienteData.dni} name='dni' className='form-control rounded-0' style={{ width: '300px' }}/>
                    </div>
                </div>
                <div>
                    <div>
                    <label htmlFor='nombre'>
                        <strong>Nombre</strong>
                    </label>
                    <input type='text' placeholder='Digite Nombre' onChange={onChange} required value={clienteData.nombre} name='nombre' className='form-control rounded-0' style={{ width: '300px' }}></input>
                    </div>
                    <div>
                    <label htmlFor='apellido'>
                        <strong>Apellido Paterno</strong>
                    </label>
                        <input type='text' placeholder='Digite Apellido Paterno' onChange={onChange} required value={clienteData.apellidoPat} name='apellido' className='form-control rounded-0'style={{ width: '300px' }}></input>
                    </div>
                    <div>
                    <label htmlFor='apellido'>
                        <strong>Apellido Materno</strong>
                    </label>
                        <input type='text' placeholder='Digite Apellido Materno' onChange={onChange} required value={clienteData.apellidoMat} name='apellido' className='form-control rounded-0'style={{ width: '300px' }}></input>
                    </div>
                </div>
                <div>
                <div className='date-picker-container'>
                    <label htmlFor='fechaNacimiento'>
                        <strong>Fecha Nacimiento</strong>
                    </label>
                    <DatePicker
                        selected={clienteData.fechaNacimiento}
                        onChange={(date) => setData({ ...clienteData, fechaNacimiento: date })}
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
                    value={clienteData.sexo}
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
                    value={clienteData.telefono}
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
                        value={clienteData.contra} 
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
                            onChange={onChange} 
                            required 
                            value={clienteData.confirmarContra} 
                            name='confirmarContra' 
                            className='form-control rounded-0' 
                            style={{ width: '300px' }} 
                    />                                    
                </div>            
            <button>Registrar</button>
            </form>
        </div>
        </main>
    </body>
  );  
}