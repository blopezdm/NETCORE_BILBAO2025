### Breve Resumen Técnico
Este repositorio implementa funcionalidades de síntesis de voz, reconocimiento de voz, y transformación de texto con inteligencia artificial mediante integración directa con Microsoft Azure Speech SDK, Azure OpenAI, y Dynamics CRM API. Los archivos están estructurados para un sistema que permite interacción en tiempo real con formularios CRM a través de voz y procesamiento de texto, orientado a entornos empresariales.

---

### Descripción de Arquitectura
La solución muestra características de una arquitectura **modular** mezclada con **event-driven architecture**. Cada módulo se especializa en diferentes tareas:
1. **Frontend**: Interacciones cliente-API mediante Azure Speech SDK para reconocimiento y síntesis de voz.
2. **CRM Plugins**: Extensibilidad dentro de Dynamics CRM mediante ejecución de lógica conectada a eventos del sistema (ej. actualización de datos) que invoca servicios externos como Azure OpenAI.

La arquitectura puede clasificarse como "Arquitectura híbrida de múltiples capas", con:
- **Capa de presentación**: Implementada en JavaScript para dinámicas del formulario CRM.
- **Capa de integración externa**: Uso de SDK y APIs externas dinámicamente cargadas.
- **Capa de lógica de negocio**: Implementada como plugins de Dynamics CRM en C#.
- **Capa de servicios**: Procesamiento de tareas específicas con servicios de AI (Azure OpenAI).

---

### Tecnologías Usadas
1. **Frontend (JavaScript)**:
   - Azure Speech SDK.
   - Microsoft Dynamics CRM (Contexto de formularios y atributos).
   - Modern JavaScript (ES6+).

2. **Backend/Plugins (C#)**:
   - .NET Framework (Integración con Dynamics CRM).
   - Azure OpenAI (GPT-4 y comunicación HTTP).

3. **Patrones y estrategias**:
   - Pipeline de datos procesados: Transformación desde formularios a datos manejados por voz.
   - Event-driven architecture: Callbacks para flujos de voz y procesamiento en tiempo real.
   - Modularización funcional: División en funciones reutilizables, desacopladas.

---

### Diagrama Mermaid

```mermaid
graph TD
    A["Frontend - JS VozInputHandler.js"] --> B["Synthesiza texto - Azure Speech SDK"]
    A --> C["Carga condicional del SDK"]
    A --> D["CRM - lectura de formularios"]. 
    A --> E["sendToDynamicsAPI"]
    
    F["Frontend - JS SpeechForm.js"] --> G["SDK Azure: Procesamiento reconocimiento"]
    F --> H["callCustomApi: API Inteligencia Artificial personalizada"]
    F --> I["ProcessTranscript: Decodifica texto transcrito"]
    F --> J["Asocia datos directamente al formulario"]
    
    K["Plugins/TransformTextWithAzureAI.cs"] --> L["Procesar texto con normas específicas"]
    K --> M["Azure OpenAI GPT API"]
    K --> N["Devolver JSON estructurado"]
    M --> O["Interacción externa e internacional vía completions"]
```

---

### Conclusión Final
Este repositorio combina lógica cliente-servidor y capacidades de procesamiento externo utilizando servicios avanzados de inteligencia artificial y síntesis de voz. La arquitectura muestra una solución híbrida y altamente extensible, óptima para entornos CRM. La integración modular y la utilización de servicios dinámicos permiten una implementación robusta en tiempo real de voz e inteligencia artificial en sistemas empresariales.