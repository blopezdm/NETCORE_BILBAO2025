### **Breve resumen técnico**
Este repositorio está dividido en tres componentes principales:
1. **Frontend:** Implementa la integración entre un formulario en Dynamics 365 y servicios como de reconocimiento/entrada por voz y síntesis de voz (Azure Speech SDK). También gestiona las interacciones con los campos del formulario utilizando la API nativa de Dynamics.
2. **Plugins:** Extienden la funcionalidad de Dynamics 365 mediante un plugin que usa Azure OpenAI (GPT-4) para transformar texto proporcionado en salidas dinámicas basadas en reglas.
3. **Dependencias externas:** Servicios de Azure (Speech SDK y OpenAI) forman parte esencial de la funcionalidad proporcionada, integrándose tanto en cliente como en servidor.

---

### **Descripción de arquitectura**
Este sistema utiliza una **arquitectura híbrida** basada en tres componentes principales:
1. **Frontend en cliente:** Integración directa del navegador con Azure Speech SDK para funcionalidades de reconocimiento y síntesis de voz. Utiliza una arquitectura **n-capas** con separación en tareas específicas, ejemplo: gestión de dependencias, procesamiento de datos del formulario, integración de voz y de APIs externas.
2. **Interacción con APIs y microservicios:** Llamadas dinámicas desde el cliente a APIs internas y externas (Azure AI, Dynamics Web API). Este patrón sigue una arquitectura de **cliente-servidor**.
3. **Plugins backend:** Extendiendo Dynamics 365 a través de un mecanismo **plugin framework**, una arquitectura típico de CRM, con consultas y transformaciones de texto usando servicios como **Azure OpenAI Service**.

---

### **Tecnologías usadas**
1. **Frontend:**  
   - **JavaScript ES6+**  
   - **Azure Speech SDK (JavaScript)**  
   - **Dynamics 365 web client APIs**  
   
2. **Plugins Backend:**  
   - **C# (.NET Framework/Standard)**  
   - **Azure OpenAI Service**  
   - **System.Net.Http / JSON Processing Libraries**

3. **Servicios de Azure:**  
   - **Azure Speech SDK** para síntesis y reconocimiento de voz en el cliente.  
   - **Azure OpenAI Service (GPT-4)** para estructuras dinámicas del texto en el lado backend.

---

### **Dependencias o componentes externos**
1. **Azure Speech Services:**  
   - Reconocimiento y síntesis de voz mediante SDK dinámico.  

2. **Azure OpenAI Jetson (Backend):**  
   - GPT-4 capacidad para procesos semánticos del texto según reglas personalizadas.

3. **Dynamics 365 web API y SDK:**  
   - Facilidad de extensión mediante un modelo plugin y actualización de datos en formularios.

4. **Librerías base para JSON y HTTP:**  
   - **System.Text.Json** / **Newtonsoft.Json.Linq** en backend.  
   - Sistema de manejo de intercambio de datos JSON-friendly integrados a Dynamics por C y Framework.  

---

### **Diagrama Mermaid**
```mermaid
graph TD
    A["Browser App - Dynamics Frontend"] --> B["Azure Speech SDK"]
    A --> C["Dynamics 365 Web APIs"]
    C --> D["Forms Field Mappings"]
    B --> E["Voice Recognition Handler"]
    B --> F["Voice Synthesis"]
    C --> G["Custom API Call"]
    G --> H["Azure OpenAI - GPT-4"]
    H --> I["Process Text with Rules"]
    C --> F
    F--> D