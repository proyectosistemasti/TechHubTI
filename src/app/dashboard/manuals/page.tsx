'use client';

import { useQuery } from "convex/react";
import { FileBrowser } from "../_components/file-browser";
import { api } from "../../../../convex/_generated/api";

  export default function manualsPage() {
    return (
      <div>
        <FileBrowser title="Manuals" favoritesOnly/>
      </div>
    )
  }
