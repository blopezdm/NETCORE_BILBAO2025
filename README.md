## Breve resumen técnico

El repositorio implementa una solución que combina reconocimiento de voz, síntesis de voz, y procesamiento avanzado mediante inteligencia artificial usando servicios de Azure. Está pensado específicamente para integrarse con Dynamics 365 para automatizar operaciones en formularios, ayudar al usuario en la interacción y gestión de datos mediante entradas habladas y procesamiento en tiempo real.

---

## Arquitectura y descripción

### Tipo de solución
- Principalmente es una **API basada en plugins, servicios externos** (Azure OpenAI, Azure Speech SDK) y una **interfaz frontend** que interactúa con el usuario en aplicaciones de Dynamics 365.
- Proporciona un manejo accesible de datos mediante reconocimiento de voz y síntesis de voz, y procesos backend con un plugin.

### Arquitectura
La arquitectura es un **modelo híbrido**, con las siguientes características:
1. **Frontend as a layer:** Las funcionalidades de voz en el frontend interactúan directamente con formularios y contextos del navegador, utilizando modularización y dependencia de servicios externos.
2. **Backend plugin extensible:** Utiliza **plugins de Dynamics 365** que actúan como puntos de entrada para integrar componentes externos como **Azure OpenAI**.
3. **Servicios externos:** El procesamiento de voz y texto aprovecha cloud services específicos, como Azure OpenAI y Azure Speech SDK.

Esta arquitectura puede considerarse **n-capas**, con:
- **Capa de presentación:** El frontend en Dynamics para la interacción con usuario.
- **Capa lógica:** Plugins en Dynamics que procesan el flujo de datos.
- **Capa externa (IA):** Servicios en la nube para reconocimiento, síntesis y transformación de datos.

### Tecnologías, frameworks y patrones
1. **Frontend:**
   - **Tecnologías:** JavaScript (ES6), Dynamics CRM SDK (`Xrm.WebApi`)
   - **Frameworks:** Azure Speech SDK (cargado dinámicamente desde CDN)
   - **Patrones:**
     - Modularización: Cada acción (e.g., lectura, síntesis, reconocimiento) está organizada en funciones claras.
     - Asincronismo: Uso de promesas y callbacks.
     - Dependency Injection: Claves y configuraciones dinámicas son pasadas como parámetros.
     - Adapter pattern: Transformación de valores del formulario a texto legible.

2. **Backend plugin:**
   - **Tecnologías:** Microsoft Dynamics 365 SDK, `HttpClient`, Azure OpenAI API
   - **Frameworks:** .NET Framework
   - **Patrones:**
     - Extensibilidad con plugins (Dynamics SDK's `IPlugin` interface).
     - Delegación: Delegación de procesamiento a Azure OpenAI para trabajo intensivo.
     - Abstracción de servicios: Uso de servicios externos para funciones específicas.

### Dependencias
1. **Azure Speech SDK:** Para síntesis de voz y transcripción.
2. **Azure OpenAI API:** Para procesamiento avanzado del texto hacia formato estructurado (GPT-based).
3. **Xrm.WebApi**: Manipulación y consulta de datos del entorno Dynamics 365.
4. **Plugins y librerías:**
   - En backend: `Newtonsoft.Json.Linq`, `HttpClient`, `Regex`, entre otros.
   - En frontend: Javascript y APIs web.

---

## Diagrama Mermaid

```mermaid
graph TD
    A1["Usuario hablo-comando"] --> B1["Frontend-captura-audio"]
    B1 --> C1["Azure Speech SDK"]
    C1 --> D1["Texto-transcripto"]
    D1 --> E1["Procesar-Formulario"]
    D1 --> F1["Llamada API Externa"]
    F1 --> F2["Azure OpenAI"]
    F2 --> G1["JSON-Texto"]
    G1 --> E1
    E1 --> H1["Actualizar-Datos-Dynamics"]
    H1 --> A1["Retorno-Datos"]
    E1 --> I1["Synth"])
	I["VOZ de Azure SDK"]
	I1 --> Final
```