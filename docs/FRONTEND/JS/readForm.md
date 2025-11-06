# Documento Técnico

## Archivo Analizado: FRONTEND/JS/readForm.js

### Descripción Funcional:
El archivo JavaScript contiene funciones para ejecutar una lectura en voz alta de los datos visibles de un formulario en un sistema, basándose en la API de Azure Speech SDK. Implementa las siguientes funcionalidades principales:

1. Carga dinámicamente el Azure Speech SDK si no está ya disponible.
2. Recopila los valores visibles de los campos del formulario y los procesa.
3. Convierte los datos procesados en un texto legible para ser sintetizado y leído en voz alta utilizando el servicio de Azure Speech.

Este archivo está destinado a mejorar la accesibilidad y proporcionar capacidades de lectura de datos basada en interacción de voz.

---

## Descripción Técnica:

El archivo incluye las siguientes funciones definidas por el usuario:

### 1. `startVoiceInput(executionContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `executionContext`: Contexto del formulario, que contiene la información del formulario.
- **Variables modificadas:** Ninguna.
- **Condiciones, validaciones o requisitos:**
  - Verifica que el Speech SDK esté cargado antes de ejecutar la acción.
- **Descripción:**
  Esta función sirve como punto de entrada. Se asegura de que el SDK de Azure Speech esté cargado y una vez confirmado, invoca la función `leerFormulario` para procesar y sintetizar los datos del formulario.   
- **Valor de retorno:** No tiene valor de retorno.

---

### 2. `leerFormulario(executionContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `executionContext`: Contexto del formulario para obtener los datos y metainformación del formulario.
- **Variables modificadas:** Ninguna.
- **Condiciones, validaciones o requisitos:**
  - Verifica si el objeto global `window.SpeechSDK` está cargado.
  - Verifica si los datos del formulario contienen campos visibles con valores.
- **Descripción:**
  Esta función recopila los datos visibles del formulario utilizando la función `getVisibleFieldData` y los convierte en un texto legible. Si no hay campos visibles o si el SDK no está cargado, muestra un mensaje de alerta. Posteriormente, pasa el texto resultante y las credenciales de Azure al método `speakText` para realizar la lectura en voz alta.
- **Valor de retorno:** No tiene valor de retorno.

---

### 3. `getVisibleFieldData(formContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `formContext`: Contexto del formulario, que proporciona acceso a la entidad y sus atributos.
- **Variables modificadas:**
  - Modifica el arreglo local `fieldData` con objetos que contienen `label` (etiqueta del campo) y `value` (valor procesado).
- **Condiciones, validaciones o requisitos:**
  - Cada atributo del formulario debe tener al menos un control visible para ser procesado.
  - Verifica que exista una etiqueta (`label`) para procesar los datos de un campo.
  - Invoca la función `getReadableValue` para validar y extraer un valor legible.
- **Descripción:**
  Esta función recorre los atributos de una entidad asociada al formulario, filtrando los campos visibles con etiquetas y valores procesables. Adiciona los datos de cada campo en un arreglo de objetos con las propiedades `label` y `value`. Si un atributo no cumple con las condiciones necesarias, lo omite.
- **Valor de retorno:**
  Devuelve un arreglo de objetos, cada uno representando la etiqueta y valor legible de los campos visibles del formulario.

---

### 4. `getReadableValue(attr)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `attr`: Representa un atributo del formulario, desde el cual se obtienen su tipo y valor.
- **Variables modificadas:** Ninguna.
- **Condiciones, validaciones o requisitos:**
  - Valida si el valor (`raw`) del atributo es nulo o `undefined` para retornar una cadena vacía.
  - Utiliza un criterio basado en el tipo de atributo (`getAttributeType`) para determinar un formato legible.
- **Descripción:**
  Procesa el valor de un atributo para obtener una representación legible. Dependiendo del tipo de dato del atributo, realiza distintos tratamientos:
  - Para textos (`string`, `memo`), devuelve el texto.
  - Para valores booleanos (`boolean`), convierte el valor a "Sí" o "No".
  - Para fechas (`datetime`), convierte el valor a una fecha legible.
  - Para valores numéricos, convierte el valor a texto.
  - Para opciones (`optionset`), devuelve la descripción textual de la opción seleccionada.
  - Para valores de búsqueda (`lookup`), devuelve el nombre del objeto si está disponible.
  - Para tipos desconocidos, retorna una cadena vacía.
- **Valor de retorno:**
  Devuelve una representación legible del valor del atributo.

---

### 5. `speakText(text, azureKey, azureRegion)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `text`: Texto que será sintetizado y leído en voz alta.
  - `azureKey`: Clave de suscripción para el servicio de Azure Speech.
  - `azureRegion`: Región donde está configurado el servicio.
- **Variables modificadas:** Ninguna.
- **Condiciones, validaciones o requisitos:**
  - Depende de un objeto global `SpeechSDK` cargado previamente.
  - Configura la síntesis de voz, idioma y salida predeterminada usando APIs de Azure Speech SDK.
- **Descripción:**
  Define la configuración de síntesis de voz (idioma, voz, salida) y utiliza el servicio de Azure Speech para sintetizar y leer el texto proporcionado. Maneja errores y muestra mensajes en caso de fallos durante la síntesis.
- **Valor de retorno:** No tiene valor de retorno.

---

### 6. `ensureSpeechSDKLoaded(callback)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `callback`: Función que se ejecutará si el SDK se carga correctamente.
- **Variables modificadas:** Ninguna.
- **Condiciones, validaciones o requisitos:**
  - Verifica si el SDK está disponible en el objeto global `window.SpeechSDK`.
  - Si no está disponible, intenta cargarlo dinámicamente desde una URL específica.
  - Maneja errores en caso de que la carga del SDK falle.
- **Descripción:**
  Comprueba si el Azure Speech SDK está cargado. Si no lo está, lo carga dinámicamente añadiendo un script al DOM. Una vez cargado, invoca el callback proporcionado. Maneja errores con mensajes de alerta si no hay una carga exitosa del SDK.
- **Valor de retorno:** No tiene valor de retorno.

---

**Fragmento 1 de 1.**


SHA:2d77c82d3102333a0db71b34222239eeea38e15d