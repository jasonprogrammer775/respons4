// Language colors based on GitHub's language colors
export const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3572A5',
    Java: '#B07219',
    'C++': '#F34B7D',
    Ruby: '#701516',
    PHP: '#4F5D95',
    CSS: '#563D7C',
    HTML: '#E34C26',
    Go: '#00ADD8',
    Rust: '#DEA584',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89E051',
    Vue: '#41B883',
    React: '#61DAFB'
  };

  return colors[language] || '#858585';
};