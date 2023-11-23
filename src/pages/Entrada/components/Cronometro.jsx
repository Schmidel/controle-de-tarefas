import React, { useState, useEffect } from "react";

const AmpulhetaCronometro = ({ tempoInicial }) => {
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);
  const [pausado, setPausado] = useState(true);

  useEffect(() => {
    let intervalId = null;
    if (!pausado) {
      intervalId = setInterval(() => {
        setTempoRestante((tempoRestante) => tempoRestante - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [pausado]);

  const reiniciarCronometro = () => {
    setTempoRestante(tempoInicial);
    setPausado(true);
  };

  const comecarCronometro = () => {
    setPausado(false);
  };

  const pausarCronometro = () => {
    setPausado(true);
  };

  const segundos = `0${tempoRestante % 60}`.slice(-2);
  const minutos = `0${Math.floor(tempoRestante / 60) % 60}`.slice(-2);
  const horas = `0${Math.floor(tempoRestante / 3600)}`.slice(-2);

  return (
    <div className="ampulheta-cronometro">
      <div className="ampulheta">
        {/* implemente a ampulheta */}
      </div>
      <div className="cronometro">
        <span className="horas">{horas}</span>:<span className="minutos">{minutos}</span>:<span className="segundos">{segundos}</span>
      </div>
      <div className="botoes">
        <button onClick={reiniciarCronometro}>Reiniciar</button>
        {pausado ? (
          <button onClick={comecarCronometro}>Começar</button>
        ) : (
          <button onClick={pausarCronometro}>Pausar</button>
        )}
      </div>
    </div>
  );
};

export default AmpulhetaCronometro;
