import { useState, useEffect } from 'react';
import SiteCard from './components/SiteCard';

function App() {
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/sites')
      .then(response => response.json())
      .then(data => {
        setSites(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al conectar con la API:", error);
        setLoading(false);
      });
  }, []);

  // 1. Corregido: La lógica de filtrado ahora está fuera de otras funciones
  const filteredSites = sites.filter(site =>
    site.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Corregido: Función reportError definida correctamente
  const reportError = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/sites/${id}/report-error`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setSites(prevSites => 
          prevSites.map(site => 
            site.id === id ? { ...site, status: 'offline' } : site
          )
        );
        alert("Reporte enviado al equipo regional.");
      }
    } catch (error) {
      console.error("Error al reportar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Regional Site Health</h1>
          <p className="text-slate-500">Monitoreo técnico de plataformas regionales</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar país..."
            className="w-full md:w-64 pl-4 pr-4 py-2 text-zinc-950 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-medium">Cargando sitios...</div>
      ) : filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => (
            <SiteCard 
              key={site.id} 
              id={site.id} // 3. IMPORTANTE: Pasa el ID
              country={site.country} 
              status={site.status} 
              url={site.url} 
              onReportError={reportError} // 4. AQUÍ SE USA: Se quita el error de ESLint
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No se encontraron sitios para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default App;