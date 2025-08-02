import { AuthProvider } from "./context/AuthContext.tsx";

import React from "react";
import ReactDOM from "react-dom/client"; // Notice the /client import for React 18+
import App from "./App.jsx"; // Import your main App component
import "./index.css"; // Optional: Import global CSS styles

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
);
