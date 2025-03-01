export function greet(name: string, language: string = "en"): string {
    const greetings: Record<string, string> = {
      en: "Hello",
      es: "Hola",
      fr: "Bonjour",
      de: "Hallo"
    };
  
    return `${greetings[language] || greetings.en}, ${name}!`;
  }