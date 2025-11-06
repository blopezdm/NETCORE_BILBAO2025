### Breve resumen técnico

El repositorio muestra una solución que integra varias funcionalidades basadas en **Azure Speech SDK** y **Azure OpenAI** en un entorno relacionado con **Microsoft Dynamics 365**. Utiliza archivos JavaScript para habilitar el procesamiento de voz a texto, texto a voz y la interacción con formularios, mientras que un plugin en C# integra la funcionalidad adicional de transformar el texto con normas específicas, usando **Azure OpenAI GPT-4**.

---

### Descripción de la arquitectura

La solución está organizada en tres capas principales:

1. **Frontend Layer**:
   - Archivos ubicados en la carpeta `FRONTEND/JS` habilitan las funcionalidades de voz a texto, texto a voz y manipulación de datos visibles de un formulario.
   - Predominan patrones como **Facade**, **Modular** y **Servicio** para simplificar las responsabilidades de código y optimizar cada unidad funcional.

2. **Backend Layer**:
   - El archivo `TransformTextWithAzureAI.cs`, definido como un plugin de **Microsoft Dynamics CRM**, actúa como la capa backend, procesando el contenido textual mediante Azure OpenAI y devolviendo un JSON estructurado.

3. **Integration Layer**:
   - El uso de servicios externos de Azure para reconocimiento de voz, síntesis de audio y transformación textual sugiere una arquitectura **orientada a servicios**.
   - La estructura apunta hacia una **arquitectura de n capas**, en la que cada componente cumple una función específica (front, backend e integración).

En resumen, la arquitectura está diseñada para facilitar la integración entre un sistema CRM como Dynamics 365 y diversos servicios de Azure, manteniendo componentes desacoplados y modulares.

---

### Tecnologías usadas

1. **Lenguajes**:
   - **JavaScript** para la lógica asociada al frontend y la interacción directa con Azure Speech SDK.
   - **C#** para la implementación de los plugins personalizados en Dynamics CRM.

2. **Frameworks y SDKs**:
   - **Azure Speech SDK**: Reconocimiento y síntesis de voz.
   - **Azure OpenAI SDK**: Procesamiento de lenguaje natural y transformación textual.
   - **Microsoft Dynamics CRM SDK**: Extensión de las funcionalidades de Dynamics mediante plugins.

3. **Otros conceptos tecnológicos**:
   - **Dynamics 365 Xrm.WebApi**: Soporte interno para llamadas a APIs personalizadas y consultas en la plataforma.
   - **REST APIs**: Comunicación con Azure services.
   - Manejo de JSON con **Newtonsoft.JSON** y **System.Text.Json**.

4. **Patrones de Diseño**:
   - **Facade**: Simplificación de procesos complejos mediante funciones de entrada única.
   - **Modular**: Separación de responsabilidades en funciones específicas.
   - **Dependencia dinámica**: Carga de SDKs y recursos únicamente cuando son necesarios.
   - **Responsabilidad única (SOLID)**: Métodos y clases con tareas independientes y claramente definidas.

---

### Diagrama Mermaid válido para GitHub

```mermaid
graph TD
    A1["frontEnd"]
    A2["backend-plugin-C#"]
    A3["Azure-services"]
    
    subgraph B1
    C1["readForm.js"]
    C2["speechForm.js"]
    C..