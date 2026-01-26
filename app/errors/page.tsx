/*import ErrorDemoPage from "./error";

export default function ErrorsPage() {
  return <ErrorDemoPage />;
}
*/
import { Suspense } from "react";
import ErrorClient from "../errors/errorClient";

export const dynamic = "force-dynamic";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Cargando error...</div>}>
      <ErrorClient />
    </Suspense>
  );
}
