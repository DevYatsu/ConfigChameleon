export default function generateComplexPassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const allChars = chars + numbers;

  function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    return allChars.charAt(randomIndex);
  }

  let password = "";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const randomChar = getRandomCharacter();
      password += randomChar;
    }
    if (i !== 3) {
      password += "-";
    }
  }

  return password;
}
