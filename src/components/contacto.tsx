import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

import "./css/contacto.css";

const Contacto = () => {
  const form = useRef<HTMLFormElement>(null);
  const [mensaje, setMensaje] = useState('');
  const [copiado, setCopiado] = useState(false);
  const email = 'javih.dev95@gmail.com';

  const copiarEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm('service_p5wtvjb', 'template_y4hns3a', form.current, {
        publicKey: 'w2N5IkWy2lpT_INmD',
      })
      .then(() => {
        setMensaje('¡Mensaje enviado con éxito!');
        form.current?.reset();
        setTimeout(() => setMensaje(''), 4000);
      })
      .catch((error) => {
        setMensaje('Error al enviar el mensaje. Intenta nuevamente.');
        console.error(error);
        setTimeout(() => setMensaje(''), 4000);
      });
  };

  return (
    <section className="contacto">
      <h2>Contacto</h2>
      <p>¿Querés hablar sobre desarrollo, videojuegos o tecnología? ¡Estoy abierto a propuestas y colaboraciones!</p>

      <div className="contact-info">
        <div className="email">
          <FaEnvelope /> <span>{email}</span>
          <button onClick={copiarEmail}>
            {copiado ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        <div className="redes">
          <a href="https://github.com/Javih95" target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/javier-aguirre95" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>
      <h2>o enviame tus datos y yo contactaré con vos</h2>
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder="Tu Nombre" required />
        <input type="email" name="user_email" placeholder="Tu Email" required />
        <textarea name="message" placeholder="Tu Mensaje" rows={5} required />
        <button type="submit">Enviar</button>
      </form>

      {mensaje && <p className="mensaje-form">{mensaje}</p>}
    </section>
  );
};

export default Contacto;
