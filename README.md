### Breve Resumen Técnico
El repositorio contiene tres archivos que implementan funcionalidades relacionadas con la integración de servicios de Azure: procesamiento y síntesis de voz en el cliente (frontend), captura dinámica de datos y entrada mediante voz en formularios de Dynamics, y una extensión para Dynamics CRM que aplica transformación de texto con Azure OpenAI. La solución parece ser un complemento integrado para Dynamics CRM que utiliza tecnologías modernas de Azure.

### Descripción de Arquitectura
1. **Tipo de solución**: Híbrida. Combina un frontend cliente basado en JavaScript con un backend de extensibilidad para Dynamics CRM mediante plugins.  
2. **Arquitectura**: N capas, con interacción cliente/servidor.  
   - **Frontend JS**: Ejecuta lógica en navegador y comunica directamente con Azure Speech SDK.
   - **Backend Dynamics CRM**: Implementa un plugin tipo plugin extensible que actúa como puente entre Dynamics y API de Azure OpenAI.  
3. **Patrones identificados**:  
   - Encapsulación funcional en funciones desacopladas.
   - Interacción basada en API REST.
   - Lógica distribuida entre cliente/servidor.
   - Plugin extensible en Dynamics CRM.
   - Carga dinámica para SDK (speech.js).
   - Condicional/coherente para ajustar entre estándares (procesamiento de IA vs manual) según casos.  
4. **Componentes externos**:  
   - **Azure**: Speech SDK y OpenAI.
   - **Dynamics CRM**: Contexto de lógica de negocio.
   - **API personalizada (trial_TransformTextWithAzureAI)**.

### Tecnologías Usadas
- **Frontend**:
  - JavaScript para ejecución en navegador.
  - Integración directa con `Azure Speech SDK` para síntesis y reconocimiento de voz.
- **Backend (Dynamics CRM)**:
  - Extensibilidad de Dynamics mediante plugins (`IPlugin`).
  - Solicitudes HTTP hacia `Azure OpenAI`.
  - Uso de librerías para serialización/deserialización JSON (`System.Text.Json`, `Newtonsoft.Json.Linq`).

### Diagrama Mermaid (GitHub Compatible)
```mermaid
graph TD
    A["Browser - JS readForm"] -- SDK-integration --> B["Azure Speech"]
    A -- SDK-integration --> C["Dynamics VoiceForm"]
    C -- Maps-transforms --> D["Dynamics-field"]
    Sub["Dynamics Plugin transform"]--> Backend["Azure HTTP Layer"]
    Backend["External Plugin REST"]
  
```orizontal form Charlie grad smart flex L