import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";


function ventas() {
    const {  ventas, getlasventas } = useContext(GlobalContext)

    useEffect(() => {
        getlasventas();
    }, []);

    const handlePrint = () => {
        const printContent = document.getElementById("print-area").innerHTML;
        const win = window.open('', '', 'height=700,width=900');
        win.document.write('<html><head><title>Informe de Ventas</title>');
        win.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">');
        win.document.write('</head><body>');
        win.document.write(printContent);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        win.print();
        win.close();
    };

    return (
        <>


            <div className="container mt-5">
                <h2 className="text-center mb-4 fw-bold">Informe de Ventas</h2>

                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn bg-dark no-print text-white" onClick={handlePrint}>
  🖨️ Imprimir Informe
</button>
                </div>
                <div id="print-area" className="table-responsive shadow-sm rounded">
                    <div className="table-responsive shadow-sm rounded">
                        <table className="table table-hover table-bordered align-middle">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th>Correlativo</th>
                                    <th>ID Cliente</th>
                                    <th>Nombre Cliente</th>
                                    <th>Total ($)</th>
                                    <th>Fecha de Venta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(ventas) && ventas.map((venta) => (
                                    <tr key={venta.id_venta}>
                                        <td className="text-center">{venta.id_venta}</td>
                                        <td className="text-center">{venta.id_usuario}</td>
                                        <td className="text-center">{venta.nombre} {venta.apellido}</td>
                                        <td className="text-end"> ${Number(venta.cantidad).toLocaleString('es-CL')}</td>
                                        <td className="text-center">
                                            {new Date(venta.created_at).toLocaleString('es-CL', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                  
                         
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ventas;