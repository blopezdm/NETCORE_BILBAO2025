### Resumen Técnico

Este repositorio representa una solución orientada a la transformación y manipulación de datos de formularios mediante comandos de voz, abarcando principalmente:

1. Integración de entradas de voz y síntesis a través del **Azure Speech SDK**.
2. Procesamiento de transcripciones y manejo de datos específicos de formularios en **Dynamics 365**.
3. Uso de un plugin personalizado basado en **Azure OpenAI API** para transformar el texto en estructuras JSON siguiendo ciertas reglas.

---

### Descripción de la arquitectura

El diseño del sistema es modular y presenta un enfoque **n-capas**, donde cada capa gestiona una responsabilidad específica:

1. **Frontend (Capa de presentación y lógica de negocio)**: Está compuesto por dos módulos principales:
   - `readForm.js` y `voiceInputHandler.js`: Recopilan y procesan datos del formulario para su síntesis en voz.
   - `speechForm.js` y `speechInputProcessor.js`: Se encargan de la captura por voz y del procesamiento, incluyendo transcripciones y mapeo de datos para formularios de Dynamics 365.  
2. **Middleware (Servicios externos)**:
   - Integración con **Azure Speech SDK**.
   - Llamadas a APIs externas o servicios personalizados como **Azure OpenAI API** (a través de HTTP/JSON).
3. **Backend (Capa de negocio/CRM)**:
   - `TransformTextWithAzureAI.cs`: Plugin que permite comunicación directa con **Azure OpenAI API** y descompone lógica de negocio crítica dentro del entorno CRM.

Aunque hay elementos que sugieren una arquitectura ligeramente orientada a **hexagonal**, principalmente por la forma en la que los servicios externos son consumidos/desacoplados, el enfoque está más alineado a n-capas, debido a cómo se gestiona la presentación, lógica de negocio y acceso a servicios.

---

### Tecnologías Usadas

1. **Javascript**: Utilizado en el frontend para integrar APIs externas, manipular formularios, realizar transcripciones y síntesis de voz.
2. **Azure Speech SDK**: API utilizada para habilitar reconocimiento de voz y síntesis auditiva.
3. **Microsoft Dynamics 365**: Base del entorno CRM.
4. **Azure OpenAI API**: Generación de estructuras JSON mediante un modelo avanzado como GPT-4.
5. **C#**: Lenguaje del plugin backend `TransformTextWithAzureAI.cs` para lógica avanzada y conectividad con OpenAI.
6. **Newtonsoft.Json** y **System.Text.Json**: Frameworks de serialización y procesamiento de datos en C#.
7. **HTTP Client**: Utilizado para interactuar con servicios externos como Azure OpenAI.
8. **Design Patterns**: Aplicados en varios niveles como `Facade`, `Event-Action`, y funcionalidad modular siguiendo el principio de SRP.

---

### Diagrama Mermaid Compatible con GitHub Markdown

````mermaid
graph TD
    A["Frontend: JS - voiceInputHandler.js / readForm.js"] --> B["Middleware: Azure Speech SDK"]
    C["Frontend: JS - speechInputProcessor.js"] --> B
    B --> D["CRM Backend: Dynamics 365 (Forms API/Xrm.WebApi)"]
    D --> E["Plugin: TransformTextWithAzureAI.cs"]
    E --> F["External Service: Azure OpenAI API"]
````

---

### Conclusión Final

La solución propuesta combina múltiples tecnologías y servicios de una forma modular, lo que permite alinear el reconocimiento y síntesis de voz, el procesamiento de formularios y la transformación textual mediante inteligencia artificial. Su arquitectura **n-capas** organizada asegura que cada módulo desempeñe una función específica y desacoplada del resto, facilitando la escalabilidad, mantenimiento y extensión. Sin embargo, existe margen de mejora utilizando patrones más claros como arquitectura hexagonal o Domain-Driven Design si se busca mayor flexibilidad para futuros cambios.