function startVoiceInput(executionContext) {
    ensureSpeechSDKLoaded(() => {
        leerFormulario(executionContext);
    });
}

async function leerFormulario(executionContext) {
    const formContext = executionContext;
    const azureKey = "key";
    const azureRegion = "westeurope";

    if (!window.SpeechSDK) {
        alert("Azure Speech SDK no está cargado.");
        return;
    }

    const fieldData = getVisibleFieldData(formContext);
    const texto = fieldData.map(f => `${f.label}: ${f.value}`).join(". ");

    if (!texto) {
        alert("No hay campos visibles para leer.");
        return;
    }

    speakText(texto, azureKey, azureRegion);
}
function getVisibleFieldData(formContext) {
    const attributes = formContext.data.entity.attributes.get();
    const fieldData = [];

    attributes.forEach(attr => {
        const controls = attr.controls.get();
        if (controls.length === 0) return;

        const control = controls[0];
        const label = control.getLabel();
        if (!label) return;

        const value = getReadableValue(attr);
        if (value !== null && value !== "") {
            fieldData.push({ label, value });
        }
    });

    return fieldData;
}
function getReadableValue(attr) {
    const type = attr.getAttributeType();
    const raw = attr.getValue();

    if (raw === null || raw === undefined) return "";

    switch (type) {
        case "string":
        case "memo":
            return raw;
        case "boolean":
            return raw ? "Sí" : "No";
        case "datetime":
            return raw.toLocaleDateString();
        case "decimal":
        case "double":
        case "integer":
            return raw.toString();
        case "optionset":
            const option = attr.getOptions().find(opt => opt.value === raw);
            return option ? option.text : raw;
        case "lookup":
            return raw.length > 0 ? raw[0].name : "";
        default:
            return "";
    }
}
function speakText(text, azureKey, azureRegion) {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
    speechConfig.speechSynthesisLanguage = "es-ES";
    speechConfig.speechSynthesisVoiceName = "es-ES-AlvaroNeural"; // Puedes cambiar la voz aquí

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
        text,
        result => {
            if (result.reason !== SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                console.error("Error sintetizando: ", result.errorDetails);
            }
            synthesizer.close();
        },
        error => {
            console.error("Error durante síntesis: ", error);
            synthesizer.close();
        }
    );
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


