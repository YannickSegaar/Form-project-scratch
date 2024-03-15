//YRS: LET OP, DEZE CODE WERKT MET POSTCODE API, NIET MET GOOGLE MAPS API

const API_KEY = import.meta.env.VITE_POSTCODE_API_KEY;

export async function getPostcodeData(postcode: string, huisnummer: string) {
  const url = `https://api.postcodeapi.nu/v3/lookup/${postcode}/${huisnummer}`;

  const response = await fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return {
    street: data.street,
    city: data.city
  };
}