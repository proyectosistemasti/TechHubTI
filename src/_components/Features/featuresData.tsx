import { Feature } from "@/types/feature";
import { AlignCenter } from "lucide-react";
import Image from "next/image";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <Image
        src="/images/hero/placa.jpg" 
        width={300}
        height={300}
        alt="CPU"
        className="w-full h-full object-cover"

      />
    ),
    title: "Mantenimiento de CPU",
    paragraph:
      "Se realiza mantenimiento de CPU así como también diagnostico de los problemas que presenta el equipo.",
  },
  {
    id: 2,
    icon: (
      <Image
      src="/images/hero/usuarios.jpg" 
      width={300}
      height={300}
      alt="Cuentas de usuario"
      className="w-full h-auto"
      />
    ),
    title: "Configuración de usuarios",
    paragraph:
      "Se realiza administración en la cuenta en cuentas de usuarios en los equipos de computo de la empresa.",
  },
  {
    id: 3,
    icon: (
      <Image
        src="/images/hero/AppleTv.jpeg" 
        width={300}
        height={300}
        alt="Apple TV"
        className="w-full h-full object-cover"
      />
    ),
    title: "Configuración de Apple TV",
    paragraph:
      "Configuración de Apple TV en habitaciones de HXA.",
  },

  {
    id: 4,
    icon: (
      <Image
        src="/images/hero/impresoras.jpg" 
        width={300}
        height={300}
        alt="IMP"
        className="w-full h-full"
      />
    ),
    title: "Configuración de impresoras",
    paragraph:
      "Se realiza configuración de las impresoras con los equipos de computo, así mismo se realiza el cambio de toner de ser necesario.",
  },
  {
    id: 5,
    icon: (
      <Image
      src="/images/hero/login.jpg" 
      width={300}
      height={300}
      alt="Contraseña"
      className="w-full h-auto"
      />
    ),
    title: "Cambio de contraseña",
    paragraph:
      "Restablecimiento de  la contraseña de su correo institucional.",
  },
  {
    id: 6,
    icon: (
      <Image
        src="/images/hero/diagnostico.jpg" 
        width={300}
        height={300}
        alt="IMP"
        className="w-full h-full"
      />
    ),
    title: "Diagnóstico de equipo para baja",
    paragraph:
      "Se realiza una revisón del equipo de computo donde se diagnotica si el equipo se dará de baja o solo se le realizará una reparación.",
  },
];
export default featuresData;
