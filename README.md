### Breve resumen técnico

El repositorio presentado está enfocado en proporcionar una solución robusta para el procesamiento de voz y texto en aplicaciones basadas en **Microsoft Dynamics CRM**, integrando servicios externos como **Azure Speech SDK** y **Azure OpenAI API** para manejar texto hablado, reconocimiento de comandos de voz, procesamiento mediante inteligencia artificial y la actualización dinámica de formularios.

---

### Descripción de la arquitectura

La solución se trata de un **ecosistema híbrido** con múltiples componentes que trabajan juntos para integrar funcionalidad avanzada en un sistema CRM:

1. **Frontend/JS/readForm.js**:
   - Proporciona la conversión de datos visibles de formularios en texto y convierte este texto en audio utilizando **Azure Speech SDK**, permitiendo accesibilidad mediante lectura en voz alta.

2. **Frontend/JS/speechForm.js**:
   - Habilita entrada por voz, reconocimiento de comandos mediante **Azure Speech SDK**, procesamiento de texto con IA y vínculos dinámicos a los formularios, permitiendo interacción entre usuarios y sistemas CRM.

3. **Plugins/TransformTextWithAzureAI.cs**:
   - Plugin diseñado para **Microsoft Dynamics CRM**, que utiliza **Azure OpenAI API** para transformar texto conforme a reglas definidas y devolver datos estructurados en JSON. Es un componente backend que extiende la funcionalidad de Dynamics CRM.

---

### Tecnologías, frameworks y patrones usados

1. **Tecnologías principales**:
   - **Azure Speech SDK** para reconocimiento de voz y síntesis de texto a voz (TTS).
   - **Azure OpenAI API** para procesamiento de texto con inteligencia artificial.
   - **Microsoft Dynamics CRM SDK** (`Microsoft.Xrm.Sdk`) para plugins y manipulación de datos integrados.
   - **JavaScript** para interacción con DOM y aplicaciones web.

2. **Frameworks/Bibliotecas**:
   - **System.Net.Http** y **System.Text.Json** en backend para solicitudes HTTP y JSON.
   - Uso dinámico de **Xrm.WebApi** en el frontend JS.

3. **Patrones de diseño**:
   - **Modularización en el frontend**: Funcionalidad separada en funciones independientes.
   - **Plugin extensible**: Adopción del estándar de extensibilidad de Dynamics CRM en el backend.
   - Callback en la carga del SDK: Patrón de control de flujo basado en eventos o dependencias.
   - **Uso de servicios externos (API Gateway)**: Centralización de llamadas a servicios externos como OpenAI y Azure Speech SDK.

---

### Tipos de arquitectura

La solución sigue una arquitectura híbrida:
- **Arquitectura modular** en la parte de frontend, donde las funciones tienen roles específicos y se integran entre sí.
- **Plugin-based Architecture**: En el backend, el archivo `TransformTextWithAzureAI.cs` implementa un plugin que interactúa directamente con Dynamics CRM, delegando lógica avanzada a servicios externos como Azure OpenAI.
- **Integración de microservicios externos**: Uso de servicios API de terceros para manejar funciones críticas (como IA para conversión de texto y TTS).

---

### Dependencias o componentes externos

1. **Dependencias externas**:
   - **Azure Speech SDK**: Para todas las operaciones de conversión y síntesis de voz.
   - **Azure OpenAI API**: Para transformación avanzada de texto mediante modelos como GPT-4.
   - **HTTP Client**: (Backend) para enviar solicitudes a servicios externos.
   
2. **Plataformas relacionadas**:
   - **Microsoft Dynamics CRM** proporciona un contexto dinámico para la integración con formularios y gestión de datos.

3. **Mensajería y procesamiento AI**:
   - Interacción directa con APIs externas (como OpenAI) para manejar lógica avanzada.

4. **Formato JSON estructurado**:
   - JSON como formato clave para intercambiar datos en el plugin de Dynamics CRM.

---

### Diagrama Mermaid válido para GitHub

```mermaid
graph TD

A["Usuario completa formulario"] --> B["Aplicación frontend usa funciones JS"]
B --> C["Extrae datos con getVisibleFieldData"]
B --> C1["sendToSpeech - Usa 'Azure Speech SDK'"]

C1 --> D["Azure Speech API procesa datos visibles"]
D --> DefinidoTT["Habla TTS devuelto"]

SubProcess["Caso Speech-Command Handler"]:
  D --> Redirige["Reconocimiento (SpeechCommands AI o IA nativo)"]
DataMapping["Mapeo 'JSON' generado por crm y OpenAI JSON REST-api 

