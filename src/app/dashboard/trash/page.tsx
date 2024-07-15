'use client';

import { FileBrowser } from "../_components/file-browser";

  export default function trashPage() {
    return (
      <div>
        <FileBrowser title="Recycle Bin" deletedOnly/>
      </div>
    )
  }
