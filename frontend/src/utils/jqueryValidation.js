import $ from 'jquery';

let validationPromise = null;

/**
 * Loads jquery-validation once against the bundled jQuery instance
 * and registers custom studio validation methods.
 */
export async function loadJQueryValidation() {
  if (typeof window === 'undefined') return null;

  window.jQuery = $;
  window.$ = $;

  if (!validationPromise) {
    validationPromise = import('jquery-validation').then(() => {
      if ($.validator && !$.validator.methods.phoneFormat) {
        $.validator.addMethod(
          'phoneFormat',
          function phoneFormatValidator(value, element) {
            if (this.optional(element)) return true;
            const cleaned = value.trim();
            return /^\+?[\d\s().-]{7,20}$/.test(cleaned) && (cleaned.match(/\d/g) || []).length >= 7;
          },
          'Please enter a valid phone number (at least 7 digits).'
        );
      }
      if ($.validator && !$.validator.methods.futureOrToday) {
        $.validator.addMethod(
          'futureOrToday',
          function futureOrTodayValidator(value, element) {
            if (this.optional(element)) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selected = new Date(`${value}T00:00:00`);
            return !Number.isNaN(selected.getTime()) && selected >= today;
          },
          'Please select today or a future production date.'
        );
      }
      return $;
    });
  }

  return validationPromise;
}

export default loadJQueryValidation;
