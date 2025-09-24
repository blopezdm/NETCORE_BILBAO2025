# TransformTextWithAzureAI

## Descripción funcional

`TransformTextWithAzureAI` es un plugin desarrollado en C# para Microsoft Dynamics CRM que, al ser activado, transforma un texto ingresado en un formato JSON estructurado según ciertas normas específicas. Utiliza el servicio de Azure OpenAI para realizar dicha transformación, haciendo uso de la API de OpenAI configurada en Azure. La salida devuelve un JSON plano que cumple con normas rígidas en relación al formato de valores y el tipo de datos.

---

## Descripción técnica

### Lenguaje
El código está escrito en **C#**.

### Lista de métodos
El archivo contiene dos métodos principales:

1. **`Execute`** (implementación requerida por la interfaz `IPlugin` de Dynamics CRM).
2. **`GetOpenAIResponse`** (método estático que gestiona la lógica para la solicitud HTTP a Azure OpenAI).

---

### Métodos detallados

#### 1. **`Execute(IServiceProvider serviceProvider)`**
- **Lenguaje:** C#
- **Parámetros:**
  - `serviceProvider` (de tipo `IServiceProvider`): Proveedor de servicios de Dynamics CRM que permite el acceso al contexto de ejecución, servicios organizacionales y más.
- **Variables modificadas:**
  - `context.OutputParameters["response"]` (almacena la respuesta JSON transformada generada por OpenAI).
- **Condiciones, validaciones o requisitos:**
  - Verifica si el parámetro de entrada `context.InputParameters["text"]` contiene un texto válido (no nulo ni vacío).
- **Descripción funcional:**
  1. Obtiene el contexto de ejecución y servicios organizacionales usando el proveedor de servicios.
  2. Recupera el texto de entrada desde `context.InputParameters["text"]`.
  3. Si el texto está vacío o nulo, establece la salida `response` como una cadena vacía y detiene la ejecución.
  4. Define las normas estrictas que deben aplicarse al resultado JSON.
  5. Llama al método `GetOpenAIResponse` pasando el texto de entrada y las normas.
  6. Almacena el resultado del método en `context.OutputParameters["response"]`.
- **Valor de retorno:** Ninguno (es un método `void` que modifica objetos de contexto por referencia).

---

#### 2. **`GetOpenAIResponse(string userMessage, string normas)`**
- **Lenguaje:** C#
- **Parámetros:**
  - `userMessage` (de tipo `string`): Texto que será transformado según las normas dadas.
  - `normas` (de tipo `string`): Conjunto de reglas estrictas que debe cumplir el JSON resultante.
- **Variables modificadas:** Ninguna variable externa o global. Modifica valores internos locales.
- **Condiciones, validaciones o requisitos:**
  - El método valida la respuesta HTTP retornada al realizar la llamada a la API. Si ocurre un error de comunicación con Azure OpenAI, lanza una excepción con detalles del error.
- **Descripción funcional:**
  1. Define valores como la URL base del servicio de Azure OpenAI, nombre del despliegue, versión del API, la clave de API y otros parámetros requeridos.
  2. Construye un `prompt` con el mensaje y las normas en un formato estructurado.
  3. Crea un objeto `payload` con el `prompt` y parámetros como `temperature`, `top_p` y `max_tokens` para personalizar la salida del modelo.
  4. Serializa el objeto `payload` a formato JSON.
  5. Configura el cliente HTTP (`HttpClient`) para enviar la solicitud POST al endpoint específico de OpenAI, con la clave de API incluida en las cabeceras.
  6. Realiza la solicitud HTTP utilizando el JSON serializado como cuerpo de contenido, e interpreta la respuesta:
     - Si la respuesta tiene un estado exitoso (`2xx`), analiza el JSON retornado para obtener la clave "content" dentro de los `choices` generados.
     - Si la respuesta es fallida, lanza una excepción con el mensaje de error específico.
  7. Devuelve el contenido de texto transformado como resultado.
- **Valor de retorno:**
  - Devuelve un `string` con el JSON transformado generado por Azure OpenAI.

---

### Relaciones entre funciones
- **`Execute(IServiceProvider)`** es el punto de entrada principal del plugin y llama indirectamente a **`GetOpenAIResponse(string, string)`** para la transformación del texto. 
- **`GetOpenAIResponse(string, string)`** se utiliza exclusivamente para interactuar con Azure OpenAI, delegando la lógica de transformación de texto al servicio.

---

## Diagrama de flujo (texto)

```plaintext
+----------------+
| Execute        |
| (entry point)  |
+----------------+
        |
        V
+---------------------------+
| Obtiene contexto y texto  |
+---------------------------+
        |
        V
+-----------------------------+
| Verifica texto: vacío/nulo? |
+-----------------------------+
       | No
       V
+----------------------------------+
| Llama a GetOpenAIResponse        |
+----------------------------------+
       |
       V
+----------------------------------+
| Almacena respuesta en contexto   |
+----------------------------------+
       |
       V
+------------------------+
| Fin de ejecución       |
+------------------------+
```

---

## Dependencias externas
**Namespaces y bibliotecas usadas:**
- `System.Text`, `System.Linq`, `System.Net.Http`, etc.: Funcionalidades básicas de C# y manipulación de contenido/excepciones.
- `Microsoft.Xrm.Sdk`: Relacionado con las APIs de Dynamics CRM.
- **`Newtonsoft.Json.Linq`**: Procesamiento JSON usando LINQ-to-JSON.
- **`System.Text.Json`**: Serialización/deserialización JSON moderna.
- **`System.Net.Http.Headers`**: Configuración de cabeceras para solicitudes HTTP.

---

## Consideraciones
- Este código requiere permisos de acceso claros para realizar solicitudes a la API de Azure OpenAI. La clave de API está incluida en el código, pero necesita ser gestionada de forma segura, evitando su exposición a entornos no controlados.
- La clase no incluye manejo avanzado de logs ni diagnósticos, lo que podría dificultar la depuración en un entorno de producción.
- La dependencia de Azure OpenAI establece que el servicio debe estar correctamente configurado con el despliegue y la versión mencionada.

---

## Limitaciones
- **Exposición de la clave de API:** La configuración directa de la clave dificulta el cambio dinámico en entornos sensibles (sugerencia: usar variables de entorno o Azure Key Vault).
- **Bloqueo síncrono:** El método utiliza `.GetAwaiter().GetResult()` al realizar solicitudes HTTP, lo cual puede causar bloqueos en el hilo principal si no se maneja correctamente.

---

## Ejecución esperada
1. El usuario provee un texto como parámetro.
2. Si el texto es válido, se envía como entrada a Azure OpenAI junto con normas estrictas.
3. OpenAI transforma y valida el texto, retornando un JSON conforme al formato especificado.
4. El JSON resultante se almacena en `OutputParameters["response"]`.


SHA:ec13d056f7cc71ff452e68a967509c506465ddfe