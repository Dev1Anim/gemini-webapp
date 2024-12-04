import { HarmBlockThreshold, HarmCategory } from "https://esm.run/@google/generative-ai";

const maxTokensInput = document.querySelector("#maxTokens");
const temperatureInput = document.querySelector("#temperature");
const temperatureLabel = document.querySelector("#label-temperature");

const systemPrompt = "If needed, format your answer using markdown." +
    "Today's date is" + new Date().toDateString() + "." +
    "End of system prompt.";
let safetySettings = [];

export function loadSettings() {
    const apiKey = process.env.API_KEY; // Get API key from environment variable
    if (apiKey) {
        document.querySelector("#apiKeyInput").value = apiKey; // Set the API key input value
    }
    if (!localStorage.getItem("maxTokens")) maxTokensInput.value = 1000;
    temperatureInput.value = localStorage.getItem("TEMPERATURE");
    if (!localStorage.getItem("TEMPERATURE")) temperatureInput.value = 70;
    temperatureLabel.textContent = temperatureInput.value / 100;
    safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }
    ];
    temperatureLabelSetup();
}

export function temperatureLabelSetup(){
    temperatureInput.addEventListener("input", () => {
        temperatureLabel.textContent = temperatureInput.value/100;
    });
}

export function getSafetySettings() {
    return safetySettings;
}

export function getSystemPrompt() {
    return systemPrompt;
}

export function saveSettings() {
    // API key is now managed through environment variables, so no need to save it in localStorage
    localStorage.setItem("maxTokens", maxTokensInput.value);
    localStorage.setItem("TEMPERATURE", temperatureInput.value);
}

export function getSettings() {
    return {
        apiKey: process.env.API_KEY, // Get API key from environment variable
        maxTokens: maxTokensInput.value,
        temperature: temperatureInput.value,
        safetySettings: safetySettings
    }
}