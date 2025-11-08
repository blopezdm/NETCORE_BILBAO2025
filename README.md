## Breve resumen técnico

Este repositorio contiene archivos para implementar integración de voz y procesamiento de formularios con **Azure Speech SDK**, además de transformación inteligente de texto utilizando **Azure OpenAI AI enviar servicio (GPT)** mediante plugins en **Microsoft Dynamics 365**.

La solución incluye frontend en **JavaScript** para la entrada de voz, síntesis de texto y lógica de inserción en formularios de **Dynamics 365**, y un plugin desarrollado en C# para la transformación avanzada de texto con IA. Está pensada para sistemas empresariales centrados en CRM y experiencias de usuario accesibles mediante voz.

---

## Descripción de la arquitectura

### Arquitectura General
La solución tiene un enfoque basado en **arquitectura de n capas**:
- **Capa de presentación (Frontend)**: Compuesta por scripts en JavaScript que interactúan con el SDK de Azure Speech y los formularios de Dynamics 365.
- **Capa intermedia (Middleware/API)**: Plugins en C# dentro de Dynamics CRM que actúan como facilitadores entre APIs externas (como Azure OpenAI) y el sistema CRM, utilizando el patrón **SOA (Service-Oriented Architecture)**.
- **Capa de datos**: Integración directa con la base de datos del sistema Dynamics CRM mediante `Microsoft.Xrm.Sdk`.

### Patrones de diseño
- **Facade Pattern**: En el frontend, las funciones iniciales (`startVoiceInput`, etc.) actúan como una interfaz simple para encapsular tareas más complejas.
- **Event-Driven / Callback Structure**: Carga dinámica del Azure Speech SDK para minimizar tiempos de carga y asegurar la respuesta del servicio antes de procedar.
- **Plug-and-Play Pattern**: El plugin implementa la interfaz `IPlugin` para integrarse sin modificar el núcleo de Dynamics CRM.
- **Encapsulación y Modulación**: Código dividido en funciones enfocadas a tareas específicas para mejorar la reutilización y pruebas unitarias.

---

## Tecnologías usadas

1. **Frontend (JavaScript)**:
   - **Azure Speech SDK**: Implementa funcionalidades de entrada/salida de voz, reconocimiento de texto y procesamiento de voz.
   - **Microsoft Dynamics API**: Utilizada para manipular formularios y datos empresariales.
   - **Dynamics Web API**: Interacción con APIs personalizadas y en línea.
   - **Dynamics 365 Form Processor**: Para procesar atributos y valores en formularios.

2. **Backend (C#)**:
   - **Azure OpenAI**: Usada para transformar texto natural en JSON estructurado mediante reglas.
   - **.NET SDK**: Interacción entre plugins personalizados y Dynamics CRM.
   - **Newtonsoft.Json**, **System.Net.Http**, **System.Text.Json**: Manejo de JSON y solicitudes HTTP para integrar APIs externas.

3. **APIs externas**:
   - Azure Speech SDK (para voz).
   - Azure OpenAI (inteligencia artificial para transformación de texto).

---

## Diagrama Mermaid

```mermaid
graph TD
    A[Reactivo-Dynamics-Forms] --> B[Frontend JS]
    B --> C[readForm.js]
    B --> D[speechForm.js]
    B --> E[voiceInputProcessing.js]
    C --> F["Azure Services Speech SDK"]
    F[SDK-AzureSDK]-front PROCESOs 
