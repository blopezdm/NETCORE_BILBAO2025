### Breve Resumen Técnico

Este repositorio muestra una solución vinculada a Microsoft Dynamics CRM que integra capacidades de procesamiento de voz y texto mediante el uso de Azure Speech SDK y Azure OpenAI Service. Se observa interacción directa con formularios dinámicos de CRM y APIs externas para transformar, sintetizar y extraer datos. Utiliza JavaScript para lógica en el frontend y C# para plugins en el backend.

---

### Descripción de Arquitectura

La arquitectura está orientada hacia una solución de integración modular donde diferentes partes del sistema interactúan con servicios externos como Azure Speech SDK y Azure OpenAI Service. Se identifica una estructura "n capas":
1. **Capa de presentación**: Scripts de frontend (`VoiceInputHandler.js`, `SpeechInputUtils.js`) que operan sobre formularios visibles en Dynamics CRM.
2. **Capa de negocio/lógica**: Plugins (`TransformTextWithAzureAI.cs`) que procesan texto en base a reglas predefinidas y delegan tareas de AI al servicio Azure OpenAI.
3. **Capa de datos**: Form Context/Data API de Dynamics CRM para interactuar directamente con campos de formularios y atributos.

Predomina un enfoque modular con delegación hacia APIs externas y una estrategia basada en servicios.

---

### Tecnologías Usadas

1. **Front-end**: 
   - Lenguaje: JavaScript.
   - SDK: Azure Speech SDK (optimizado para captura de voz y síntesis TTS).
   - Entorno: Microsoft Dynamics 365 Form Scripting API.

2. **Back-end**:
   - Lenguaje: C# (.NET Framework/Core para plugins).
   - SDK: `Microsoft.Xrm.Sdk` para interacción con Dynamics CRM.
   - Azure OpenAI Service para procesamiento avanzado de texto.

3. **Dependencias externas**:
   - Azure Speech SDK (para manejo de captura y síntesis).
   - Azure OpenAI Service (GPT-4o para texto estructurado).
   - Newtonsoft.Json y System.Net.Http (para manejo de JSON y HTTP).

---

### Diagrama Mermaid

```mermaid
graph TD
    A["Usuario - Inicia Captura por Voz"]
    B["VoiceInputHandler.js - Captura y síntesis de voz con Azure Speech SDK"]
    B1["leerFormulario() - Extrae datos de campos visibles"]
    B2["Speech SDK - Dinámico desde aka.ms"]
    
    C["SpeechInputUtils.js - Procesa transcripción con dos modos"]
    C1["callCustomApi - Llama a API personalizada"]
    C2["processTranscript - Actualiza parámetros en Dynamics CRM"]
    C3["processTranscriptIA - Procesa texto JSON con IA"]
    
    D["TransformTextWithAzureAI.cs - Plugin CRM para transformar texto"]
    D1["GetOpenAIResponse - Llama a Azure GPT para estructuración"]
    D2["Newtonsoft.Json - Manejo de JSON"]
    
    E["Dynamics CRM Form Context - Campos y Formulario"]
    
    %% Flujo
    A --> B
    B --> B1
    B --> B2
    
    B1 --> C
    C --> C1
    C --> C2
    C --> C3
    
    C -> E
    
    C1 --> D
    D --> D1
    D --> D2
    D --> E

```

---

### Conclusión Final

La solución en este repositorio es una combinación de un **frontend para captura y síntesis de voz**, junto con un **plugin de backend para procesamiento de texto basado en IA**. Utiliza una arquitectura **modular n capas** con APIs externas (Azure Speech SDK y OpenAI) y se integra directamente con Dynamics CRM. Las tecnologías empleadas son robustas, pero hay áreas posibles de mejora, como la securización de claves API, optimización de carga dinámica de scripts y mayor abstracción en el uso de servicios externos.