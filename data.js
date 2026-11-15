/* CrewVital - contenido y umbrales (dominio publico, CC0).
   Los umbrales son valores de referencia generales para adultos y deben ser validados
   por un auxiliar. Cada indicador admite un campo opcional
   src: { t: 'titulo', u: 'url' } con la fuente de sus umbrales; si falta, la app
   muestra "fuente por confirmar". No es un dispositivo medico. */

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
    delay: { es: 'Crece con la distancia (hasta unos 22 min por trayecto, 44 min ida y vuelta)', en: 'Grows with distance (up to ~22 min one way, 44 min round trip)' },
    evac: { es: 'Sin retorno inmediato: semanas a meses', en: 'No immediate return: weeks to months' },
    hazards: ['radiation', 'distance', 'isolation', 'gravity', 'closed'],
    escalate: { es: 'el auxiliar en Tierra', en: 'the ground auxiliary' },
    note: { es: 'La respuesta puede tardar: actúa con autonomía y deja un mensaje completo.', en: 'The reply may be delayed: act autonomously and leave a complete message.' }
  },
  station: {
    name: { es: 'Estación espacial (órbita baja)', en: 'Space station (low Earth orbit)' },
    gravity: { es: 'Microgravedad', en: 'Microgravity' },
    delay: { es: 'Casi inmediata (segundos)', en: 'Near real time (seconds)' },
    evac: { es: 'Retorno posible en el orden de horas', en: 'Return possible within hours' },
    hazards: ['gravity', 'isolation', 'closed', 'radiation'],
    escalate: { es: 'el auxiliar en Tierra', en: 'the ground auxiliary' },
    note: { es: 'La comunicación es casi inmediata: pide apoyo en tiempo real.', en: 'Communication is near real time: ask for live support.' }
  },
  moonbase: {
    name: { es: 'Base en la superficie lunar', en: 'Lunar surface base' },
    gravity: { es: 'Gravedad lunar (cerca de 1/6 de la terrestre)', en: 'Lunar gravity (about 1/6 of Earth)' },
    delay: { es: 'Corta (unos 1,3 s por trayecto)', en: 'Short (about 1.3 s one way)' },
    evac: { es: 'Retorno a la Tierra en días', en: 'Return to Earth in days' },
    hazards: ['radiation', 'gravity', 'closed', 'distance'],
    escalate: { es: 'el auxiliar en Tierra', en: 'the ground auxiliary' },
    note: { es: 'Retraso corto: puedes dialogar con Tierra, pero el retorno tarda días.', en: 'Short delay: you can talk to Earth, but return takes days.' }
  },
  marsbase: {
    name: { es: 'Base en la superficie de Marte', en: 'Mars surface base' },
    gravity: { es: 'Gravedad marciana (3/8 de la terrestre)', en: 'Martian gravity (3/8 of Earth)' },
    delay: { es: 'De unos 3 a 22 min por trayecto', en: 'About 3 to 22 min one way' },
    evac: { es: 'Sin evacuación posible durante meses', en: 'No evacuation possible for months' },
    hazards: ['distance', 'radiation', 'gravity', 'isolation', 'closed'],
    escalate: { es: 'el auxiliar en Tierra', en: 'the ground auxiliary' },
    note: { es: 'No esperes respuesta inmediata: actúa con autonomía y deja un mensaje completo.', en: 'Do not expect an immediate reply: act autonomously and leave a complete message.' }
  },
  rover: {
    name: { es: 'Rover presurizado de exploración', en: 'Pressurized exploration rover' },
    gravity: { es: 'Depende del destino (Luna o Marte)', en: 'Depends on the destination (Moon or Mars)' },
    delay: { es: 'Depende de la ubicación', en: 'Depends on location' },
    evac: { es: 'Regreso a la base en horas', en: 'Return to base in hours' },
    hazards: ['closed', 'radiation', 'gravity', 'distance'],
    escalate: { es: 'la base y el auxiliar', en: 'the base and the auxiliary' },
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
      { key: 'sys', label: { es: 'Sistólica (número mayor)', en: 'Systolic (top number)' }, unit: 'mmHg', min: 40, max: 260, step: 1, normalMin: 90, normalMax: 129, critMin: 80, critMax: 179 },
      { key: 'dia', label: { es: 'Diastólica (número menor)', en: 'Diastolic (bottom number)' }, unit: 'mmHg', min: 20, max: 160, step: 1, normalMin: 60, normalMax: 84, critMin: 50, critMax: 119 }
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
        es: ['Descansa 10 minutos y repite la medición.', 'Revisa tu hidratación y el consumo de sal.', 'Si sigue fuera de rango, avísale al auxiliar en la próxima comunicación.'],
        en: ['Rest 10 minutes and measure again.', 'Check your hydration and salt intake.', 'If it stays out of range, tell the auxiliary at the next scheduled contact.']
      },
      critical: {
        es: ['Detente, sujétate con seguridad y repite la medición para confirmar.', 'Si hay dolor de pecho, falta de aire, mareo intenso o confusión, abre el Modo Emergencia.', 'Avisa de inmediato al auxiliar.'],
        en: ['Stop, secure yourself, and repeat the measurement to confirm.', 'If there is chest pain, shortness of breath, severe dizziness, or confusion, open Emergency Mode.', 'Tell the auxiliary immediately.']
      }
    }
  },
  {
    id: 'hr', region: 'heart', when: 'am', hazards: ['gravity', 'closed'], primary: 'hr',
    name: { es: 'Frecuencia cardíaca', en: 'Heart rate' },
    fields: [
      { key: 'hr', label: { es: 'Latidos por minuto', en: 'Beats per minute' }, unit: 'lpm', min: 20, max: 240, step: 1, normalMin: 50, normalMax: 100, critMin: 40, critMax: 120 }
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
        es: ['Descansa y repite en 10 minutos.', 'Revisa hidratación, cafeína, sueño y estrés.', 'Informa al auxiliar si se mantiene.'],
        en: ['Rest and measure again in 10 minutes.', 'Check hydration, caffeine, sleep, and stress.', 'Tell the auxiliary if it persists.']
      },
      critical: {
        es: ['Sujétate en reposo y repite la medición.', 'Si hay dolor de pecho, desmayo o falta de aire, abre el Modo Emergencia.', 'Avisa de inmediato al auxiliar.'],
        en: ['Secure yourself at rest and measure again.', 'If there is chest pain, fainting, or shortness of breath, open Emergency Mode.', 'Tell the auxiliary immediately.']
      }
    }
  },
  {
    id: 'temp', region: 'body', when: 'am', hazards: ['closed', 'radiation'], primary: 'temp',
    name: { es: 'Temperatura corporal', en: 'Body temperature' },
    fields: [
      { key: 'temp', label: { es: 'Temperatura', en: 'Temperature' }, unit: '°C', min: 30, max: 43, step: 0.1, normalMin: 36.1, normalMax: 37.5, critMin: 35.1, critMax: 38.4 }
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
        es: ['Repite en 30 minutos y toma líquidos.', 'Revisa la temperatura de la cabina o del traje.', 'Si hay síntomas de infección, sepárate de los demás y avisa al auxiliar.'],
        en: ['Measure again in 30 minutes and drink fluids.', 'Check cabin or suit temperature.', 'If there are infection symptoms, separate from others and tell the auxiliary.']
      },
      critical: {
        es: ['Fiebre alta o temperatura muy baja: avisa de inmediato al auxiliar.', 'Enfría o abriga según el caso.', 'Si es fiebre, aísla al tripulante del resto.'],
        en: ['High fever or very low temperature: tell the auxiliary immediately.', 'Cool or warm the person as needed.', 'If it is fever, isolate the crew member from others.']
      }
    }
  },
  {
    id: 'spo2', region: 'lungs', when: 'am', hazards: ['closed'], primary: 'spo2',
    name: { es: 'Oxígeno en sangre (SpO2)', en: 'Blood oxygen (SpO2)' },
    fields: [
      { key: 'spo2', label: { es: 'Saturación de oxígeno', en: 'Oxygen saturation' }, unit: '%', min: 50, max: 100, step: 1, normalMin: 95, normalMax: 100, critMin: 91, critMax: 100 }
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
        es: ['Respira profundo y repite en 5 minutos.', 'Revisa los parámetros de la cabina (oxígeno, CO2 y presión).', 'Avisa al auxiliar.'],
        en: ['Breathe deeply and measure again in 5 minutes.', 'Check cabin parameters (oxygen, CO2, and pressure).', 'Tell the auxiliary.']
      },
      critical: {
        es: ['Verifica de inmediato la atmósfera de la cabina.', 'Si hay falta de aire, usa el oxígeno de emergencia si está disponible y abre el Modo Emergencia.', 'Avisa de inmediato al auxiliar.'],
        en: ['Immediately check the cabin atmosphere.', 'If short of breath, use emergency oxygen if available and open Emergency Mode.', 'Tell the auxiliary immediately.']
      }
    }
  },
  {
    id: 'glucose', region: 'abdomen', when: 'am', hazards: ['closed', 'isolation'], primary: 'glucose',
    name: { es: 'Glucosa en sangre', en: 'Blood glucose' },
    fields: [
      { key: 'glucose', label: { es: 'Glucosa', en: 'Glucose' }, unit: 'mg/dL', min: 20, max: 600, step: 1, normalMin: 70, normalMax: 110, critMin: 55, critMax: 199 }
    ],
    steps: {
      es: ['Mide en ayunas, antes del desayuno: el rango normal de la app es para ayunas.', 'Lávate y seca las manos.', 'Inserta una tira nueva en el glucómetro.', 'Pincha el lado del dedo y toca la tira con la gota.', 'Lee el valor en mg/dL. Puedes adjuntar una foto de la pantalla.'],
      en: ['Measure fasting, before breakfast: the app\'s normal range is for fasting.', 'Wash and dry your hands.', 'Insert a new strip into the glucometer.', 'Prick the side of a finger and touch the strip to the drop.', 'Read the value in mg/dL. You can attach a photo of the screen.']
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
        es: ['Si está alta: toma agua, revisa tu comida y repite en 2 horas.', 'Si está baja: toma una fuente rápida de azúcar y repite en 15 minutos.', 'Informa al auxiliar si se repite.'],
        en: ['If high: drink water, review your meal, and measure again in 2 hours.', 'If low: take a quick sugar source and measure again in 15 minutes.', 'Tell the auxiliary if it repeats.']
      },
      critical: {
        es: ['Si es muy baja: toma azúcar de inmediato; si hay confusión, pide ayuda a otro tripulante.', 'Si es muy alta: avisa de inmediato al auxiliar.', 'No esperes a la comunicación programada.'],
        en: ['If very low: take sugar immediately; if confused, ask another crew member for help.', 'If very high: tell the auxiliary immediately.', 'Do not wait for the scheduled contact.']
      }
    }
  },
  {
    id: 'sleep', region: 'head', when: 'am', hazards: ['isolation', 'closed'], primary: 'sleep',
    name: { es: 'Horas de sueño', en: 'Sleep hours' },
    fields: [
      { key: 'sleep', label: { es: 'Horas dormidas anoche', en: 'Hours slept last night' }, unit: 'h', min: 0, max: 16, step: 0.1, normalMin: 7, normalMax: 11, critMin: 5, critMax: 16 }
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
        es: ['Revisa la luz y el horario de la cabina.', 'Evita pantallas y cafeína antes de dormir.', 'Si dura más de 3 días, habla con el apoyo psicológico o el auxiliar.'],
        en: ['Check cabin lighting and schedule.', 'Avoid screens and caffeine before sleep.', 'If it lasts more than 3 days, talk to psychological support or the auxiliary.']
      },
      critical: {
        es: ['Informa al auxiliar y al apoyo psicológico.', 'Reduce tareas críticas hasta recuperarte.', 'Pide a un compañero que revise tus tareas.'],
        en: ['Tell the auxiliary and psychological support.', 'Reduce critical tasks until you recover.', 'Ask a teammate to double-check your tasks.']
      }
    }
  },
  {
    id: 'mood', region: 'head', when: 'am', hazards: ['isolation'], primary: 'mood',
    name: { es: 'Estado de ánimo', en: 'Mood' },
    fields: [
      { key: 'mood', label: { es: 'Cómo te sientes (1 a 5)', en: 'How you feel (1 to 5)' }, unit: '/5', min: 1, max: 5, step: 1, normalMin: 4, normalMax: 5, critMin: 3, critMax: 5 }
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
        es: ['Informa hoy mismo al apoyo psicológico y al auxiliar.', 'No te quedes solo: avisa a un compañero.', 'Si hay pensamientos de hacerte daño, abre el Modo Emergencia.'],
        en: ['Tell psychological support and the auxiliary today.', 'Do not stay alone: tell a teammate.', 'If you have thoughts of harming yourself, open Emergency Mode.']
      }
    }
  },
  {
    id: 'radiation', region: 'body', when: 'pm', hazards: ['radiation'], primary: 'radiation',
    cumulative: true,
    src: { t: 'NASA-STD-3001 Vol. 1 Rev B', u: 'https://standards.nasa.gov/sites/default/files/standards/NASA/B/2022-01-05-NASA-STD-3001-Vol1-Rev-B-Final-Draft-Signature-010522.pdf' },
    name: { es: 'Dosis de radiación acumulada', en: 'Cumulative radiation dose' },
    fields: [
      { key: 'radiation', label: { es: 'Dosis efectiva acumulada de carrera', en: 'Cumulative career effective dose' }, unit: 'mSv', min: 0, max: 1000, step: 0.1, normalMin: 0, normalMax: 299.9, critMin: -1, critMax: 479.9 }
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
        es: ['Reduce el tiempo en zonas con menos blindaje.', 'Revisa el plan de misión para minimizar la dosis (ALARA).', 'Informa al auxiliar.'],
        en: ['Reduce time in less-shielded areas.', 'Review the mission plan to minimize dose (ALARA).', 'Tell the auxiliary.']
      },
      critical: {
        es: ['Informa de inmediato al auxiliar y a control de misión.', 'La dosis se acerca al límite de carrera: revisa el plan de misión.', 'Usa el refugio con más blindaje durante eventos solares.'],
        en: ['Tell the auxiliary and mission control immediately.', 'Dose is nearing the career limit: review the mission plan.', 'Use the best-shielded shelter during solar events.']
      }
    }
  },
  {
    id: 'exercise', region: 'bones', when: 'pm', hazards: ['gravity'], primary: 'exercise',
    name: { es: 'Ejercicio del día', en: 'Exercise today' },
    fields: [
      { key: 'exercise', label: { es: 'Minutos de ejercicio', en: 'Minutes of exercise' }, unit: 'min', min: 0, max: 400, step: 5, open: true, normalMin: 60, normalMax: 400, critMin: -1, critMax: 400 }
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
        es: ['Haz una sesión corta hoy.', 'Prioriza ejercicio de fuerza.', 'Revisa nutrición y vitamina D con el auxiliar.'],
        en: ['Do a short session today.', 'Prioritize strength exercise.', 'Review nutrition and vitamin D with the auxiliary.']
      }
    }
  },
  {
    id: 'nutrition', region: 'abdomen', when: 'pm', hazards: ['closed', 'isolation'], primary: 'nutrition',
    name: { es: 'Ingesta nutricional', en: 'Nutritional intake' },
    fields: [
      { key: 'nutrition', label: { es: '% de la ración planificada consumida', en: '% of planned ration eaten' }, unit: '%', min: 0, max: 150, step: 5, open: true, normalMin: 80, normalMax: 150, critMin: 60, critMax: 150 }
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
        es: ['Come algo extra con proteínas y calorías.', 'Revisa el menú y las alternativas con el auxiliar.', 'Aumenta los líquidos.'],
        en: ['Eat something extra with protein and calories.', 'Review the menu and alternatives with the auxiliary.', 'Increase fluids.']
      },
      critical: {
        es: ['Avisa hoy al auxiliar.', 'Evita ayunos largos: fracciona las comidas.', 'Vigila glucosa, ánimo y energía.'],
        en: ['Tell the auxiliary today.', 'Avoid long fasts: split meals into small portions.', 'Watch glucose, mood, and energy.']
      }
    }
  }
];

/* Evidencia NASA obligatoria del reto: HRP + OSDR (+ CSA). */
var NASA_EVIDENCE = [
  { id: 'hrp-hazards', kind: 'HRP', title: { es: '5 peligros del vuelo espacial humano', en: '5 hazards of human spaceflight' },
    finding: { es: 'La NASA HRP agrupa los riesgos en radiación, aislamiento, distancia a la Tierra, gravedad y entornos cerrados/hostiles. Esos peligros se alimentan entre sí.', en: 'NASA HRP groups risks into radiation, isolation, distance from Earth, gravity, and closed/hostile environments. Those hazards feed into each other.' },
    hazards: ['radiation', 'isolation', 'distance', 'gravity', 'closed'], inds: ['radiation', 'mood', 'sleep', 'bp', 'hr', 'exercise', 'spo2', 'temp'],
    u: 'https://www.nasa.gov/hrp/hazards/' },
  { id: 'hrp-risks', kind: 'HRP', title: { es: 'Riesgos de salud y desempeño humano', en: 'Human health and performance risks' },
    finding: { es: 'El catálogo de riesgos del HRP conecta cada peligro con efectos medibles en cuerpo y conducta: base para decidir qué vigilar a bordo.', en: 'The HRP risk catalog links each hazard to measurable body and behavior effects: the basis for choosing what to monitor onboard.' },
    hazards: ['radiation', 'isolation', 'distance', 'gravity', 'closed'], inds: ['bp', 'hr', 'mood', 'sleep', 'exercise', 'radiation'],
    u: 'https://www.nasa.gov/hrp/risks/' },
  { id: 'hrp-research', kind: 'HRP', title: { es: 'Investigación en curso del HRP', en: 'Ongoing HRP research' },
    finding: { es: 'Estudios activos en órbita, análogos en Tierra y laboratorio para mitigar los 5 peligros antes de misiones largas.', en: 'Active studies in orbit, Earth analogs, and labs to mitigate the 5 hazards before long missions.' },
    hazards: ['radiation', 'isolation', 'gravity', 'closed', 'distance'], inds: ['radiation', 'exercise', 'mood', 'sleep'],
    u: 'https://www.nasa.gov/hrp/ongoing-hrp-research/' },
  { id: 'osdr-portal', kind: 'OSDR', title: { es: 'NASA Open Science Data Repository', en: 'NASA Open Science Data Repository' },
    finding: { es: 'Repositorio abierto de datos biológicos de vuelos espaciales. CrewVital ancla escenarios a evidencia pública, no a efectos inventados.', en: 'Open repository of biological spaceflight data. CrewVital anchors scenarios in public evidence, not invented effects.' },
    hazards: ['radiation', 'gravity', 'closed', 'isolation'], inds: ['radiation', 'exercise', 'spo2', 'bp'],
    u: 'https://osdr.nasa.gov/bio/' },
  { id: 'osdr-i4', kind: 'OSDR', title: { es: 'Inspiration4 · sangre (OSD-569 a 575)', en: 'Inspiration4 · blood (OSD-569 to 575)' },
    finding: { es: 'OSDR publica datos de astronautas comerciales (sangre, plasma, suero) antes, durante y después del vuelo.', en: 'OSDR publishes commercial astronaut data (blood, plasma, serum) before, during, and after flight.' },
    hazards: ['closed', 'radiation', 'isolation'], inds: ['temp', 'glucose', 'mood'],
    u: 'https://www.nasa.gov/osdr-latest-news-i4-mission-datasets/' },
  { id: 'csa-radiation', kind: 'CSA', title: { es: 'CSA · monitoreo de radiación y salud', en: 'CSA · radiation monitoring and health' },
    finding: { es: 'La Agencia Espacial Canadiense explica por qué vigilar la radiación a bordo es clave para la tripulación.', en: 'The Canadian Space Agency explains why onboard radiation monitoring is key for the crew.' },
    hazards: ['radiation'], inds: ['radiation'],
    u: 'https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp' },
  { id: 'csa-science', kind: 'CSA', title: { es: 'CSA · por qué se hace ciencia en el espacio', en: 'CSA · why science is done in space' },
    finding: { es: 'La microgravedad revela cómo reaccionan cuerpo y sistemas sin peso: base para medir y comparar.', en: 'Microgravity reveals how body and systems react without weight: a basis for measuring and comparing.' },
    hazards: ['gravity', 'closed'], inds: ['exercise', 'bp', 'hr'],
    u: 'https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp' }
];

/* Escenarios visuales (cascada). Formato usado por la UI: hz, regions, demo, act, evidence. */
var SCENARIOS = [
  { id: 'solar', hz: 'radiation', em: 'radiation', regions: ['body', 'head'], evidence: ['hrp-hazards', 'hrp-risks', 'csa-radiation', 'osdr-portal'],
    title: { es: 'Tormenta solar', en: 'Solar storm' },
    event: { es: 'El Sol lanza una ráfaga de partículas (peligro HRP: radiación). La dosis puede subir en pocas horas y afectar sueño y ánimo.', en: 'The Sun releases a burst of particles (HRP hazard: radiation). Dose can rise within hours and affect sleep and mood.' },
    demo: { radiation: { radiation: 320 }, sleep: { sleep: 5.5 }, mood: { mood: 2 } },
    act: { es: ['Ir de inmediato al refugio con más blindaje.', 'Registrar la dosis de radiación en Medir.', 'Avisar a control de misión y esperar permiso para salir.', 'Si hay náuseas o confusión: Si algo va mal.'], en: ['Go straight to the best-shielded shelter.', 'Log the radiation dose in Measure.', 'Tell mission control and wait for clearance to leave.', 'If nausea or confusion appears: If something goes wrong.'] } },
  { id: 'fluids', hz: 'gravity', em: 'chest', regions: ['heart', 'bones'], evidence: ['hrp-hazards', 'hrp-risks', 'csa-science', 'osdr-portal'],
    title: { es: 'Microgravedad: los líquidos suben', en: 'Microgravity: fluids shift up' },
    event: { es: 'Sin gravedad (peligro HRP: campos de gravedad), la sangre sube a la cabeza. El corazón y los huesos se debilitan si falta ejercicio.', en: 'Without gravity (HRP hazard: gravity fields), blood moves toward the head. Heart and bones weaken without exercise.' },
    demo: { bp: { sys: 138, dia: 88 }, hr: { hr: 108 }, exercise: { exercise: 30 } },
    act: { es: ['Medir presión y pulso en reposo.', 'Cumplir el ejercicio diario (≥ 60 min).', 'Si hay dolor de pecho, desmayo o mareo fuerte: Si algo va mal.'], en: ['Measure blood pressure and pulse at rest.', 'Complete daily exercise (≥ 60 min).', 'If chest pain, fainting, or strong dizziness: If something goes wrong.'] } },
  { id: 'isolation', hz: 'isolation', em: 'mental', regions: ['head'], evidence: ['hrp-hazards', 'hrp-research', 'osdr-i4', 'csa-science'],
    title: { es: 'Aislamiento prolongado', en: 'Long isolation' },
    event: { es: 'Meses en un espacio pequeño (peligro HRP: aislamiento) alteran sueño, ánimo, nutrición y adherencia al ejercicio.', en: 'Months in a small space (HRP hazard: isolation) disrupt sleep, mood, nutrition, and exercise adherence.' },
    demo: { sleep: { sleep: 5.5 }, mood: { mood: 2 }, nutrition: { nutrition: 55 }, exercise: { exercise: 15 } },
    act: { es: ['Mantener horarios fijos de sueño y luz.', 'Check-in diario con un compañero.', 'Recuperar comida + 30 min de ejercicio.', 'Si hay crisis emocional: Si algo va mal.'], en: ['Keep fixed sleep and light schedules.', 'Daily check-in with a teammate.', 'Restore meals + 30 min exercise.', 'If emotional crisis: If something goes wrong.'] } },
  { id: 'cabin', hz: 'closed', em: 'fever', regions: ['lungs', 'body'], evidence: ['hrp-hazards', 'hrp-risks', 'osdr-i4', 'osdr-portal'],
    title: { es: 'Aire de cabina e infección', en: 'Cabin air and infection' },
    event: { es: 'En una cabina cerrada (peligro HRP: entorno hostil), un fallo del aire o un virus afecta rápido a toda la tripulación.', en: 'In a closed cabin (HRP hazard: hostile environment), an air failure or virus quickly affects the whole crew.' },
    demo: { spo2: { spo2: 93 }, temp: { temp: 38.6 }, hr: { hr: 104 } },
    act: { es: ['Medir oxígeno en sangre y temperatura.', 'Separar a quien tenga síntomas y usar mascarilla.', 'Revisar el sistema de aire y avisar a control de misión.'], en: ['Measure blood oxygen and temperature.', 'Separate anyone with symptoms and use masks.', 'Check the air system and tell mission control.'] } }
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
  mental: {
    title: { es: 'Crisis emocional o de conducta', en: 'Emotional or behavioral crisis' },
    level: 2,
    steps: {
      es: ['No dejes solo al tripulante: un compañero se queda con él en todo momento.', 'Habla con calma, escucha sin juzgar y pregunta directamente cómo se siente.', 'Avisa de inmediato a {S} y al apoyo psicológico de la misión. {NOTE}', 'Suspende sus tareas críticas y redistribúyelas en la tripulación.', 'Aleja del área objetos o medicamentos con los que pueda hacerse daño.', 'Registra sueño y ánimo en la app y repite el registro cada día hasta nueva indicación.'],
      en: ['Do not leave the crew member alone: a teammate stays with them at all times.', 'Speak calmly, listen without judging, and ask directly how they feel.', 'Tell {S} and mission psychological support immediately. {NOTE}', 'Suspend their critical tasks and share them among the crew.', 'Remove from the area any objects or medication they could use to harm themselves.', 'Log sleep and mood in the app and repeat daily until told otherwise.']
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
  { t: 'NASA Open Science Data Repository (OSDR)', u: 'https://osdr.nasa.gov/bio/' },
  { t: 'NASA OSDR - Inspiration4 mission datasets (OSD-569 to OSD-575+)', u: 'https://www.nasa.gov/osdr-latest-news-i4-mission-datasets/' },
  { t: 'Canadian Space Agency - Monitoring radiation for astronaut health (2026)', u: 'https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp' },
  { t: 'Canadian Space Agency - Why do we conduct science experiments in space?', u: 'https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp' },
  { t: 'NASA-STD-3001 Vol. 1 Rev B (Crew Health): career limit 600 mSv', u: 'https://standards.nasa.gov/sites/default/files/standards/NASA/B/2022-01-05-NASA-STD-3001-Vol1-Rev-B-Final-Draft-Signature-010522.pdf' }
];
