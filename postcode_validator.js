const GOOGLE_MAPS_KEY = "AIzaSyB6KBV0Xq4_WupTzh6h4A2lvDX9QamdQ2U";

const initGoogle = () => {
	const script = document.createElement("script");
	script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places&callback=initAutocomplete&lang=nl`;
	return script;
};

const parseGoogleAddressComponents = (addressComponents) => {
	let components = {};
	addressComponents.forEach((addressComponent) => {
		addressComponent.types.forEach((type) => {
			components[type] = addressComponent.long_name;
		});
	});

	return components;
};

const initAutocomplete = () => {
	const addressFieldsets = document.querySelectorAll(
		".pixelpillow-address-autocomplete-google-maps"
	);

	if (addressFieldsets.length === 0) {
		return;
	}

	addressFieldsets.forEach((fieldset) => {
		const input = fieldset.querySelector(".address_line_1 input");
		const city = fieldset.querySelector(".address_city input");
		const postalCode = fieldset.querySelector(".address_zip input");

		const options = {
			fields: ["geometry", "address_components"],
			types: ["geocode"],
			componentRestrictions: {
				country: "nl",
			},
		};

		const autocomplete = new google.maps.places.Autocomplete(
			input,
			options
		);

		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();

			if (!place.geometry || !place.geometry.location) {
				window.alert(
					"Geen gegevens gevonden voor: '" + place.name + "'"
				);
				return;
			}

			const parsed = parseGoogleAddressComponents(
				place.address_components
			);

			if (parsed.street_number === undefined) {
				city.value = "";
				postalCode.value = "";
			} else {
				input.value = `${parsed.route} ${parsed.street_number}`;

				city.value = parsed.locality;

				postalCode.value = parsed.postal_code;
			}
		});
	});
};

window.addEventListener("load", function () {
	const addressFieldsets = document.querySelectorAll(
		".pixelpillow-address-autocomplete-google-maps"
	);

	if (addressFieldsets.length === 0) {
		return;
	}

	if (
		document
			.querySelector("body")
			.classList.contains("page-template-homepage") === true
	) {
		return;
	}

	document.head.appendChild(initGoogle());

	if (window.jQuery) {
		jQuery(document).bind("gform_post_render", function () {
			// Only fire after ajax submit
			if (typeof google !== "undefined") {
				initAutocomplete();
			}
		});
	}

	window.initAutocomplete = initAutocomplete;
});