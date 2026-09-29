// Carga relativa: funciona también cuando la app se publica en una subcarpeta.
(async function () {
  const status = document.getElementById('loadStatus');
  try {
    if (location.protocol === 'file:') {
      throw new Error('Abre la app mediante un servidor HTTP o HTTPS, no con doble clic en el archivo.');
    }
    await import('./app.js');
    status.hidden = true;
    document.getElementById('startButton').disabled = false;
    document.getElementById('resumeButton').disabled = false;
  } catch (error) {
    console.error('No se pudo iniciar la aplicación', error);
    status.textContent = location.protocol === 'file:' ? error.message :
      'No se pudo cargar el cuestionario. Recarga la página. Si continúa, verifica que app.js, money-profile-engine.js y la carpeta src estén completos y que el servidor entregue los archivos .js como JavaScript.';
  }
})();
