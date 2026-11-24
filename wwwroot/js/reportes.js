//generar pdf//
 async function GenerarPDF() {
      const { jsPDF } = window.jspdf;  
      const doc = new jsPDF();
      

      // Título del informe
      doc.setFontSize(18);  //tamaño de fuente del título
      doc.setTextColor(0, 102, 204); //color del título
      doc.text("Informe de Tabla de Registros", 20, 20);  // posición del título

      // Subtítulo con fecha
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Generado el: " + new Date().toLocaleDateString(), 20, 30);  // escribe la fecha actual con el texto "generado el... y coloca la fecha actual"

      // Línea separadora
      doc.setLineWidth(0.5);
      doc.line(20, 34, 190, 34);

      // Tabla (a partir del HTML)
      doc.autoTable({     // Genera la tabla a partir del HTML
        html: '#miTabla',  // ID de la tabla HTML
        startY: 40,  // posición Y donde comienza la tabla
        styles: {    // estilos de la tabla
          fontSize: 10, // tamaño de fuente de la tabla
          cellPadding: 3 // relleno de las celdas
        },
        headStyles: {  // estilos del encabezado de la tabla
          fillColor: [0, 102, 204], // color de fondo del encabezado
          textColor: [255, 255, 255], // color del texto del encabezado
        }
      });

      // Mostrar el PDF en nueva ventana
      const string = doc.output('datauristring'); // genera el PDF como una cadena de datos URI para mostrar en un navegador sin guardar 
      const iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"; // crea un iframe con el PDF generado

      const x = window.open(); // abre una nueva ventana
      x.document.open();  // abre el documento de la nueva ventana
      x.document.write(iframe); // escribe el iframe en el documento de la nueva ventana
      x.document.close(); // cierra el documento de la nueva ventana

}
