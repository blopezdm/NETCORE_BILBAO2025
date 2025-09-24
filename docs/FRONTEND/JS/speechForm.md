# README

## Archivo: `FRONTEND/JS/speechForm.js`

---

### **Descripción funcional**

El archivo `speechForm.js` facilita la interacción entre un formulario web y el reconocimiento de voz, utilizando el SDK de Azure Speech. Permite obtener transcripciones de audio, procesarlas y aplicar los resultados al formulario correspondiente. Además, soporta dos modos de procesamiento de transcript: uno basado en la lógica del propio script y otro basado en IA utilizando APIs externas.

---

### **Descripción técnica**

El archivo contiene una colección de funciones y métodos que implementan las siguientes características técnicas:

1. **Carga y configuración del SDK de Azure Speech**.
2. **Captura de audio desde el micrófono del usuario**.
3. **Procesamiento de texto transcrito** (modo tradicional y con IA).
4. **Interacción con la API de Azure AI para transformar texto transcrito**.
5. **Mapeo y asignación de valores procesados al formulario web**.

---

## Desglose detallado por función

### **1. `startVoiceInput(executionContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `executionContext`: Contexto del formulario donde se aplicará la funcionalidad.

**Variables modificadas:** Ninguna específicamente dentro de la función.  

**Condiciones/Validaciones:**  
- Verifica que el SDK de Azure Speech esté cargado.

**Descripción:**  
Esta función inicia el flujo de procesamiento de voz. Primero asegura que el SDK de Azure Speech esté cargado (usando `ensureSpeechSDKLoaded`) y luego delega el manejo al método `ejecutarGrabacion`.

**Valor de retorno:** Ninguno.

---

### **2. `async ejecutarGrabacion(executionContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `executionContext`: Contexto del formulario donde se aplicará la funcionalidad.

**Variables modificadas:**  
- `speechConfig`: Configura el idioma para el reconocimiento de voz.  
- `recognizer`: Gestor del reconocimiento de voz.

**Condiciones/Validaciones:**  
- Verifica que `window.SpeechSDK` esté cargado.
- Modo de procesamiento alterna entre IA (`ia = true`) y lógico (`ia = false`).  

**Descripción:**  
- Configura el SDK de Azure Speech con los credenciales y región (`azureSpeechKey`, `azureRegion`).
- Configura el idioma para el reconocimiento de voz como español (`es-ES`).
- Captura el audio desde el micrófono del usuario.

En el modo de IA: 
- Utiliza el resultado transcrito para invocar la API personalizada (`callCustomApi`).
- Dependiendo del resultado de la API, llama a `processTranscriptIA` para asignar valores al formulario.

En el modo lógico:  
- Realiza el procesamiento tradicional del texto transcrito utilizando `processTranscript`.

**Valor de retorno:** Ninguno.

---

### **3. `ensureSpeechSDKLoaded(callback)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `callback`: Función de callback a ejecutar una vez que el SDK esté cargado.

**Variables modificadas:**  
- `window.SpeechSDK`: Usado para verificar si el SDK está cargado.

**Condiciones/Validaciones:**  
- Verifica si `window.SpeechSDK` existe. Si no, intenta cargar el script del SDK desde la URL proporcionada.

**Descripción:**  
Esta función asegura que el SDK de Azure Speech esté cargado en `window`. Si no está disponible, carga el script correspondiente de manera dinámica, informando en caso de errores.

**Valor de retorno:** Ninguno.

---

### **4. `processTranscript(transcript, formContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `transcript`: Texto transcrito por el SDK de reconocimiento de voz.  
- `formContext`: Contexto del formulario donde se aplicará la funcionalidad.

**Variables modificadas:** Ninguna directamente.  
- Accede a atributos del formulario para modificar valores.

**Condiciones/Validaciones:**  
- Verifica que `fieldPairs` contenga campos válidos.  
- Valida y asigna valores a los atributos del formulario.

**Descripción:**  
Procesa el texto transcrito para normalizarlo y dividirlo en pares clave-valor separados por un delimitador (`=`).  
Busca correspondencias entre etiquetas habladas y las claves del formulario usando un mapa generado con `getFieldMap`. Luego aplica los valores utilizando la función `applyValueToField`.

**Valor de retorno:** Ninguno.

---

### **5. `processTranscriptIA(transcriptString, formContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `transcriptString`: Texto transcrito retornado en formato JSON.  
- `formContext`: Contexto del formulario donde se aplicará la funcionalidad.

**Variables modificadas:** Ninguna directamente.  
- Accede y actualiza atributos del formulario según el contenido del JSON.

**Condiciones/Validaciones:**  
- Verifica que el `transcriptString` sea válido (parseo exitoso).  
- Valida el mapeo de campos y atributos para asignar los valores.

**Descripción:**  
Similar a `processTranscript`, esta función toma un objeto JSON como entrada, lo parsea, mapea los pares clave-valor a atributos del formulario y aplica los valores con la función `applyValueToField_IA`.

**Valor de retorno:** Ninguno.

---

### **6. `getFieldMap(formContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `formContext`: Contexto del formulario.

**Variables modificadas:**  
- `fieldMap`: Mapa de etiquetas visibles y nombres lógicos de atributos.

**Descripción:**  
Genera un mapa (`fieldMap`) que vincula las etiquetas visibles del formulario con nombres internos de atributos. Esto permite la identificación de campos en el formulario para posteriores modificaciones.

**Valor de retorno:** Un objeto con pares clave-valor que representan las etiquetas y nombres internos de los campos del formulario.

---

### **7. `findMatchingFieldKey(inputLabel, fieldMap)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `inputLabel`: Etiqueta ingresada (normalizada).  
- `fieldMap`: Mapa generado por `getFieldMap`.

**Descripción:**  
Busca en el mapa generado (`fieldMap`) la clave que mejor se ajuste a la etiqueta ingresada. Retorna el nombre lógico del atributo correspondiente.

**Valor de retorno:** Nombre lógico del atributo o `null` si no encuentra correspondencias.

---

### **8. `applyValueToField(attribute, rawValue, formContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `attribute`: Atributo del formulario.  
- `rawValue`: Valor a asignar.  
- `formContext`: Contexto del formulario.

**Variables modificadas:**  
- Modifica el valor del campo correspondiente.

**Condiciones/Validaciones:**  
- Asigna valores dependiendo del tipo de atributo (e.g., string, boolean, decimal, lookup, etc.).

**Descripción:**  
Aplica el valor transcrito a un atributo del formulario utilizando lógica específica según el tipo de atributo (e.g., mapeo de opciones, conversión de números, búsqueda de valores en `lookup`).

**Valor de retorno:** Ninguno.

---

### **9. `callCustomApi(inputText)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `inputText`: Texto de entrada para la llamada al API.

**Variables modificadas:** Ninguna interna directamente.  
- Puede modificar el formulario con el resultado del API.

**Condiciones/Validaciones:**  
- Verifica que la respuesta del API sea válida (`response.ok`).

**Descripción:**  
Realiza una llamada a un API personalizada (`trial_TransformTextWithAzureAI`) utilizando los servicios de `Xrm.WebApi.online.execute`. Procesa la respuesta para devolver el resultado.

**Valor de retorno:** Resultado de la API (texto procesado).

---

### **10. `palabrasANumeros(texto)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `texto`: Texto representativo de un número en español.

**Descripción:**  
Convierte números en palabras (e.g., "veinte", "mil") a sus representaciones numéricas (`20`, `1000`). Maneja unidades, decenas, centenas y multiplicadores.

**Valor de retorno:** Número convertido o `null` si no es posible.

---

### **11. `getLookupTypes(attribute)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `attribute`: Atributo del formulario.

**Descripción:**  
Obtiene las entidades asociadas para un `lookup` con base en el nombre lógico del atributo. Identifica tipos de relaciones comunes (e.g., contactos, usuarios, etc.).

**Valor de retorno:** Un arreglo con los nombres de entidades asociadas al `lookup`.

---

### **12. `searchLookupByName(entityName, searchValue)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `entityName`: Nombre de la entidad a buscar en el `lookup`.  
- `searchValue`: Valor a buscar.

**Descripción:**  
Realiza una búsqueda por nombre en una entidad específica, usando `Xrm.WebApi.retrieveMultipleRecords`. Si encuentra una coincidencia, devuelve un objeto con la información del registro.

**Valor de retorno:** Información del registro encontrado o `null` si no hay coincidencias.

---

### **13. `getPrimaryNameField(entityName)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `entityName`: Nombre de la entidad.

**Descripción:**  
Devuelve el campo "principal" de una entidad (`fullname`, `name`, etc.), utilizado para búsquedas en `searchLookupByName`.

**Valor de retorno:** Nombre lógico del campo principal o lanza un error si la entidad no es soportada.

---

### **14. `applyValueToField_IA(attribute, rawValue, formContext)`**
**Lenguaje:** JavaScript  
**Parámetros:**  
- `attribute`: Atributo del formulario.  
- `rawValue`: Valor transcrito (IA).  
- `formContext`: Contexto del formulario.

**Descripción:**  
Similar a `applyValueToField`, asigna valores a atributos dependiendo de su tipo. Usa lógica simplificada cuando los valores llegan por IA.

**Valor de retorno:** Ninguno.

--- 

### **Notas adicionales**
- Este archivo depende de servicios externos como el SDK de Azure Speech y el API personalizado de `Xrm.WebApi` para Dynamics 365.
- Maneja tanto reconocimiento de voz tradicional como en JSON usando IA.  

```markdown
# Documentación Técnica - Fragmento 2 de 2

## Archivo: FRONTEND/JS/speechForm.js

Este fragmento forma parte del archivo `speechForm.js` y se encuentra en la sección final del código. La primera parte de la documentación, que incluye el nombre y la descripción funcional general, puede encontrarse en la documentación correspondiente al Fragmento 1 de 2.

---

## Descripción Técnica

### Métodos y Funciones Definidos

#### 1. Función: `partesToTotal`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `partes`: Un conjunto o lista de palabras clave a procesar. Esto se puede inferir como un arreglo de cadenas que representan palabras relacionadas con números.
- **Variables Modificadas:**
  - `total`: Variable acumulativa que suma los valores numerados derivados de las palabras procesadas.
  - `current`: Variable acumulativa intermedia para los valores derivados de un subconjunto de palabras.
- **Condiciones, Validaciones y Requisitos:**
  - El código utiliza verificaciones condicionales (`if`) dentro de los ciclos para determinar si las palabras clave coinciden con valores presentes en los objetos `unidades` y `decenas`.
  - Las palabras desconocidas son ignoradas explícitamente.
- **Descripción:**
  La función procesa una lista de palabras para convertirlas en su equivalente numérico utilizando los objetos `unidades` y `decenas`. Se ejecuta un bucle para iterar a través del conjunto de palabras (`partes`), desglosando cada palabra y buscándola en los objetos que representan unidades y decenas numéricas. Si se encuentra una correspondencia, el valor numérico asociado se suma a `current`. Si se detecta una palabra no reconocida, no se realiza ninguna acción y dicha palabra se ignora. Al finalizar el procesamiento de todas las palabras, se suma `current` a `total` y se retorna la suma acumulativa resultante.
- **Valor de retorno:**
  - Retorna el número total procesado (`total + current`), que es la suma acumulativa de los valores numéricos derivados de las palabras clave.

---

### Detalles adicionales

Este fragmento parece ser parte de una funcionalidad mayor que procesa texto para convertirlo en información numérica. Los objetos `unidades` y `decenas` no están presentes en este fragmento, pero es evidente que contienen las configuraciones necesarias para realizar las respectivas asociaciones entre palabras y valores numéricos.

### Notas importantes

- Este fragmento depende de que los objetos `unidades` y `decenas` existan y estén correctamente definidos en el entorno. 
- Es un fragmento intermedio o final dentro del archivo mayor denominado `speechForm.js`.
- La forma en que se ignoran las palabras desconocidas sugiere que la funcionalidad está diseñada para ser robusta frente a entradas con palabras no válidas.

```


SHA:921f6a9e20f945d3ad5eb65464783eec8aae6458