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
  console.log("initAutocomplete called"); // Added console.log
  return new Promise((resolve, reject) => {
    let autocomplete: google.maps.places.Autocomplete | null = null;

    // Initialize the Autocomplete when both fields are filled
    const init = () => {
      console.log("init function called"); // Added console.log
      if (postcodeInput.value && huisnummerInput.value && !autocomplete) {
        console.log("Initializing Autocomplete"); // Added console.log
        const options: google.maps.places.AutocompleteOptions = {
          fields: ["geometry", "address_components"],
          types: ["geocode"],
          componentRestrictions: {
            country: "nl",
          },
        };

        autocomplete = new google.maps.places.Autocomplete(postcodeInput, options);
        autocomplete.setFields(["address_component"]);

        autocomplete.addListener("place_changed", () => {
          console.log("place_changed event triggered"); // Added console.log
          const place = autocomplete?.getPlace();

          if (!place || !place.geometry || !place.geometry.location) {
            console.error("No data found for: '" + (place?.name || "") + "'"); // Changed to console.error
            reject("Geen gegevens gevonden voor: '" + (place?.name || "") + "'");
            return;
          }

          const parsed = parseGoogleAddressComponents(place.address_components || []);
          console.log("Parsed address components", parsed); // Added console.log

          if (parsed.street_number === undefined) {
            huisnummerInput.value = "";
          } else {
            postcodeInput.value = `${parsed.route} ${parsed.street_number}`;
            huisnummerInput.value = parsed.locality;
          }

          resolve(parsed);
        });
      }
    };

    postcodeInput.addEventListener("input", init);
    huisnummerInput.addEventListener("input", init);
  });
};