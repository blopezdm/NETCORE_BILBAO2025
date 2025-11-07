### Breve resumen técnico

El repositorio contiene una solución que integra la funcionalidad de reconocimiento y síntesis de voz, así como texto transformado por inteligencia artificial, aplicado a la gestión de formularios en Dynamics CRM. Los archivos muestran una combinación de tecnologías web y de backend, con integración directa a servicios cloud como Azure Speech SDK y Azure OpenAI.

---

### Descripción de arquitectura

1. **Tipo de solución**:  
   La solución combina una **API Backend** y un **cliente frontend** que interactúan con Dynamics CRM. Adicionalmente, utiliza servicios SaaS en la nube mediante Azure Speech SDK y Azure OpenAI.

2. **Arquitectura empleada**:  
   Predomina una **arquitectura orientada a eventos** en el frontend, mientras que el backend (plugin) adopta el patrón **n capas** mediante la separación entre lógica de negocio, dependencias externas (Azure API), y procesamiento de datos en el cliente Dynamics CRM. No cumple los estrictos principios de diseño hexagonal, aunque se asemeja en algunos aspectos por el manejo de contexto y externalización de lógica hacia Azure.

3. **Flujo de integración**:
   - El frontend ejecuta entrada y salida de voz (speech-to-text y text-to-speech) mientras interactúa con formularios CRM.
   - El backend toma texto procesado, llama a Azure OpenAI para transformación, y devuelve datos estructurados para integrarlos al contexto CRM.

---

### Tecnologías usadas

1. **Frontend**:
   - **JavaScript ECMAScript 6**: Base del código.
   - **Azure Speech SDK**: Para la implementación de voz sintetizada y reconocimiento de voz.
   - **DOM API**: Carga dinámica de scripts y manipulación del contexto del formulario CRM.
   
2. **Backend**:
   - **C#**: Lenguaje principal en el plugin.
   - **Microsoft Dynamics SDK**: Comunicación con el CRM.
   - **Azure OpenAI**: Modelo GPT para procesamiento avanzado de texto.
   - **Newtonsoft.Json**: Librería común para manejar datos JSON en C#.
   - **System.Net.Http**: Llamadas HTTP hacia servicios SaaS.

---

### Dependencias y componentes externos

1. **Azure Speech SDK**:
   - Necesario para la funcionalidad de reconocimiento de voz y síntesis de texto en voz.
   - Requiere una API key y configuración de región.

2. **Azure OpenAI API**:
   - Utilizado para transformar texto según modelos avanzados de IA.
   - Requiere una clave API, endpoint configurado, y modelo de procesamiento.

3. **Dynamics 365 SDK**:
   - Manejo de entidades en CRM (formContext), como campos y atributos.

4. **Librerías externas para C#**:
   - `Newtonsoft.Json`: Manejo JSON.
   - `System.Net.Http`: Comunicación HTTP.

---

### Diagrama Mermaid

```mermaid
graph TD
    A["Frontend JS Files"] --> B["Azure Speech SDK"]
    A --> C["Dynamics CRM (contexto de formulario)"]
    B --> D["Procesamiento de voz (speech-To-text y text-to-speech)"]
    C --> E["Gestión de datos en el formulario"]
    E --> F["Firebase-load Script APIs"]
    A --> F["Load Dynamic Form"]
    E --> CD["Formatos de contexto Entidad con normativa "Azure Ai output modelling"...."]
