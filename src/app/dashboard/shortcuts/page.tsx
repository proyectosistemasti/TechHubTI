'use client';

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"; // Ajusta la ruta según sea necesario
import { ShortcutComponent} from "./_components/ShortcutComponent"
import { Id } from "../../../../convex/_generated/dataModel"; // Ajusta la ruta según sea necesario

// Define el tipo para un acceso directo
interface Shortcut {
  _id: Id<"shortcuts">;
  url: string;
  description?: string;
  title: string; // Cambiado a 'title' porque 'title' debería ser requerido
  password?: string;
  userId: Id<"users">;
  _creationTime: Date; // Añadido para coincidir con el uso en el componente
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
  const shortcuts: Shortcut[] = Array.isArray(queryResult)
    ? queryResult.map(shortcut => ({
        ...shortcut,
        _creationTime: new Date(shortcut._creationTime) // Convertir el timestamp a Date
      }))
    : [];

  return (
    <div className="p-4">
      {/* Componente para gestionar y mostrar accesos directos */}
      <ShortcutComponent/>
    </div>
  );
}
