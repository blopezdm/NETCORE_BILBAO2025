### Breve Resumen Técnico

El repositorio representa una solución híbrida que abarca un **sistema de integración de voz y procesamiento de texto estructurado** dentro de Microsoft Dynamics CRM. Está compuesto de diferentes componentes:

1. **Frontend (JavaScript)**: Implementa funcionalidad para interactuar con formularios, convertir datos en audio con **Azure Speech SDK**, y auxiliar el reconocimiento de voz.
2. **Plugin Backend (C#)**: Implementa una API personalizada dentro de Dynamics CRM que utiliza **Azure OpenAI GPT** para transformar texto.
3. **External API**: Comunicación con servicios externos en Azure (Speech SDK y OpenAI) para extracción y procesamiento avanzado de datos a través de llamadas REST.

---

### Descripción de Arquitectura

La solución combina una arquitectura **n capas** más principios de **integración de servicios externos**. Está dividida en tres capas principales:
   
1. **Frontend Layer**:
   - Interactúa directamente con el usuario en formularios de Dynamics CRM y maneja datos de entrada (voz o texto).
   - Usa **JavaScript** como el lenguaje principal y un SDK para conectar con Azure Speech Services.

2. **Backend Layer**:
   - Extiende las funcionalidades del CRM usando plugins en C#, basándose en la interfaz `IPlugin`.
   - Interactúa con el motor de inteligencia artificial, **GPT** de Azure OpenAI, que transforma texto bajo reglas específicas y lo retorna en formato JSON.
   
3. **Service Layer**:
   - Usa dependencias como **Azure Speech SDK** para procesamiento de voz y **Azure OpenAI Service** para generación y transformación de texto.
   - Realiza integraciones dinámicas con Dynamics CRM.

---

### Tecnologías Usadas

#### Frontend:
- **HTML/JavaScript**: Para manipulación de formularios y dinámica en el CRM (integración DOM y procesamiento de datos).
- **Azure Speech SDK**: Sintetiza audio desde texto y transcribe audio.
- **REST API Calls**: Comunicación con una Custom API de Dynamics CRM.

#### Backend:
- **C#**:
  - Implementación de plugins mediante el framework de Dynamics CRM (`IPlugin`).
  - Llamadas a **Azure OpenAI GPT-4** en servicio de REST.

#### Externas:
- **Azure**:
  - Speech and OpenAI Services (GPT for text-based AI processing).
- **Dynamics CRM Web APIs**: Integración directa con referencias como `Xrm.WebApi.online` para gestión de entidades existentes.

---

### Diagrama **Mermaid**

```mermaid
graph TD
    A[User] --> B["voiceInputHandler.js - Lista-Formulario-Síntesis"]
    B --> C["leerFormulario - Datos visibles"]
    B --> D["startVoiceInput - Manejo SDK de voz"]
    D --> E["ensureSpeechSDKLoaded - Cargar SDK dinámico"]
    C --> F["getVisibleFieldData - Extraer campos visibles"]
    F --> G["speakText - Generar síntesis con SpeechSDK"]

    A --> H["speechForm.js - Grabación-Transcripción"]
    H --> I["ejecutarGrabacion - Reconocimiento audio SDK"]
    I --> J["processTranscript - Usar transcripción Manager"]
    J --> K["callCustomApi - Llamada API"]
    K --> L[Dynamic CRM Plugin "TransformTextWithAzureAI.cs"]

    L --> M["GetOpenAIResponse - Llama a GPT"]
    M --> N["Estructuración JSON"]
    N --> O["Guardar Resultado en CRM"]
```

---

### Conclusión Final

El repositorio presenta una **solución n capas (frontend-backend-servicio)** con un enfoque modular. Utiliza tecnologías avanzadas como *Azure Speech SDK* para síntesis de voz, *Azure OpenAI GPT* para procesamiento avanzado de texto, y extensiones en Dynamics CRM. Destaca por:
- Delegación de responsabilidades a capas separadas, manteniendo la modularidad.
- Integración de SDKs externos para maximizar funcionalidad.
- Uso de conceptos de IA para generar flujos asistidos.

Este diseño es idóneo para aplicaciones robustas en CRM donde se busque automatización y procesos de transformación de datos dinámicos.