# Documentación Técnica del Archivo `speechForm.js`

## 1. Nombre del Archivo

`FRONTEND/JS/speechForm.js`

## 2. Descripción Funcional

El archivo `speechForm.js` implementa la captura de audio usando el Azure Speech SDK, convirtiendo la voz del usuario en texto y procesando ese texto para interactuar con un formulario web basado en Dynamics 365. Esta interacción permite rellenar campos del formulario de manera automática mediante comandos hablados estructurados. 

Adicionalmente, soporta el consumo de una API personalizada para transformar el texto reconocido con capacidades de inteligencia artificial y procesarlo en el formulario.

## 3. Descripción Técnica

### Lista de Métodos y Funciones

#### 1. `startVoiceInput`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `executionContext`: Contexto de ejecución del formulario de Dynamics 365.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Requiere que el Speech SDK de Azure esté cargado.  
**Descripción:**  
Esta función inicia la captura de voz asegurándose primero de que el Speech SDK esté cargado. Una vez confirmado, invoca la función `ejecutarGrabacion`.  
**Retorno:** Ninguno.

---

#### 2. `ejecutarGrabacion`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `executionContext`: Contexto del formulario de Dynamics 365.  
**Variables Modificadas:**  
- `speechRecognitionLanguage`: Define el idioma de reconocimiento como español (`es-ES`).  
**Condiciones/Requisitos:**  
- Debe estar cargado el `SpeechSDK`.  
- Se requiere conexión válida con Azure Speech API (`azureSpeechKey` y `azureRegion`).  
**Descripción:**  
Configura un reconocedor de voz usando el SDK de Azure y captura el audio desde el micrófono. Según el estado definido por la variable `ia`, el procesamiento de la transcripción se realiza con la API personalizada (`callCustomApi`) o con la función estándar (`processTranscript`).  
**Retorno:** Ninguno.

---

#### 3. `ensureSpeechSDKLoaded`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `callback`: Función a ejecutar una vez cargado el Speech SDK.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguna.  
**Descripción:**  
Verifica si el Azure Speech SDK está cargado. Si no lo está, carga el SDK dinámicamente mediante un `<script>` y ejecuta el callback al terminar la carga. En caso de error, muestra una alerta indicando el problema.  
**Retorno:** Ninguno.

---

#### 4. `callCustomApi`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `inputText`: Texto reconocido por la API de voz.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:**  
- La API personalizada debe estar configurada correctamente.  
**Descripción:**  
Realiza una llamada a la API personalizada de Dynamics 365 para transformar el texto con Azure AI. Maneja errores y convierte la respuesta en el JSON esperado.  
**Retorno:** Un objeto JSON con el resultado de la API.

---

#### 5. `processTranscript`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `transcript`: Texto reconocido por el procesador de voz.  
- `formContext`: Contexto del formulario actual en Dynamics 365.  
**Variables Modificadas:** Actualiza valores en los campos del formulario mediante el objeto `formContext`.  
**Condiciones/Requisitos:**  
- El texto debe estar en formato estructurado (`campo igual valor`).  
**Descripción:**  
Normaliza y limpia el texto para extraer pares campo-valor. Usa el mapa de campos (`getFieldMap`) para identificar el atributo correspondiente y aplica los valores con `applyValueToField`.  
**Retorno:** Ninguno.

---

#### 6. `processTranscriptIA`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `transcriptString`: Texto procesado por una inteligencia artificial (en formato JSON).  
- `formContext`: Contexto del formulario actual en Dynamics 365.  
**Variables Modificadas:** Actualiza valores en los campos del formulario mediante el objeto `formContext`.  
**Condiciones/Requisitos:**  
- El `transcriptString` debe ser una cadena JSON válida.  
**Descripción:**  
Convierte el JSON del transcript en pares campo-valor, identifica los atributos del formulario con `getFieldMap`, y aplica los valores al formulario usando `applyValueToField_IA`.  
**Retorno:** Ninguno.

---

#### 7. `getFieldMap`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `formContext`: Contexto del formulario actual en Dynamics 365.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguna.  
**Descripción:**  
Genera un mapa de campos basado en los atributos y los controles visibles del formulario.  
**Retorno:** Un objeto de pares clave-valor donde la clave es el nombre visible y el valor es el nombre lógico del atributo.

---

#### 8. `findMatchingFieldKey`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `inputLabel`: Nombre del campo introducido por el usuario.  
- `fieldMap`: Mapa de campos generado por `getFieldMap`.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguna.  
**Descripción:**  
Busca el nombre lógico correspondiente al campo visible introducido. Usa coincidencia parcial.  
**Retorno:** Nombre lógico del atributo o `null` si no se encuentra.

---

#### 9. `applyValueToField` y `applyValueToField_IA`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `attribute`: Objeto del atributo del formulario.  
- `rawValue`: Valor que se desea aplicar al atributo.  
- `formContext`: Contexto del formulario actual en Dynamics 365.  
**Variables Modificadas:** Modifican los valores de los atributos del formulario.  
**Condiciones/Requisitos:** El atributo debe ser válido y compatible con el tipo de valor recibido.  
**Descripción:**  
Realizan la asignación de valores a los atributos del formulario según su tipo (`string`, `boolean`, `datetime`, `lookup`, etc.).  
**Retorno:** Ninguno.

---

#### 10. `getLookupTypes`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `attribute`: Atributo de Dynamics 365.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguno.  
**Descripción:**  
Devuelve las entidades asociadas a un campo de tipo `lookup`.  
**Retorno:** Lista de nombres de entidades compatibles.

---

#### 11. `searchLookupByName`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `entityName`: Nombre de la entidad a buscar.  
- `searchValue`: Valor que se desea encontrar.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguna.  
**Descripción:**  
Busca registros de tipo `lookup` que coincidan con el texto introducido por el usuario.  
**Retorno:** Un objeto con detalles del registro encontrado o `null` si no se encuentra.

---

#### 12. `getPrimaryNameField`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `entityName`: Nombre de la entidad.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguno.  
**Descripción:**  
Obtiene el nombre del campo primario para una entidad específica.  
**Retorno:** Nombre lógico del campo principal.

---

#### 13. `palabrasANumeros`
**Lenguaje:** JavaScript  
**Parámetros:**  
- `texto`: Texto que contiene palabras equivalentes a números.  
**Variables Modificadas:** Ninguna.  
**Condiciones/Requisitos:** Ninguno.  
**Descripción:**  
Convierte palabras como "uno" o "cinco mil" en números enteros. Soporta unidades, decenas, centenas, y multiplicadores como "mil" o "millones".  
**Retorno:** Número entero.

---

## 4. Esquema del Orden de Ejecución

```text
startVoiceInput
  └── ensureSpeechSDKLoaded
      └── ejecutarGrabacion
          └── Azure Speech SDK reconoce voz
              └── processTranscript o processTranscriptIA
                  └── getFieldMap
                  └── findMatchingFieldKey
                  └── applyValueToField / applyValueToField_IA
                      └── (Si es tipo lookup) searchLookupByName
```

## 5. Requisitos Externos

- Azure Speech SDK.
- Configuración válida para la API personalizada (`trial_TransformTextWithAzureAI`).
- Dynamics 365 con el contexto del formulario (`executionContext`) y sus atributos correctamente configurados.

## README.md

# Análisis Técnico del Archivo `speechForm.js`

---

## **1. Nombre del archivo**
`speechForm.js`

---

## **2. Descripción funcional**
El archivo `speechForm.js` tiene como objetivo convertir números mencionados como palabras en una cadena de entrada (texto) a su representación numérica en formato entero. Específicamente, procesa las palabras relacionadas con unidades, decenas y centenas en español para calcular sus valores numéricos.

---

## **3. Descripción técnica**

### **Función documentada**

#### **3.1 convertWordsToNumber**
- **Lenguaje:** JavaScript.
- **Parámetros:**
  - `text` (string): Entrada de texto que contiene números en palabras (por ejemplo, "ciento veinte").
- **Variables modificadas:**
  - `total` (local): Suma acumulada de los valores numéricos convertidos.
  - `current` (local): Valor parcial acumulado de un bloque numérico tratado.
- **Condiciones, validaciones y requisitos:**
  - El método filtra un texto de entrada dividiéndolo en palabras utilizando el método `.split()`.
  - Realiza validaciones buscando las palabras en diccionarios (`centenas`, `decenas`, `unidades`) para determinar si son valores numéricos válidos.
  - Ignora palabras desconocidas que no están en dichos diccionarios.
- **Descripción detallada:**
  1. El parámetro `text` se separa en palabras individuales utilizando `.split(" ")`.
  2. Itera sobre cada palabra usando un `for`:
     - Si la palabra corresponde a `centenas` (por ejemplo, "ciento"), su valor se suma directamente a `total`.
     - Si corresponde a `unidades` (por ejemplo, "uno", "dos") o `decenas` (por ejemplo, "veinte", "treinta"), se acumula en la variable `current`.
     - Ignora palabras desconocidas que no corresponden a ninguno de los diccionarios.
  3. Retorna la suma acumulada de `total` y `current` al final de la ejecución.
- **Valor de retorno:**
  - Un número entero (`total`) resultante de la conversión de las palabras numéricas.

---

### **Diccionarios utilizados**
- **centenas:** Un objeto que asigna valores numéricos a palabras como "cien", "ciento", "doscientos", etcétera.
- **decenas:** Un objeto que asigna valores numéricos a palabras que representan decenas como "veinte", "treinta", "cuarenta", etcétera.
- **unidades:** Un objeto que asigna valores numéricos a las palabras representando unidades como "uno", "dos", "tres", etcétera.

---

## **4. Esquema del orden de ejecución**

### Diagrama textual:

```
Inicio
└── Llamada a convertWordsToNumber(text)
    └── Diccionario: centenas
    └── Diccionario: decenas
    └── Diccionario: unidades
    └── Iteración sobre las palabras del texto
        └── Validación de centenas → Suma a total
        └── Validación de decenas → Acumula en current
        └── Validación de unidades → Acumula en current
        └── Ignorar palabras desconocidas
    └── Retorno de (total + current)
Fin
```

---

## **5. Notas adicionales**
- Este archivo no define otros métodos/funciones además de `convertWordsToNumber`.
- Los diccionarios `centenas`, `decenas`, y `unidades` son estructuras internas críticas para la funcionalidad del programa.
- No se evidencian dependencias externas en el fragmento proporcionado. Sin embargo, si en el resto del archivo usa bibliotecas externas, estas deberían documentarse por separado.

---


SHA:921f6a9e20f945d3ad5eb65464783eec8aae6458