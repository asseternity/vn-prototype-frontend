export async function generateFirstName(): Promise<string> {
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  const vowels = 'aeiou';

  // Helper: generate alternating consonant-vowel string
  function generateRandomString(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        result += consonants[Math.floor(Math.random() * consonants.length)];
      } else {
        result += vowels[Math.floor(Math.random() * vowels.length)];
      }
    }
    // Capitalize first letter
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  // First name: 2–8 letters
  const firstNameLength = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
  const firstName = generateRandomString(firstNameLength);
  return firstName;
}
