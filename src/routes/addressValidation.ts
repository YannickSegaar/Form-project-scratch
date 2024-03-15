// addressValidation.ts

export const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const initGoogle = (): HTMLScriptElement => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&callback=initAutocomplete&lang=nl`;
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

export const initAutocomplete = (inputId: string, cityId: string): void => {
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
            window.alert("Geen gegevens gevonden voor: '" + place.name + "'");
            return;
        }

        const parsed = parseGoogleAddressComponents(place.address_components || []);

        if (parsed.street_number === undefined) {
            city.value = "";
        } else {
            input.value = `${parsed.route} ${parsed.street_number}`;
            city.value = parsed.locality;
        }
    });
};