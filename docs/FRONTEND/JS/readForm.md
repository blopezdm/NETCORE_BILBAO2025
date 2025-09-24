# readForm.js

## Descripción funcional

El archivo `readForm.js` implementa funcionalidades para capturar datos visibles desde un formulario en un contexto de ejecución específico y utilizar Azure Speech SDK para leer el contenido en voz alta. Realiza un análisis del formulario obteniendo información de los campos visibles y convierte los valores en texto legible que es sintetizado como audio con ayuda de Azure Speech SDK.

---

## Descripción técnica

### Métodos y funciones definidas por el usuario

A continuación se detallan todas las funciones implementadas en el archivo, con sus aspectos técnicos como parámetros, operaciones internas, valores retornados, y comportamiento:

---

### 1. **`startVoiceInput(executionContext)`**
- **Lenguaje:** JavaScript
- **Parámetros:**  
  - `executionContext`: Contexto de ejecución del formulario desde donde se inicia la captura de datos.
- **Variables modificadas:**  
  Ninguna.
- **Condiciones, validaciones o requisitos:**  
  - Verifica que el Azure Speech SDK esté cargado antes de iniciar el proceso de lectura de datos del formulario.
- **Descripción detallada:**  
  Llama a la función `ensureSpeechSDKLoaded` para garantizar que el SDK de Azure Speech esté cargado. Luego, invoca la función `leerFormulario` pasando el mismo contexto de ejecución.
- **Valor de retorno:**  
  Ninguno.

---

### 2. **`leerFormulario(executionContext)`**
- **Lenguaje:** JavaScript
- **Parámetros:**  
  - `executionContext`: Contexto de ejecución del formulario que provee acceso a las entidades del formulario y sus atributos.
- **Variables modificadas:**  
  Ninguna.
- **Condiciones, validaciones o requisitos:**  
  - Verifica que `window.SpeechSDK` esté disponible.
  - Valida que haya campos visibles en el formulario antes de generar texto. Muestra alertas en caso de errores o falta de datos.
- **Descripción detallada:**  
  - Obtiene el contexto del formulario.
  - Define claves y región necesarias para Azure Speech SDK (`azureKey` y `azureRegion`).
  - Obtiene los datos visibles del formulario llamando a `getVisibleFieldData`.
  - Convierte los datos obtenidos en un texto que detalla los valores de cada campo visible en formato "label: value".
  - Verifica si el texto está vacío (sin campos visibles) y alerta en ese caso.
  - Invoca a `speakText` para sintetizar el texto usando Azure Speech SDK.
- **Valor de retorno:**  
  Ninguno.

---

### 3. **`getVisibleFieldData(formContext)`**
- **Lenguaje:** JavaScript
- **Parámetros:**  
  - `formContext`: Contexto específico del formulario, utilizado para acceder a atributos y controles visibles.
- **Variables modificadas:**  
  - Modifica internamente el arreglo `fieldData` que contiene información de los campos visibles del formulario.
- **Condiciones, validaciones o requisitos:**  
  - Itera por los atributos del formulario y filtra aquellos cuyos controles son visibles.
  - Valida que el control tenga una etiqueta (`label`) y un valor legible antes de incluirlo en los resultados.
- **Descripción detallada:**  
  - Obtiene todos los atributos del contexto de formulario utilizando su API.
  - Itera sobre los atributos para extraer controles y etiquetas visibles asociados a cada uno.
  - Si el atributo tiene un valor legible (determinados por `getReadableValue`), agrega un objeto con las propiedades `label` y `value` al arreglo `fieldData`.
  - Retorna un arreglo de objetos que describen los campos visibles.
- **Valor de retorno:**  
  Un arreglo de objetos con la estructura:  
  ```javascript
  [{ label: "Campo1", value: "Valor1" }, ...]
  ```

---

### 4. **`getReadableValue(attr)`**
- **Lenguaje:** JavaScript
- **Parámetros:**  
  - `attr`: Atributo del formulario al cual se desea determinar su valor legible.
- **Variables modificadas:**  
  Ninguna.
- **Condiciones, validaciones o requisitos:**  
  - Valida que el valor del atributo (`raw`) no sea `null` o `undefined`.
  - Filtra según el tipo de atributo (`getAttributeType`) para determinar cómo interpretar el valor.
- **Descripción detallada:**  
  - Identifica el tipo del atributo (`getAttributeType`) y su valor bruto (`getValue`).
  - Convierte el valor bruto en un formato legible dependiendo del tipo de atributo (`string`, `boolean`, `datetime`, etc.).
  - Maneja los tipos de datos específicos como `optionset` y `lookup` de forma personalizada para obtener texto legible.
  - Retorna una cadena de texto que representa el valor legible.
- **Valor de retorno:**  
  Una cadena de texto legible que representa el valor del atributo.

---

### 5. **`speakText(text, azureKey, azureRegion)`**
- **Lenguaje:** JavaScript
- **Parámetros:**  
  - `text`: Texto que será sintetizado en audio.
  - `azureKey`: Clave de suscripción para Azure Speech SDK.
  - `azureRegion`: Región de la cuenta de Azure Speech SDK.
- **Variables modificadas:**  
  Ninguna.
- **Condiciones, validaciones o requisitos:**  
  - Requiere constantes de configuración (`azureKey` y `azureRegion`) para inicializar el SDK.
- **Descripción detallada:**  
  - Configura el SDK de Azure Speech con clave y región proporcionadas.
  - Define las propiedades relacionadas con el lenguaje y voz en el objeto de configuración de síntesis.
  - Crea un sintetizador para generar audio desde texto.
  - Inicia la síntesis del texto, con manejo de errores para registrar problemas durante el proceso.
- **Valor de retorno:**  
  Ninguno.

---

### 6. **`ensureSpeechSDKLoaded(callback)`**
- **Lenguaje:** JavaScript
- **Parámetros:**  
  - `callback`: Función a ejecutar una vez que el SDK de Azure Speech esté cargado.
- **Variables modificadas:**  
  - Modifica internamente el DOM para cargar el script de Azure Speech SDK si no está disponible.
- **Condiciones, validaciones o requisitos:**  
  - Verifica si `window.SpeechSDK` está cargado; de lo contrario, intenta cargar el script del SDK.
- **Descripción detallada:**  
  - Verifica si `window.SpeechSDK` ya está disponible. Si lo está, ejecuta el `callback`.
  - Si no está disponible, inserta dinámicamente el script del SDK en el DOM y define comportamientos para manejar errores en la carga.
- **Valor de retorno:**  
  Ninguno.

---

## Esquema del orden de ejecución

### Diagrama de flujo textual

```plaintext
startVoiceInput
 └── ensureSpeechSDKLoaded
       └── leerFormulario
             ├── getVisibleFieldData
             │     └── getReadableValue
             └── speakText
```

1. La ejecución inicia en `startVoiceInput`, que verifica si el SDK está cargado (`ensureSpeechSDKLoaded`).
2. Una vez verificado, se ejecuta `leerFormulario`, que obtiene datos visibles del formulario (`getVisibleFieldData`) y prepara el texto para lectura.
3. `getReadableValue` es llamado por cada atributo del formulario para determinar su presentación legible.
4. Finalmente, el texto es sintetizado en audio por `speakText`.

---

## Notas adicionales

- El archivo utiliza Azure Speech SDK, cuya URL es cargada dinámicamente si no está disponible:  
  [`https://aka.ms/csspeech/jsbrowserpackageraw`](https://aka.ms/csspeech/jsbrowserpackageraw)
- La voz para la síntesis de audio está configurada como `es-ES-AlvaroNeural` pero puede modificarse en `speakText`.

--- 

## Requisitos

- La funcionalidad requiere acceso a un formulario con datos estructurados y una conexión activa para interactuar con el SDK de Azure.
- El archivo necesita que los atributos del formulario sean visibles y accesibles mediante sus etiquetas y controles.


SHA:ed1534df56fd4446cfdac2c81860f1932e658157