import { getDownloadURL, ref } from "firebase/storage";
import * as React from "react";
import { storage } from "./firebase.js";

export function useFirestoreImage({ path }: { path: string }) {
  const [image, setImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    async function effect() {
      try {
        const url = await getDownloadURL(ref(storage, path));
        setImage(url);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e);
      }
    }
    effect();
  }, [path]);

  return {
    image,
    error,
  };
}
