# AIChatUI

## Descripción

AIChatUI es una interfaz de usuario basada en web que actúa como un front-end para la API de OpenAI. Permite a los usuarios enviar consultas de texto natural y recibir respuestas generadas por modelos de lenguaje compatible:

-   [OpenAI](https://platform.openai.com/)
-   [Llama](https://llama.meta.com/)
-   [Anthropic](https://www.anthropic.com/)
-   [Groq](https://www.groq.com/)
-   [Gemini](https://gemini.google.com/)
-   [Mistral](https://mistral.ai/)
-   [Reka](https://reka.ai/)

## Características

-   Respuestas contextuales basadas en IA
-   Interfaz de usuario amigable
-   Soporte para múltiples idiomas

## Advertencia

Este proyecto es un proyecto para utilizar de forma local. No se recomienda su uso en producción debido a que se expone la API key del usuario, el cual puede ser utilizada para realizar cargos en la cuenta de OpenAI o cualquiera de las otras API's que se puedan integrar en el proyecto.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/pabloacevedo/aichatui.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd aichatui
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Inicia la aplicación:
    ```bash
    npm run dev
    ```
2. Abre tu navegador y navega a `http://localhost:5173`.

## Contribuir

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.
