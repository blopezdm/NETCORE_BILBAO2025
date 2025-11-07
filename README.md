### Breve Resumen Técnico

El repositorio describe una solución híbrida que conecta Azure Speech SDK y Dynamics 365 CRM para implementar accesibilidad y automatización basada en mecanización de datos entre voz y formularios. Utiliza módulos frontend (JavaScript) para gestionar voz y transcripciones, mientras el backend (C# plugin) delega funcionalidades avanzadas de procesamiento de texto hacia Azure OpenAI.

---

### Descripción de Arquitectura

La solución tiene una arquitectura **híbrida basada en integraciones entre frontend, plugins en backend y servicios externos (Azure)**.

1. **Frontend:**
   - Proporciona interacción directa con el usuario a través de dos módulos principales (`readForm.js` y `speechForm.js`).
   - Utiliza **Azure Speech SDK** para sintetizar y transcribir voz.
   - Procesa formularios dinámicos de Dynamics 365 mediante API personalizada.

2. **Backend:**
   - Implementa un plugin para Dynamics CRM (`TransformTextWithAzureAI.cs`) que transforma texto usando Azure OpenAI API y lo devuelve en formato JSON estructurado.
   - Directo acoplamiento con Dynamics 365 CRM SDK.

3. **Integraciones:**
   - La arquitectura depende de la comunicación entre los módulos frontend y backend, utilizando una "Custom API" en Dynamics CRM para invocar el procesamiento avanzado en Azure OpenAI.

*Patrones utilizados:*
- **Facade Pattern**: Para simplificar la lógica de inicio en los módulos frontend con funciones principales (`startVoiceInput`).
- **Integración de Servicios**: Uso de Speech SDK y OpenAI API como servicios externos.
- **Modularidad**: División clara entre extracción de datos, transformación y síntesis de voz en el frontend.
- **Plugin-based Architecture**: Dinámica de ejecución dentro de Dynamics CRM.

---

### Tecnologías Usadas

1. **Frontend:**
   - Azure Speech SDK (sintetizar y transcribir voz).
   - JavaScript.

2. **Backend:**
   - Microsoft Dynamics CRM SDK (gestionando lógica de negocio en plugins).
   - Azure OpenAI API (procesamiento avanzado de texto).

3. **Comunicación:**
   - APIs personalizadas en Dynamics CRM.
   - HTTP para integración con servicios externos (Azure Speech y Azure OpenAI).

4. **Otros:**
   - `HttpClient` en C# para invocar servicios REST.
   - `executeOnceAsync()` en Speech SDK para transcripción de voz.

---

### Diagrama Mermaid Válido para GitHub

```mermaid
graph TD
  A["Usuario - Interacción de voz con Dynamics/forms"]
  
  sub1_1["Frontend"]
  sub1_2["Extractor datos legales visibles"]
  B["Azure Speech SDK: sintetizar voz/transcriptar"]
  
  A --> sub1_1 --> sub1 or decorators