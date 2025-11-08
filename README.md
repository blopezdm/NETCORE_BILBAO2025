### Breve resumen técnico
El repositorio muestra un sistema híbrido basado en la integración de múltiples servicios y tecnologías para habilitar funcionalidades de entrada y salida por voz, transcripción de texto, asignación de datos estructurados a formularios, y procesamiento de texto con inteligencia artificial. Las partes identificadas están distribuidas en módulos para frontend (JavaScript) y en un plugin de Dynamics CRM desarrollado en `.NET`.

---

### Descripción de arquitectura
La arquitectura está basada en un enfoque **orientado a eventos** y utiliza servicios **externos de inteligencia artificial y cloud computing** para el procesamiento de texto y voz. La solución tiene dos capas principales:
1. **Frontend (JS)**: Interacción directa con el usuario (DOM, formularios en Dynamics 365). Aquí se hacen las llamadas iniciales a los servicios de Azure Speech SDK para el reconocimiento y síntesis de voz. También se invocan APIs personalizadas de Dynamics 365 para mapea datos transcritos.
   
2. **Backend (C# Plugin)**: Procesa el texto de entrada mediante las reglas definidas y una comunicación directa con la API de Azure OpenAI. Está implementado como un plugin en Dynamics 365, ejecutado en el contexto de la plataforma CRM.

Si bien no es una arquitectura completamente de microservicios, se apoya en servicios externos (Azure Speech SDK y Azure OpenAI API) para proporcionar funcionalidades avanzadas. Esto lo convierte en una **arquitectura híbrida** con componentes plug-and-play en Dynamics y capacidades extendidas en el cliente.

---

### Tecnologías usadas
1. **Frontend (JavaScript)**:
   - Azure Speech SDK para síntesis y reconocimiento de voz.
   - Modularización con funciones utilitarias para carga dinámica del SDK, proceso de entrada/salida de voz, mapeo y actualización de atributos del formulario.
2. **Backend (C#)**:
   - Dynamics CRM Plugin Framework (`IPlugin`).
   - Comunicación HTTP con Azure OpenAI API.
   - JSON manipulación usando `Newtonsoft.Json` y `System.Text.Json`.
   - Service Locator Pattern (`IServiceProvider`) para contexto CRM.
3. **Cloud Services**:
   - Azure Speech SDK.
   - Azure OpenAI API integradas para capacidades avanzadas (por ejemplo, transformación de texto).

---

### Diagrama Mermaid (válido para GitHub Markdown)
Este diagrama ilustra cómo interactúan las distintas capas y componentes del sistema para ofrecer las funcionalidades descritas:

```mermaid
graph TD
    A["Usuario-dinamics-formulario"] -- entrada-de-voz/audio--> AA["JS:voiceInputHandler"]
    AA -- JSON-normalizado--> BB["JS:callCustomApi/OpenAI"]
    BB -- API-Dynamics-C-->