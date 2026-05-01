(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})();

const taxSwitch = document.getElementById('switchCheckDefault');

if (taxSwitch) {
    taxSwitch.addEventListener('change', () => {
        const taxInfoElements = document.getElementsByClassName('tax-info');
        for (let i = 0; i < taxInfoElements.length; i++) {
            const info = taxInfoElements[i];
            info.style.display = (info.style.display === 'inline') ? 'none' : 'inline';
        }
    });
}