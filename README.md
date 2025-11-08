## Breve Resumen Técnico

El repositorio contiene una solución tecnológica que integra funcionalidades de entrada y salida de voz, basada en **Azure Speech SDK** y **Microsoft Dynamics CRM**, además de un componente que utiliza **Azure OpenAI** para transformar texto en formato JSON. Los archivos están organizados como módulos: uno para manejar la entrada y síntesis de voz en el frontend (`readForm.js` y `speechInputHandlers.js`) y otro como un backend plugin para manipular texto mediante inteligencia artificial (`TransformTextWithAzureAI.cs`).

## Descripción de Arquitectura

### Tipo de Solución:
Es una solución **modular** que combina múltiples tecnologías para realizar tareas específicas:
- Un **frontend** en JavaScript que interactúa con Microsoft Dynamics CRM, empleando Azure Speech SDK para entrada/salida por comandos de voz.
- Un **plugin backend** de .NET que opera como intermediario entre Microsoft Dynamics CRM y Azure OpenAI, procesando y transformando datos mediante llamadas a APIs externas.

### Tipo de Arquitectura:
La arquitectura global puede ser clasificada como **n-capas/cliente-servidor**:
1. **Frontend:** La capa de presentación (UI) es modular y utiliza APIs para enviar y recuperar datos desde el backend.
2. **Backend:** El plugin implementa la capa lógica que transforma las entradas del usuario (mediante Azure OpenAI y Dynamics CRM).
3. **Integraciones externas:** Servicios como Azure Speech SDK y Azure OpenAI facilitan la interacción con herramientas de reconocimiento y síntesis de voz e inteligencia artificial.

### Patrones Clave:
1. **Service-oriented architecture (SOA):** Integra servicios como Azure Speech SDK y OpenAI API para tareas específicas.
2. **Modular design:** Cada archivo está diseñado con funciones o clases independientes y reutilizables.
3. **Callback/event-driven programming:** Manejo de eventos para cargar el SDK y realizar acciones dinámicas en las interfaces de usuario.
4. **Facade pattern:** Abstrae el uso de servicios externos como Azure APIs con métodos específicos.

## Tecnologías Usadas
1. **Frontend:**
   - **JavaScript**
   - Dynamics CRM client-side APIs
   - **Azure Speech SDK** (JavaScript package for browser-based voice processing)

2. **Backend Plugin:**
   - **.NET Framework/Standard** compatible with Dynamics CRM
   - **Microsoft.Xrm.Sdk** for CRM integration
   - **Newtonsoft.Json** for JSON management
   - **Azure OpenAI API** for AI-powered text transformation

## Dependencias o Componentes Externos
1. **Azure Speech SDK** (text-to-speech and speech recognition).
2. **Azure OpenAI API** for text transformation.
3. **Microsoft Dynamics CRM APIs** (`Xrm.WebApi` and context APIs) for form and attribute manipulation in CRM.
4. **Plugins** registered into Dynamics CRM for backend execution on events.

---

## Diagrama Mermaid Válido para GitHub

```mermaid
graph TD
    A["UI - Dynamics CRM - frontend(JavaScript)"] -->|Interaction| B["Function readForm.js - Extract visible form data"]
    B -->|Send Data| C["Function speakText - Text-to-Speech Azure API"]
    A -->|Voice Interaction| D["Function startVoiceInput - Recognition via speech"]
    D --> E["Function ejecutarGrabacion - Speech Recognition"]
    E -->|Transform Text (API Call)| F["callCustomApi - Custom API on Dynamics"]
    F -->|Invoke Backend Plugin| G["Plugin TransformTextWithAzureAI.cs"]
    G -->|Send Data| H["Azure OpenAI API - Transforms text using rules"]
    H -->|JSON Response| G -->|Update Form| A
```

---

## Conclusión Final

Esta solución implementa una arquitectura de múltiples capas que combina un frontend para la manipulación y síntesis de voz (mediante Azure Speech SDK) y un backend que utiliza un plugin de Dynamics CRM para manejar la interacción con Azure OpenAI. Le permite realizar tareas automatizadas como reconocimiento de voz, síntesis de texto a voz y transformación avanzada de datos mediante inteligencia artificial. Las tecnologías utilizadas están bien integradas mediante patrones comunes en arquitectura moderna como SOA, modularización, y eventos por callback, lo cual asegura extensibilidad y reutilización.