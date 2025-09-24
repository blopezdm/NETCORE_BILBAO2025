using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System.Linq;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.SqlServer.Server;
namespace Plugins
{

    public class TransformTextWithAzureAI : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            string texto = context.InputParameters["text"] as string;
            if (string.IsNullOrWhiteSpace(texto))
            {
                context.OutputParameters["response"] = "";
                return;
            }


            string normas = "1) El resultado debe ser un JSON plano, sin texto adicional, sin comillas externas ni bloques de código. 2) Todos los nombres de campo deben ir en minúsculas. 3) Los valores no deben tener comas, puntos ni espacios al inicio o final. 4) Los nombres pueden contener espacios internos (por ejemplo, 'juan pérez lópez'). 5) Las fechas deben tener formato 'yyyy-MM-dd'. 6) Si un valor representa un booleano como 'sí', 'no', 'true', 'false', etc., debe devolverse como true o false (sin comillas). 7) Si un valor representa un número en palabras (por ejemplo, 'cuarenta y cinco coma diez'), debe devolverse como número decimal con punto (ej. 45.10). 8) Usa punto como separador decimal, nunca coma. 9) Si un campo tiene varios valores, elige el primero claramente definido. Ejemplo de salida válida: {\"nombre\":\"ana trujillo\",\"decimal\":3.5}";

            var result = GetOpenAIResponse(texto, normas);
            context.OutputParameters["response"] = result;
        }

        public static string GetOpenAIResponse(string userMessage, string normas)
        {
            string endpoint = "https://openai-netcore.openai.azure.com/";
            string deployment = "gpt-4o";
            string apiVersion = "2024-04-01-preview";
            string apiKey = "key";
            string url = $"{endpoint}openai/deployments/{deployment}/chat/completions?api-version={apiVersion}";


            string prompt = $"Transforma el siguiente texto según las normas indicadas:\n\nNormas:\n{normas}\n\nTexto:\n{userMessage}";

            var payload = new
            {
                messages = new[]
                {
                new { role = "system", content = "Eres un asistente que transforma texto en objetos estructurados según normas del usuario." },
                new { role = "user", content = prompt }
            },
                temperature = 1,
                top_p = 1,
                max_tokens = 4096
            };

            string jsonPayload = JsonSerializer.Serialize(payload);

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("api-key", apiKey);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                HttpResponseMessage response = httpClient.PostAsync(url, content).GetAwaiter().GetResult();

                if (!response.IsSuccessStatusCode)
                {
                    string error = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    throw new Exception($"Error Azure OpenAI: {response.StatusCode} - {error}");
                }

                string result = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();

                using (JsonDocument doc = JsonDocument.Parse(result))
                {
                    return doc.RootElement
                              .GetProperty("choices")[0]
                              .GetProperty("message")
                              .GetProperty("content")
                              .GetString();
                }

            }
            }
        }
        }
