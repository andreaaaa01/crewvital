/* CrewVital - contenido y umbrales (dominio publico, CC0).
   Los umbrales son valores de referencia generales para adultos con fines de demostracion
   y deben ser validados por un cirujano de vuelo. No es un dispositivo medico. */

var HAZARDS = {
  radiation: { es: 'Radiación espacial', en: 'Space radiation' },
  isolation: { es: 'Aislamiento y confinamiento', en: 'Isolation and confinement' },
  distance:  { es: 'Distancia a la Tierra', en: 'Distance from Earth' },
  gravity:   { es: 'Campos de gravedad', en: 'Gravity fields' },
  closed:    { es: 'Entornos cerrados y hostiles', en: 'Closed and hostile environments' }
};

var HAZARD_INFO = {
  radiation: {
    es: 'Daño celular, alteraciones del sistema inmunológico y mayor riesgo cardiovascular y de cáncer a largo plazo.',
    en: 'Cell damage, immune changes, and higher long-term cardiovascular and cancer risk.'
  },
  isolation: {
    es: 'Estrés crónico, cambios de ánimo, fatiga y alteración del ritmo circadiano en grupos pequeños y aislados.',
    en: 'Chronic stress, mood changes, fatigue, and circadian disruption in small, isolated groups.'
  },
  distance: {
    es: 'Atención médica, suministros y ayuda tardan o no llegan: la tripulación debe ser autónoma.',
    en: 'Medical care, supplies, and help are delayed or unavailable: the crew must be self-sufficient.'
  },
  gravity: {
    es: 'Pérdida de hueso y músculo, desacondicionamiento del corazón y redistribución de fluidos corporales.',
    en: 'Bone and muscle loss, heart deconditioning, and shifts in body fluids.'
  },
  closed: {
    es: 'Calidad del aire, temperatura, ruido, microbios y defensas: la nave es casa y máquina a la vez.',
    en: 'Air quality, temperature, noise, microbes, and immunity: the vehicle is both home and machine.'
  }
};

/* Entornos de mision. gravity/delay/evac son descripciones generales. */
var ENVS = {
  transit: {
    name: { es: 'Nave en tránsito a Marte', en: 'Spacecraft in transit to Mars' },
    gravity: { es: 'Microgravedad', en: 'Microgravity' },
    delay: { es: 'Crece con la distancia (hasta unos 20 min por trayecto)', en: 'Grows with distance (up to ~20 min one way)' },
    evac: { es: 'Sin retorno inmediato: semanas a meses', en: 'No immediate return: weeks to months' },
    hazards: ['radiation', 'distance', 'isolation', 'gravity', 'closed'],
    escalate: { es: 'el cirujano de vuelo en Tierra', en: 'the ground flight surgeon' },
    note: { es: 'La respuesta puede tardar: actúa con autonomía y deja un mensaje completo.', en: 'The reply may be delayed: act autonomously and leave a complete message.' }
  },
  station: {
    name: { es: 'Estación espacial (órbita baja)', en: 'Space station (low Earth orbit)' },
    gravity: { es: 'Microgravedad', en: 'Microgravity' },
    delay: { es: 'Casi inmediata (segundos)', en: 'Near real time (seconds)' },
    evac: { es: 'Retorno posible en el orden de horas', en: 'Return possible within hours' },
    hazards: ['gravity', 'isolation', 'closed', 'radiation'],
    escalate: { es: 'el cirujano de vuelo en Tierra', en: 'the ground flight surgeon' },
    note: { es: 'La comunicación es casi inmediata: pide apoyo en tiempo real.', en: 'Communication is near real time: ask for live support.' }
  },
  moonbase: {
    name: { es: 'Base en la superficie lunar', en: 'Lunar surface base' },
    gravity: { es: 'Gravedad lunar (cerca de 1/6 de la terrestre)', en: 'Lunar gravity (about 1/6 of Earth)' },
    delay: { es: 'Corta (unos 1,3 s por trayecto)', en: 'Short (about 1.3 s one way)' },
    evac: { es: 'Retorno a la Tierra en días', en: 'Return to Earth in days' },
    hazards: ['radiation', 'gravity', 'closed', 'distance'],
    escalate: { es: 'el cirujano de vuelo en Tierra', en: 'the ground flight surgeon' },
    note: { es: 'Retraso corto: puedes dialogar con Tierra, pero el retorno tarda días.', en: 'Short delay: you can talk to Earth, but return takes days.' }
  },
  marsbase: {
    name: { es: 'Base en la superficie de Marte', en: 'Mars surface base' },
    gravity: { es: 'Gravedad marciana (3/8 de la terrestre)', en: 'Martian gravity (3/8 of Earth)' },
    delay: { es: 'De unos 3 a 22 min por trayecto', en: 'About 3 to 22 min one way' },
    evac: { es: 'Sin evacuación posible durante meses', en: 'No evacuation possible for months' },
    hazards: ['distance', 'radiation', 'gravity', 'isolation', 'closed'],
    escalate: { es: 'el cirujano de vuelo en Tierra', en: 'the ground flight surgeon' },
    note: { es: 'No esperes respuesta inmediata: actúa con autonomía y deja un mensaje completo.', en: 'Do not expect an immediate reply: act autonomously and leave a complete message.' }
  },
  rover: {
    name: { es: 'Rover presurizado de exploración', en: 'Pressurized exploration rover' },
    gravity: { es: 'Depende del destino (Luna o Marte)', en: 'Depends on the destination (Moon or Mars)' },
    delay: { es: 'Depende de la ubicación', en: 'Depends on location' },
    evac: { es: 'Regreso a la base en horas', en: 'Return to base in hours' },
    hazards: ['closed', 'radiation', 'gravity', 'distance'],
    escalate: { es: 'la base y el cirujano de vuelo', en: 'the base and the flight surgeon' },
    note: { es: 'Avisa a la base y prepara el regreso si el valor es crítico.', en: 'Alert the base and prepare to return if the value is critical.' }
  },
  earth: {
    name: { es: 'Tierra: comunidad remota (impacto dual)', en: 'Earth: remote community (dual impact)' },
    gravity: { es: 'Gravedad normal (1 g)', en: 'Normal gravity (1 g)' },
    delay: { es: 'Conectividad limitada o intermitente', en: 'Limited or intermittent connectivity' },
    evac: { es: 'Horas a días hasta un hospital', en: 'Hours to days to reach a hospital' },
    hazards: ['distance', 'isolation'],
    escalate: { es: 'el personal de salud o la telemedicina', en: 'the health worker or telemedicine' },
    note: { es: 'Si no hay conexión, traslada a la persona al centro de salud más cercano.', en: 'If there is no connection, take the person to the nearest health center.' }
  }
};

var STATES = {
  label: { es: ['NORMAL', 'PRECAUCIÓN', 'CRÍTICO'], en: ['NORMAL', 'CAUTION', 'CRITICAL'] },
  color: ['#2fbf71', '#f0b429', '#ff5c5c']
};

var REGIONS = {
  head: {
    name: { es: 'Cerebro y conducta', en: 'Brain and behavior' },
    fn: { es: 'Controla el pensamiento, el ánimo y el sueño.', en: 'Controls thinking, mood, and sleep.' },
    risk: { es: 'El aislamiento y el confinamiento causan estrés, fatiga y alteran el ritmo circadiano. La radiación puede afectar el sistema nervioso.', en: 'Isolation and confinement cause stress and fatigue and disrupt circadian rhythm. Radiation may affect the nervous system.' },
    hazards: ['isolation', 'radiation'], inds: ['sleep', 'mood']
  },
  heart: {
    name: { es: 'Corazón y circulación', en: 'Heart and circulation' },
    fn: { es: 'Bombea la sangre a todo el cuerpo.', en: 'Pumps blood through the body.' },
    risk: { es: 'En microgravedad los fluidos suben hacia la cabeza y el corazón se desacondiciona. La radiación aumenta el riesgo cardiovascular a largo plazo.', en: 'In microgravity fluids shift toward the head and the heart deconditions. Radiation raises long-term cardiovascular risk.' },
    hazards: ['gravity', 'radiation'], inds: ['bp', 'hr']
  },
  lungs: {
    name: { es: 'Pulmones y aire de la cabina', en: 'Lungs and cabin air' },
    fn: { es: 'Llevan oxígeno a la sangre y sacan el CO2.', en: 'Bring oxygen into the blood and remove CO2.' },
    risk: { es: 'En entornos cerrados importan el oxígeno, el CO2 y el polvo de la cabina. En la Luna y Marte el polvo puede irritar las vías respiratorias.', en: 'In closed environments oxygen, CO2, and cabin dust matter. On the Moon and Mars dust can irritate the airways.' },
    hazards: ['closed'], inds: ['spo2']
  },
  abdomen: {
    name: { es: 'Metabolismo y nutrición', en: 'Metabolism and nutrition' },
    fn: { es: 'Convierte la comida en energía y regula la glucosa.', en: 'Turns food into energy and regulates glucose.' },
    risk: { es: 'La dieta limitada, el estrés y la hidratación comprometida en una nave cerrada pueden alterar la glucosa y la nutrición.', en: 'A limited diet, stress, and compromised hydration in a closed vehicle can alter glucose and nutrition.' },
    hazards: ['closed', 'isolation'], inds: ['glucose', 'nutrition']
  },
  bones: {
    name: { es: 'Huesos y músculos', en: 'Bones and muscles' },
    fn: { es: 'Sostienen el cuerpo y permiten moverse.', en: 'Support the body and allow movement.' },
    risk: { es: 'Con gravedad baja se pierde densidad ósea y masa muscular. El ejercicio diario es la principal medida de protección.', en: 'With low gravity bone density and muscle mass decline. Daily exercise is the main countermeasure.' },
    hazards: ['gravity'], inds: ['exercise']
  },
  body: {
    name: { es: 'Inmunidad, piel y radiación', en: 'Immunity, skin, and radiation' },
    fn: { es: 'Defiende al cuerpo de infecciones y regula la temperatura.', en: 'Defends the body against infection and regulates temperature.' },
    risk: { es: 'La radiación y el estrés alteran las defensas. En una cabina cerrada las infecciones se transmiten con facilidad.', en: 'Radiation and stress weaken defenses. In a closed cabin infections spread easily.' },
    hazards: ['radiation', 'closed'], inds: ['temp', 'radiation']
  }
};

var IND = [
  {
    id: 'bp', region: 'heart', when: 'am', hazards: ['gravity', 'radiation'], primary: 'sys',
    name: { es: 'Presión arterial', en: 'Blood pressure' },
    fields: [
      { key: 'sys', label: { es: 'Sistólica (número mayor)', en: 'Systolic (top number)' }, unit: 'mmHg', min: 40, max: 260, step: 1, normalMin: 90, normalMax: 129, critMin: 80, critMax: 179, sim: [118, 7] },
      { key: 'dia', label: { es: 'Diastólica (número menor)', en: 'Diastolic (bottom number)' }, unit: 'mmHg', min: 20, max: 160, step: 1, normalMin: 60, normalMax: 84, critMin: 50, critMax: 119, sim: [76, 5] }
    ],
    steps: {
      es: ['Siéntate o flota relajado durante 5 minutos, sin hablar.', 'Coloca el brazalete a la altura del corazón, sobre el brazo sin ropa.', 'Pulsa iniciar y no muevas el brazo hasta que termine.', 'Anota los dos números: el mayor (sistólica) y el menor (diastólica).'],
      en: ['Sit or float relaxed for 5 minutes, without talking.', 'Place the cuff at heart level on the bare arm.', 'Press start and keep your arm still until it finishes.', 'Write down both numbers: the top (systolic) and the bottom (diastolic).']
    },
    why: {
      es: 'Muestra cómo trabajan el corazón y los vasos sanguíneos. Es una de las primeras señales de un problema cardiovascular.',
      en: 'Shows how the heart and blood vessels are working. It is one of the first signs of a cardiovascular problem.'
    },
    space: {
      es: 'En microgravedad los fluidos se desplazan hacia la cabeza y el corazón pierde condición física.',
      en: 'In microgravity fluids shift toward the head and the heart loses fitness.'
    },
    actions: {
      normal: { es: 'Todo en rango. Mantén tu ejercicio e hidratación.', en: 'All in range. Keep up your exercise and hydration.' },
      caution: {
        es: ['Descansa 10 minutos y repite la medición.', 'Revisa tu hidratación y el consumo de sal.', 'Si sigue fuera de rango, avísale al cirujano de vuelo en la próxima comunicación.'],
        en: ['Rest 10 minutes and measure again.', 'Check your hydration and salt intake.', 'If it stays out of range, tell the flight surgeon at the next scheduled contact.']
      },
      critical: {
        es: ['Detente, sujétate con seguridad y repite la medición para confirmar.', 'Si hay dolor de pecho, falta de aire, mareo intenso o confusión, abre el Modo Emergencia.', 'Avisa de inmediato al cirujano de vuelo.'],
        en: ['Stop, secure yourself, and repeat the measurement to confirm.', 'If there is chest pain, shortness of breath, severe dizziness, or confusion, open Emergency Mode.', 'Tell the flight surgeon immediately.']
      }
    }
  },
  {
    id: 'hr', region: 'heart', when: 'am', hazards: ['gravity', 'closed'], primary: 'hr',
    name: { es: 'Frecuencia cardíaca', en: 'Heart rate' },
    fields: [
      { key: 'hr', label: { es: 'Latidos por minuto', en: 'Beats per minute' }, unit: 'lpm', min: 20, max: 240, step: 1, normalMin: 50, normalMax: 100, critMin: 40, critMax: 120, sim: [68, 6] }
    ],
    steps: {
      es: ['Descansa 5 minutos.', 'Coloca el sensor (reloj o banda) o busca el pulso en la muñeca.', 'Cuenta los latidos durante 30 segundos y multiplica por 2, o lee el valor del sensor.'],
      en: ['Rest for 5 minutes.', 'Put on the sensor (watch or strap) or find the pulse on your wrist.', 'Count beats for 30 seconds and multiply by 2, or read the sensor value.']
    },
    why: {
      es: 'Un pulso en reposo alterado puede indicar estrés, deshidratación, infección o un problema del corazón.',
      en: 'An abnormal resting pulse can point to stress, dehydration, infection, or a heart problem.'
    },
    space: {
      es: 'La falta de gravedad cambia el trabajo del corazón y el ejercicio insuficiente lo desacondiciona.',
      en: 'Lack of gravity changes how the heart works, and too little exercise deconditions it.'
    },
    actions: {
      normal: { es: 'Todo en rango. Sigue con tu rutina.', en: 'All in range. Keep your routine.' },
      caution: {
        es: ['Descansa y repite en 10 minutos.', 'Revisa hidratación, cafeína, sueño y estrés.', 'Informa al cirujano de vuelo si se mantiene.'],
        en: ['Rest and measure again in 10 minutes.', 'Check hydration, caffeine, sleep, and stress.', 'Tell the flight surgeon if it persists.']
      },
      critical: {
        es: ['Sujétate en reposo y repite la medición.', 'Si hay dolor de pecho, desmayo o falta de aire, abre el Modo Emergencia.', 'Avisa de inmediato al cirujano de vuelo.'],
        en: ['Secure yourself at rest and measure again.', 'If there is chest pain, fainting, or shortness of breath, open Emergency Mode.', 'Tell the flight surgeon immediately.']
      }
    }
  },
  {
    id: 'temp', region: 'body', when: 'am', hazards: ['closed', 'radiation'], primary: 'temp',
    name: { es: 'Temperatura corporal', en: 'Body temperature' },
    fields: [
      { key: 'temp', label: { es: 'Temperatura', en: 'Temperature' }, unit: '°C', min: 30, max: 43, step: 0.1, normalMin: 36.1, normalMax: 37.5, critMin: 35.1, critMax: 38.4, sim: [36.7, 0.25] }
    ],
    steps: {
      es: ['Usa el termómetro de la nave (oral o de oído) limpio.', 'Mide en reposo, 15 minutos después de comer, beber o hacer ejercicio.', 'Espera el aviso del termómetro y anota el valor en °C.'],
      en: ['Use the clean spacecraft thermometer (oral or ear).', 'Measure at rest, 15 minutes after eating, drinking, or exercising.', 'Wait for the thermometer signal and write down the value in °C.']
    },
    why: {
      es: 'La fiebre puede indicar una infección. También sirve para detectar estrés por calor o por frío.',
      en: 'Fever can signal an infection. It also helps detect heat or cold stress.'
    },
    space: {
      es: 'En una cabina cerrada y con defensas alteradas por el espacio, las infecciones se propagan con facilidad.',
      en: 'In a closed cabin with space-weakened defenses, infections spread easily.'
    },
    actions: {
      normal: { es: 'Todo en rango.', en: 'All in range.' },
      caution: {
        es: ['Repite en 30 minutos y toma líquidos.', 'Revisa la temperatura de la cabina o del traje.', 'Si hay síntomas de infección, sepárate de los demás y avisa al cirujano de vuelo.'],
        en: ['Measure again in 30 minutes and drink fluids.', 'Check cabin or suit temperature.', 'If there are infection symptoms, separate from others and tell the flight surgeon.']
      },
      critical: {
        es: ['Fiebre alta o temperatura muy baja: avisa de inmediato al cirujano de vuelo.', 'Enfría o abriga según el caso.', 'Si es fiebre, aísla al tripulante del resto.'],
        en: ['High fever or very low temperature: tell the flight surgeon immediately.', 'Cool or warm the person as needed.', 'If it is fever, isolate the crew member from others.']
      }
    }
  },
  {
    id: 'spo2', region: 'lungs', when: 'am', hazards: ['closed'], primary: 'spo2',
    name: { es: 'Oxígeno en sangre (SpO2)', en: 'Blood oxygen (SpO2)' },
    fields: [
      { key: 'spo2', label: { es: 'Saturación de oxígeno', en: 'Oxygen saturation' }, unit: '%', min: 50, max: 100, step: 1, normalMin: 95, normalMax: 100, critMin: 91, critMax: 100, sim: [97.5, 1] }
    ],
    steps: {
      es: ['Calienta la mano si está fría.', 'Coloca el oxímetro en la yema del dedo, sin esmalte de uñas.', 'Mantén la mano quieta unos segundos y lee el porcentaje.'],
      en: ['Warm your hand if it is cold.', 'Place the oximeter on a fingertip, without nail polish.', 'Keep your hand still for a few seconds and read the percentage.']
    },
    why: {
      es: 'Indica si la sangre lleva suficiente oxígeno. Un cambio en el aire de la cabina o un problema respiratorio se nota aquí.',
      en: 'Shows whether the blood carries enough oxygen. A change in cabin air or a breathing problem shows up here.'
    },
    space: {
      es: 'En entornos cerrados, fallas en el aire (oxígeno, CO2) o el polvo pueden afectar la respiración.',
      en: 'In closed environments, air system faults (oxygen, CO2) or dust can affect breathing.'
    },
    actions: {
      normal: { es: 'Todo en rango.', en: 'All in range.' },
      caution: {
        es: ['Respira profundo y repite en 5 minutos.', 'Revisa los parámetros de la cabina (oxígeno, CO2 y presión).', 'Avisa al cirujano de vuelo.'],
        en: ['Breathe deeply and measure again in 5 minutes.', 'Check cabin parameters (oxygen, CO2, and pressure).', 'Tell the flight surgeon.']
      },
      critical: {
        es: ['Verifica de inmediato la atmósfera de la cabina.', 'Si hay falta de aire, usa el oxígeno de emergencia si está disponible y abre el Modo Emergencia.', 'Avisa de inmediato al cirujano de vuelo.'],
        en: ['Immediately check the cabin atmosphere.', 'If short of breath, use emergency oxygen if available and open Emergency Mode.', 'Tell the flight surgeon immediately.']
      }
    }
  },
  {
    id: 'glucose', region: 'abdomen', when: 'am', hazards: ['closed', 'isolation'], primary: 'glucose',
    name: { es: 'Glucosa en sangre', en: 'Blood glucose' },
    fields: [
      { key: 'glucose', label: { es: 'Glucosa', en: 'Glucose' }, unit: 'mg/dL', min: 20, max: 600, step: 1, normalMin: 70, normalMax: 110, critMin: 55, critMax: 199, sim: [90, 8] }
    ],
    steps: {
      es: ['Lávate y seca las manos.', 'Inserta una tira nueva en el glucómetro.', 'Pincha el lado del dedo y toca la tira con la gota.', 'Lee el valor en mg/dL. Puedes adjuntar una foto de la pantalla.'],
      en: ['Wash and dry your hands.', 'Insert a new strip into the glucometer.', 'Prick the side of a finger and touch the strip to the drop.', 'Read the value in mg/dL. You can attach a photo of the screen.']
    },
    why: {
      es: 'Muestra cómo el cuerpo usa la energía. Valores muy altos o muy bajos pueden causar problemas graves.',
      en: 'Shows how the body uses energy. Very high or very low values can cause serious problems.'
    },
    space: {
      es: 'El estrés, el sueño corto y una dieta restringida pueden alterar la glucosa durante la misión.',
      en: 'Stress, short sleep, and a restricted diet can alter glucose during the mission.'
    },
    actions: {
      normal: { es: 'Todo en rango.', en: 'All in range.' },
      caution: {
        es: ['Si está alta: toma agua, revisa tu comida y repite en 2 horas.', 'Si está baja: toma una fuente rápida de azúcar y repite en 15 minutos.', 'Informa al cirujano de vuelo si se repite.'],
        en: ['If high: drink water, review your meal, and measure again in 2 hours.', 'If low: take a quick sugar source and measure again in 15 minutes.', 'Tell the flight surgeon if it repeats.']
      },
      critical: {
        es: ['Si es muy baja: toma azúcar de inmediato; si hay confusión, pide ayuda a otro tripulante.', 'Si es muy alta: avisa de inmediato al cirujano de vuelo.', 'No esperes a la comunicación programada.'],
        en: ['If very low: take sugar immediately; if confused, ask another crew member for help.', 'If very high: tell the flight surgeon immediately.', 'Do not wait for the scheduled contact.']
      }
    }
  },
  {
    id: 'sleep', region: 'head', when: 'am', hazards: ['isolation', 'closed'], primary: 'sleep',
    name: { es: 'Horas de sueño', en: 'Sleep hours' },
    fields: [
      { key: 'sleep', label: { es: 'Horas dormidas anoche', en: 'Hours slept last night' }, unit: 'h', min: 0, max: 16, step: 0.1, normalMin: 7, normalMax: 11, critMin: 5, critMax: 16, sim: [7.4, 0.6] }
    ],
    steps: {
      es: ['Registra las horas que dormiste esta noche.', 'Usa el sensor de sueño o una estimación honesta.', 'Anota si te despertaste muchas veces.'],
      en: ['Record the hours you slept last night.', 'Use the sleep sensor or an honest estimate.', 'Note if you woke up many times.']
    },
    why: {
      es: 'Dormir poco aumenta los errores, el estrés y el riesgo para la salud. Es una señal temprana de problemas de adaptación.',
      en: 'Sleeping little raises errors, stress, and health risk. It is an early sign of adaptation problems.'
    },
    space: {
      es: 'El aislamiento y los ciclos de luz alterados desajustan el ritmo circadiano.',
      en: 'Isolation and altered light cycles disrupt the circadian rhythm.'
    },
    actions: {
      normal: { es: 'Todo en rango. Mantén el horario.', en: 'All in range. Keep your schedule.' },
      caution: {
        es: ['Revisa la luz y el horario de la cabina.', 'Evita pantallas y cafeína antes de dormir.', 'Si dura más de 3 días, habla con el apoyo psicológico o el cirujano de vuelo.'],
        en: ['Check cabin lighting and schedule.', 'Avoid screens and caffeine before sleep.', 'If it lasts more than 3 days, talk to psychological support or the flight surgeon.']
      },
      critical: {
        es: ['Informa al cirujano de vuelo y al apoyo psicológico.', 'Reduce tareas críticas hasta recuperarte.', 'Pide a un compañero que revise tus tareas.'],
        en: ['Tell the flight surgeon and psychological support.', 'Reduce critical tasks until you recover.', 'Ask a teammate to double-check your tasks.']
      }
    }
  },
  {
    id: 'mood', region: 'head', when: 'am', hazards: ['isolation'], primary: 'mood',
    name: { es: 'Estado de ánimo', en: 'Mood' },
    fields: [
      { key: 'mood', label: { es: 'Cómo te sientes (1 a 5)', en: 'How you feel (1 to 5)' }, unit: '/5', min: 1, max: 5, step: 1, normalMin: 4, normalMax: 5, critMin: 3, critMax: 5, sim: [4, 0.7] }
    ],
    steps: {
      es: ['Elige un número del 1 al 5 según cómo te sientes hoy.', '1 = muy mal, 3 = regular, 5 = muy bien.', 'Piensa en un motivo si puedes.'],
      en: ['Pick a number from 1 to 5 for how you feel today.', '1 = very bad, 3 = so-so, 5 = very good.', 'Think of a reason if you can.']
    },
    why: {
      es: 'Detectar a tiempo una caída del ánimo ayuda a la tripulación a apoyarse y evita problemas mayores.',
      en: 'Catching a drop in mood early helps the crew support each other and avoids bigger problems.'
    },
    space: {
      es: 'El aislamiento y el confinamiento en grupos pequeños afectan el ánimo y la convivencia.',
      en: 'Isolation and confinement in small groups affect mood and teamwork.'
    },
    actions: {
      normal: { es: 'Todo en rango.', en: 'All in range.' },
      caution: {
        es: ['Habla con un compañero de confianza.', 'Mantén tu rutina y haz una actividad que disfrutes.', 'Si dura 3 días, avisa al apoyo psicológico.'],
        en: ['Talk to a trusted teammate.', 'Keep your routine and do something you enjoy.', 'If it lasts 3 days, tell psychological support.']
      },
      critical: {
        es: ['Informa hoy mismo al apoyo psicológico y al cirujano de vuelo.', 'No te quedes solo: avisa a un compañero.', 'Si hay pensamientos de hacerte daño, abre el Modo Emergencia.'],
        en: ['Tell psychological support and the flight surgeon today.', 'Do not stay alone: tell a teammate.', 'If you have thoughts of harming yourself, open Emergency Mode.']
      }
    }
  },
  {
    id: 'radiation', region: 'body', when: 'pm', hazards: ['radiation'], primary: 'radiation',
    name: { es: 'Dosis de radiación acumulada', en: 'Cumulative radiation dose' },
    fields: [
      { key: 'radiation', label: { es: 'Dosis efectiva acumulada de carrera', en: 'Cumulative career effective dose' }, unit: 'mSv', min: 0, max: 1000, step: 0.1, normalMin: 0, normalMax: 299.9, critMin: -1, critMax: 479.9, sim: [150, 0] }
    ],
    steps: {
      es: ['Lee el dosímetro personal (pantalla o registro).', 'Anota la dosis efectiva acumulada en mSv.', 'Revisa si hay alertas de tormenta solar.'],
      en: ['Read the personal dosimeter (screen or log).', 'Write down the cumulative effective dose in mSv.', 'Check for solar storm alerts.']
    },
    why: {
      es: 'La radiación daña las células y sube el riesgo de cáncer y de enfermedades del corazón. NASA limita la dosis total de carrera a menos de 600 mSv y aplica el principio ALARA (tan baja como sea razonable).',
      en: 'Radiation damages cells and raises cancer and heart disease risk. NASA limits total career dose to under 600 mSv and applies the ALARA principle (as low as reasonably achievable).'
    },
    space: {
      es: 'Fuera del escudo de la Tierra la exposición es mayor. Los umbrales de esta app son el 50% y el 80% del límite de 600 mSv.',
      en: 'Outside Earth\'s shield exposure is higher. This app\'s thresholds are 50% and 80% of the 600 mSv limit.'
    },
    actions: {
      normal: { es: 'Menos del 50% del límite de carrera. Sigue el principio ALARA.', en: 'Below 50% of the career limit. Keep following ALARA.' },
      caution: {
        es: ['Reduce el tiempo en zonas con menos blindaje.', 'Revisa el plan de misión para minimizar la dosis (ALARA).', 'Informa al cirujano de vuelo.'],
        en: ['Reduce time in less-shielded areas.', 'Review the mission plan to minimize dose (ALARA).', 'Tell the flight surgeon.']
      },
      critical: {
        es: ['Informa de inmediato al cirujano de vuelo y a control de misión.', 'La dosis se acerca al límite de carrera: revisa el plan de misión.', 'Usa el refugio con más blindaje durante eventos solares.'],
        en: ['Tell the flight surgeon and mission control immediately.', 'Dose is nearing the career limit: review the mission plan.', 'Use the best-shielded shelter during solar events.']
      }
    }
  },
  {
    id: 'exercise', region: 'bones', when: 'pm', hazards: ['gravity'], primary: 'exercise',
    name: { es: 'Ejercicio del día', en: 'Exercise today' },
    fields: [
      { key: 'exercise', label: { es: 'Minutos de ejercicio', en: 'Minutes of exercise' }, unit: 'min', min: 0, max: 400, step: 5, open: true, normalMin: 60, normalMax: 400, critMin: -1, critMax: 400, sim: [75, 12] }
    ],
    steps: {
      es: ['Suma los minutos de ejercicio de hoy (cinta, bicicleta, fuerza).', 'Incluye ejercicio de fuerza y de resistencia cardiovascular.', 'Anota el total.'],
      en: ['Add up today\'s exercise minutes (treadmill, bike, strength).', 'Include both strength and cardiovascular work.', 'Write down the total.']
    },
    why: {
      es: 'El ejercicio diario es la principal defensa contra la pérdida de hueso y músculo y el desacondicionamiento del corazón.',
      en: 'Daily exercise is the main defense against bone and muscle loss and heart deconditioning.'
    },
    space: {
      es: 'Con gravedad baja los huesos y los músculos se debilitan si no se ejercitan.',
      en: 'With low gravity, bones and muscles weaken if they are not exercised.'
    },
    actions: {
      normal: { es: 'Meta cumplida.', en: 'Goal met.' },
      caution: {
        es: ['Haz una sesión corta hoy.', 'Prioriza ejercicio de fuerza.', 'Revisa nutrición y vitamina D con el cirujano de vuelo.'],
        en: ['Do a short session today.', 'Prioritize strength exercise.', 'Review nutrition and vitamin D with the flight surgeon.']
      },
      critical: { es: ['Haz ejercicio hoy y avisa al cirujano de vuelo.'], en: ['Exercise today and tell the flight surgeon.'] }
    }
  },
  {
    id: 'nutrition', region: 'abdomen', when: 'pm', hazards: ['closed', 'isolation'], primary: 'nutrition',
    name: { es: 'Ingesta nutricional', en: 'Nutritional intake' },
    fields: [
      { key: 'nutrition', label: { es: '% de la ración planificada consumida', en: '% of planned ration eaten' }, unit: '%', min: 0, max: 150, step: 5, open: true, normalMin: 80, normalMax: 150, critMin: 60, critMax: 150, sim: [90, 8] }
    ],
    steps: {
      es: ['Compara lo que comiste hoy con la ración planificada.', 'Estima el porcentaje consumido (100% = ración completa).', 'Anota también si tomaste suficientes líquidos.'],
      en: ['Compare what you ate today with the planned ration.', 'Estimate the percentage eaten (100% = full ration).', 'Also note whether you drank enough fluids.']
    },
    why: {
      es: 'Comer poco afecta el músculo, las defensas, el hueso y el ánimo.',
      en: 'Eating too little affects muscle, immunity, bone, and mood.'
    },
    space: {
      es: 'En una nave cerrada el menú es limitado y el apetito puede cambiar.',
      en: 'In a closed vehicle the menu is limited and appetite can change.'
    },
    actions: {
      normal: { es: 'Todo en rango.', en: 'All in range.' },
      caution: {
        es: ['Come algo extra con proteínas y calorías.', 'Revisa el menú y las alternativas con el cirujano de vuelo.', 'Aumenta los líquidos.'],
        en: ['Eat something extra with protein and calories.', 'Review the menu and alternatives with the flight surgeon.', 'Increase fluids.']
      },
      critical: {
        es: ['Avisa hoy al cirujano de vuelo.', 'Evita ayunos largos: fracciona las comidas.', 'Vigila glucosa, ánimo y energía.'],
        en: ['Tell the flight surgeon today.', 'Avoid long fasts: split meals into small portions.', 'Watch glucose, mood, and energy.']
      }
    }
  }
];

/* Protocolos de emergencia (educativos). {S} = quien recibe la escalacion. */
var EMERGENCY = {
  chest: {
    title: { es: 'Dolor de pecho o colapso', en: 'Chest pain or collapse' },
    start: 'responds',
    nodes: {
      responds: {
        q: { es: '¿El tripulante responde (habla o abre los ojos)?', en: 'Does the crew member respond (speaks or opens eyes)?' },
        yes: 'conscious', no: 'breathing'
      },
      breathing: {
        q: { es: '¿Respira con normalidad y tiene pulso?', en: 'Is the person breathing normally and has a pulse?' },
        yes: 'stableUnconscious', no: 'cpr'
      },
      conscious: {
        q: { es: '¿Tiene dolor o presión en el pecho, falta de aire o sudor frío?', en: 'Does the person have chest pain or pressure, shortness of breath, or cold sweat?' },
        yes: 'cardiac', no: 'other'
      },
      cpr: {
        level: 2,
        title: { es: 'Paro cardiorrespiratorio probable', en: 'Probable cardiac arrest' },
        steps: {
          es: ['Pide ayuda: avisa a toda la tripulación y activa la comunicación con {S}.', 'Sujeta al paciente y sujétate con seguridad (en microgravedad usa los sujetadores).', 'Inicia compresiones en el centro del pecho, fuertes y rápidas (100 a 120 por minuto), y ventilaciones según el protocolo de la misión.', 'Usa el desfibrilador si está disponible y sigue sus instrucciones de voz.', 'Continúa hasta que llegue ayuda, el paciente reaccione o el desfibrilador indique parar.'],
          en: ['Call for help: alert the whole crew and open communication with {S}.', 'Restrain the patient and yourself safely (in microgravity use the restraints).', 'Start chest compressions at the center of the chest, hard and fast (100 to 120 per minute), and rescue breaths per mission protocol.', 'Use the defibrillator if available and follow its voice prompts.', 'Continue until help arrives, the patient responds, or the defibrillator says to stop.']
        }
      },
      stableUnconscious: {
        level: 2,
        title: { es: 'Inconsciente, pero respira', en: 'Unconscious but breathing' },
        steps: {
          es: ['Asegura la vía aérea: cabeza ligeramente hacia atrás.', 'Vigila la respiración y el pulso cada minuto.', 'Avisa de inmediato a {S}.', 'Si deja de respirar o pierde el pulso, inicia RCP.'],
          en: ['Secure the airway: head slightly back.', 'Check breathing and pulse every minute.', 'Tell {S} immediately.', 'If breathing or pulse stops, start CPR.']
        }
      },
      cardiac: {
        level: 2,
        title: { es: 'Posible problema cardíaco', en: 'Possible cardiac problem' },
        steps: {
          es: ['Deja al tripulante sentado o sujeto, cómodo y en reposo: no debe hacer esfuerzo.', 'Afloja la ropa y verifica la atmósfera de la cabina (oxígeno y CO2).', 'Mide presión, pulso y oxígeno en sangre y regístralos en la app.', 'Si el protocolo médico de la misión lo autoriza, da el medicamento indicado (por ejemplo, aspirina) salvo alergia.', 'Avisa de inmediato a {S}. {NOTE}', 'Repite los signos vitales cada 5 minutos. Si deja de responder, inicia RCP.'],
          en: ['Keep the crew member seated or restrained, comfortable and at rest: no exertion.', 'Loosen clothing and check cabin atmosphere (oxygen and CO2).', 'Measure blood pressure, pulse, and blood oxygen and log them in the app.', 'If the mission medical protocol allows it, give the indicated medication (for example aspirin) unless allergic.', 'Tell {S} immediately. {NOTE}', 'Repeat vital signs every 5 minutes. If the person stops responding, start CPR.']
        }
      },
      other: {
        level: 1,
        title: { es: 'Síntomas sin dolor de pecho', en: 'Symptoms without chest pain' },
        steps: {
          es: ['Descansa y sujétate con seguridad.', 'Mide los signos vitales y regístralos en la app.', 'Si algún valor está en rojo o aparece dolor de pecho, repite este protocolo desde el inicio.', 'Informa a {S} en la próxima comunicación.'],
          en: ['Rest and secure yourself.', 'Measure vital signs and log them in the app.', 'If any value is red or chest pain appears, restart this protocol.', 'Tell {S} at the next contact.']
        }
      }
    }
  },
  radiation: {
    title: { es: 'Alerta de tormenta solar', en: 'Solar storm alert' },
    level: 2,
    steps: {
      es: ['Confirma la alerta con control de misión o con los monitores de radiación.', 'Toda la tripulación va al refugio de radiación: la zona con más blindaje.', 'Permanece allí hasta que control de misión autorice salir.', 'Registra la dosis del dosímetro personal en la app.', 'Después, vigila náuseas, vómito, fatiga o enrojecimiento de la piel e informa a {S}.'],
      en: ['Confirm the alert with mission control or radiation monitors.', 'The whole crew goes to the radiation shelter: the best-shielded area.', 'Stay there until mission control clears you to leave.', 'Log the personal dosimeter dose in the app.', 'Afterward, watch for nausea, vomiting, fatigue, or skin redness and tell {S}.']
    }
  },
  fever: {
    title: { es: 'Fiebre o posible infección', en: 'Fever or possible infection' },
    level: 1,
    steps: {
      es: ['Mide la temperatura y los demás signos vitales.', 'Separa al tripulante en una zona aparte si es posible y usa mascarilla.', 'Aumenta los líquidos y el descanso.', 'Avisa a {S}: síntomas, cuándo empezaron y con quién tuvo contacto.', 'Limpia las superficies y revisa los filtros de ventilación.', 'Repite la medición cada 4 horas y regístrala en la app.'],
      en: ['Measure temperature and other vital signs.', 'Separate the crew member into a distinct area if possible and use a mask.', 'Increase fluids and rest.', 'Tell {S}: symptoms, when they started, and who had contact.', 'Clean surfaces and check ventilation filters.', 'Measure every 4 hours and log it in the app.']
    }
  }
};

var SOURCES = [
  { t: 'NASA HRP - 5 Hazards of Human Spaceflight', u: 'https://www.nasa.gov/hrp/hazards/' },
  { t: 'NASA HRP - Human Health and Performance Risks', u: 'https://www.nasa.gov/hrp/risks/' },
  { t: 'NASA HRP - Ongoing Research', u: 'https://www.nasa.gov/hrp/ongoing-hrp-research/' },
  { t: 'Canadian Space Agency - Monitoring radiation for astronaut health (2026)', u: 'https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp' },
  { t: 'Canadian Space Agency - Why do we conduct science experiments in space?', u: 'https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp' },
  { t: 'NASA-STD-3001 Vol. 1 Rev B (Crew Health): career limit 600 mSv', u: 'https://standards.nasa.gov/sites/default/files/standards/NASA/B/2022-01-05-NASA-STD-3001-Vol1-Rev-B-Final-Draft-Signature-010522.pdf' },
  { t: 'NASA Open Science Data Repository (OSDR)', u: 'https://osdr.nasa.gov/bio/' }
];
