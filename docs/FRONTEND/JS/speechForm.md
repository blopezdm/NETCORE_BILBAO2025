```markdown
# speechForm.js

## Descripción funcional
Este archivo implementa funcionalidades para capturar y procesar la entrada de voz en un formulario web, utilizando el servicio Azure Speech SDK. Permite reconocer la voz del usuario, transformar las palabras habladas en datos de formulario y manejar campos, valores y entidades de acuerdo al contexto del formulario.

---

## Descripción técnica
### Métodos y funciones definidos en el archivo

#### 1. `startVoiceInput(executionContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `executionContext`: Contexto de ejecución proporcionado (presumiblemente por Dynamics 365).
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** Verifica que Azure Speech SDK esté cargado mediante la función `ensureSpeechSDKLoaded`.
- **Descripción:** Inicia el proceso de grabación de voz llamando a `ejecutarGrabacion` una vez que la biblioteca Azure Speech SDK esté cargada.
- **Valor de retorno:** Ninguno.

---

#### 2. `ensureSpeechSDKLoaded(callback)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `callback`: Una función a ejecutarse una vez que Speech SDK esté cargado.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** 
  - Comprueba si `window.SpeechSDK` está presente.
  - Muestra mensajes de error en caso de que la biblioteca no se cargue correctamente.
- **Descripción:** Carga la biblioteca Azure Speech SDK de forma dinámica si no está disponible, y ejecuta un callback una vez cargada correctamente.
- **Valor de retorno:** Ninguno.

---

#### 3. `ejecutarGrabacion(executionContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `executionContext`: Contexto del formulario (Dynamics 365).
- **Variables modificadas:** Ninguna (locales incluidas `speechConfig`, `audioConfig`, `recognizer`).
- **Condiciones/Validaciones:**
  - Verifica si `SpeechSDK` está disponible antes de continuar.
- **Descripción:** 
  - Configura la grabación de voz con Azure Speech SDK.
  - Configura parámetros de reconocimiento como el idioma (es-ES) y entrada de audio desde el micrófono.
  - Maneja dos modos de procesamiento:
    - Modo estándar: Procesa transcripciones (`processTranscript`).
    - Modo IA: Procesa transcripciones con inteligencia artificial (`processTranscriptIA`).
- **Valor de retorno:** Ninguno.

---

#### 4. `callCustomApi(inputText)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `inputText`: Texto que se desea enviar a la API personalizada.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** 
  - Verifica que la respuesta del servidor sea válida (`response.ok`).
- **Descripción:**
  - Realiza una llamada API utilizando `Xrm.WebApi.online.execute`.
  - Devuelve una respuesta JSON del servidor después de transformarla.
- **Valor de retorno:** Resultado procesado de la salida de la Custom API.

---

#### 5. `processTranscript(transcript, formContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `transcript`: Texto hablado reconocido y transcrito.
  - `formContext`: Contexto del formulario actual.
- **Variables modificadas:** 
  - Modifica campos del formulario, dependiendo de los datos reconocidos.
- **Condiciones/Validaciones:**
  - Verifica que el formato de la transcripción sea válido.
  - Realiza el mapeo entre el texto hablado y los campos del formulario.
- **Descripción:**
  - Normaliza y limpia el texto transcrito.
  - Reconoce campos y valores usando `getFieldMap`.
  - Aplica valores reconocidos a los campos con `applyValueToField`.
- **Valor de retorno:** Ninguno.

---

#### 6. `processTranscriptIA(transcriptString, formContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `transcriptString`: Texto JSON transcrito con estructura específica para IA.
  - `formContext`: Contexto del formulario.
- **Variables modificadas:** Modifica campos del formulario relacionados con los datos reconocidos.
- **Condiciones/Validaciones:** 
  - Intenta parsear el contenido del transcript como JSON.
  - Verifica que los campos y valores reconocidos sean válidos.
- **Descripción:** Procesa transcripciones generadas por inteligencia artificial, mapea valores con los campos del formulario y actualiza los valores usando la función `applyValueToField_IA`.
- **Valor de retorno:** Ninguno.

---

#### 7. `getFieldMap(formContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `formContext`: Contexto del formulario.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** No posee validaciones específicas.
- **Descripción:** 
  - Genera un mapa entre las etiquetas visibles de los atributos del formulario y sus nombres internos.
  - Utiliza controles y atributos para construir este mapeo.
- **Valor de retorno:** Un objeto que mapea etiquetas visibles del formulario con nombres internos de atributos.

---

#### 8. `findMatchingFieldKey(inputLabel, fieldMap)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `inputLabel`: Etiqueta visible del campo ingresada por el usuario.
  - `fieldMap`: Mapa de etiquetas y nombres de campos.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** 
  - Compara la entrada con las claves disponibles en el mapa.
- **Descripción:** Busca una coincidencia aproximada entre la etiqueta ingresada y las etiquetas disponibles en el mapa de campos.
- **Valor de retorno:** Nombre interno del campo reconocido, o `null` si no hay coincidencia.

---

#### 9. `applyValueToField(attribute, rawValue, formContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `attribute`: Atributo específico del campo a modificar.
  - `rawValue`: Valor ingresado por el usuario.
  - `formContext`: Contexto del formulario.
- **Variables modificadas:** Cambia el valor de los atributos en el formulario usando diferentes lógicas según el tipo de campo.
- **Condiciones/Validaciones:** 
  - Verifica el tipo de atributo (`string`, `datetime`, `optionset`, etc.) y aplica cambios según corresponda.
- **Descripción:** Aplica valores ingresados al formulario, realizando conversiones específicas por tipo como fechas, números, booleanos, o búsquedas de registros (lookups).
- **Valor de retorno:** Ninguno.

---

#### 10. `applyValueToField_IA(attribute, rawValue, formContext)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `attribute`: Atributo específico del campo.
  - `rawValue`: Valor ingresado por el usuario.
  - `formContext`: Contexto del formulario.
- **Variables modificadas:** Modifica atributos en el formulario.
- **Condiciones/Validaciones:** Similar a `applyValueToField` pero con simplificación en ciertas validaciones.
- **Descripción:** Aplica valores ingresados al formulario desde transcripciones de IA.
- **Valor de retorno:** Ninguno.

---

#### 11. `getLookupTypes(attribute)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `attribute`: Atributo de campo tipo lookup.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** 
  - Determina entidades disponibles para el campo, según funciones o metadatos.
- **Descripción:** Devuelve una lista de entidades objetivo asociadas a un campo tipo lookup.
- **Valor de retorno:** Lista de nombres de entidades disponibles.

---

#### 12. `searchLookupByName(entityName, searchValue)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `entityName`: Nombre de la entidad donde buscar.
  - `searchValue`: Valor ingresado por el usuario que desea encontrar.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** 
  - Verifica que la consulta al servidor Dynamics 365 sea exitosa antes de manipular los datos.
- **Descripción:** Busca registros en una entidad basándose en el valor ingresado y devuelve el primer resultado encontrado como objeto.
- **Valor de retorno:** Entidad encontrada como objeto `{ id, name, entityType }` o `null` si no se encuentra.

---

#### 13. `getPrimaryNameField(entityName)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `entityName`: Nombre de la entidad.
- **Variables modificadas:** Ninguna.
- **Condiciones/Validaciones:** Lanza un error si la entidad no es soportada.
- **Descripción:** Determina el campo principal utilizado para búsquedas dentro de una entidad específica.
- **Valor de retorno:** Nombre del campo principal como string.

---

#### 14. `palabrasANumeros(texto)`
- **Lenguaje:** JavaScript
- **Parámetros:**
  - `texto`: Texto que representa un número en palabras.
- **Variables modificadas:** 
  - Convierte palabras en números y suma valores.
- **Condiciones/Validaciones:** Quita acentos y valida tokens reconocidos (unidades, decenas, centenas, etc.).
- **Descripción:** Convierte números expresados en palabras (como "mil trescientos") a su representación numérica (`1300`).
- **Valor de retorno:** Número entero resultante.

---

### Fragmento: Este archivo corresponde al **Fragmento 1 de 2**.
```
### Fragmento 2 de 2

#### Descripción técnica

El fragmento pertenece al archivo `FRONTEND/JS/speechForm.js` y expande la lógica previamente implementada. A continuación, se documentan las funciones identificadas en este fragmento:

---

### Función: `parseSpeechToNumber`
#### Lenguaje:
JavaScript

#### Parámetros:
- **speech**: Cadena de texto que representa un número hablado. Por ejemplo, `'ciento veinte y cinco'`.

#### Variables modificadas:
- **total** (local): Acumula el valor numérico calculado a partir del análisis del texto.
- **current** (local): Almacena el valor parcial de las unidades, decenas y centenas procesadas actualmente.

#### Condiciones, validaciones o requisitos:
1. **Validación inicial**: Si `speech` no se proporciona o está vacío, la función retorna `0`.
2. **Split and trim**: El parámetro `speech` se divide en partes usando el separador `' '` (espacio), y cada parte se recorre.
3. **Procesos condicionales dentro del bucle**:
   - Si la parte actual corresponde a la palabra `'y'`, se ignora en la lógica de acumulación.
   - Si la parte actual coincide con alguna palabra clave en las estructuras `unidades`, `decenas` o `centenas`:
     - Se suma el valor correspondiente a la variable `current`.
   - Cuando la parte no cumple con ninguna validación, se considera desconocida y no se procesa.

#### Descripción detallada:
La función procesa un texto hablado que representa un número en español. El texto se descompone en partes; estas partes son analizadas para determinar si representan palabras clave como unidades (`uno`, `dos`, etc.), decenas (`diez`, `veinte`, etc.) o centenas (`cien`, `doscientos`, etc.). Cada número encontrado durante el análisis se acumula en la variable `current`. 

Al llegar al final del texto, la variable `total` se incrementa con el acumulador `current`, generando el valor numérico final asociado.

#### Valor de retorno:
- Retorna **total**, el número entero que representa el valor calculado a partir del texto hablado.

---

### Subanálisis del bucle `for`:
El bucle `for` recorre las partes resultantes del split de `speech`. Por cada iteración:
- **Trim**: Se asegura de eliminar espacios vacíos alrededor de cada parte con `parte.trim()`.
- **Condicionales**: 
  - Si la palabra identificada está en:
    - **`unidades`**: Se suma el valor correspondiente a `current`.
    - **`decenas`**: También se agrega el valor correspondiente a `current`.
  - Si el texto es `'y'`, se marca explícitamente para ser ignorado.

### Manejadores de palabras desconocidas:
Si una palabra no coincide con ninguna estructura o validación (`unidades`, `decenas`, `centenas`), no se realiza ningún cambio en las variables.

---

### Aspectos destacados:
Este fragmento probablemente trabaja en conjunto con estructuras externas (`unidades`, `decenas`, `centenas`) definidas en otra parte del archivo o contexto del código. Estas estructuras son esenciales para la funcionalidad de la conversión y deberían ser documentadas si forman parte del archivo analizado.

---

Esta es la documentación completa para el fragmento especificado. 


SHA:921f6a9e20f945d3ad5eb65464783eec8aae6458