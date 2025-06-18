# Sightengine Visual Moderation App

This is a **React Native (Expo) application** that allows users to upload or select images, analyze their content via the Sightengine API, and get an AI-powered moderation summary powered by GPT. The app is designed with a clean, modern UI and supports both English and Turkish languages.

## Features

* **Image Analysis:** Upload an image or provide an image URL to analyze for inappropriate content (nudity, weapons, alcohol, drugs, offensive content, faces).
* **Face Detection:** Automatically detects faces and draws bounding boxes on the uploaded image.
* **AI-Powered Moderation Summary:** Uses GPT to generate a human-friendly summary of the analysis results in the selected language.
* **Category Grouping:** Results are displayed in collapsible accordion sections, grouped by category.
* **Language Support:** Switch easily between Turkish 🇹🇷 and English 🇬🇧.
* **User Experience:** Simple, responsive design with clear action buttons and feedback messages.


## Technologies Used

* **React Native** (Expo)
* **Sightengine API** for image content moderation
* **OpenAI GPT API** for moderation summaries
* **Lottie** for animated loaders
* **Custom Hooks & Components:** Clean separation of logic for image analysis and UI rendering

## Usage

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EgemenShn01/sightengine-visual-moderation-app.git
   cd sightengine-visual-moderation-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure API keys:**

   * Create a `.env` file in the project root:

     ```
     UPLOAD_API_USER=your_sightengine_api_user
     UPLOAD_API_SECRET=your_sightengine_api_secret
     OPENAI_API_KEY=your_openai_api_key
     ```
   * (Make sure to never commit your `.env` file to a public repository.)

4. **Start the project:**

   ```bash
   npx expo start
   ```

5. **Use on your device:**

   * Open in Expo Go, or run on an iOS/Android simulator.

## Notes

* **Face Box Accuracy:** Face boxes are drawn based on coordinates returned by the Sightengine API. Occasional inaccuracies may occur due to API limitations.
* **API Limits:** Sightengine and OpenAI APIs may have rate limits or quota restrictions; for production use, check pricing and usage policies.
* **Extensibility:** You can customize category filters, UI design, or moderation logic as needed.

## Roadmap / Ideas

* User login & history
* Manual face box editing/removal
* Customizable moderation categories
* Dark mode support

---

## License

MIT

---

### About `.env` security

* Always add `.env` to your `.gitignore`!
* Never commit sensitive keys to your repository. If you did, rotate/regenerate those keys immediately.
