### Breve resumen técnico
El repositorio pertenece a una solución que integra capacidades avanzadas de reconocimiento de voz y procesamiento de texto utilizando servicios en la nube (Azure Speech SDK y Azure OpenAI API). Está diseñado principalmente para interactuar con formularios en Microsoft Dynamics CRM. Los archivos están organizados en base a su funcionalidad dentro de un sistema posiblemente basado en la arquitectura n capas con integración de servicios externos.

### Descripción de la arquitectura
La solución tiene componentes que indican una arquitectura **modular de n capas**. Las funcionalidades del frontend (como generación y transcripción de voz) están separadas en archivos JavaScript independientes (modularidad). Por otro lado, la transformación del texto transcrito y su uso con Inteligencia Artificial se implementa en un plugin basado en el patrón `IPlugin` de Dynamics CRM. 

Este diseño refleja una separación lógica entre las capas: 
1. **Presentación (Frontend):** Responsable de capturar datos de los formularios y permitir interacción por reconocimiento de voz (por ejemplo, recoger los valores de los campos visibles o mapear datos obtenidos mediante la voz).  
2. **Negocio (Logic):** Contiene la lógica específica para procesar texto y llamar a servicios externos. Ejemplo: métodos para transformar texto con OpenAI o integración API externa desde Dynamics.   
3. **Persistencia:** El formulario de Dynamics CRM actúa como el punto de persistencia para los datos generados y procesados.

El sistema presenta una integración directa de servicios externos en estas capas, especialmente con el SDK de voz y APIs, destacando patrones establecidos como el de **integración API** y **callback para asincronía**. El plugin para Dynamics CRM refuerza el patrón de arquitectura de **extensiones basadas en eventos**.

---

### Tecnologías usadas
1. **Frontend:**
   - JavaScript para la lógica en el cliente.
   - Azure Speech SDK para servicios de voz: conversión de texto a voz (síntesis) y voz a texto (transcripción).
   - Dynamics CRM frameworks y arquitectura para acceder a formularios y contextos del sistema.
   
2. **Backend:**
   - Plugin para Dynamics CRM (C# implementando la interfaz `IPlugin`).
   - Azure OpenAI API para procesamiento de lenguaje natural.
   - Uso de bibliotecas como Newtonsoft.Json para manejar JSON.
   - HTTP Client para integración con APIs externas.

3. **Patrones/Design:**
   - **Modularidad:** Código claramente separado por responsabilidades específicas.
   - **API Integration Pattern:** Llamadas a servicios Azure (Speech SDK y OpenAI API).
   - **Callback Pattern:** En el manejo de asincronía (en el SDK de voz).

Other Technologies: GitHub Actions (posible uso), Microsoft Dynamics CRM framework.

---

### Diagrama Mermaid
Diagrama representando la arquitectura y flujo.

```mermaid
graph TD
    A["Frontend: React Form Dynamics CRM"] --> B["JS Integration"]
    B --> C["Azure Speech SDK: Synthesis-text to speech"]
    B --> D["Azure Speech SDK: Speech-to-text transcription"]
    D --> E["Map data to fields in Dynamics"]
    D --> F["Custom API call - Send transcription"]
    F --> G["Azure Open AI"]