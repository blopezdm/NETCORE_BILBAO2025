### Breve resumen técnico

El repositorio implementa tres módulos principales especializados en la interacción entre formularios de Dynamics 365 y servicios externos de Azure para facilitar reconocimiento y síntesis de voz, así como transformación de texto mediante IA. El código utiliza el **Azure Speech SDK**, APIs personalizadas de Dynamics 365, y el **Azure OpenAI Service** para integraciones avanzadas.

---

### Descripción de arquitectura

Este sistema tiene una arquitectura **n-capas** con integración explícita de **servicios externos** y enfoque modular. Aunque presenta patrones de plugin en Dynamics 365, su diseño no es monolítico. Cada módulo está altamente separado y definido para cumplir funciones específicas:
- **Frontend**:
  - Gestión de entrada/salida de voz, interactuando dinámicamente con formularios mediante el navegador y SDKs.
- **Lógica de Aplicación**:
  - Procesamiento de entrada por voz (reconocimiento, síntesis, análisis de transcripción).
  - Uso del patrón **provider** para interactuar con Azure Speech SDK y APIs externas.
- **Backend**:
  - Extensión para Dynamics CRM a través de un plugin enfocado en transformar datos con el servicio de IA de Azure.

Se observa una **orientación a servicios** al utilizar Azure Speech SDK y Azure OpenAI API en el flujo de operaciones, alineando las funcionalidades con un **patrón de integración de servicios externos**.

---

### Tecnologías usadas

1. **Frontend (JS)**:
   - **Azure Speech SDK**: Síntesis y reconocimiento de audio.
   - **APIs del navegador**: Manipulación de DOM (document, window).
   - **Dynamics 365**: Acceso a formularios y controles mediante Web API.

2. **Backend (.NET)**:
   - **Microsoft Dynamics SDK**: Creación de plugins.
   - **Azure OpenAI Service**: Procesamiento de texto con GPT-4.
   - **System.Net.Http / JSON Libraries**: Integración y manejo de respuestas JSON.

3. **Patrones de diseño**:
   - Carga dinámica de SDKs.
   - Modularidad: Separación de funcionalidad por función/clase.
   - Provider Pattern: Aplicación explícita de servicios externos.
   - API Integration: Comunicación con APIs externas mediante HttpClient.

---

### Diagrama Mermaid válido para GitHub

```mermaid
graph TD
    A["User Interaction: Formularios Dynamics 365"]
    B["Azure Speech SDK"]
    C[" síntesis-de-voz"]
    D["reconocimiento-de-comandos"]
    E["Frontend: speechForm.js & readForm.js"]
    F["Backend: TransformTextWithAzureAI.cs"]
    G["Azure OpenAI Service"]
    H["Transforma 'normas-texto->json'"]
    I["Dynamics-CRM-API"]
    J["Custom-API para procesamiento personalizacion el resultado"]
  
a-->