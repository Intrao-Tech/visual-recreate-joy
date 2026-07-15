import { createRoot, hydrateRoot } from "react-dom/client";
import { createHead, UnheadProvider } from "@unhead/react/client";
import App from "./App.tsx";
import "./index.css";

const head = createHead();
const container = document.getElementById("root")!;

const app = (
  <UnheadProvider head={head}>
    <App />
  </UnheadProvider>
);

// Prerendered pages arrive with real markup already in #root — hydrate it
// instead of throwing it away and re-rendering, which would cause a visible
// flash. Falls back to a plain render if the markup isn't there (dev server, or
// a page served without prerendering).
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
