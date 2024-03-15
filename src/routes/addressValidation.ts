// addressValidation.ts

export const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    initGoogleCallback: () => void;
  }
}

export const initGoogle = (callback: () => void): HTMLScriptElement => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&callback=initGoogleCallback&lang=nl`;
  script.async = true;
  script.defer = true;
  window.initGoogleCallback = callback;
  return script;
};

export const parseGoogleAddressComponents = (addressComponents: google.maps.GeocoderAddressComponent[]): Record<string, string> => {
    let components: Record<string, string> = {};
    addressComponents.forEach((addressComponent) => {
        addressComponent.types.forEach((type) => {
            components[type] = addressComponent.long_name;
        });
    });

    return components;
};

export const initAutocomplete = (inputId: string, cityId: string): Promise<Record<string, string>> => {
    return new Promise((resolve, reject) => {
      const input = document.querySelector(inputId) as HTMLInputElement;
      const city = document.querySelector(cityId) as HTMLInputElement;
  
      const options: google.maps.places.AutocompleteOptions = {
        fields: ["geometry", "address_components"],
        types: ["geocode"],
        componentRestrictions: {
          country: "nl",
        },
      };
  
      const autocomplete = new google.maps.places.Autocomplete(input, options);
  
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
  
        if (!place.geometry || !place.geometry.location) {
          reject("Geen gegevens gevonden voor: '" + place.name + "'");
          return;
        }
  
        const parsed = parseGoogleAddressComponents(place.address_components || []);
  
        if (parsed.street_number === undefined) {
          city.value = "";
        } else {
          input.value = `${parsed.route} ${parsed.street_number}`;
          city.value = parsed.locality;
        }
  
        resolve(parsed);
      });
    });
  };
