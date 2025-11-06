# Archivo: FRONTEND/JS/readForm.js

## Descripción funcional

El archivo `readForm.js` implementa funciones para realizar síntesis de voz basada en los datos visibles de un formulario. Utiliza el SDK de Azure Speech para convertir los campos de formularios en texto hablado. Las funciones en este archivo automatizan la carga del SDK de Azure Speech, extraen y procesan los datos de formularios visibles, y finalmente sintetizan texto, facilitando la interacción por voz con formularios.

---

## Descripción técnica

### **Funciones definidas**

#### 1. `startVoiceInput(executionContext)`
- **Lenguaje**: JavaScript
- **Parámetros**:
  - `executionContext`: Contexto del formulario que contiene los datos a leer.
- **Variables modificadas**: No modifica variables.
- **Condiciones**:
  - Depende de que el SDK de Azure Speech esté cargado correctamente para ejecutar las funciones posteriores.
- **Descripción**: 
  Esta función inicia el proceso de lectura por voz del formulario. Primero comprueba si el SDK de Azure Speech está cargado mediante la función `ensureSpeechSDKLoaded`. Una vez cargado, llama a la función `leerFormulario` pasando el `executionContext`.
- **Valor de retorno**: Ninguno.

---

#### 2. `leerFormulario(executionContext)`
- **Lenguaje**: JavaScript
- **Parámetros**:
  - `executionContext`: Contexto del formulario, utilizado para obtener información de sus campos.
- **Variables modificadas**: No modifica variables globales, aunque utiliza constantes internas como:
  - `azureKey`: Clave de suscripción a Azure Speech (hardcoded).
  - `azureRegion`: Región de servicio de Azure Speech (hardcoded).
- **Condiciones**:
  - Verifica que el SDK de Azure Speech esté cargado (`window.SpeechSDK`).
  - Evalúa si hay datos de campos visibles del formulario para lectura.
- **Descripción**:
  Esta función extrae los datos de los campos visibles del formulario utilizando la función `getVisibleFieldData`. Los datos extraídos se formatean como un texto estructurado (indicando etiquetas y valores). Si hay texto para leer, se llama a la función `speakText` con dicho texto y credenciales de Azure.
- **Valor de retorno**: Ninguno.

---

#### 3. `getVisibleFieldData(formContext)`
- **Lenguaje**: JavaScript
- **Parámetros**:
  - `formContext`: Contexto del formulario utilizado para acceder a los atributos de los campos.
- **Variables modificadas**: Una variable local:
  - `fieldData`: Array de objetos que contiene información sobre los campos visibles del formulario (etiquetas y valores).
- **Condiciones**:
  - Ignora los atributos que no tienen controles o etiquetas visibles.
  - Filtra los valores de los campos vacíos o nulos.
- **Descripción**:
  La función recorre los atributos del formulario y verifica para cada uno de ellos si tiene controles con etiquetas visibles (`getLabel`) y valores legibles. Los datos son formateados en una colección de objetos que incluye las etiquetas y valores visibles de los campos. Internamente, utiliza `getReadableValue` para formatear correctamente los valores según el tipo de atributo.
- **Valor de retorno**: Devuelve un array de objetos con las propiedades:
  - `label`: Texto de la etiqueta del campo.
  - `value`: Valor del campo.

---

#### 4. `getReadableValue(attr)`
- **Lenguaje**: JavaScript
- **Parámetros**:
  - `attr`: Atributo del formulario para obtener su valor y tipo.
- **Variables modificadas**: No modifica variables.
- **Condiciones**:
  - Valida si el valor del atributo (`raw`) es nulo o indefinido.
- **Descripción**:
  La función obtiene y retorna un valor legible para un atributo del formulario en función de su tipo (`getAttributeType`). Realiza conversiones dependiendo del tipo:
  - `string`/`memo`: Retorna el valor directamente como cadena.
  - `boolean`: Retorna `Sí` para valores verdaderos, o `No` para valores falsos.
  - `datetime`: Convierte el valor a formato de fecha local.
  - Numéricos (`decimal`, `double`, `integer`): Retorna el valor convertido a cadena.
  - `optionset`: Busca la opción correspondiente al valor y retorna el texto asociado.
  - `lookup`: Retorna el nombre del elemento de referencia si existe.
  - Otros tipos no especificados retornan cadenas vacías.
- **Valor de retorno**: Retorna una cadena legible que representa el valor del atributo.

---

#### 5. `speakText(text, azureKey, azureRegion)`
- **Lenguaje**: JavaScript
- **Parámetros**:
  - `text`: Cadena que contiene el texto que será sintetizado.
  - `azureKey`: Clave de suscripción de Azure Speech.
  - `azureRegion`: Región usada para conectarse al servicio Azure Speech.
- **Variables modificadas**: 
  - Internamente crea y utiliza objetos de configuración relacionados con el SDK de Speech:
    - `speechConfig`: Configuración del servicio de síntesis de voz.
    - `audioConfig`: Configuración del dispositivo de salida de audio.
    - `synthesizer`: Instancia de synthesis que lleva a cabo la conversión de texto a voz.
- **Condiciones**:
  - Comprueba si la síntesis de audio se realizó correctamente (`result.reason`).
- **Descripción**:
  Esta función utiliza el SDK de Azure Speech para sintetizar el texto proporcionado. Configura las opciones de síntesis de voz, incluida la configuración de idioma (`es-ES`) y la selección de una voz neural específica (`es-ES-AlvaroNeural`). Llama métodos de la API para realizar la conversión de texto a voz y manejar posibles errores durante el proceso.
- **Valor de retorno**: Ninguno.

---

#### 6. `ensureSpeechSDKLoaded(callback)`
- **Lenguaje**: JavaScript
- **Parámetros**:
  - `callback`: Función que será ejecutada una vez el SDK se haya cargado.
- **Variables modificadas**: 
  - Modifica el DOM añadiendo un elemento `<script>` para cargar el SDK de Azure Speech si no está disponible.
- **Condiciones**:
  - Verifica si `window.SpeechSDK` ya está disponible antes de intentar cargar el SDK.
- **Descripción**:
  Comprueba si el SDK de Azure Speech está cargado en el ambiente actual. Si no lo está, inserta dinámicamente un script en el DOM para cargarlo. Una vez que el SDK esté disponible, ejecuta la función proporcionada en el callback. Maneja errores mediante alertas si no se puede cargar correctamente el SDK.
- **Valor de retorno**: Ninguno.

---

#### Resumen de implementación:
1. Carga dinámica del SDK de Azure Speech (`ensureSpeechSDKLoaded`).
2. Extracción de datos visibles del formulario (`getVisibleFieldData` y `getReadableValue`).
3. Conversión de texto a voz utilizando el SDK de Azure Speech (`speakText`).
4. Proceso orquestado desde la función primaria `startVoiceInput`.


SHA:72de617dce9be181ea8a2e98d9d05b5860910c0e