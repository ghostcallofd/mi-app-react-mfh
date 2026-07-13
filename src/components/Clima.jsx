const Clima = ({ temperatura = 20 }) => {
    let sensacion = '';
    let recomendacion = '';

    if (temperatura < 15) {
        sensacion = 'frío';
        recomendacion = '🧥 Lleva abrigo';
    } else if (temperatura >= 15 && temperatura <= 25) {
        sensacion = 'agradable';
        recomendacion = '🌤️ Disfruta el día';
    } else { // temperatura > 25
        sensacion = 'caluroso';
        recomendacion = '💧 Mantente hidratado';
    }

    const emojiSensacion = {
        'frío': '❄️',
        'agradable': '😊',
        'caluroso': '☀️'
    };

    const colores = {
        'frío': { bg: '#e3f2fd', text: '#0d47a1' },
        'agradable': { bg: '#e8f5e9', text: '#1b5e20' },
        'caluroso': { bg: '#fff3e0', text: '#bf360c' }
    };

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            margin: '10px 0',
            backgroundColor: colores[sensacion].bg,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: colores[sensacion].text
        }}>
            <h3>🌡️ Información del Clima</h3>
            <div style={{ fontSize: '1.2rem', margin: '10px 0' }}>
                <p><strong>Temperatura:</strong> {temperatura}°C</p>
                <p><strong>Sensación térmica:</strong> {sensacion} {emojiSensacion[sensacion]}</p>
                <p><strong>Recomendación:</strong> {recomendacion}</p>
            </div>
            <div style={{
                padding: '8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
            }}>
                <small>💡 Basado en la temperatura actual</small>
            </div>
        </div>
    );
};

export default Clima;