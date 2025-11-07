### Breve resumen técnico
El repositorio incluye una solución distribuida orientada a la integración de una funcionalidad avanzada de entrada y salida de datos mediante voz, basada en servicios de Azure. Combina un frontend JavaScript con una API C# que interactúa con Dynamics 365 CRM y Azure OpenAI para facilitar la interacción mediante voz y texto estructurado.

---

### Descripción de arquitectura
La solución presenta una arquitectura **híbrida basada en n-capas**, organizada en nivel de **frontend** para los formularios JavaScript, **backend API** (Dynamics CRM y plugin) para procesamiento mediante OpenAI, y servicios externos como Azure Speech y Azure OpenAI. Aunque no es completamente desacoplada, se observa un diseño modular en la lógica, especialmente en cómo se delega la síntesis y el reconocimiento de voz al SDK de Azure.

La combinación de interacciones con Azure Speech SDK en el frontend y la funcionalidad de transformación de texto en el backend mediante plugins de Dynamics define una arquitectura **client-server** centrada en API y servicios de terceros.

---

### Tecnologías usadas
- **Frontend:**
  - **JavaScript:** Base del procesamiento dinámico en el navegador y extracción de datos de formularios.
  - **Azure Speech SDK:** Para reconocer y sintetizar voz.
  - Interfaz de **Dynamics CRM** (contexto de formularios).

- **Backend:**
  - **C#.NET Framework:** Para extender Dynamics CRM con lógica personalizada.
  - **Azure OpenAI API:** Procesamiento avanzado de texto con modelos GPT, utilizando `HttpClient` y manipulación JSON.
  - **Dynamics CRM SDK:** Interacción directa con formularios, entidades y su lógica interna.

- **Patrones de diseño:**
  - **Proxy a servicios externos:** Integración de Azure Speech SDK y Azure OpenAI.
  - **Modularidad:** Funciones reutilizables en el frontend para síntesis y reconocimiento.
  - **Plugin-based architecture:** Backend diseñado para activarse en eventos específicos en Dynamics CRM.

---

### Dependencias o componentes externos que pueden estar presentes
1. **Azure Speech SDK:** Biblioteca cargada dinámicamente.
2. **Azure OpenAI API:** Require configuración de endpoint, clave API y permisos de Azure.
3. **Dynamics CRM SDK:** Integración al ecosistema CRM para capturar eventos y modificar formularios.
4. **.NET Framework librerías (HttpClient y Newtonsoft.Json):** Usadas en el backend para comunicarse con APIs externas y manejar JSON.
5. **Dependencias del navegador:** Puede incluir soporte para almacenamiento del SDK dinámico (cache o sesiones).

---

### Diagrama Mermaid (válido para GitHub Markdown)
```mermaid
graph TD
    A["Frontend Usuario"]
    B-->C["Input Voz con SDK"] 
    B & D["Frontend JS - Form Context"]
    E["Interacciones API Dynamics"]
F["Azure OpenAI para reglas-texto"]
I["Asistente Voz-Tipo-datos]

-**Form Context"].