## Breve resumen técnico

El repositorio contiene tres archivos principales que forman parte de una solución para integrar funcionalidades avanzadas de procesamiento y síntesis de texto:

1. **`readForm.js` (Frontend)**: Extrae datos visibles de un formulario y los convierte en texto para sintetizarlos en voz mediante Azure Speech SDK.
2. **`speechForm.js` (Frontend)**: Captura y procesa entradas de voz, mapea transcripciones con campos de un formulario y envía datos a una API personalizada para procesamiento posterior.
3. **`TransformTextWithAzureAI.cs` (Plugin)**: Plugin para Dynamics CRM que utiliza Azure OpenAI para transformar texto en formato JSON estructurado según las normas ingresadas.

---

## Descripción de arquitectura

Este proyecto parece estar diseñado como parte de una solución para mejorar la interacción entre usuarios y una aplicación de CRM mediante inteligencia artificial, síntesis de voz, y procesamiento de lenguaje natural. Funciona como un **cliente modular centralizado conectado a APIs externas (Azure OpenAI, Azure Speech)**. El proyecto combina elementos de arquitectura:

- **N capas**: Los archivos de frontend están organizados y actúan como capa de presentación que interactúa con APIs y con el usuario.
- **Extension Points via Plugins**: En Microsoft Dynamics CRM, los plugins son componentes que extienden la funcionalidad. Aquí, el plugin actúa como una capa funcional que se integra con Dynamics.
- **SDK Pattern**: Uso del SDK de Azure Speech para encapsular la interacción con los servicios de voz de Azure. Representa el uso de librerías externas desde una arquitectura cliente-servidor.
- **Modular/Component-Based Pattern**: Cada archivo encapsula funcionalidades independientes, adoptando un enfoque modular para mantener el código altamente reutilizable y desacoplado.

---

## Tecnologías utilizadas

### Frontend:
- **JavaScript ES6**: Lenguaje base.
- **Azure Speech SDK**: Para la síntesis y reconocimiento de voz. Carga dinámica del SDK por URL.
- **Microsoft Dynamics 365**: Utiliza `formContext` y `Xrm.WebApi` para interactuar con el CRM.

### Backend:
- **Microsoft Dynamics CRM SDK**: Nativos del entorno CRM.
- **Azure OpenAI API (GPT-4)**: Para la generación de texto estructurado en formato JSON basado en normas. Recibe contenido vía una solicitud HTTP POST.
- **Newtonsoft.Json**: Para serialización/deserialización avanzada de JSON.
- **C# .Net Framework**: Lenguaje del plugin.
- **HTTP Client**: Para solicitudes API.

---

## Diagrama **Mermaid**

Este diagrama representa las conexiones de los archivos/procesos principales y sus dependencias. Los elementos se integran para cumplir con la funcionalidad del sistema:

```mermaid
graph TD
    A["FrontEnd 'readForm.js'"] --> B["Azure Speech SDK"]
    A --> C["User-Interaction Form"]
    
    D["FrontEnd 'speechForm.js'"] --> C
    D --> B ["Azure Speech SDK"]
    D --> E["Dynamics 365 Web API"]

    F["Backend Plugin 'TransformTextWithAzureAI'"] --> G["Azure OpenAI API"]
    F --> E

    B --> H["Voice Processing - Synthesis"]
    G --> I["OpenAI Text Processing"]

    C --> J["Extract Field Data"]
    E --> K["Custom API"]
    J --> I
    I --> K

    K --> L["Update CRM Fields"]
```

---

## Conclusión final

La solución integra tecnologías avanzadas de inteligencia artificial y servicios en la nube para proporcionar una experiencia interactiva dentro de un sistema CRM, ofreciendo síntesis y reconocimiento de voz, así como transformación de texto. Con su enfoque modular y el uso de patrones como integración de SDK/API y lógica de negocio basada en servicios, la arquitectura combina **n capas** y elementos de **microservicios** (a través de los componentes Azure OpenAI API y Speech SDK). 

Sin embargo, hay puntos de mejora en la implementación, como la gestión de configuraciones sensibles (API keys) y una posible optimización para desacoplar aún más el código hacia componentes reutilizables. Esta solución destaca por su enfoque en accesibilidad y automatización, lo que mejora la eficiencia y la interacción en contextos CRM.