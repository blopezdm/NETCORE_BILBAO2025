# Documentación Técnica - `speechForm.js`

## Descripción funcional

El archivo `speechForm.js` utiliza la tecnología de reconocimiento de voz (Azure Speech SDK) para escuchar y procesar comandos de voz, los convierte en datos que son integrados a un formulario en un entorno de Dynamics CRM. Permite a los usuarios hablar usando comandos predefinidos que serán interpretados para modificar valores de campos o realizar llamadas a APIs personalizadas.

---

## Descripción técnica

### Métodos y Funciones

#### 1. **`startVoiceInput(executionContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `executionContext`: Contexto de ejecución del formulario Dynamics CRM.
   - **Variables modificadas:** Ninguna.
   - **Condiciones:** Requiere que el SDK de Azure Speech esté cargado.
   - **Descripción:** 
     Esta función verifica si el Azure Speech SDK está cargado utilizando `ensureSpeechSDKLoaded`, y luego llama a `ejecutarGrabacion` para iniciar el proceso de grabación.
   - **Valor de retorno:** Ninguno.

---

#### 2. **`ejecutarGrabacion(executionContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `executionContext`: Contexto del formulario Dynamics CRM.
   - **Variables modificadas:** 
     - Variable condicional interna `ia`.
   - **Condiciones:**
     - Valida que la librería `window.SpeechSDK` esté cargada, de lo contrario muestra una alerta.
   - **Descripción:** 
     Configura la grabación de voz utilizando el Azure Speech SDK. Dependiendo de la variable `ia`, procesa el texto reconocido mediante el flujo:
       - **Si `ia` es `true`:** Ejecuta automáticamente una llamada a una API personalizada (`callCustomApi`) con el texto procesado y utiliza `processTranscriptIA` para aplicar la transcripción en el formulario.
       - **Si `ia` es `false`:** Espera comandos hablados en formato de pares clave-valor y utiliza `processTranscript` para limipiar y aplicar el texto al formulario.
   - **Valor de retorno:** Ninguno.

---

#### 3. **`callCustomApi(inputText)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `inputText`: Texto reconocido por el SDK que será enviado a la API personalizada.
   - **Variables modificadas:** Ninguna.
   - **Validaciones:**
     - Verifica que la llamada a la API haya sido exitosa (`response.ok`).
   - **Descripción:** 
     Construye un objeto de solicitud para ejecutar una Custom API en Dynamics CRM. Envía el texto reconocido y espera resultados procesados en JSON. Retorna la salida obtenida de la API.
   - **Valor de retorno:** 
     - JSON con `result.response`.

---

#### 4. **`processTranscript(transcript, formContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `transcript`: Texto reconocido por el SDK.
     - `formContext`: Contexto del formulario Dynamics CRM.
   - **Variables modificadas:** 
     - Variables locales `normalized`, `cleaned`, `fieldPairs`.
   - **Validaciones:** 
     - Transforma el texto en formato clave-valor (`campo igual valor`).
     - Verifica que los campos reconocidos coincidan con claves válidas en el formulario.
   - **Descripción:** 
     Procesa el texto hablado desde el comando en formato clave-valor. Normaliza el texto eliminando caracteres innecesarios, encuentra coincidencias de campo en el formulario mediante `findMatchingFieldKey`, y aplica los valores correspondientes usando `applyValueToField`.
   - **Valor de retorno:** Ninguno.

---

#### 5. **`processTranscriptIA(transcriptString, formContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `transcriptString`: Texto en formato JSON procesado por una API personalizada.
     - `formContext`: Contexto del formulario Dynamics CRM.
   - **Variables modificadas:** Ninguna directamente.
   - **Validaciones:** 
     - Verifica si el `transcriptString` puede ser interpretado como JSON.
   - **Descripción:** 
     Procesa una transcripción en formato JSON. Extrae pares clave-valor, busca coincidencias de campo en el formulario mediante `findMatchingFieldKey`, y aplica los valores con `applyValueToField_IA`.
   - **Valor de retorno:** Ninguno.

---

#### 6. **`getFieldMap(formContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `formContext`: Contexto del formulario Dynamics CRM.
   - **Variables modificadas:** Variable local `fieldMap`.
   - **Descripción:** 
     Crea un mapa de los campos del formulario. Asocia cada etiqueta visible (`label`) con el nombre lógico del atributo.
   - **Valor de retorno:** 
     - Objeto `fieldMap` con pares clave-valor donde la clave es el nombre visible del campo y el valor es el nombre lógico del atributo.

---

#### 7. **`findMatchingFieldKey(inputLabel, fieldMap)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `inputLabel`: Etiqueta a buscar en el mapa de campos.
     - `fieldMap`: Mapa de campos generados por `getFieldMap`.
   - **Variables modificadas:** Ninguna.
   - **Descripción:** 
     Busca una clave que coincida con la etiqueta ingresada (`inputLabel`) dentro del mapa de campos (`fieldMap`).
   - **Valor de retorno:** 
     - Nombre lógico del atributo (si se encuentra una coincidencia) o `null`.

---

#### 8. **`applyValueToField(attribute, rawValue, formContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `attribute`: Atributo del formulario Dynamics CRM.
     - `rawValue`: Valor a ser aplicado al campo.
     - `formContext`: Contexto del formulario Dynamics CRM.
   - **Variables modificadas:** Depende del tipo de campo afectado.
   - **Validaciones:** Verifica el tipo de atributo (`string`, `boolean`, `datetime`, etc.).
   - **Descripción:** 
     Aplica un valor al atributo del formulario dependiendo de su tipo: texto, booleano, fecha, numérico, conjunto de opciones, o campos de búsqueda (`lookup`).
   - **Valor de retorno:** Ninguno.

---

#### 9. **`applyValueToField_IA(attribute, rawValue, formContext)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `attribute`: Atributo del formulario Dynamics CRM.
     - `rawValue`: Valor a ser aplicado al campo.
     - `formContext`: Contexto del formulario Dynamics CRM.
   - **Variables modificadas:** Depende del tipo de campo afectado.
   - **Validaciones:** Verifica el tipo de atributo (`string`, `boolean`, `datetime`, etc.).
   - **Descripción:** 
     Similar a `applyValueToField`, pero utilizado específicamente para transcripciones procesadas por IA.
   - **Valor de retorno:** Ninguno.

---

#### 10. **`getLookupTypes(attribute)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `attribute`: Atributo del formulario Dynamics CRM.
   - **Variables modificadas:** Ninguna directamente.
   - **Descripción:** 
     Retorna los tipos de entidades (`lookup types`) asociadas a un campo de búsqueda (`lookup`) en el formulario.
   - **Valor de retorno:** 
     - Array con los nombres lógicos de las entidades asociadas al campo.

---

#### 11. **`searchLookupByName(entityName, searchValue)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `entityName`: Nombre lógico de la entidad.
     - `searchValue`: Valor a buscar dentro de la entidad.
   - **Variables modificadas:** Ninguna.
   - **Validaciones:**
     - Intenta buscar coincidencias en la entidad utilizando consultas API de Dynamics CRM.
   - **Descripción:** 
     Busca un registro en la entidad especificada usando el valor ingresado (`searchValue`). Utiliza el campo principal de la entidad para realizar la búsqueda.
   - **Valor de retorno:** 
     - Objeto con `id`, `name`, y `entityType` si se encuentra un registro; `null` si no.

---

#### 12. **`getPrimaryNameField(entityName)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `entityName`: Nombre lógico de la entidad.
   - **Variables modificadas:** Ninguna.
   - **Descripción:** 
     Retorna el nombre del campo principal para la entidad especificada, como `fullname` para contactos o `name` para cuentas.
   - **Valor de retorno:** 
     - Nombre del campo principal de la entidad.

---

#### 13. **`ensureSpeechSDKLoaded(callback)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `callback`: Función ejecutada cuando se carga el SDK correctamente.
   - **Variables modificadas:** Ninguna directamente.
   - **Validaciones:** 
     - Verifica si el SDK de Azure Speech está cargado antes de ejecutar el `callback`.
     - Maneja errores de carga del SDK mostrando alertas.
   - **Descripción:** 
     Carga dinámicamente el SDK de Azure Speech desde una URL si no se encuentra previamente cargado.
   - **Valor de retorno:** Ninguno.

---

#### 14. **`palabrasANumeros(texto)`**
   - **Lenguaje:** JavaScript
   - **Parámetros:**
     - `texto`: Cadena de texto que contiene números en palabras.
   - **Variables modificadas:** Variables locales como `current`, `total`.
   - **Descripción:** 
     Convierte números expresados en palabras (`uno`, `mil`, etc.) a valores numéricos mediante reglas gramaticales.
   - **Valor de retorno:** 
     - Número entero equivalente a las palabras numéricas. Retorna `null` si no se encuentra un número válido.

---

## Notas adicionales
Este es el **Fragmento 1 de 2** que detalla todo lo relevante sobre el archivo `speechForm.js`. Asegúrate de analizar el siguiente fragmento para completar la documentación.
### Documentación técnica del archivo `FRONTEND/JS/speechForm.js`

#### Fragmento 2/2

---

### Descripción técnica

#### Función: `convertirPalabrasANumero`

- **Lenguaje:** JavaScript  
- **Parámetros:**  
  - `texto`: Una cadena de texto que contiene palabras que representan números en español.
- **Variables modificadas:**  
  - `total`: Variable acumuladora que suma los valores numéricos de las palabras procesadas.
  - `current`: Variable que acumula temporalmente el valor de las unidades y decenas para agrupar correctamente los números compuestos.
- **Condiciones, validaciones o requisitos:**  
  - Divide el texto en partes utilizando los espacios como el delimitador.
  - Comprueba si cada palabra pertenece a `unidades` o `decenas` (supuestamente objetos predefinidos que contienen la relación palabra-número).
  - Maneja las palabras desconocidas ignorándolas (sin procesamiento adicional).
- **Descripción detallada:**  
  La función `convertirPalabrasANumero` toma un texto en formato natural que contiene palabras que representan números en español y los convierte en sus equivalentes numéricos. Esto se logra de la siguiente manera:
  1. La función utiliza el delimitador de espacio para dividir el texto completo en fragmentos manejables (`partes`).
  2. Itera sobre cada fragmento, eliminando espacios en blanco alrededor de él con `.trim()`.
  3. Compara si la palabra pertenece al conjunto de palabras que representan números en las unidades (`unidades`) o las decenas (`decenas`).   
     - Si pertenece a `unidades`, agrega su valor numérico al acumulador temporal `current`.
     - Si pertenece a `decenas`, también agrega su valor numérico a `current`.
  4. Las palabras que no se reconocen por este sistema son ignoradas completamente.
  5. Una vez procesado todo el texto, la función retorna la suma acumulada `total`, que incluye todos los valores calculados.

- **Valor de retorno:**  
  Retorna `total`, un número entero que representa la suma acumulada del equivalente numérico de todas las palabras procesadas.

### Notas adicionales:
- Este fragmento parece ser parte de una función más amplia relacionada con el procesamiento de texto natural en español, posiblemente para convertir cadenas dictadas (como en sistemas de reconocimiento de voz) a valores numéricos.


SHA:921f6a9e20f945d3ad5eb65464783eec8aae6458