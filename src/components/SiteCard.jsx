const SiteCard = ({ id, country, status, url, onReportError }) => {
  const isOnline = status === 'online';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-800">{country}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-slate-500 truncate mb-6">{url}</p>
      
      {/* Botón de acción: Solo aparece si el sitio está online */}
      {isOnline && (
        <button 
          onClick={() => onReportError(id)}
          className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-600 hover:text-white transition-all border border-red-100"
        >
          Reportar Falla
        </button>
      )}
    </div>
  );
};

export default SiteCard;