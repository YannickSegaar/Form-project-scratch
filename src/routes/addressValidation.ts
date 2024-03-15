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

export const initAutocomplete = (postcodeInput: HTMLInputElement, huisnummerInput: HTMLInputElement): Promise<Record<string, string>> => {
  console.log("initAutocomplete called");
  return new Promise((resolve, reject) => {
    // Initialize the Geocoder when both fields are filled
    const init = () => {
      console.log("init function called");
      if (postcodeInput.value && huisnummerInput.value) {
        console.log("Initializing Geocoder");
        const address = `${postcodeInput.value} ${huisnummerInput.value}, Netherlands`;

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_KEY}`)
          .then(response => response.json())
          .then(data => {
            if (data.status === 'OK') {
              console.log("Geocoding successful");
              const parsed = parseGoogleAddressComponents(data.results[0].address_components);
              console.log("Parsed address components", parsed);
              resolve(parsed);
            } else {
              console.error("Geocoding failed", data.status);
              reject("Geocoding failed: " + data.status);
            }
          })
          .catch(error => {
            console.error("Error fetching geocoding data", error);
            reject(error);
          });
      }
    };

    postcodeInput.addEventListener("input", init);
    huisnummerInput.addEventListener("input", init);
  });
};