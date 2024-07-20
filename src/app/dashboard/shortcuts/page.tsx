'use client';

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"; // Ajusta la ruta según sea necesario
import { ShortcutActions } from "./_components/shortcuts_component";
import { ShortcutsComponent } from "./_components/shortcuts_component"; // Asegúrate de que la ruta sea correcta
import { Id } from "../../../../convex/_generated/dataModel"; // Ajusta la ruta según sea necesario

// Define el tipo para un acceso directo
interface Shortcut {
  _id: Id<"shortcuts">;
  url: string;
  description?: string;
  title?: string;
  password?: string;
  userId: Id<"users">;
}

export default function ShortcutsPage() {
  // Usar useQuery y extraer los datos correctamente
  const queryResult = useQuery(api.shortcuts.getShortcuts);

  // Manejo del estado de carga y errores
  if (queryResult === undefined) {
    return <div>Loading...</div>;
  }

  if (queryResult instanceof Error) {
    return <div>Error loading shortcuts: {queryResult.message}</div>;
  }

  // Extraer datos de la consulta
  const shortcuts: Shortcut[] = Array.isArray(queryResult) ? queryResult : [];

  return (
    <div className="p-4">
      {/* Componente para añadir un nuevo shortcut */}
      <ShortcutsComponent />

      {/* Renderizar los shortcuts existentes */}
      <div className="mt-4">
        {shortcuts.length === 0 ? (
          <div>No shortcuts found</div>
        ) : (
          shortcuts.map((shortcut: Shortcut) => (
            <div key={shortcut._id.toString()} className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">{shortcut.title || "No Title"}</h2>
              <p>{shortcut.description || "No description"}</p>
              <ShortcutActions shortcut={shortcut} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
