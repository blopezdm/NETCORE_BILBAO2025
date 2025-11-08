### Breve Resumen Técnico

El repositorio implementa una solución completa que utiliza integración con servicios cognitivos para la entrada de datos, conversión de texto a voz y enriquecimiento del texto a través de servicios en la nube como **Azure Cognitive Services** y **Azure OpenAI**. Combina funcionalidades frontend (en JavaScript) para interactuar con el usuario, y componentes backend (en C#) especializados para procesamiento de datos. Su ámbito abarca la transformación de voz/texto y su integración en sistemas CRM (Dynamics 365), empleando arquitectura orientada a módulos y patrones de procesamiento asincrónico.

---

### Descripción de Arquitectura

La solución se caracteriza por una **arquitectura de n capas**, que se divide en los siguientes niveles:

1. **Capa de presentación (Frontend/JS)**:
   - Interacción directa con el usuario para capturar datos.
   - Componentes de entrada de voz transforman la voz en texto y en datos interpretables, mientras que se utiliza además síntesis de texto a voz.

2. **Capa intermedia (Plugins en Dynamics 365)**:
   - Contiene lógica de negocio orientada al procesamiento de texto y comunicación con servicios externos, como **Azure OpenAI**. 

3. **Capa de servicios externos**:
   - Integración con Azure Cognitive Services y OpenAI para enriquecimiento en tiempo real de datos y manejo de información estructurada en JSON.

Se clasifica como arquitectura **n-capas** con integración a servicios externos, lo que diferencia claramente las partes responsables de interacción con el usuario, lógica de dominio y terceros.

---

### Tecnologías Usadas

1. **Frontend / JavaScript**:
   - SDK de Azure Cognitive Services Speech.
   - Promesas y manejo asincrónico.
2. **Backend / C#**:
   - Microsoft Dynamics CRM SDK.
   - `System.Net.Http` para llamadas HTTP.
   - JSON tools: `System.Text.Json` y `Newtonsoft.Json.Linq`.
   - Consumo de APIs (REST) como **Azure OpenAI**.
3. **Servicios externos**:
   - Dynamics 365.
   - Azure Cognitive Services Speech SDK (sintetizador y reconocedor de voz).
   - Azure OpenAI (GPT-4 para enriquecer textos y estructuración).

### Diagrama Mermaid

```mermaid
graph TD
  A["Frontend-JS readForm Chat-to-Speech"]
  B["Formulario Captura Datos Visibles"]
  C["Azure Speech SDK"]
  D["Azure Speech-To-Text"]
  E["Texto Escrito por voz"]
  F["Azure Text-Speech generación"]
  G["Audio salida"]

  H["Frontend-JS speechToFormulario"]
  I["Reconocimiento-Final texto IA-Decódigo"]
  J["callAPI Envía -mapea validación Chat"]
  K["Dynamics"]-->IAMapeaFinal
  FORMS["API Dynamics-lookup interno"]
  
 
  E >> A