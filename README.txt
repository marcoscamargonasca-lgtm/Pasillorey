PASILLO DEL REY V2

Esta versión agrega el flujo:
1. Alumno se inscribe.
2. Tú ves al alumno en administración.
3. Tú presionas "Confirmar pago y activar".
4. Se calcula automáticamente la fecha de vencimiento:
   - Mensual = 1 mes
   - Trimestral = 3 meses
5. Puedes abrir WhatsApp con un mensaje preparado.

IMPORTANTE:
- Esta V2 todavía usa localStorage. No es una base de datos real.
- El botón WhatsApp abre el chat con un mensaje preparado; todavía NO es un envío automático por API.
- Para automatizar WhatsApp y los avisos 7 días/2 días/el día del vencimiento, después conectaremos una API oficial de WhatsApp Business y un servicio programado.
- Para uso real, el siguiente paso es conectar Supabase y mover la activación/fechas al servidor.
