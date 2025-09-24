function startVoiceInput(executionContext) {
    ensureSpeechSDKLoaded(() => {
        ejecutarGrabacion(executionContext);
    });
}

async function ejecutarGrabacion(executionContext) {
    const formContext = executionContext;
    const azureSpeechKey = "key";
    const azureRegion = "westeurope";

    if (!window.SpeechSDK) {
        alert("Azure Speech SDK no está cargado.");
        return;
    }
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(azureSpeechKey, azureRegion);
    speechConfig.speechRecognitionLanguage = "es-ES";
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    var ia = true;
    if (ia) {

        recognizer.recognizeOnceAsync(async(result) => {
            if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                const transcript = result.text;
                console.log("Transcripción: ", transcript);
                const resultado = await callCustomApi(transcript);
                processTranscriptIA(resultado, formContext);
            } else {
                alert("No se reconoció ningún texto.");
            }
            recognizer.close();
        });

    } else {

        alert("Habla usando frases como 'nombre igual Juan Pérez; activo igual sí; categoría igual cliente'");

        recognizer.recognizeOnceAsync(result => {
            if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                const transcript = result.text;
                console.log("Transcripción: ", transcript);
                processTranscript(transcript, formContext);
            } else {
                alert("No se reconoció ningún texto.");
            }
            recognizer.close();
        });
    }
   
}

function callCustomApi(inputText) {
    const request = {
        text: inputText,
        getMetadata: function () {
            return {
                boundParameter: null,
                parameterTypes: {
                    text: {
                        typeName: "Edm.String",
                        structuralProperty: 1 // 1 = Primitive
                    }
                },
                operationType: 0, // 0 = Function (Custom API)
                operationName: "trial_TransformTextWithAzureAI" // Cambia por el nombre real
            };
        }
    };

    return Xrm.WebApi.online.execute(request).then(function (response) {
        if (!response.ok) {
            throw new Error("Error en la llamada a la Custom API");
        }
        return response.json();
    }).then(function (result) {
        return result.response; // Devuelve el valor de salida
    });
}
function processTranscript(transcript, formContext) {
    const normalized = transcript.toLowerCase().replace(/[.,]/g, "");
    // Reemplaza palabras habladas por símbolos
    let cleaned = normalized
        .replace(/(dos puntos|:)/gi, "=")
        .replace(/(igual)/gi, "=")
        .replace(/(punto y coma|;)/gi, ";");

    console.log(cleaned);
    // Divide por campos separados por punto y coma
    const fieldPairs = cleaned.split(";").map(part => part.trim()).filter(Boolean);

    if (fieldPairs.length === 0) {
        alert("No se encontraron campos válidos. Usa el formato 'campo igual valor'.");
        return;
    }

    const fieldMap = getFieldMap(formContext);

    fieldPairs.forEach(pair => {
        const [rawField, rawValue] = pair.split("=").map(part => part?.trim());
        if (!rawField || !rawValue) return;

        console.log(`${rawField}: ${rawValue}`);

        const fieldKey = findMatchingFieldKey(rawField.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), fieldMap);
        if (fieldKey) {
            const attribute = formContext.getAttribute(fieldKey);
            if (attribute) {
                applyValueToField(attribute, rawValue, formContext);
            } else {
                console.warn(`Atributo no encontrado en el formulario: "${fieldKey}"`);
            }
        } else {
            console.warn(`Campo no reconocido: "${rawField}"`);
        }
    });
}

function processTranscriptIA(transcriptString, formContext) {

    try {
        transcript = JSON.parse(transcriptString);
    } catch (e) {
        console.error("Error al parsear el transcript JSON:", e);
        return; // Salir porque no es válido
    }

    const fieldMap = getFieldMap(formContext);

    Object.entries(transcript).forEach(([rawField, rawValue]) => {
        if (!rawField || !rawValue) return;

        console.log(`${rawField}: ${rawValue}`);

        // Normalizamos y buscamos la clave correspondiente en el mapa de campos
        const fieldKey = findMatchingFieldKey(rawField.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), fieldMap);

        if (fieldKey) {
            const attribute = formContext.getAttribute(fieldKey);
            if (attribute) {
                applyValueToField_IA(attribute, rawValue, formContext);
            } else {
                console.warn(`Atributo no encontrado en el formulario: "${fieldKey}"`);
            }
        } else {
            console.warn(`Campo no reconocido: "${rawField}"`);
        }
    });
}

function getFieldMap(formContext) {
    const fieldMap = {};
    const attributes = formContext.data.entity.attributes.get();

    attributes.forEach(attr => {
        const controls = attr.controls.get();
        if (controls.length > 0) {
            const label = controls[0].getLabel(); // Usa label visible del formulario
            if (label) {
                fieldMap[label.trim().toLowerCase()] = attr.getName();
            }
        }
    });

    return fieldMap;
}

function findMatchingFieldKey(inputLabel, fieldMap) {
    const keys = Object.keys(fieldMap);
    return keys.find(key => key.includes(inputLabel.toLowerCase()))
        ? fieldMap[keys.find(key => key.includes(inputLabel.toLowerCase()))]
        : null;
}

async function applyValueToField(attribute, rawValue, formContext) {
    const type = attribute.getAttributeType();

    switch (type) {
        case "string":
        case "memo":
            attribute.setValue(rawValue);
            break;

        case "boolean":
            const booleanValue = /^(sí|si|true|activo|1)$/i.test(rawValue);
            attribute.setValue(booleanValue);
            break;

        case "datetime":
            const date = new Date(rawValue);
            if (!isNaN(date)) attribute.setValue(date);
            break;

        case "decimal":
        case "double":
        case "money":
        case "integer":
            let number = parseFloat(rawValue);
            if (isNaN(number)) {
                number = palabrasANumeros(rawValue); 
            }
            if (!isNaN(number)) attribute.setValue(number);
            break;

        case "optionset":
            const options = attribute.getOptions();
            const match = options.find(opt => opt.text.toLowerCase() === rawValue.toLowerCase());
            if (match) attribute.setValue(match.value);
            break;

        case "lookup":
            const lookupTypes = getLookupTypes(attribute);

            for (const entityName of lookupTypes) {
                try {
                    const result = await searchLookupByName(entityName, rawValue);
                    if (result) {
                        attribute.setValue([{
                            id: result.id,
                            name: result.name,
                            entityType: result.entityType
                        }]);
                        return;
                    }
                } catch (e) {
                    console.error(`Error buscando en ${entityName}:`, e);
                }
            }

            alert(`No se encontró "${rawValue}" en ninguna de las entidades del campo.`);
            break;

        default:
            console.warn(`Tipo de campo no manejado: ${type}`);
            break;
    }
}

async function applyValueToField_IA(attribute, rawValue, formContext) {
    const type = attribute.getAttributeType();

    switch (type) {
        case "string":
        case "memo":
            attribute.setValue(rawValue);
            break;

        case "boolean":
            attribute.setValue(rawValue);
            break;

        case "datetime":
            const date = new Date(rawValue);
            if (!isNaN(date)) attribute.setValue(date);
            break;

        case "decimal":
        case "double":
        case "money":
        case "integer":
            attribute.setValue(rawValue);
            break;

        case "optionset":
            const options = attribute.getOptions();
            const match = options.find(opt => opt.text.toLowerCase() === rawValue.toLowerCase());
            if (match) attribute.setValue(match.value);
            break;

        case "lookup":
            const lookupTypes = getLookupTypes(attribute);

            for (const entityName of lookupTypes) {
                try {
                    const result = await searchLookupByName(entityName, rawValue);
                    if (result) {
                        attribute.setValue([{
                            id: result.id,
                            name: result.name,
                            entityType: result.entityType
                        }]);
                        return;
                    }
                } catch (e) {
                    console.error(`Error buscando en ${entityName}:`, e);
                }
            }

            alert(`No se encontró "${rawValue}" en ninguna de las entidades del campo.`);
            break;

        default:
            console.warn(`Tipo de campo no manejado: ${type}`);
            break;
    }
}

function getLookupTypes(attribute) {
    const logicalName = attribute.getName();

    const partyListFields = ["to", "cc", "bcc", "from", "requiredattendees", "optionalattendees", "organizer"];
    if (partyListFields.includes(logicalName)) {
        return ["systemuser", "contact", "account", "queue", "lead"];
    }

    if (logicalName === "customerid") {
        return ["contact", "account"];
    }
    if (logicalName === "trial_cliente") {
        return ["contact"];
    }

    if (logicalName === "ownerid") {
        return ["systemuser", "team"];
    }

    if (logicalName === "regardingobjectid") {
        return [
            "account", "contact", "lead", "opportunity", "incident", "appointment",
            "email", "phonecall", "task", "campaign", "campaignresponse", "competitor",
            "invoice", "letter", "product", "quote", "salesorder", "systemuser"
        ];
    }

    const metadata = attribute.getMetadata?.();
    if (metadata?.targets && Array.isArray(metadata.targets)) {
        return metadata.targets;
    }
    // En último caso, intentamos con getEntityTypes si existe
    if (typeof attribute.getEntityTypes === "function") {
        const entityTypes = attribute.getEntityTypes();
        if (Array.isArray(entityTypes)) return entityTypes;
    }

    return [];
}

async function searchLookupByName(entityName, searchValue) {
    try {
        const nameField = getPrimaryNameField(entityName);
        const cleanValue = searchValue
            .trim()
            .replace(/[.,]/g, "")
            .trim()
            .replace(/'/g, "''")
            .trim()
            .toLowerCase();

        const query = `?$select=${nameField}&$filter=contains(${nameField}, '${cleanValue}')`;

        const result = await Xrm.WebApi.retrieveMultipleRecords(entityName, query);

        if (result.entities.length > 0) {
            const entity = result.entities[0];
            return {
                id: entity[`${entityName}id`],
                name: entity[nameField],
                entityType: entityName
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error buscando "${searchValue}" en ${entityName}:`, error);
        throw error;
    }
}

function getPrimaryNameField(entityName) {
    switch (entityName) {
        case "contact":
        case "lead":
        case "systemuser":
            return "fullname";
        case "account":
        case "queue":
        case "team":
        case "campaign":
        case "competitor":
        case "product":
            return "name";
        case "incident":
        case "opportunity":
        case "quote":
        case "salesorder":
        case "invoice":
            return "title";
        case "email":
        case "appointment":
        case "phonecall":
        case "task":
        case "letter":
            return "subject";
        default:
            throw new Error(`Entidad no soportada: ${entityName}`);
    }
}


function ensureSpeechSDKLoaded(callback) {
    if (window.SpeechSDK) {
        callback(); // Ya está cargado
    } else {
        const script = document.createElement("script");
        script.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
        script.onload = () => {
            if (window.SpeechSDK) {
                callback();
            } else {
                alert("Error: Speech SDK no se cargó correctamente.");
            }
        };
        script.onerror = () => alert("No se pudo cargar Azure Speech SDK.");
        document.head.appendChild(script);
    }
}

function palabrasANumeros(texto) {
    if (!texto) return null;

    texto = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quita acentos

    const unidades = {
        cero: 0, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5,
        seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11,
        doce: 12, trece: 13, catorce: 14, quince: 15,
        dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19
    };

    const decenas = {
        veinte: 20, treinta: 30, cuarenta: 40, cincuenta: 50,
        sesenta: 60, setenta: 70, ochenta: 80, noventa: 90
    };

    const centenas = {
        cien: 100, ciento: 100, doscientos: 200, trescientos: 300,
        cuatrocientos: 400, quinientos: 500, seiscientos: 600,
        setecientos: 700, ochocientos: 800, novecientos: 900
    };

    const multiplicadores = {
        mil: 1000,
        millon: 1000000, millones: 1000000
    };

    const tokens = texto.split(/[\s-]+/);
    let total = 0;
    let current = 0;

    for (let word of tokens) {
        if (unidades[word] !== undefined) {
            current += unidades[word];
        } else if (decenas[word] !== undefined) {
            current += decenas[word];
        } else if (centenas[word] !== undefined) {
            current += centenas[word];
        } else if (multiplicadores[word] !== undefined) {
            current = current === 0 ? 1 : current;
            current *= multiplicadores[word];
            total += current;
            current = 0;
        } else if (word.includes("y")) {
            const partes = word.split("y");
            for (let parte of partes) {
                const p = parte.trim();
                if (unidades[p]) current += unidades[p];
                if (decenas[p]) current += decenas[p];
            }
        } else {
            // palabra desconocida, ignorar
        }
    }

    return total + current;
}

