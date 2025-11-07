### Breve resumen técnico
El repositorio alberga una solución con un enfoque en la integración de servicios de Azure en una aplicación basada en Dynamics 365. Los archivos contienen módulos que implementan una interfaz entre formularios de usuario y servicios cloud para reconocimiento, síntesis de voz y procesamiento de textos usando Azure Speech SDK y Azure OpenAI.

---

### Descripción de arquitectura
La arquitectura de la solución es híbrida con elementos de **n capas** que orientan la funcionalidad hacia la modularidad. También contiene integraciones hacia componentes externos basados en **arquitectura SOA (Service-Oriented Architecture)**. La comunicación entre módulos se realiza mediante APIs y servicios externos (como Azure APIs).

1. **Frontend (JavaScript)**:
   - Ejecuta la lógica de interfaz entre el usuario (formulario Dynamics 365) y los servicios de reconocimiento o síntesis de voz.
   - Usa el patrón `Modular Design` con funciones específicas que realizan tareas centradas en la síntesis de datos y sonido.

2. **Backend (Plugins en C#)**:
   - Implementa plugins que funcionan como extensiones en Dynamics CRM mediante el patrón de diseño de Plugins.
   - Se utiliza la integración dinámica con Azure OpenAI para tareas específicas de transformación textual.

---

### Tecnologías usadas
1. **Frontend**:
   - **JavaScript**: Lenguaje principal en los archivos frontend.
   - **Azure Speech SDK**: Para reconocimiento y síntesis de voz.
   - **Microsoft Dynamics 365 APIs**: Para interactuar con formularios y datos del CRM.

2. **Backend**:
   - **C#**: Lenguaje principal para escribir el plugin.
   - **Microsoft.Xrm.Sdk**: Framework de Dynamics CRM usado para extender funcionalidad.
   - **Azure OpenAI API**: Para procesamiento textual avanzado.
   - **Newtonsoft.Json** y **System.Text.Json**: Para formateo y manipulación de datos en formato JSON.
   - **System.Net.Http**: Para realizar solicitudes HTTP al servicio externo Azure AI.

3. **Other external services**:
   - Load of Azure SDK dynamically through URLs.

---

### Diagrama Mermaid

```mermaid
graph TD
    A["Usuario-interfaz-formulario-Dynamics-365"]
    B["Azure-Speech-SDK"]
    C["Azure-OpenAI-API"]
    D["Frontend - JS (VoiceInputHandler.js)"]
    E["Plugin en C# (TransformTextWithAzureAI.cs)"]
    F["Dynamics 365 CRM"]
    G["SpeechRecognition.js"]

    A --> D
    D --> F
    D --> B
    D["Voice recognition"] --> C["Azure GPT-"]
 
 
